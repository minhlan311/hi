import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import questionApi from '@/apis/question.api'
import TableAddonQues from '../Components/TableAddonQues'
import { Choice } from '@/interface/test'
import { Drawer, Form, Input, Select, Space, Switch } from 'antd'
import { QuestionState } from '@/interface/question'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  open: boolean
  questionData?: QuestionState | null
  testId: string
  categoryId: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setQuestionData: React.Dispatch<React.SetStateAction<QuestionState | null>>
  resetData: () => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerQuestion = (props: Props) => {
  const { open, questionData = null, testId, categoryId, setOpen, setQuestionData, resetData, setLoading } = props
  const [form] = Form.useForm()
  const [choice, setChoice] = useState<Choice[]>([])
  const [isCheck, setCheck] = useState<boolean>(Boolean(questionData?.status === 'ACTIVE'))
  const [data, setData] = useState<QuestionState>()
  const [typeQues, setTypeQues] = useState<string>()
  useEffect(() => {
    if (questionData) {
      setData(questionData)
    }
  }, [questionData])

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
      setTypeQues(data.type)
    }
  }, [data])

  const onCloseDrawer = () => {
    setOpen(false)
    setChoice([])
    setQuestionData(null)
    form.resetFields()
  }

  const { isLoading, status, mutate, error } = useMutation({
    mutationFn: (body) => (data ? questionApi.putQuestion(body) : questionApi.createQuestion(body)),
  })

  useEffect(() => {
    if (status === 'success') {
      openNotification({
        status: status,
        message: data ? 'Cập nhật bài thi thành công' : 'Tạo bài thi thành công',
      })
      setOpen(false)
      resetData()
      form.resetFields()
    }

    if (status === 'error' && error) {
      openNotification({ status: status, message: 'Thông báo', description: 'Có lỗi xảy ra' })
    }
  }, [status, data])

  useEffect(() => {
    setLoading && setLoading(isLoading)
  }, [isLoading])

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      id: data?._id,
      status: isCheck ? 'ACTIVE' : 'INACTIVE',
      point: parseInt(values.point),
      testId: testId,
      choices: choice,
      categoryId: categoryId,
    }
    mutate(payload)
    onCloseDrawer()
  }

  return (
    <div>
      <Drawer
        title={!data ? 'Thêm câu hỏi' : 'Chỉnh sửa câu hỏi'}
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
              {!data ? 'Tạo câu hỏi' : 'Cập nhật'}
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
            {questionData && (
              <Form.Item name='status' label='Trạng thái'>
                <Switch checked={isCheck} onChange={() => setCheck(!isCheck)} />
              </Form.Item>
            )}
          </Space>
          <h3>Câu trả lời</h3>
          {((typeQues === 'SINGLE CHOICE' || typeQues === 'MULTIPLE CHOICE' || typeQues === 'TRUE FALSE') && (
            <TableAddonQues selectionType={typeQues} callBackData={setChoice} data={data?.choices} isClose={!open} />
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
