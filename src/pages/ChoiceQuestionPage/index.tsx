/* eslint-disable @typescript-eslint/no-explicit-any */
import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import FilterAction from '@/components/FilterAction'
import LoadingCustom from '@/components/LoadingCustom'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import Header from '@/components/layout/Header/Header'
import { ExamState, SkillType } from '@/interface/exam'
import { Card, Col, Flex, Row, Space, Tooltip } from 'antd'
import { useState } from 'react'
import { TbPencilQuestion, TbUserEdit } from 'react-icons/tb'
import listeningBaner from '../../assets/images/banner/listening_banner.png'
import multySkillBanner from '../../assets/images/banner/multi_skill_banner.jpg'
import quizBanner from '../../assets/images/banner/quiz_banner.jpg'
import readingBanner from '../../assets/images/banner/reading_banner.png'
import speakingBanner from '../../assets/images/banner/speaking_banner.png'
import writingBanner from '../../assets/images/banner/writing_banner.png'
import css from './styles.module.scss'
import TagCustom from '@/components/TagCustom/TagCustom'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useResponsives from '@/hooks/useResponsives'
import PaginationCustom from '@/components/PaginationCustom'

const { Meta } = Card

const ChoiceQuestionPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [skillChange, setSkillChange] = useState<SkillType>()
  const [examData, setExamData] = useState<{
    docs: ExamState[]
    totalDocs: number
    page: number
    limit: number
  } | null>(null)
  const [isLoad, setIsLoad] = useState<boolean>(true)
  const categoryList = queryClient.getQueryData<{ data: { docs: any[] } }>(['categoriesList'])

  const [pageSize, setCurrent] = useState<number>(1)

  const courses = categoryList?.data?.docs?.find((item) => item.name === 'Khóa học')
  const { xl, xxl } = useResponsives()

  return (
    <Header title='Trắc nghiệm' padding={'25px 0 50px'}>
      {!skillChange && !examData && (
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card
              hoverable
              cover={
                <div className={`${css.imgQuiz} ${css.allskill}`}>
                  <img src={multySkillBanner} alt='multySkillBanner' />
                </div>
              }
              style={{ overflow: 'hidden' }}
              onClick={() => setSkillChange('ALL')}
            >
              <Meta
                title='MULTI SKILL'
                description='Tổng hợp các bài trắc nghiệm theo dạng kỹ năng Đọc, Nghe, Viết, Nói...'
              />
            </Card>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Card
              hoverable
              cover={
                <div className={`${css.imgQuiz} ${css.skill}`}>
                  <img src={readingBanner} alt='multySkillBanner' />
                </div>
              }
              onClick={() => setSkillChange('READING')}
            >
              <Meta title='Đọc' description='Làm bài trắc ngiệm ngay' />
            </Card>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Card
              hoverable
              cover={
                <div className={`${css.imgQuiz} ${css.skill}`}>
                  <img src={listeningBaner} alt='multySkillBanner' />
                </div>
              }
              onClick={() => setSkillChange('LISTENING')}
            >
              <Meta title='Nghe' description='Làm bài trắc ngiệm ngay' />
            </Card>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Card
              hoverable
              cover={
                <div className={`${css.imgQuiz} ${css.skill}`}>
                  <img src={writingBanner} alt='multySkillBanner' />
                </div>
              }
              onClick={() => setSkillChange('WRITING')}
            >
              <Meta title='Viết' description='Làm bài trắc ngiệm ngay' />
            </Card>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Card
              hoverable
              cover={
                <div className={`${css.imgQuiz} ${css.skill}`}>
                  <img src={speakingBanner} alt='multySkillBanner' />
                </div>
              }
              onClick={() => setSkillChange('SPEAKING')}
            >
              <Meta title='Nói' description='Làm bài trắc ngiệm ngay' />
            </Card>
          </Col>
        </Row>
      )}
      {skillChange && (
        <Space direction='vertical' className={'sp100'}>
          <FilterAction
            apiFind={examApi.findExam}
            type='test'
            keyFilter='examFind'
            filterQuery={{ type: 'QUIZ' }}
            callBackData={setExamData}
            setLoading={setIsLoad}
            page={pageSize}
            limit={((xxl || xl) && 8) || 6}
            sort={{ createdAt: -1 }}
            initFilter={{ skillName: skillChange }}
          ></FilterAction>
          <LoadingCustom loading={isLoad} tip='Vui lòng chờ...'>
            {examData?.totalDocs === 0 ? (
              <EmptyCustom description='Không có bài trắc nghiệm nào'></EmptyCustom>
            ) : (
              <Row gutter={[24, 24]}>
                {examData?.docs.map((item) => (
                  <Col span={24} md={8} xl={6} key={item._id}>
                    <Card
                      hoverable
                      cover={
                        <div className={`${css.quizBanner}`}>
                          <img
                            src={
                              item?.coverUrl ? `${import.meta.env.VITE_FILE_ENDPOINT}/${item?.coverUrl}` : quizBanner
                            }
                            alt={item.name}
                            height={250}
                          ></img>
                        </div>
                      }
                      size='small'
                    >
                      <Space direction='vertical' className={'sp100'}>
                        <Meta title={item.name}></Meta>
                        <Space size='large'>
                          <Space align='center'>
                            <img
                              src={`${import.meta.env.VITE_FILE_ENDPOINT}/${courses?.children?.find(
                                (sj: any) => sj._id === item.categoryId,
                              )?.icon}`}
                              width='30'
                            ></img>
                            {courses?.children?.find((sj: any) => sj._id === item.categoryId)?.name}
                          </Space>

                          <Tooltip title='Số câu hỏi'>
                            <Space>
                              <TbPencilQuestion />
                              <b>{item.countQuestions}</b>
                            </Space>
                          </Tooltip>
                          <Tooltip title='Số người đã làm'>
                            <Space>
                              <TbUserEdit />
                              <b>{item.countUsersTested}</b>
                            </Space>
                          </Tooltip>
                        </Space>

                        <Space>
                          <TagCustom
                            intArrType={['READING', 'LISTENING', 'WRITING', 'SPEAKING']}
                            intAlternativeType={['Đọc', 'Nghe', 'Viết', 'Nói']}
                            intColor={['green', 'blue', 'gray', 'orange']}
                            content={item.skillName}
                          ></TagCustom>
                        </Space>
                        <Flex justify='space-between' align='center'>
                          <PriceCalculator price={item.cost}></PriceCalculator>
                          <ButtonCustom
                            type='primary'
                            onClick={() => {
                              if (item.cost > 0) console.log('Mua')
                              else
                                navigate('/lam-bai-thi-online', {
                                  state: {
                                    testId: item._id,

                                    testTime: 300,
                                    addTime: 0,
                                  },
                                })
                            }}
                          >
                            {item.cost > 0 ? 'Mua ngay' : ' Làm thử ngay'}
                          </ButtonCustom>
                        </Flex>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </LoadingCustom>
          <PaginationCustom callbackCurrent={setCurrent} totalData={examData?.totalDocs} limit={examData?.limit} />
        </Space>
      )}
    </Header>
  )
}

export default ChoiceQuestionPage
