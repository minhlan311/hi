import questionApi from '@/apis/question.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import { QuestionState } from '@/interface/question'
import { Choice } from '@/interface/tests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, Col, Drawer, Form, Input, Row, Select, Space, Switch } from 'antd'
import { useEffect, useState } from 'react'
import TableAddonQues from '../Components/TableAddonQues'
import { IoClose } from 'react-icons/io5'
import { stateAction } from '@/common'
import { debounce } from '@/helpers/common'
import useResponsives from '@/hooks/useResponsives'
// import {'ckeditor } from ''ckeditor5-react'
// import ClassicEditor from ''ckeditor5-build-classic'
/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  open: boolean
  questionData?: QuestionState | null
  categoryId: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setQuestionData: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const LinkertScale = ({ callBackChoices }: { callBackChoices: React.Dispatch<React.SetStateAction<any>> }) => {
  const initData = {
    answer: '',
    isCorrect: false,
    isChosen: false,
  }
  const [addRow, setAddRow] = useState<Choice[]>([{ ...initData, _id: Math.floor(Math.random() * 1000000).toString() }])
  const [addCol, setAddCol] = useState<Choice[]>([{ ...initData, _id: Math.floor(Math.random() * 1000000).toString() }])

  const handleAdd = (type: 'row' | 'col') => {
    if (type === 'row') {
      setAddRow([...addRow, { ...initData, _id: Math.floor(Math.random() * 1000000).toString() }])
    } else {
      setAddCol([...addCol, { ...initData, _id: Math.floor(Math.random() * 1000000).toString() }])
    }
  }

  const handleInputChange = (type: 'row' | 'col', id: string, value: string) => {
    const updatedData = (type === 'row' ? addRow : addCol).map((item) => {
      if (item._id === id) {
        return {
          ...item,
          answer: value,
        }
      }

      return item
    })

    if (type === 'row') {
      setAddRow(updatedData)
    } else {
      setAddCol(updatedData)
    }
  }

  useEffect(() => {
    callBackChoices([{ rows: addRow, cols: addCol }])
  }, [addRow, addCol])

  return (
    <div style={{ margin: '20px 0 30px' }}>
      <Row gutter={[12, 12]}>
        <Col span={24} md={12}>
          <Card size='small' title='Hàng'>
            <Space direction='vertical' className='sp100'>
              {addRow.map((item, id) => (
                <Space key={item._id} className='sp100'>
                  <b>{id + 1}</b>
                  <Input
                    placeholder='Nhập nội dung hàng'
                    autoFocus
                    className='sp100'
                    onChange={(e) => debounce(handleInputChange('row', String(item._id), e.target.value), 500)}
                  ></Input>
                  {addRow.length > 1 && (
                    <ButtonCustom
                      icon={<IoClose />}
                      type='text'
                      onClick={() => stateAction(setAddRow, String(item._id), null, 'remove')}
                    ></ButtonCustom>
                  )}
                </Space>
              ))}
              <ButtonCustom size='small' onClick={() => handleAdd('row')}>
                Thêm hàng
              </ButtonCustom>
            </Space>
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card size='small' title='Cột'>
            <Space direction='vertical' className='sp100'>
              {addCol.map((item, id) => (
                <Space key={item._id} className='sp100'>
                  <b>{id + 1}</b>
                  <Input
                    placeholder='Nhập nội dung cột'
                    autoFocus
                    className='sp100'
                    onChange={(e) => debounce(handleInputChange('col', String(item._id), e.target.value), 500)}
                  ></Input>
                  {addCol.length > 1 && (
                    <ButtonCustom
                      icon={<IoClose />}
                      type='text'
                      onClick={() => stateAction(setAddCol, String(item._id), null, 'remove')}
                    ></ButtonCustom>
                  )}
                </Space>
              ))}
              <ButtonCustom size='small' onClick={() => handleAdd('col')}>
                Thêm cột
              </ButtonCustom>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const DrawerQuestion = (props: Props) => {
  const { open, questionData = null, categoryId, setOpen, setQuestionData, setLoading } = props
  const [form] = Form.useForm()
  const [choice, setChoice] = useState<Choice[]>([])
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
      setTypeQues(data.type)
    }
  }, [data])

  const onCloseDrawer = () => {
    setOpen(false)
    setData(null)
    setChoice([])
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
          <h3>Câu hỏi</h3>

          <TextAreaCustom name='question' label='Nội dung câu hỏi' required data={!data ? undefined : data} />

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
          {((typeQues === 'SINGLE CHOICE' ||
            typeQues === 'MULTIPLE CHOICE' ||
            typeQues === 'TRUE FALSE' ||
            typeQues === 'SORT' ||
            typeQues === 'FILL BLANK' ||
            typeQues === 'DRAG DROP' ||
            typeQues === 'MATCHING') && (
            <TableAddonQues selectionType={typeQues} callBackData={setChoice} data={data?.choices} isClose={!open} />
          )) ||
            (typeQues === 'WRITING' && (
              <TextAreaCustom name='answer' label='Đáp án' required data={!data ? undefined : data} />
            )) ||
            (typeQues === 'LIKERT SCALE' && <LinkertScale callBackChoices={setChoice} />) ||
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

          <TextAreaCustom name='explanation' label='Giải thích' data={!data ? undefined : data} />

          <TextAreaCustom name='hint' label='Gợi ý' data={!data ? undefined : data}></TextAreaCustom>
        </Form>
      </Drawer>
    </div>
  )
}

export default DrawerQuestion
