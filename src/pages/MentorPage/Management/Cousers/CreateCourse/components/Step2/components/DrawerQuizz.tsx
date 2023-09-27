/* eslint-disable @typescript-eslint/no-explicit-any */

import questionApi from '@/apis/question.api'
import { MyPageTableOptions } from '@/types/page.type'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Col,
  Drawer,
  Form,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Space,
  Table,
  Upload,
  UploadFile,
  message,
} from 'antd'
import { UploadProps } from 'antd/lib'
import { useEffect, useState } from 'react'

export default function DrawerQuizz({ onOpen, onClose, dataUpdateLession }: any) {
  const [form] = Form.useForm()
  const [content, setContent] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [uploadQuestionFile, setUploadQuestionFile] = useState<UploadFile>()
  const [pageData, setPageData] = useState<any>({
    limit: 10,
    page: 1,
    totalDocs: 0,
    docs: [],
  })
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (body: any) => questionApi.importQuestion(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['question'] })
    },
  })
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['question'] })
  }, [dataUpdateLession])

  const { data: dataQuestion } = useQuery({
    queryKey: ['question'],
    queryFn: () =>
      questionApi.findQuestion({
        filterQuery: {
          lessonId: dataUpdateLession?.id,
        },
        options: {
          limit: pageData.limit,
          page: pageData.page,
        },
      }),
    enabled: dataUpdateLession?.id ? true : false,
  })

  console.log(dataQuestion, 'dataUpdateLessiondataUpdateLession')

  const uploadQuestionProps: UploadProps = {
    name: 'attachment',
    multiple: false,
    action: import.meta.env.VITE_FILE_ENDPOINT + '/upload/attachments',
    onChange(info) {
      const { status } = info.file

      if (status === 'done') {
        setUploadQuestionFile(info.file.response[0])
        setModalOpen(!modalOpen)
        message.success(`Tải file ${info.file.name} thành công.`)
      } else if (status === 'error') {
        message.error(`Tải file ${info.file.name} thất bại.`)
      }
    },
  }

  const uploadQuestions = async () => {
    const payload = {
      url: uploadQuestionFile?.url as string,
      lessonId: dataUpdateLession?.id,
    }
    mutation.mutate(payload)
    setModalOpen(false)
  }

  useEffect(() => {
    if (dataUpdateLession) {
      form.setFieldValue('name', dataUpdateLession?.name)
      form.setFieldValue('parentId', dataUpdateLession?.parentId)
      form.setFieldValue('id', dataUpdateLession?.id)
      //   setContent(dataUpdateTopic?.descriptions)
    }
    return
  }, [dataUpdateLession])

  useEffect(() => {
    if (content) form.setFieldValue('descriptions', content)
    return
  }, [content])

  const tableColumns: MyPageTableOptions<any> = [
    {
      title: 'Nội dung',
      key: 'question',
      dataIndex: ['question'],
      width: '35%',
      render: (question) => (
        <div
          dangerouslySetInnerHTML={{
            __html: `${question}`,
          }}
        />
      ),
    },
    {
      title: 'Giải thích',
      key: 'explanation',
      dataIndex: ['explanation'],
      width: '25%',
      render: (explanation) => (
        <div
          dangerouslySetInnerHTML={{
            __html: `${explanation}` ? `${explanation}` : 'Đang cập nhật',
          }}
        />
      ),
    },
    {
      title: 'Gợi ý',
      key: 'hint',
      dataIndex: ['hint'],
      width: '25%',
      render: (hint) => (
        <div
          dangerouslySetInnerHTML={{
            __html: `${hint}`,
          }}
        />
      ),
    },
    {
      title: 'Điểm số',
      key: 'point',
      dataIndex: ['point'],
      width: '8%',
    },
    {
      title: 'Xoá',
      key: '_id',
      width: '5%',
      render: () => (
        <div className='display-center'>
          <Space size='middle'>
            <Popconfirm
              placement='right'
              title={'Xác nhận xoá câu hỏi?'}
              okText='Có'
              cancelText='Không'
              // onConfirm={() => deleteQuestion(record._id)}
            >
              <Button type='dashed' className='dashed'>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        </div>
      ),
    },
  ]

  const onPageChange = (page: number, limit?: number) => {
    setPageData(page)

    if (limit) {
      setPageData(limit)
    }
  }

  console.log(content, 'content')

  const onFinish = (values: any) => {
    mutation.mutate(values)
    form.resetFields()
    setContent('')
    console.log(values, 'values')
  }

  const onFinishFailed = (values: any) => {
    console.log(values, 'values')
  }

  return (
    <>
      <Drawer destroyOnClose width={'1800px'} open={onOpen} onClose={() => onClose(false)} title={'Quản lý câu hỏi'}>
        <Row gutter={64}>
          <Col span={18}>
            <Table
              pagination={{
                current: dataQuestion?.data?.page,
                pageSize: dataQuestion?.data?.limit,
                total: dataQuestion?.data?.totalDocs,
                onChange: onPageChange,
              }}
              rowKey='_id'
              columns={tableColumns}
              dataSource={dataQuestion?.data?.docs}
              expandable={{
                expandedRowRender: (record) =>
                  record.choices.map((_e: any, index: number) => {
                    if (record.choices.length % 2 === 1 && index === record.choices.length - 1) {
                      return (
                        <Row>
                          <Col span={12} key={index}>
                            <Row>
                              <Col span={1}>
                                <Radio disabled checked={record.choices[index].isCorrect}></Radio>
                              </Col>
                              <Col span={20}>{record.choices[index].answer}</Col>
                            </Row>
                          </Col>
                        </Row>
                      )
                    }

                    if (index % 2 === 0) {
                      return (
                        <Row>
                          <Col span={12} key={index}>
                            <Row>
                              <Col span={1}>
                                <Radio disabled checked={record.choices[index].isCorrect}></Radio>
                              </Col>
                              <Col span={20}>{record.choices[index].answer}</Col>
                            </Row>
                          </Col>
                          <Col span={12}>
                            <Row>
                              <Col span={1}>
                                <Radio disabled checked={record.choices[index + 1].isCorrect}></Radio>
                              </Col>
                              <Col span={20}>{record.choices[index + 1].answer}</Col>
                            </Row>
                          </Col>
                        </Row>
                      )
                    }
                  }),
              }}
            />
          </Col>
          <Col span={6}>
            <Form onFinishFailed={onFinishFailed} onFinish={onFinish} layout='vertical' form={form}>
              <Form.Item label='Thêm câu hỏi' name='import'>
                <Upload {...uploadQuestionProps}>
                  <Button icon={<UploadOutlined />}>Tải file câu hỏi</Button>
                </Upload>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Button onClick={() => onClose(false)}>Đóng lại</Button>
      </Drawer>
      <Modal
        onOk={uploadQuestions}
        title={'Xác nhận import câu hỏi'}
        okText={'Xác nhận'}
        cancelText={'Huỷ'}
        onCancel={() => setModalOpen(false)}
        open={modalOpen}
      >
        Bạn có muốn import bộ câu hỏi này không ?
      </Modal>
    </>
  )
}
