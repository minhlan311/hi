import questionApi from '@/apis/question.api'
import openNotification from '@/components/Notification'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { ExamState, SkillType } from '@/interface/exam'
import { QuestionState } from '@/interface/question'
import { Choice } from '@/interface/tests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Col, Form, Input, Row, Select, Switch } from 'antd'
import { FormInstance } from 'antd/lib'
import { SetStateAction, useEffect, useState } from 'react'
import CreateDnDQuestion from './CreateDragDrop'
import RenderAddonLinkertScale from './RenderAddonLinkertScale'
import TableAddonQues from './TableAddonQues'
import LoadingCustom from '@/components/LoadingCustom'
/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  isForm?: FormInstance
  isOpen?: boolean
  questionData?: QuestionState | null
  categoryId: string
  typeQuestion: 'TEST' | 'QUIZ'
  skill?: SkillType

  okButton?: React.ReactNode
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  setQuestionData?: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  callbackIdCreate?: React.Dispatch<SetStateAction<string>>
}

const CreateQuestion = (props: Props) => {
  const {
    isForm,
    isOpen,
    questionData,
    categoryId,
    typeQuestion,
    skill,
    okButton,
    setOpen,
    setQuestionData,
    setLoading,
    callbackIdCreate,
  } = props
  const [form] = Form.useForm()
  const [choices, setChoices] = useState<Choice[]>([])
  const [corrects, setCorrects] = useState<string[]>([])
  const [questionText, setQuestionText] = useState<string>('')
  const [isCheck, setCheck] = useState<boolean>(true)
  const [data, setData] = useState<QuestionState | null>()
  const [typeQues, setTypeQues] = useState<string | null>(null)
  const [skillQues, setSkillQues] = useState<string>()
  const queryClient = useQueryClient()

  const examData = queryClient.getQueryData<{ data: ExamState }>(['examDetail'])

  const examDetail = examData?.data

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

  const skillOptions = initSkill.filter((item) => examDetail?.skillName?.includes(item.value))

  useEffect(() => {
    if (questionData) {
      setData(questionData)
      setCheck(questionData.status === 'ACTIVE' ? true : false)
    }
  }, [questionData])

  useEffect(() => {
    if (data) {
      isForm ? isForm.setFieldsValue(data) : form.setFieldsValue(data)
      setTypeQues(data.type as unknown as string)
    }
  }, [data, isForm])

  const onCloseDrawer = () => {
    setData(null)
    setChoices([])
    setCorrects([])
    setQuestionData && setQuestionData(null)
    setTypeQues(null)
    setQuestionText('')
    setSkillQues('')
    isForm ? isForm.resetFields() : form.resetFields()
    setTimeout(() => {
      setData(undefined)
      setOpen && setOpen(false)
    }, 300)
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: (body) => (data ? questionApi.putQuestion(body) : questionApi.createQuestion(body)),
    onSuccess: (d) => {
      queryClient.invalidateQueries({ queryKey: ['questionsBank'] })
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: data ? 'Cập nhật câu hỏi thành công' : 'Tạo câu hỏi thành công',
      })
      callbackIdCreate && callbackIdCreate(d.data._id)
      onCloseDrawer()
    },
    onError: () => openNotification({ status: 'error', message: 'Thông báo', description: 'Có lỗi xảy ra' }),
  })

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
      typeQuestion: typeQuestion,
      skill: skill ? skill : skillOptions.length < 2 ? examDetail?.skillName[0] : values.skill,
    }
    mutate(payload)
    console.log(payload, 'payload')
  }

  useEffect(() => {
    if (setLoading) {
      setLoading(isLoading)
    }
  }, [isLoading])

  return (
    <LoadingCustom loading={isLoading} tip='Vui lòng chờ...'>
      <Form onFinish={onFinish} layout='vertical' form={isForm ? isForm : form} initialValues={{ difficulty: 'EASY' }}>
        {typeQues !== 'DRAG DROP' && typeQues !== 'FILL BLANK' && (
          <>
            <h3>Câu hỏi</h3>
            <TextAreaCustom name='question' label='Nội dung câu hỏi' required data={data} />
          </>
        )}
        <Row justify='space-between' gutter={12}>
          <Col span={24} md={skill || skillOptions.length < 2 ? 8 : 6}>
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

          <Col span={24} md={skill || skillOptions.length < 2 ? 8 : 6}>
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
          {skill || skillOptions.length < 2 ? undefined : (
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
                  options={skillOptions}
                  onChange={(e) => setSkillQues(e)}
                  value={skillQues}
                />
              </Form.Item>
            </Col>
          )}
          <Col span={24} md={skill || skillOptions.length < 2 ? 8 : 6}>
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
        {typeQues === 'DRAG DROP' || typeQues === 'FILL BLANK' ? (
          <CreateDnDQuestion questionTextForm={setQuestionText} choose={setChoices} />
        ) : (
          ''
        )}
        {((typeQues === 'SINGLE CHOICE' ||
          typeQues === 'MULTIPLE CHOICE' ||
          typeQues === 'TRUE FALSE' ||
          typeQues === 'SORT') && (
          <TableAddonQues selectionType={typeQues} callBackData={setChoices} data={data?.choices} isClose={!isOpen} />
        )) ||
          (typeQues === 'WRITING' && <TextAreaCustom name='answer' label='Đáp án' data={data} />) ||
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
        <TextAreaCustom name='explanation' label='Giải thích' data={data} />
        <TextAreaCustom name='hint' label='Gợi ý' data={data}></TextAreaCustom>
        {okButton && okButton}
      </Form>
    </LoadingCustom>
  )
}

export default CreateQuestion
