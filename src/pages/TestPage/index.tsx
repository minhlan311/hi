import eventApi from '@/apis/event.api'
import examApi from '@/apis/exam.api'
import testBg from '@/assets/images/examimg/online-test.png'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import LoadingCustom from '@/components/LoadingCustom'
import PageResult from '@/components/PageResult'
import Header from '@/components/layout/Header/Header'
import { useQuery } from '@tanstack/react-query'
import { Col, Descriptions, Row, Space } from 'antd'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const TestPage = () => {
  const location = useLocation()

  const { data: testData, isLoading } = useQuery({
    queryKey: ['examData', location],
    queryFn: () => {
      return examApi.getExamDetail(location.state.testId)
    },
  })

  const { data: eventData } = useQuery({
    queryKey: ['eventData', testData],
    queryFn: () => {
      return eventApi.getEvent({ filterQuery: { testId: location.state.testId } })
    },
  })

  useEffect(() => {
    if (testData?.data)
      window.onbeforeunload = (e) => {
        e.returnValue =
          'Bạn đang làm bài kiểm tra. Bạn có chắc chắn muốn rời khỏi trang này? Mọi thay đổi chưa được lưu sẽ bị mất.'
      }

    return () => {
      window.onbeforeunload = null
    }
  }, [testData])
  const event = eventData?.data?.docs

  const data = testData?.data

  if (isLoading) return <LoadingCustom style={{ height: '50vh' }} tip='Vui lòng chờ...' />
  if (data)
    return (
      <Header padding={'50px 0'}>
        <Row justify='space-between' align='middle'>
          <Col span={24} md={12}>
            <img src={testBg} alt='testBg' width={'100%'} />
          </Col>
          <Col span={24} md={8}>
            <Space direction='vertical' size='large'>
              <h1>{event?.[0].name}</h1>
              <div>
                <Descriptions size='small'>
                  <Descriptions.Item label='Số câu hỏi'>
                    <b>{data.countQuestions}</b>
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions column={2}>
                  <Descriptions.Item label='Thời gian làm bài'>
                    <b>{location.state.testTime}</b>
                  </Descriptions.Item>
                  <Descriptions.Item label='Thời gian cộng thêm'>
                    <b>{location.state.addTime} phút</b>
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions size='small'>
                  <Descriptions.Item label='Chú thích'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          event?.[0].description && event?.[0].description !== '<p></p>'
                            ? event?.[0].description
                            : 'Không có chú thích.',
                      }}
                    ></div>
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <ButtonCustom size='large' type='primary'>
                Bắt đầu thi
              </ButtonCustom>
            </Space>
          </Col>
        </Row>
      </Header>
    )
  else return <PageResult code={404} desc='Không có bài thi nào' />
}

export default TestPage
