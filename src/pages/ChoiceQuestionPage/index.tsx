/* eslint-disable @typescript-eslint/no-explicit-any */
import examApi from '@/apis/exam.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import FilterAction from '@/components/FilterAction'
import LoadingCustom from '@/components/LoadingCustom'
import PaginationCustom from '@/components/PaginationCustom'
import TagCustom from '@/components/TagCustom/TagCustom'
import Header from '@/components/layout/Header/Header'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { ExamState, SkillType } from '@/interface/exam'
import { useQueryClient } from '@tanstack/react-query'
import { Card, Col, Flex, Row, Space } from 'antd'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import listeningBaner from '../../assets/images/banner/listening_banner.png'
import multySkillBanner from '../../assets/images/banner/multi_skill_banner.jpg'
import readingBanner from '../../assets/images/banner/reading_banner.png'
import speakingBanner from '../../assets/images/banner/speaking_banner.png'
import writingBanner from '../../assets/images/banner/writing_banner.png'
import css from './styles.module.scss'

const { Meta } = Card

const RenderItem = ({ item, courses, initType }: { item: ExamState; courses: any; initType: 'TEST' | 'QUIZ' }) => {
  const navigate = useNavigate()
  const { profile, isAuthenticated } = useContext(AppContext)
  const filteredData = item?.usersDoned?.filter((i) => i.userId === profile?._id)

  const maxPoint = Math.max(...filteredData.map((i) => i.point))

  const elementWithMaxPoint = item?.usersDoned ? undefined : filteredData?.find((i) => i.point === maxPoint)

  const { sm } = useResponsives()

  return (
    <Col span={24}>
      <Card
        hoverable
        // cover={
        //   <div className={`${css.quizBanner}`}>
        //     <img
        //       src={
        //         item?.coverUrl ? `${import.meta.env.VITE_FILE_ENDPOINT}/${item?.coverUrl}` : quizBanner
        //       }
        //       alt={item.name}
        //       height={250}
        //     ></img>
        //   </div>
        // }
        size='small'
      >
        <Flex align='center' justify='space-between'>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Meta title={item.name}></Meta>
            </Col>
            <Col span={24}>
              <Flex align='center' gap={!sm ? 12 : 0}>
                {!sm && (
                  <Space align='center'>
                    <img
                      src={`${import.meta.env.VITE_FILE_ENDPOINT}/${courses?.children?.find(
                        (sj: any) => sj._id === item.categoryId,
                      )?.icon}`}
                      width='30'
                    ></img>
                    {courses?.children?.find((sj: any) => sj._id === item.categoryId)?.name}
                  </Space>
                )}
                {item.skillName?.length > 0 && (
                  <TagCustom
                    intColor={['#7555F2', '#F5C046', '#ee723f', '#44c4ab']}
                    intArrType={['READING', 'LISTENING', 'WRITING', 'SPEAKING']}
                    intAlternativeType={['Đọc', 'Nghe', 'Viết', 'Nói']}
                    content={item.skillName}
                  ></TagCustom>
                )}
                {elementWithMaxPoint && (
                  <>
                    <TagCustom
                      intColor={['success', 'error']}
                      intArrType={['PASS', 'FAIL']}
                      intAlternativeType={['Qua', 'Không qua']}
                      content={elementWithMaxPoint.status}
                    ></TagCustom>

                    <TagCustom color='yellow' content={`${elementWithMaxPoint.point} điểm`}></TagCustom>
                  </>
                )}
              </Flex>
            </Col>
          </Row>
          <ButtonCustom
            type={elementWithMaxPoint ? 'default' : 'primary'}
            onClick={() => {
              if (!isAuthenticated) {
                return navigate('/login')
              }

              initType === 'TEST'
                ? navigate(`/lam-bai-thi/${item?._id}`)
                : navigate('/lam-bai-thi-online', {
                    state: {
                      testId: item._id,
                      testTime: item?.duration || 300,
                      addTime: 0,
                    },
                  })
            }}
          >
            {elementWithMaxPoint ? 'Làm lại' : 'Làm bài'}
          </ButtonCustom>
        </Flex>
      </Card>
    </Col>
  )
}

const ChoiceQuestionPage = () => {
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

  const [current, setCurrent] = useState<number>(1)

  const courses = categoryList?.data?.docs?.find((item) => item.name === 'Khóa học')
  const { xl, xxl } = useResponsives()

  return (
    <Header title={skillChange?.includes('ALL') ? 'Bài thi' : 'Trắc nghiệm'} padding={'25px 0 50px'}>
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
            initFilterQuery={{
              type: skillChange === 'ALL' ? 'TEST' : 'QUIZ',
              skillName: skillChange === 'ALL' ? undefined : [skillChange],
            }}
            callBackData={setExamData}
            setLoading={setIsLoad}
            page={current}
            limit={((xxl || xl) && 8) || 6}
            sort={{ createdAt: -1 }}
          ></FilterAction>

          {isLoad ? (
            <LoadingCustom tip='Vui lòng chờ...'>
              <div style={{ height: '40vh' }}></div>
            </LoadingCustom>
          ) : (
            <div>
              {examData?.totalDocs === 0 ? (
                <EmptyCustom description='Không có bài trắc nghiệm nào'></EmptyCustom>
              ) : (
                <Row gutter={[0, 12]}>
                  {examData?.docs.map((item) => (
                    <RenderItem
                      item={item}
                      courses={courses}
                      key={item._id}
                      initType={skillChange !== 'ALL' ? 'QUIZ' : 'TEST'}
                    />
                  ))}
                </Row>
              )}
            </div>
          )}

          <PaginationCustom
            callbackCurrent={setCurrent}
            totalData={examData?.totalDocs}
            limit={examData?.limit}
            page={examData?.page}
            align='center'
          />
        </Space>
      )}
    </Header>
  )
}

export default ChoiceQuestionPage
