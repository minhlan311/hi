import categoryApi from '@/apis/categories.api'
import examApi from '@/apis/exam.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Card, Col, Row, Space } from 'antd'
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

const MentorExamDetail = () => {
  const location = useLocation()
  const examSlug = location.pathname.split('/')[3]
  const { data: exam } = useQuery({
    queryKey: ['examDetail'],
    queryFn: () => {
      return examApi.getExamDetail(examSlug)
    },
  })
  const examDetail = exam?.data
  const { data, mutate } = useMutation({ mutationFn: (id: string) => categoryApi.getCategorieDetail(id) })

  useEffect(() => {
    if (examDetail) {
      mutate(examDetail.subjectId)
    }
  }, [examDetail])

  const subjectDetail = data?.data

  const labelData = [
    { icon: <BsQuestionLg />, iconColor: '#367b97', title: 'Số câu hỏi', data: examDetail?.countQuestions },
    {
      icon: <RiCheckboxMultipleLine />,
      iconColor: '#ced144',
      title: 'Số câu trắc nghiệm',
      data: examDetail?.countQuestions,
    },
    { icon: <TfiWrite />, iconColor: '#676767', title: 'Số câu tự luận', data: examDetail?.countQuestions },
    { icon: <BiUser />, iconColor: '#1ac6ef', title: 'Số người làm', data: examDetail?.tested },
    { icon: <CgCheckO />, iconColor: '#21c121', title: 'Số hoàn thành', data: examDetail?.countQuestions },
    {
      icon: <CgCloseO />,
      iconColor: '#e73434',
      title: 'Số chưa hoàn thành',
      data: examDetail?.countQuestions,
    },
  ]

  if (examDetail && subjectDetail)
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
      </Space>
    )
}

export default MentorExamDetail
