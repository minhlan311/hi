/* eslint-disable @typescript-eslint/no-explicit-any */
// import { MyPageTableOptions, PageData } from '@/types/page.type'
// import { Question } from '@/types/question.type'
import { useContext, useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Row, Select, Space, Table, Tag, Tooltip } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import './UploadQuestion.scss'
import { useNavigate } from 'react-router-dom'
import { MyPageTableOptions } from '@/types/page.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import examApi from '@/apis/exam.api'
import { AppContext } from '@/contexts/app.context'
import { Exam } from '@/types/exam.type'
import lessionApi from '@/apis/lession.api'

export default function UploadQuestion({ prevStep }: any) {
  const navigate = useNavigate()
  const [dataLession, setDataLession] = useState([])
  const [form] = Form.useForm()
  // const [id, setId] = useState<string>('')
  const [open, setOpen] = useState(false)
  const { profile } = useContext(AppContext)

  const { data } = useQuery({
    queryKey: ['pickQuestion'],
    queryFn: () =>
      examApi.findExam({
        filterQuery: {
          createdById: profile._id,
        },
        options: {
          limit: 8,
          page: 1,
        },
      }),
  })

  const subjectOptions = dataLession?.map((item: any) => ({
    label: item?.name,
    value: item?._id,
  }))

  const mutate = useMutation({
    mutationFn: (body: any) => lessionApi.updateLession(body),
  })

  console.log(subjectOptions, 'subjectOptions')

  useEffect(() => {
    const storedData = localStorage.getItem('apiData')

    if (storedData) {
      const parsedData = JSON.parse(storedData)
      const allLessons = parsedData.flatMap((item: any) => item.lessons)
      setDataLession(allLessons)
    }
  }, [])

  const tableColumns: MyPageTableOptions<any> = [
    {
      title: 'Bộ câu hỏi',
      dataIndex: 'title',
      key: 'title',
      render: (_: any, record: Exam) => <span>{record?.name}</span>,
    },
    {
      title: 'Giá tiền',
      dataIndex: 'courseName',
      key: 'courseName',
      // render: (_: any, record: Exam) => <span>{record?.cost || 0}</span>,
    },
    {
      title: 'Loại',
      dataIndex: 'courseName',
      key: 'courseName',
      render: (_: any, record: Exam) => {
        if (record?.type === 'TEST') {
          const color = 'geekblue'

          return (
            <Tag color={color} key={record?.type}>
              {'Bài Test'.toUpperCase()}
            </Tag>
          )
        } else {
          const color = '#faad14'

          return (
            <Tag color={color} key={record?.type}>
              {'Bài Quiz'.toUpperCase()}
            </Tag>
          )
        }
      },
    },
    {
      title: 'Tình trạng',
      dataIndex: 'limitStudent',
      key: 'limitStudent',
      render: (_: any, record: Exam) => {
        if (record?.status === 'ACTIVE') {
          const color = 'green'

          return (
            <Tag color={color} key={record?.status}>
              {record?.status.toUpperCase()}
            </Tag>
          )
        } else {
          const color = 'volcano'

          return (
            <Tag color={color} key={record?.status}>
              {record?.status.toUpperCase()}
            </Tag>
          )
        }
      },
    },

    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'x',
      width: '10%',
      align: 'center' as const,
      render: () => (
        <div>
          <Space size='middle'>
            <Tooltip placement='top' title='Thêm bộ câu hỏi vào bài học'>
              <Button type='dashed' className={'dashed'} onClick={showDrawer}>
                <PlusCircleOutlined className='icon-button' />
              </Button>
            </Tooltip>
          </Space>
        </div>
      ),
    },
  ]

  const showDrawer = () => {
    setOpen(true)
    // setId(id)
  }

  // useEffect(() => {
  //   form.setFieldValue('testId', id)
  // }, [id])

  const onClose = () => {
    setOpen(false)
  }

  const onFinish = (value: any) => {
    mutate.mutate(value)

    console.log(value, 'valuevalue')
  }

  return (
    <div>
      <Drawer destroyOnClose size='large' onClose={onClose} open={open} title={'Thêm Bài học mới '}>
        <Form onFinish={onFinish} form={form} layout='vertical'>
          <Form.Item name='id' label={'Chọn bài học bạn muốn thêm'}>
            <Select options={subjectOptions} placeholder='Chọn bài học bạn muốn thêm' />
          </Form.Item>
          <Form.Item name='testId' hidden></Form.Item>
          <Button type='primary' htmlType='submit'>
            Đồng ý
          </Button>
        </Form>
      </Drawer>
      <div className='flex-end'>
        <Row>
          <Col>
            <Button
              type='dashed'
              className='dashed'
              onClick={() => {
                prevStep(1)
              }}
            >
              Quay lại
            </Button>
          </Col>
          <Col>
            <Button
              style={{
                marginLeft: '20px',
                marginBottom: '50px',
              }}
              type='primary'
              onClick={() => {
                navigate('/mentor/courses/')
              }}
            >
              Hoàn thành
            </Button>
          </Col>
        </Row>
      </div>
      <Table dataSource={data?.data?.docs} columns={tableColumns} />
    </div>
  )
}
