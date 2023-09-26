/* eslint-disable @typescript-eslint/no-explicit-any */

import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import { useMutation } from '@tanstack/react-query'
import { Drawer, Form, Input, Select, Space, Switch } from 'antd'
import { useEffect, useState } from 'react'
import TableAddonQues from '../Components/TableAddonQues'
import { Choice } from '@/interface/test'
import questionApi from '@/apis/question.api'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  resetData?: () => void
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  questionData?: any
  testId: string
  categoryId: string
}

const DrawerQuestion = (props: Props) => {
  const { open, setOpen, resetData, setLoading, questionData, testId, categoryId } = props
  const [action, setAction] = useState('create')
  const [form] = Form.useForm()
  const [choice, setChoice] = useState<Choice[]>([])

  useEffect(() => {
    if (questionData) {
      setAction('update')
      form.setFieldsValue(questionData)
    } else {
      setAction('create')
      form.resetFields()
    }
  }, [questionData])

  const onCloseDrawer = () => {
    setOpen(false)
    setAction('')
    setChoice([])
    form.resetFields()
  }

  // const { data: categoriesData } = useQuery({
  //   queryKey: ['categoriesList'],
  //   queryFn: () => {
  //     return categoryApi.getCategories({
  //       parentId: '64ffde9c746fe5413cf8d1af',
  //     })
  //   },
  // })

  const { isLoading, status, mutate, error } = useMutation({
    mutationFn: (body) => questionApi.createQuestion(body),
  })

  useEffect(() => {
    if (status === 'success') {
      openNotification({
        status: status,
        message: action === 'create' ? 'Tạo bài thi thành công' : 'Cập nhật bài thi thành công',
      })
      setOpen(false)
      resetData && resetData()
      form.resetFields()
    }

    if (status === 'error' && error) {
      openNotification({ status: status, message: 'Thông báo', description: 'Có lỗi xảy ra' })
    }
  }, [status])

  useEffect(() => {
    setLoading && setLoading(isLoading)
  }, [isLoading])

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      point: parseInt(values.point),
      testId: testId,
      choices: choice,
      categoryId: categoryId,
    }
    mutate(payload)
    console.log(payload)
    onCloseDrawer()
  }

  const [typeQues, setTypeQues] = useState()

  return (
    <div>
      <Drawer
        title={action === 'create' ? 'Thêm câu hỏi' : 'Chỉnh sửa câu hỏi'}
        width={'45%'}
        onClose={onCloseDrawer}
        open={open}
        extra={
          <Space>
            <ButtonCustom
              onClick={() => {
                setOpen(false)
                form.resetFields()
              }}
            >
              Hủy
            </ButtonCustom>
            <ButtonCustom onClick={() => form.submit()} type='primary'>
              {action === 'create' ? 'Tạo câu hỏi' : 'Cập nhật'}
            </ButtonCustom>
          </Space>
        }
      >
        <Form onFinish={onFinish} layout='vertical' form={form} initialValues={{ difficulty: 'EASY' }}>
          <h3>Câu hỏi</h3>
          <Form.Item
            name='question'
            label='Nội dung câu hỏi'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập nội dung câu hỏi',
              },
            ]}
          >
            <Input placeholder='Nhập nội dung câu hỏi' />
          </Form.Item>

          <Space className='sp100'>
            <Form.Item
              name='point'
              label='Số điểm'
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập số điểm`,
                },
              ]}
            >
              <Input type='number' placeholder='Nhập số điểm'></Input>
            </Form.Item>

            <Form.Item
              name='type'
              label='Loại câu hỏi'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại câu hỏi',
                },
              ]}
            >
              <Select
                placeholder='Chọn loại câu hỏi'
                options={[
                  {
                    value: 'SINGLE CHOICE',
                    label: 'Một đáp án',
                  },
                  {
                    value: 'MULTIPLE CHOICE',
                    label: 'Nhiều đáp án',
                  },
                  {
                    value: 'TRUE FALSE',
                    label: 'Đúng / Sai',
                  },
                  {
                    value: 'SORT',
                    label: 'Sắp xếp',
                  },
                  {
                    value: 'DRAG DROP',
                    label: 'Kéo thả',
                  },
                  {
                    value: 'LIKERT SCALE',
                    label: 'Đánh giá',
                  },
                  {
                    value: 'FILL BLANK',
                    label: 'Điền vào ô trống',
                  },
                  {
                    value: 'MATCHING',
                    label: 'Nối',
                  },
                  {
                    value: 'NUMERICAL',
                    label: 'Điền số',
                  },
                  {
                    value: 'WRITING',
                    label: 'Viết',
                  },
                ]}
                onChange={(e) => setTypeQues(e)}
                value={typeQues}
              />
            </Form.Item>
            <Form.Item
              name='difficulty'
              label='Độ khó'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn độ khó',
                },
              ]}
            >
              <Select
                style={{ width: 100 }}
                placeholder='Chọn độ khó'
                options={[
                  {
                    value: 'EASY',
                    label: 'Dễ',
                  },
                  {
                    value: 'MEDIUM',
                    label: 'Vừa phải',
                  },
                  {
                    value: 'DIFFICULT',
                    label: 'Khó',
                  },
                ]}
              />
            </Form.Item>
            {action === 'update' && (
              <Form.Item name='status' label='Trạng thái'>
                <Switch defaultChecked />
              </Form.Item>
            )}
          </Space>
          <h3>Câu trả lời</h3>
          {((typeQues === 'SINGLE CHOICE' || typeQues === 'MULTIPLE CHOICE' || typeQues === 'TRUE FALSE') && (
            <TableAddonQues selectionType={typeQues} callBackData={setChoice} isClose={!open} />
          )) || (
            <Form.Item
              name='answer'
              label='Đáp án'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đáp án',
                },
              ]}
            >
              <Input placeholder='Nhập đáp án' />
            </Form.Item>
          )}

          <Form.Item name='explanation' label='Giải thích'>
            <Input.TextArea placeholder='Nhập giải thích'></Input.TextArea>
          </Form.Item>
          <Form.Item name='hint' label='Gợi ý'>
            <Input.TextArea placeholder='Nhập gợi ý'></Input.TextArea>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default DrawerQuestion
