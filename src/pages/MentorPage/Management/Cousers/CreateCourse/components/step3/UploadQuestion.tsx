import { MyPageTableOptions, PageData } from '@/types/page.type'
import { Question } from '@/types/question.type'
import { Button, Col, Popconfirm, Row, Space, Table, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import './UploadQuestion.scss'
import { useNavigate } from 'react-router-dom'

export default function UploadQuestion({ prevStep }: any) {
  const navigate = useNavigate()
  const [examData, setExamData] = useState<PageData<any>>({
    limit: 10,
    page: 1,
    totalDocs: 0,
    docs: [],
  })
  const [questionData, setQuestionData] = useState<PageData<Question>>({
    limit: 10,
    page: 1,
    totalDocs: 0,
    docs: [],
  })

  const questionTableColumns: MyPageTableOptions<Question> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      align: 'center',
      width: '5%',
      render: (id, record, index) => {
        ++index

        return index
      },
      showSorterTooltip: false,
    },
    {
      title: 'Câu hỏi',
      dataIndex: 'type',
      width: '45%',
      render: (_, record) => (
        <p
          dangerouslySetInnerHTML={{
            __html: `${record.question}`,
          }}
        ></p>
      ),
    },
    {
      title: 'Đáp án',
      dataIndex: 'anwLength',
      width: '45%',
      render: (_, record) => {
        let choice = ''
        const inputType = record.type === 'SINGLE CHOICE' ? 'radio' : 'checkbox'

        record.choices?.forEach((c) => {
          if (c.isCorrect) {
            choice = choice.concat(`<Col span={4}><Input type='${inputType}' checked disabled> </Col>`)
          } else {
            choice = choice.concat(`<Col span={4}><Input type='${inputType}' disabled></Col>`)
          }

          choice = choice.concat(' ')
          choice = choice.concat(`<Col span={20}>${c.answer}</Col>`)
          choice = choice.concat('</br>')
        })

        return (
          <p
            dangerouslySetInnerHTML={{
              __html: choice,
            }}
          ></p>
        )
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: '5%',
      render: (_: any, record: Question) => (
        <Space size='middle'>
          <Tooltip title='Chỉnh sửa bài test'>
            <EditOutlined
              className='edit-icon'
              onClick={() => {
                // setQuestionDetail(record)
                // setOpenQuestionDrawer(true)
              }}
            />
          </Tooltip>
          <Tooltip title='Xóa bài test'>
            <Popconfirm
              placement='right'
              title={'Bạn có muốn xóa ?'}
              //   onConfirm={() => deleteQuestion(record._id)}
              okText='Có'
              cancelText='Không'
            >
              <DeleteOutlined className='delete-icon' />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <div>
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
      <Table />
    </div>
  )
}
