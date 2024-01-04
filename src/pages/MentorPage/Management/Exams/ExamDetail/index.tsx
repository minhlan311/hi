import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import categoryApi from '@/apis/categories.api'
import css from './styles.module.scss'
import examApi from '@/apis/exam.api'
import LoadingCustom from '@/components/LoadingCustom'
import MentorCreateTest from '../MentorCreateTest'
import moment from 'moment-timezone'
import PageResult from '@/components/PageResult'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import TagCustom from '@/components/TagCustom/TagCustom'
import userApi from '@/apis/user.api'
import { BiUser } from 'react-icons/bi'
import { BsQuestionLg } from 'react-icons/bs'
import { Card, Col, Row, Space, Table } from 'antd'
import { CgCheckO, CgCloseO } from 'react-icons/cg'
import { Link, useLocation } from 'react-router-dom'
import { RiCheckboxMultipleLine } from 'react-icons/ri'
import { TfiWrite } from 'react-icons/tfi'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnsType } from 'antd/es/table'
interface DataType {
  _id: string
  userId: string
  totalCorrectAnswer: number
  point: number
  time: number
  inCorrectAnswer: any[]
  submitDate: string
}

const MentorExamDetail = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[3]
  const {
    data: exam,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['examDetail', id],
    queryFn: () => {
      return examApi.getExamDetail(id)
    },
    enabled: id.length > 20,
  })

  const examDetail = exam?.data

  const { data: data } = useQuery({
    queryKey: ['categoryDetail', examDetail],
    queryFn: () => {
      return categoryApi.getCategorieDetail(examDetail?.categoryId as unknown as string)
    },
    enabled: isSuccess,
  })

  const subjectDetail = data?.data

  const [tabs, setTabs] = useState<'absent' | 'attended' | string>('attended')
  const [userList, setUserList] = useState<string[]>([])

  useEffect(() => {
    if (tabs === 'attended' && examDetail && examDetail.usersDoned.length === 0) setUserList([])
    if (tabs === 'absent' && examDetail && examDetail.usersIncompleted.length === 0) setUserList([])

    if (tabs === 'attended' && examDetail && examDetail.usersDoned.length > 0) {
      setUserList(examDetail?.usersDoned.map((item) => item.userId))
    }

    if (tabs === 'absent' && examDetail && examDetail.usersIncompleted.length > 0) {
      setUserList(examDetail?.usersDoned.map((item) => item.userId))
    }
  }, [tabs, examDetail])

  const { data: userListData } = useQuery({
    queryKey: ['userListData', userList],
    queryFn: () => {
      return userApi.findUser({ filterQuery: { _id: userList } })
    },
    enabled: userList.length > 0,
  })

  // Đổi sang màn tạo
  if (id === 'createTest' || id === 'updateTest') return <MentorCreateTest />

  const labelData = [
    {
      icon: <BsQuestionLg />,
      iconColor: '#367b97',
      title: 'Số câu hỏi',
      data: examDetail?.type === 'TEST' ? examDetail?.countQuestionsBySkill : examDetail?.countQuestions,
    },
    {
      icon: <RiCheckboxMultipleLine />,
      iconColor: '#ced144',
      title: 'Số câu trắc nghiệm',
      data: Array.isArray(examDetail?.countSelectedResponseQuestions)
        ? examDetail?.countSelectedResponseQuestions?.filter((num) => num === 1).length
        : examDetail?.countSelectedResponseQuestions,
    },
    {
      icon: <TfiWrite style={{ fontSize: 24 }} />,
      iconColor: '#676767',
      title: 'Số câu tự luận',
      data: Array.isArray(examDetail?.countConstructedResponseQuestions)
        ? examDetail?.countConstructedResponseQuestions?.filter((num) => num === 1).length
        : examDetail?.countConstructedResponseQuestions,
    },
    { icon: <BiUser />, iconColor: '#1ac6ef', title: 'Số người làm', data: examDetail?.countUsersTested },
    { icon: <CgCheckO />, iconColor: '#21c121', title: 'Số hoàn thành', data: examDetail?.usersDoned.length },
    {
      icon: <CgCloseO />,
      iconColor: '#e73434',
      title: 'Số chưa hoàn thành',
      data: examDetail?.usersIncompleted.length,
    },
  ]

  const attendedColumn: ColumnsType<DataType> = [
    {
      title: 'Tên người làm',
      key: 'name',
      render: (_a: any, record) =>
        userListData && userListData?.data?.docs?.find((us) => us._id === record.userId)?.fullName,
    },
    {
      title: 'Qua / Không qua',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text) => {
        return text === 'PASS' ? (
          <TagCustom color='success' content='Qua' />
        ) : (
          <TagCustom color='error' content='Không qua' />
        )
      },
    },
    {
      title: 'Điểm số',
      key: 'score',
      align: 'center',

      render: (_a: any, record) => {
        if (examDetail)
          return (
            <p>
              {record.totalCorrectAnswer}/{examDetail?.countQuestions} -{' '}
              <b>{((record.totalCorrectAnswer / examDetail?.countQuestions) * 10).toFixed(1)}</b> Điểm (
              {((record.totalCorrectAnswer / examDetail?.countQuestions) * 100).toFixed(1)}
              %)
            </p>
          )
      },
      sorter: (a, b) => {
        const as = examDetail ? (a.totalCorrectAnswer / examDetail.countQuestions) * 10 : 0
        const bs = examDetail ? (b.totalCorrectAnswer / examDetail.countQuestions) * 10 : 1

        return as - bs
      },
      ellipsis: true,
    },
    {
      title: 'Xếp loại',
      dataIndex: 'point',
      key: 'scoreRating',
      align: 'center',
      render: (point) => {
        return (
          (point <= 3 && <TagCustom color='error' content='Yếu' />) ||
          (point <= 5 && <TagCustom color='processing' content='Trung bình' />) ||
          (point <= 8 && <TagCustom color='success' content='Tốt' />) ||
          (point > 8 && <TagCustom color='gold' content='Xuất sắc' />)
        )
      },
    },
    {
      title: 'Thời gian làm',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (time) => {
        const durations = time
        const minutes = Math.floor(durations)
        const seconds = Math.round((durations - minutes) * 60)
        const formattedTime = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`

        return formattedTime
      },

      sorter: (a, b) => {
        return a.time - b.time
      },
      ellipsis: true,
    },
    {
      title: 'Thời gian nộp',
      key: 'submitDate ',
      dataIndex: 'submitDate',
      align: 'center',

      render: (submitDate) => moment(submitDate).format('HH:mm DD/MM/YYYY'),
    },
    {
      title: 'Chi tiết',
      key: 'detail',
      align: 'center',

      render: () => (
        <Link to={'/'} className={'link'}>
          Xem chi tiết
        </Link>
      ),
    },
  ]

  const absentColumn: ColumnsType<DataType> = [
    {
      title: 'Tên người làm',
      key: 'name',
      render: (_a: any, record) =>
        userListData && userListData?.data?.docs?.find((us) => us._id === record.userId)?.fullName,
    },
    {
      title: 'Số câu đã làm',
      key: 'done',
      align: 'center',

      render: (_a: any, record) => {
        return record.totalCorrectAnswer + record.inCorrectAnswer.length
      },
      sorter: (a, b) => {
        const as = a.totalCorrectAnswer + a.inCorrectAnswer.length
        const bs = b.totalCorrectAnswer + b.inCorrectAnswer.length

        return as - bs
      },
      ellipsis: true,
    },
    {
      title: 'Số câu chưa làm',
      key: 'doNot',
      align: 'center',

      render: (_a: any, record) => {
        if (examDetail) return examDetail?.countQuestions - (record.totalCorrectAnswer + record.inCorrectAnswer.length)
      },
      sorter: (a, b) => {
        const as = examDetail ? examDetail?.countQuestions - (a.totalCorrectAnswer + a.inCorrectAnswer.length) : 0
        const bs = examDetail ? examDetail?.countQuestions - (b.totalCorrectAnswer + b.inCorrectAnswer.length) : 1

        return as - bs
      },
      ellipsis: true,
    },
    {
      title: 'Điểm số',
      key: 'score',
      align: 'center',

      render: (_a: any, record) => {
        if (examDetail)
          return (
            <p>
              {record.totalCorrectAnswer}/{examDetail?.countQuestions} - {record.point} Điểm (
              {(record.point / examDetail?.countQuestions) * 100}
              %)
            </p>
          )
      },
      sorter: (a, b) => {
        const as = examDetail ? (a.totalCorrectAnswer / examDetail.countQuestions) * 10 : 0
        const bs = examDetail ? (b.totalCorrectAnswer / examDetail.countQuestions) * 10 : 1

        return as - bs
      },
      ellipsis: true,
    },
    {
      title: 'Xếp loại',
      key: 'scoreRating',
      align: 'center',

      render: (point) => {
        return (
          (point <= 3 && <TagCustom color='error' content='Yếu' />) ||
          (point <= 5 && <TagCustom color='processing' content='Trung bình' />) ||
          (point <= 8 && <TagCustom color='success' content='Tốt' />) ||
          (point > 8 && <TagCustom color='gold' content='Xuất sắc' />)
        )
      },
    },

    {
      title: 'Thời gian nộp',
      key: 'submitDate ',
      align: 'center',

      dataIndex: 'submitDate',
      render: (submitDate) => moment(submitDate).format('HH:mm DD/MM/YYYY'),
    },
    {
      title: 'Chi tiết',
      key: 'detail',
      align: 'center',

      render: () => (
        <Link to={'/'} className={'link'}>
          Xem chi tiết
        </Link>
      ),
    },
  ]

  const testData = [
    {
      id: 'attended',
      name: 'Đã hoàn thành',
      children: (
        <Table
          columns={attendedColumn}
          dataSource={examDetail && examDetail.usersDoned}
          scroll={{
            x: 1024,
          }}
          pagination={{ pageSize: 5 }}
        />
      ),
    },
    {
      id: 'absent',
      name: 'Chưa hoàn thành',
      children: (
        <Table
          columns={absentColumn}
          dataSource={examDetail && examDetail.usersIncompleted}
          scroll={{
            x: 1024,
          }}
        />
      ),
    },
  ]

  if (isLoading) {
    return <LoadingCustom tip='Vui lòng chờ' style={{ marginTop: 150 }} />
  }

  if (!examDetail) {
    return (
      <PageResult
        desc='Bộ đề không tồn tại hoặc đã bị xóa'
        extra={
          <ButtonCustom type='primary' href='/mentor/exams/'>
            Trở về danh sách đề thi
          </ButtonCustom>
        }
      />
    )
  }

  const labelDataArr =
    examDetail?.type === 'TEST'
      ? labelData.filter((i) => i.title !== 'Số câu trắc nghiệm' && i.title !== 'Số câu tự luận')
      : labelData

  if (!isLoading && examDetail && subjectDetail)
    return (
      <Space direction='vertical' size='large' className={css.exMain}>
        <Row justify='space-between'>
          <Col span={24} md={18}>
            <Space direction='vertical' className={'sp100'}>
              <p className={css.exTitle}>
                Bộ đề: <b>{examDetail.name}</b>
              </p>
              <p className={css.subject}>
                Môn học: <b>{subjectDetail.name}</b>
              </p>
              <p className={css.subject}>
                Kỹ năng:{' '}
                <TagCustom
                  intColor={['#7555F2', '#F5C046', '#ee723f', '#44c4ab']}
                  intArrType={['READING', 'LISTENING', 'WRITING', 'SPEAKING']}
                  intAlternativeType={['Đọc', 'Nghe', 'Viết', 'Nói']}
                  content={examDetail.skillName}
                ></TagCustom>
              </p>
            </Space>
          </Col>

          <Space direction='vertical' className={css.infor}>
            <p className={css.timeCreated}>{moment(examDetail.createdAt).format('DD-MM-YYYY / HH:mm A')}</p>
            {examDetail.type === 'QUIZ' && (
              <Link to='questions'>
                <ButtonCustom type='primary'>Danh sách câu hỏi</ButtonCustom>
              </Link>
            )}
          </Space>
        </Row>
        <Row justify='space-between' gutter={[24, 24]}>
          {labelDataArr.map((item, id) => (
            <Col span={24} md={12} lg={8} key={id}>
              <Card className={css.cardItem} size='small'>
                <Space className={'sp100'} size='large'>
                  <div className={css.icon} style={{ color: item.iconColor, background: `${item.iconColor}4f` }}>
                    {item.icon}
                  </div>
                  <Space direction='vertical' className={css.label}>
                    <div className={css.title}>{item.title}</div>
                    <div className={css.data}>{item.data}</div>
                  </Space>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
        <TabsCustom data={testData} onChange={(e) => setTabs(e)} />
      </Space>
    )
}

export default MentorExamDetail
