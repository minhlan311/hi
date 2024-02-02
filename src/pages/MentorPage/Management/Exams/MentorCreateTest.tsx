import examApi from '@/apis/exam.api'
import skillApi from '@/apis/skill.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import { ExamState } from '@/interface/exam'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Form, Space, Steps } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CreateSkill from './Components/CreateSkill'
import CreateTest from './Components/CreateTest'
import LastCheck from './Components/LastCheck'
/* eslint-disable @typescript-eslint/no-explicit-any */

const MentorCreateTest = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(0)
  const [testId, setTestId] = useState<string>()

  useEffect(() => {
    if (location?.state?.testId) setTestId(location?.state?.testId)
    else {
      if (location.pathname.includes('updateTest')) navigate('/mentor/exams')
    }
  }, [location])

  const { data: examData, isLoading } = useQuery({
    queryKey: ['examDetail', testId, current],
    queryFn: () => {
      return examApi.getExamDetail(testId!)
    },
    enabled: Boolean(testId),
  })

  const examDetail = examData?.data

  const testMutation = useMutation({
    mutationFn: (body) => (!examDetail?._id ? examApi.createExam(body) : examApi.putExam(body)),
    onSuccess: (data) => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: !examDetail?._id ? 'Tạo bài thi thành công' : 'Cập nhật bài thi thành công',
      })
      setTestId(data.data._id)
      if (current === 0) setCurrent(current + 1)
    },
  })
  const [skillSelected, setSkillSelected] = useState<string[]>([])

  useEffect(() => {
    if (examDetail && examDetail.skill?.length > 0) {
      setSkillSelected(examDetail.skill)
    }
  }, [examDetail])

  const { data: skillData } = useQuery({
    queryKey: ['skillSelected', skillSelected],
    queryFn: () => {
      return skillApi.findSkill({
        filterQuery: {
          _id: skillSelected,
        },
      })
    },

    enabled: skillSelected?.length > 0,
  })

  const next = () => {
    if (current === 0) form.submit()
    if (current === 1) setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const finished = () => {
    if (examDetail) {
      const skillArr = skillData?.data?.docs?.map((item) => item.skill)
      const payload = {
        skill: skillSelected,
        skillName: skillArr,
        id: examDetail._id,
      }

      testMutation.mutate(payload as any)

      setTimeout(() => {
        navigate('/mentor/exams')
      }, 1500)
    }
  }

  const stepItem = [
    {
      key: 'info',
      title: 'Nội dung',
      content: (
        <CreateTest
          form={form}
          testMutation={testMutation}
          examData={examDetail as unknown as ExamState}
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
          examData={examDetail as unknown as ExamState}
          packsSelected={skillSelected}
          setSkillSelected={setSkillSelected}
        />
      ),
      disabled: !examDetail?._id,
    },
    {
      key: 'finish',
      title: !examDetail?._id ? 'Thêm mới' : 'Cập nhật',
      content: (
        <LastCheck
          examData={examDetail as unknown as ExamState}
          skillData={skillData?.data?.docs ? skillData?.data?.docs : []}
        />
      ),
      disabled: skillSelected.length < 4,
    },
  ]

  return (
    <Space direction='vertical' size='large' className='sp100'>
      <h2>{!examDetail?._id ? 'Thêm mới bộ đề' : 'Cập nhật bộ đề'}</h2>

      <Steps current={current} items={stepItem} onChange={(e) => setCurrent(e)} />
      <div>{stepItem[current]?.content}</div>
      <Space>
        {current >= 0 && current < stepItem.length - 1 && (
          <ButtonCustom type='primary' onClick={() => next()} disabled={skillSelected.length < 4 && current > 0}>
            Tiếp theo
          </ButtonCustom>
        )}
        {current === stepItem.length - 1 && (
          <ButtonCustom type='primary' onClick={() => finished()}>
            {!examDetail?._id ? 'Tạo bộ đề' : 'Cập nhật bộ đề'}
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
