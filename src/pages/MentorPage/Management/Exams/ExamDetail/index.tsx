import categoryApi from '@/apis/categories.api'
import examApi from '@/apis/exam.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Card, Col, Row, Space, Table } from 'antd'
import moment from 'moment-timezone'
import { useEffect } from 'react'
import { BiUser } from 'react-icons/bi'
import { BsQuestionLg } from 'react-icons/bs'
import { CgCheckO, CgCloseO } from 'react-icons/cg'
import { RiCheckboxMultipleLine } from 'react-icons/ri'
import { TfiWrite } from 'react-icons/tfi'
import { Link, useLocation } from 'react-router-dom'
import css from './styles.module.scss'
import TagCustom from '@/components/TagCustom/TagCustom'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import type { ColumnsType } from 'antd/es/table'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import PageResult from '@/components/PageResult'
import LoadingCustom from '@/components/LoadingCustom'
interface DataType {
  _id: string
  name: string
  score: number
  time: number
  done: number
  finishedTime: string
}

const MentorExamDetail = () => {
  const location = useLocation()
  const examSlug = location.pathname.split('/')[3]
  const { data: exam, isLoading } = useQuery({
    queryKey: ['examDetail'],
    queryFn: () => {
      return examApi.getExamDetail(examSlug)
    },
  })

  const examDetail = exam?.data
  const { data, mutate } = useMutation({ mutationFn: (id: string) => categoryApi.getCategorieDetail(id) })

  useEffect(() => {
    if (examDetail) {
      mutate(examDetail.categoryId)
    }
  }, [examDetail])

  const subjectDetail = data?.data

  const labelData = [
    { icon: <BsQuestionLg />, iconColor: '#367b97', title: 'Số câu hỏi', data: examDetail?.countQuestions },
    {
      icon: <RiCheckboxMultipleLine />,
      iconColor: '#ced144',
      title: 'Số câu trắc nghiệm',
      data: examDetail?.countSelectedResponseQuestions,
    },
    {
      icon: <TfiWrite style={{ fontSize: 24 }} />,
      iconColor: '#676767',
      title: 'Số câu tự luận',
      data: examDetail?.countConstructedResponseQuestions,
    },
    { icon: <BiUser />, iconColor: '#1ac6ef', title: 'Số người làm', data: examDetail?.countUsersTested },
    { icon: <CgCheckO />, iconColor: '#21c121', title: 'Số hoàn thành', data: examDetail?.countUsersDoned },
    {
      icon: <CgCloseO />,
      iconColor: '#e73434',
      title: 'Số chưa hoàn thành',
      data: examDetail?.countUsersIncompleted,
    },
  ]

  const attendedColumn: ColumnsType<DataType> = [
    {
      title: 'Tên người làm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Qua / Không qua',
      key: 'status',
      render: (_, { score }) => {
        return (
          (score <= 5 && <TagCustom color='error' content='Không qua' />) ||
          (score > 5 && <TagCustom color='success' content='Qua' />)
        )
      },
    },
    {
      title: 'Điểm số',
      dataIndex: 'score',
      key: 'score',
      render: (_, record) => {
        return (
          <p>
            {record.done}/50 - {record.score} Điểm ({(record.done / 50) * 100}%)
          </p>
        )
      },
    },
    {
      title: 'Xếp loại',
      key: 'scoreRating',
      render: (_, { score }) => {
        return (
          (score <= 3 && <TagCustom color='error' content='Yếu' />) ||
          (score <= 5 && <TagCustom color='processing' content='Trung bình' />) ||
          (score <= 8 && <TagCustom color='success' content='Tốt' />) ||
          (score > 8 && <TagCustom color='gold' content='Xuất sắc' />)
        )
      },
    },
    {
      title: 'Thời gian làm',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Thời gian nộp',
      key: 'finishedTime ',
      dataIndex: 'finishedTime',
    },
    {
      title: 'Chi tiết',
      key: 'detail',
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
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Số câu đã làm',
      dataIndex: 'done',
      key: 'done',
    },
    {
      title: 'Số câu chưa làm',
      dataIndex: 'doNot',
      key: 'doNot',
    },
    {
      title: 'Điểm số',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Xếp loại',
      key: 'scoreRating',
      render: (_, { score }) => {
        return (
          (score <= 3 && <TagCustom color='error' content='Yếu' />) ||
          (score <= 5 && <TagCustom color='processing' content='Trung bình' />) ||
          (score <= 8 && <TagCustom color='success' content='Tốt' />) ||
          (score > 8 && <TagCustom color='gold' content='Xuất sắc' />)
        )
      },
    },
    {
      title: 'Thời gian làm',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Thời gian nộp',
      key: 'finishedTime ',
      dataIndex: 'finishedTime',
    },
    {
      title: 'Chi tiết',
      key: 'detail',
      render: () => (
        <Link to={'/'} className={'link'}>
          Xem chi tiết
        </Link>
      ),
    },
  ]

  const students: DataType[] = [
    {
      _id: '1',
      name: 'John Brown',
      score: 2,
      time: 35,
      done: 10,
      finishedTime: '2023-09-22 09:45 AM',
    },
    {
      _id: '2',
      name: 'Jim Green',
      score: 8,
      time: 29,
      done: 49,
      finishedTime: '2023-09-22 09:38 AM',
    },
    {
      _id: '3',
      name: 'Joe Black',
      score: 6,
      time: 35,
      done: 35,
      finishedTime: '2023-09-22 09:45 AM',
    },
  ]

  const testData = [
    {
      id: 'attended',
      name: 'Đã hoàn thành',
      children: <Table columns={attendedColumn} dataSource={students} />,
    },
    {
      id: 'absent',
      name: 'Chưa hoàn thành',
      children: <Table columns={absentColumn} dataSource={students} />,
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

  if (!isLoading && examDetail && subjectDetail)
    return (
      <Space direction='vertical' size='large' className={css.exMain}>
        <Row justify='space-between'>
          <Col span={24} md={18}>
            <Space direction='vertical'>
              <p className={css.exTitle}>Bộ đề: {examDetail.name}</p>
              <p>
                Môn học: <b>{subjectDetail.name}</b>
              </p>
              <Space>
                Giá:
                {examDetail.cost ? (
                  <Space>
                    <PriceCalculator price={examDetail.cost} />
                  </Space>
                ) : (
                  <TagCustom content='Miễn phí' color='success' />
                )}
              </Space>
            </Space>
          </Col>

          <Space direction='vertical' className={css.infor}>
            <p className={css.timeCreated}>{moment(examDetail.createdAt).format('DD-MM-YYYY / HH:mm A')}</p>
            <Link to='questions'>
              <ButtonCustom type='primary'>Danh sách câu hỏi</ButtonCustom>
            </Link>
          </Space>
        </Row>
        <Row justify='space-between' gutter={[24, 24]}>
          {labelData.map((item, id) => (
            <Col span={24} md={8} key={id}>
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
        <TabsCustom data={testData} />
      </Space>
    )
}

export default MentorExamDetail
