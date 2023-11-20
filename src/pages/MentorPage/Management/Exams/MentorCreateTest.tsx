import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import CreateSkill from './Components/CreateSkill'
import CreateTest from './Components/CreateTest'
import examApi from '@/apis/exam.api'
import openNotification from '@/components/Notification'
import { ExamState } from '@/interface/exam'
import { Form, Space, Steps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import LastCheck from './Components/LastCheck'
import { localAction } from '@/common'
/* eslint-disable @typescript-eslint/no-explicit-any */

const MentorCreateTest = () => {
  const location = useLocation()
  const navitage = useNavigate()
  const [form] = Form.useForm()
  const typeAction = location.pathname.split('/')[3]
  const [current, setCurrent] = useState(0)

  const createdId = localAction('createTest')

  const testMutation = useMutation({
    mutationFn: (body) =>
      typeAction === 'createTest' && !createdId ? examApi.createExam(body) : examApi.putExam(body),
    onSuccess: (data) => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description:
          typeAction === 'createTest' && !createdId ? 'Tạo bài thi thành công' : 'Cập nhật bài thi thành công',
      })

      if (typeAction === 'createTest') localStorage.setItem('createTest', data.data._id)
      if (current === 0) setCurrent(current + 1)
    },
    onError: () => openNotification({ status: 'error', message: 'Thông báo', description: 'Có lỗi xảy ra' }),
  })

  const { data: exam, isLoading } = useQuery({
    queryKey: ['examDetail', typeAction, createdId],
    queryFn: () => {
      return examApi.getExamDetail(location.state || createdId)
    },
    enabled: typeAction === 'updateTest' || Boolean(createdId),
  })

  const examData = exam?.data
  const [skillSelected, setSkillSelected] = useState<string[]>([])
  useEffect(() => {
    if (exam?.data.skill && exam?.data?.skill?.length > 0) {
      setSkillSelected(exam?.data?.skill as unknown as string[])
    }
  }, [exam])

  const next = () => {
    if (current === 0) form.submit()
    if (current === 1) setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const finished = () => {
    if (examData) {
      const payload = {
        skill: skillSelected,
        id: examData._id,
      }

      testMutation.mutate(payload as any)
      localStorage.removeItem('skillPack')

      setTimeout(() => {
        navitage('/mentor/exams')
      }, 1500)
    }
  }

  const stepItem = [
    {
      key: 'infor',
      title: 'Nội dung',
      content: (
        <CreateTest
          form={form}
          testMutation={testMutation}
          examData={examData as unknown as ExamState}
          isLoading={isLoading}
        />
      ),
    },
    {
      key: 'skill',
      title: 'Kỹ năng',
      content: (
        <CreateSkill
          form={form}
          examData={examData as unknown as ExamState}
          packsSelected={skillSelected}
          setSkillSelected={setSkillSelected}
        />
      ),
      disabled: typeAction === 'createTest',
    },
    {
      key: 'finish',
      title: typeAction === 'createTest' ? 'Thêm mới' : 'Cập nhật',
      content: <LastCheck examData={examData as unknown as ExamState} skillSelected={skillSelected} />,
      disabled: skillSelected.length === 0,
    },
  ]

  return (
    <Space direction='vertical' size='large' className='sp100'>
      <h2>{typeAction === 'createTest' ? 'Thêm mới bộ đề' : 'Cập nhật bộ đề'}</h2>

      <Steps current={current} items={stepItem} onChange={(e) => setCurrent(e)} />
      <div>{stepItem[current]?.content}</div>
      <Space>
        {current >= 0 && current < stepItem.length - 1 && (
          <ButtonCustom type='primary' onClick={() => next()}>
            Tiếp theo
          </ButtonCustom>
        )}
        {current === stepItem.length - 1 && (
          <ButtonCustom type='primary' onClick={() => finished()}>
            {typeAction === 'createTest' ? 'Tạo bộ đề' : 'Cập nhật bộ đề'}
          </ButtonCustom>
        )}
        {current > 0 && (
          <ButtonCustom style={{ margin: '0 8px' }} onClick={() => prev()}>
            Quay lại
          </ButtonCustom>
        )}
      </Space>
    </Space>
  )
}

export default MentorCreateTest
