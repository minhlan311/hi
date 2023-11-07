import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import questionApi from '@/apis/question.api'
import TableAddonQues from '../Components/TableAddonQues'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import useResponsives from '@/hooks/useResponsives'
import { Choice } from '@/interface/tests'
import { Col, Drawer, Form, Input, Row, Select, Space, Switch } from 'antd'
import { QuestionState } from '@/interface/question'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import RenderAddonLinkertScale from '../Components/RenderAddonLinkertScale'
import CreateQuestion from '@/pages/MentorPage/Management/Exams/Components/CreateDragDrop'

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
  const [choices, setChoices] = useState<Choice[]>([])
  const [corrects, setCorrects] = useState<string[]>([])
  const [questionText, setQuestionText] = useState<string>('')

  const [isCheck, setCheck] = useState<boolean>(true)
  const [data, setData] = useState<QuestionState | null>(null)
  const [typeQues, setTypeQues] = useState<string | null>(null)
  const [skillQues, setSkillQues] = useState<string>()
  const queryClient = useQueryClient()
  const { sm, lg, xl, xxl } = useResponsives()
  useEffect(() => {
    if (questionData) {
      setData(questionData)
      setCheck(questionData.status === 'ACTIVE' ? true : false)
    }
  }, [questionData])

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
      setTypeQues(data.type as unknown as string)
    }
  }, [data])

  const onCloseDrawer = () => {
    setOpen(false)
    setData(null)
    setChoices([])
    setCorrects([])
    setQuestionData(null)
    setTypeQues(null)
  }

  const { isLoading, status, mutate, error, isSuccess } = useMutation({
    mutationFn: (body) => (data ? questionApi.putQuestion(body) : questionApi.createQuestion(body)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionsBank'] })
    },
  })

  useEffect(() => {
    if (status === 'success' && (isSuccess || !data)) {
      openNotification({
        status: status,
        message: 'Thông báo',
        description: data ? 'Cập nhật bài thi thành công' : 'Tạo bài thi thành công',
      })

      form.resetFields()
    }

    if (status === 'error' && error) {
      openNotification({ status: status, message: 'Thông báo', description: 'Có lỗi xảy ra' })
    }
  }, [isLoading])

  console.log(corrects)

  const onFinish = (values: any) => {
    const id = crypto.randomUUID()
    const choicesData = choices.map((choose) => {
      return { id, ...choose }
    })

    const correctAnswers = choicesData.filter((choice) => choice.isCorrect).map((choice) => choice.id)

    const payload = {
      ...values,
      id: data?._id ? data?._id : undefined,
      status: isCheck ? 'ACTIVE' : 'INACTIVE',
      point: parseInt(values.point),
      choices: choicesData,
      correctAnswers: corrects.length > 0 ? corrects : correctAnswers,
      categoryId: categoryId,
      questionText: questionText ? questionText : undefined,
    }
    mutate(payload)
    console.log(values, 'values')

    setTimeout(() => {
      onCloseDrawer()
    }, 300)
  }

  useEffect(() => {
    if (setLoading) {
      setLoading(isLoading)
    }
  }, [isLoading])

  useEffect(() => {
    if (!open) {
      setData(null)
      setTypeQues(null)
    }
  }, [open])

  return (
    <div>
      <Drawer
        title={!data ? 'Thêm câu hỏi' : 'Chỉnh sửa câu hỏi'}
        onClose={onCloseDrawer}
        open={open}
        width={(sm && '100vw') || (lg && '65vw') || (xl && '45vw') || (xxl && '42vw') || '100vw'}
        extra={
          <Space>
            <ButtonCustom
              onClick={() => {
                setOpen(false)
                form.resetFields()
              }}
              size={sm ? 'small' : undefined}
            >
              Hủy
            </ButtonCustom>
            <ButtonCustom onClick={() => form.submit()} type='primary' size={sm ? 'small' : undefined}>
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
          {typeQues !== 'DRAG DROP' && (
            <>
              <h3>Câu hỏi</h3>
              <TextAreaCustom
                name='question'
                label='Nội dung câu hỏi'
                required
                data={!open ? undefined : data ? data : undefined}
              />
            </>
          )}

          <Row justify='space-between' gutter={12}>
            <Col span={24} md={6}>
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
            </Col>

            <Col span={24} md={6}>
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
            </Col>
            <Col span={24} md={6}>
              <Form.Item
                name='skill'
                label='Loại kỹ năng'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn loại kỹ năng',
                  },
                ]}
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
            </Col>
            <Col span={24} md={6}>
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
            </Col>
            {data && (
              <Col>
                <Form.Item name='status' label='Trạng thái'>
                  <Switch checked={isCheck} onChange={() => setCheck(!isCheck)} />
                </Form.Item>
              </Col>
            )}
          </Row>
          <h3>Câu trả lời</h3>

          {typeQues === 'DRAG DROP' && <CreateQuestion questionTextForm={setQuestionText} choose={setChoices} />}
          {((typeQues === 'SINGLE CHOICE' ||
            typeQues === 'MULTIPLE CHOICE' ||
            typeQues === 'TRUE FALSE' ||
            typeQues === 'SORT' ||
            typeQues === 'FILL BLANK') && (
            <TableAddonQues selectionType={typeQues} callBackData={setChoices} data={data?.choices} isClose={!open} />
          )) ||
            (typeQues === 'WRITING' && (
              <TextAreaCustom
                name='answer'
                label='Đáp án'
                required
                data={!open ? undefined : data ? data : undefined}
              />
            )) ||
            ((typeQues === 'LIKERT SCALE' || typeQues === 'MATCHING') && (
              <RenderAddonLinkertScale
                callBackCorrects={setCorrects}
                callBackChoices={setChoices}
                data={data?.choices as unknown as Choice[]}
                selectionType={typeQues}
              />
            )) ||
            (typeQues === 'NUMERICAL' && (
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
                <Input type='number' placeholder='Nhập đáp án' />
              </Form.Item>
            )) || <></>}

          <TextAreaCustom name='explanation' label='Giải thích' data={!open ? undefined : data ? data : undefined} />

          <TextAreaCustom name='hint' label='Gợi ý' data={!open ? undefined : data ? data : undefined}></TextAreaCustom>
        </Form>
      </Drawer>
    </div>
  )
}

export default DrawerQuestion
