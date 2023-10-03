import questionApi from '@/apis/question.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { QuestionState } from '@/interface/question'
import { Choice } from '@/interface/test'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Drawer, Form, Input, Select, Space, Switch } from 'antd'
import { useEffect, useState } from 'react'
import TableAddonQues from '../Components/TableAddonQues'
// import { default } from '@default/default5-react'
// import ClassicEditor from '@default/default5-build-classic'
/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  open: boolean
  questionData?: QuestionState | null
  categoryId: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setQuestionData: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerQuestion = (props: Props) => {
  const { open, questionData = null, categoryId, setOpen, setQuestionData, setLoading } = props
  const [form] = Form.useForm()
  const [choice, setChoice] = useState<Choice[]>([])
  const [isCheck, setCheck] = useState<boolean>(true)
  const [data, setData] = useState<QuestionState>()
  const [typeQues, setTypeQues] = useState<string>()
  const [skillQues, setSkillQues] = useState<string>()
  const queryClient = useQueryClient()
  useEffect(() => {
    if (questionData) {
      setData(questionData)
      setCheck(questionData.status === 'ACTIVE' ? true : false)
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionsBank'] })
    },
  })

  useEffect(() => {
    if (status === 'success') {
      openNotification({
        status: status,
        message: 'Thông báo',
        description: data ? 'Cập nhật bài thi thành công' : 'Tạo bài thi thành công',
      })
      setOpen(false)
      form.resetFields()
    }

    if (status === 'error' && error) {
      openNotification({ status: status, message: 'Thông báo', description: 'Có lỗi xảy ra' })
    }
  }, [status, data])

  // const [content, setContent] = useState('')

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      id: data?._id,
      status: isCheck ? 'ACTIVE' : 'INACTIVE',
      point: parseInt(values.point),
      choices: choice,
      categoryId: categoryId,
    }
    mutate(payload)
    onCloseDrawer()
  }

  useEffect(() => {
    if (setLoading) {
      setLoading(isLoading)
    }
  }, [isLoading])

  useEffect(() => {
    if (!open) {
      setData(undefined)
    }
  }, [open])

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
        <Form
          onFinish={onFinish}
          layout='vertical'
          form={form}
          initialValues={{ difficulty: 'EASY', skill: 'READING' }}
        >
          <h3>Câu hỏi</h3>

          <TextAreaCustom
            name='question'
            label='Nội dung câu hỏi'
            type='default'
            placeholder='Nhập nội dung câu hỏi'
            required
            data={data}
          />

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
                    label: 'Nhập câu trả lời',
                  },
                ]}
                onChange={(e) => setTypeQues(e)}
                value={typeQues}
              />
            </Form.Item>
            <Form.Item
              name='skill'
              label='Loại kỹ năng'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại kỹ năng',
                },
              ]}
              style={{ width: 120 }}
            >
              <Select
                placeholder='Chọn loại kỹ năng'
                options={[
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
                ]}
                onChange={(e) => setSkillQues(e)}
                value={skillQues}
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
            {data && (
              <Form.Item name='status' label='Trạng thái'>
                <Switch checked={isCheck} onChange={() => setCheck(!isCheck)} />
              </Form.Item>
            )}
          </Space>
          <h3>Câu trả lời</h3>
          {((typeQues === 'SINGLE CHOICE' ||
            typeQues === 'MULTIPLE CHOICE' ||
            typeQues === 'TRUE FALSE' ||
            typeQues === 'SORT') && (
            <TableAddonQues selectionType={typeQues} callBackData={setChoice} data={data?.choices} isClose={!open} />
          )) || (
            <TextAreaCustom
              name='answer'
              label='Đáp án'
              type='default'
              placeholder='Nhập đáp án'
              required
              data={data}
            />
          )}

          <TextAreaCustom
            name='explanation'
            label='Giải thích'
            type='default'
            placeholder='Nhập giải thích'
            data={data}
          />

          <TextAreaCustom
            name='hint'
            label='Gợi ý'
            type='default'
            placeholder='Nhập gợi ý'
            data={data}
          ></TextAreaCustom>
        </Form>
      </Drawer>
    </div>
  )
}

export default DrawerQuestion
