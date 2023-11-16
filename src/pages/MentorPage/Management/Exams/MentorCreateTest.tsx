/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { ENDPOINT } from '@/constants/endpoint'
import { Skill } from '@/interface/exam'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Col, Form, Input, Modal, Row, Select, Space, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { RiVoiceprintLine } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router-dom'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

type SkillType = 'READING' | 'LISTENING' | 'WRITING' | 'SPEAKING' | string

const RenderSkillItem = ({
  skillName,
  data,
  name,
  restField,
}: {
  skillName: SkillType
  data: Skill
  name: any
  restField: any
}) => {
  const [skill, setSkill] = useState<SkillType>(data?.skillName || 'READING')

  useEffect(() => {
    if (skillName) setSkill(skillName)
  }, [skillName])

  const [callbackUrl, setCallbackUrl] = useState<any>(null || data?.url)
  console.log(callbackUrl)
  console.log(skill)

  return (
    <Row gutter={24}>
      <Col>
        <h3>
          1. Thêm nội dung kỹ năng{' '}
          {(skill === 'READING' && 'đọc') ||
            (skill === 'LISTENING' && 'nghe') ||
            (skill === 'WRITING' && 'viết') ||
            (skill === 'SPEAKING' && 'nói')}
        </h3>
      </Col>
      {skill === 'LISTENING' && (
        <>
          <Col span={24} md={5}>
            <Form.Item label='Ghi âm'>
              <UploadCustom
                accessType='audio/*'
                uploadKey='attachment'
                action={import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_ATTACHMENT}
                callBackFileList={setCallbackUrl}
              >
                <ButtonCustom icon={<RiVoiceprintLine />} className='sp100'>
                  Thêm file ghi âm
                </ButtonCustom>
              </UploadCustom>
            </Form.Item>
          </Col>

          <Col span={24} md={11}>
            <Form.Item label=' '>
              <audio controls className='sp100' style={{ height: 40 }}>
                <source src={callbackUrl} type='audio/mpeg' />
              </audio>
            </Form.Item>
          </Col>
        </>
      )}
      {skill && (
        <Col span={24}>
          <TextAreaCustom
            {...restField}
            name={[name, 'description']}
            label={skill === 'READING' ? 'Nội dung bài đọc' : 'Chú thích'}
            rules={[
              {
                required: skill === 'READING',
                message: 'Vui lòng nhập nội dung bài đọc',
              },
            ]}
            data={data}
          ></TextAreaCustom>
        </Col>
      )}

      <Col>
        <h3>
          2. Thêm câu hỏi kỹ năng{' '}
          {(skill === 'READING' && 'đọc') ||
            (skill === 'LISTENING' && 'nghe') ||
            (skill === 'WRITING' && 'viết') ||
            (skill === 'SPEAKING' && 'nói')}
        </h3>
      </Col>
      <Col span={24}>Thêm câu hỏi ở đây</Col>
    </Row>
  )
}

const MentorCreateTest = () => {
  const [form] = Form.useForm()
  const [typePlan, setTypePlan] = useState('FREE')
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navitage = useNavigate()
  const typeAction = location.pathname.split('/')[3]

  const { data: exam, isLoading } = useQuery({
    queryKey: ['examDetail', typeAction],
    queryFn: () => {
      return examApi.getExamDetail(location.state)
    },
    enabled: typeAction === 'updateTest',
  })

  const examData = exam?.data

  const { data: categoriesData } = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => {
      return categoryApi.getCategories({ parentId: null })
    },
  })

  const coursesList = categoriesData?.data?.docs?.find((item) => item.name === 'Khóa học')

  const subjectList = coursesList?.children?.map((sj) => {
    return {
      value: sj._id,
      label: sj.name,
    }
  })

  const { mutate } = useMutation({
    mutationFn: (body) =>
      typeAction === 'createTest' ? examApi.createExam(body) : examApi.putExam({ id: examData?._id, data: body }),
    onSuccess: () => {
      openNotification({
        status: 'success',
        message: typeAction === 'createTest' ? 'Tạo bài thi thành công' : 'Cập nhật bài thi thành công',
      })

      form.resetFields()

      setTimeout(() => {
        navitage('/mentor/exams')
      }, 1000)
    },
    onError: () => openNotification({ status: 'error', message: 'Thông báo', description: 'Có lỗi xảy ra' }),
  })
  const initSkill = [
    {
      value: 'READING',
      label: 'Đọc',
    },
    {
      value: 'LISTENING',
      label: 'Nghe',
    },
    {
      value: 'WRITING',
      label: 'Viết',
    },
    {
      value: 'SPEAKING',
      label: 'Nói',
    },
  ]
  const [skillOption, setSkillOption] = useState(initSkill.filter((skill) => skill.value !== 'READING'))

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      type: 'TEST',
      cost: parseInt(values?.cost),
    }

    mutate(payload)
  }

  useEffect(() => {
    if (examData?._id) {
      form.setFieldsValue(examData)
    }
  }, [examData])

  const [changeSkill, setChangeSkill] = useState<SkillType>()
  const [targetSkill, setTargetSkill] = useState<SkillType>()

  const [items, setItems] = useState([{ label: `Kỹ năng đọc`, key: 'READING' }])

  useEffect(() => {
    if (examData && examData?.skill.length > 0) {
      const newItems = initSkill
        .filter((skill) => examData?.skill.find((s) => s.skillName === skill.value))
        .map((skill) => {
          return {
            label: `Kỹ năng ${
              (skill.value === 'READING' && 'đọc') ||
              (skill.value === 'LISTENING' && 'nghe') ||
              (skill.value === 'WRITING' && 'viết') ||
              (skill.value === 'SPEAKING' && 'nói')
            }`,

            key: skill.value,
          }
        })
      setItems(newItems)
    }
  }, [examData])

  useEffect(() => {
    if (changeSkill !== undefined) {
      setItems([
        ...items,
        {
          label: `Kỹ năng ${
            (changeSkill === 'READING' && 'đọc') ||
            (changeSkill === 'LISTENING' && 'nghe') ||
            (changeSkill === 'WRITING' && 'viết') ||
            (changeSkill === 'SPEAKING' && 'nói')
          }`,

          key: changeSkill,
        },
      ])
      setTargetSkill(changeSkill)

      setSkillOption((prev) => prev.filter((skill) => skill.value !== changeSkill))
      setOpen(false)
      setChangeSkill(undefined)
    }
  }, [changeSkill])

  const removeTab = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey)
    const newPanes = items.filter((pane) => pane.key !== targetKey)

    if (newPanes.length && targetKey === targetSkill) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex]
      setTargetSkill(key)
    }

    const newSkill = initSkill.find((item) => item.value === targetKey)

    setSkillOption((prev: any) => [...prev, newSkill])
    setItems(newPanes)
  }

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      setOpen(!open)
    } else {
      removeTab(targetKey)
    }
  }

  return (
    <LoadingCustom loading={typeAction === 'createTest' ? false : isLoading} tip='Vui lòng chờ...'>
      <h2>{typeAction === 'createTest' ? 'Thêm mới bộ đề' : 'Cập nhật bộ đề'}</h2>
      <Form
        onFinish={onFinish}
        layout='vertical'
        form={form}
        initialValues={{ plan: 'FREE', skill: [{ skillName: 'READING' }] }}
      >
        <Row gutter={24}>
          <Col span={24} md={8}>
            <Form.Item
              name='categoryId'
              label='Chọn khóa học'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn khóa học',
                },
              ]}
            >
              <Select placeholder='Chọn khóa học' options={subjectList} />
            </Form.Item>
          </Col>
          <Col span={24} md={8}>
            <Form.Item
              name='plan'
              label='Loại phí'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng loại phí',
                },
              ]}
            >
              <Select
                placeholder='Chọn loại phí'
                options={[
                  {
                    value: 'FREE',
                    label: 'Miễn phí',
                  },
                  {
                    value: 'PREMIUM',
                    label: 'Có phí',
                  },
                ]}
                onChange={(e) => setTypePlan(e)}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={8}>
            <Form.Item
              name='cost'
              label='Số tiền'
              rules={[
                {
                  required: typePlan === 'PREMIUM',
                  message: `Vui lòng nhập số tiền`,
                },
              ]}
            >
              <Input type='number' disabled={typePlan !== 'PREMIUM'} placeholder='Nhập số tiền'></Input>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name='name'
          label='Tiêu đề bộ đề'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tiêu đề bộ đề',
            },
          ]}
        >
          <Input placeholder='Nhập tên tiêu đề bộ đề' />
        </Form.Item>

        <TextAreaCustom name='description' label='Chú thích' data={examData} />

        <Space direction='vertical' className='sp100'>
          <h3>Kỹ năng:</h3>

          <Form.List name='skill'>
            {(fields, { add, remove }) => {
              return (
                <Tabs
                  onChange={(e) => setTargetSkill(e)}
                  activeKey={targetSkill}
                  type='editable-card'
                  onEdit={(e, action) => {
                    onEdit(e, action)
                    const targetIndex = items.findIndex((tab) => tab.key === e)
                    if (action === 'add') add()
                    if (action === 'remove') remove(targetIndex)
                  }}
                  addIcon={
                    <div style={{ display: 'flex' }}>
                      <AiOutlinePlus size={13} />
                      <p style={{ fontSize: 13 }}>Thêm kỹ năng</p>
                    </div>
                  }
                >
                  {items.map((tab, id) => (
                    <Tabs.TabPane key={tab.key} tab={tab.label}>
                      <Form.Item
                        name={[fields[id]?.name, 'skillName']}
                        initialValue={tab.key}
                        style={{ display: 'none' }}
                        key={fields[id]?.key}
                      ></Form.Item>
                      <RenderSkillItem
                        skillName={tab.key}
                        data={examData?.skill?.[id] as unknown as Skill}
                        name={fields[id]?.name}
                        restField={fields[id]}
                      />
                    </Tabs.TabPane>
                  ))}
                </Tabs>
              )
            }}
          </Form.List>
          <ButtonCustom size='large' type='primary' htmlType='submit'>
            {typeAction === 'createTest' ? 'Thêm mới' : 'Cập nhật'}
          </ButtonCustom>
        </Space>
      </Form>
      <Modal
        title='Chọn kỹ năng thêm mới'
        open={open}
        onCancel={() => {
          setOpen(!open)
        }}
        footer={<p></p>}
      >
        <Select
          className='sp100'
          placeholder='Chọn loại kỹ năng'
          value={changeSkill}
          options={skillOption}
          onChange={(e) => setChangeSkill(e)}
        />
      </Modal>
    </LoadingCustom>
  )
}

export default MentorCreateTest
