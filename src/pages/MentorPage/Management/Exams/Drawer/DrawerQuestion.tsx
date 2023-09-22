/* eslint-disable @typescript-eslint/no-explicit-any */
import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { useMutation } from '@tanstack/react-query'
import { Checkbox, Drawer, Form, Input, Select, Space, Switch } from 'antd'
import { useEffect, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { BsPlus } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  resetData?: () => void
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  questionData?: any
}

const DrawerQuestion = (props: Props) => {
  const { open, setOpen, resetData, setLoading, questionData } = props
  const [action, setAction] = useState('create')
  const [form] = Form.useForm()

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
  }

  // const { data: categoriesData } = useQuery({
  //   queryKey: ['categoriesList'],
  //   queryFn: () => {
  //     return categoryApi.getCategories({
  //       parentId: '64ffde9c746fe5413cf8d1af',
  //     })
  //   },
  // })

  const { isLoading, status, mutate, error } = useMutation(
    action === 'create'
      ? { mutationFn: (body) => examApi.createExam(body) }
      : { mutationFn: (body) => examApi.putExam(body) },
  )

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
      cost: parseInt(values?.cost),
      id: questionData?._id,
    }
    mutate(payload)
  }

  const [typeQues, setTypeQues] = useState()

  return (
    <div>
      <Drawer
        title={action === 'create' ? 'Thêm câu hỏi' : 'Chỉnh sửa câu hỏi'}
        width={'50%'}
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
        <Form onFinish={onFinish} layout='vertical' form={form}>
          <Form.Item
            name='question'
            label='Câu hỏi'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập câu hỏi',
              },
            ]}
          >
            <Input placeholder='Nhập câu hỏi' />
          </Form.Item>

          <Space>
            <Form.Item
              name='score'
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
                    label: 'SINGLE CHOICE',
                  },
                  {
                    value: 'MULTIPLE CHOICE',
                    label: 'MULTIPLE CHOICE',
                  },
                  {
                    value: 'TRUE FALSE',
                    label: 'TRUE FALSE',
                  },
                  {
                    value: 'SORT',
                    label: 'SORT',
                  },
                  {
                    value: 'DRAG DROP',
                    label: 'DRAG DROP',
                  },
                  {
                    value: 'LIKERT SCALE',
                    label: 'LIKERT SCALE',
                  },
                  {
                    value: 'FILL BLANK',
                    label: 'FILL BLANK',
                  },
                  {
                    value: 'MATCHING',
                    label: 'MATCHING',
                  },
                  {
                    value: 'NUMERICAL',
                    label: 'NUMERICAL',
                  },
                  {
                    value: 'WRITING',
                    label: 'WRITING',
                  },
                ]}
                onChange={(e) => setTypeQues(e)}
                value={typeQues}
              />
            </Form.Item>

            {questionData && (
              <Form.Item name='status' label='Trạng thái'>
                <Switch defaultChecked />
              </Form.Item>
            )}
          </Space>
          {((typeQues === 'SINGLE CHOICE' || typeQues === 'MULTIPLE CHOICE' || typeQues === 'TRUE FALSE') && (
            <Form.List name='choices'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} align='center'>
                      <Form.Item
                        {...restField}
                        name={[name, 'answer']}
                        label='Câu trả lời'
                        rules={[{ required: true, message: 'Vui lòng nhập câu trả lời' }]}
                      >
                        <Input placeholder='Nhập câu trả lời' />
                      </Form.Item>
                      <Form.Item {...restField} label='Hình ảnh'>
                        <UploadCustom
                          name={`${[name, 'coverUrl']}`}
                          showUploadList
                          callBackFileList={(e) => console.log(e)}
                        >
                          <ButtonCustom icon={<BiImageAdd />}>Thêm hình ảnh</ButtonCustom>
                        </UploadCustom>
                      </Form.Item>

                      <Form.Item {...restField} name={[name, 'isCorrect']} valuePropName='checked' label='Đáp án đúng'>
                        <Checkbox />
                      </Form.Item>

                      <ButtonCustom
                        type='text'
                        onClick={() => remove(name)}
                        icon={<MdDeleteOutline className='ic' style={{ color: 'var(--red)' }} />}
                      ></ButtonCustom>
                    </Space>
                  ))}

                  <ButtonCustom className='sp100' type='dashed' onClick={() => add()} icon={<BsPlus />}>
                    Thêm câu trả lời
                  </ButtonCustom>
                </>
              )}
            </Form.List>
          )) || <></>}
          <Form.Item name='hint' label='Giải thích'>
            <Input.TextArea placeholder='Nhập giải thích'></Input.TextArea>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default DrawerQuestion
