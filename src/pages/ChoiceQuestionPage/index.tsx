import Header from '@/components/layout/Header/Header'
import { Card, Col, Row, Space } from 'antd'
import listeningBaner from '../../assets/images/banner/listening_banner.png'
import multySkillBanner from '../../assets/images/banner/multi_skill_banner.jpg'
import readingBanner from '../../assets/images/banner/reading_banner.png'
import speakingBanner from '../../assets/images/banner/speaking_banner.png'
import writingBanner from '../../assets/images/banner/writing_banner.png'
import css from './styles.module.scss'
import { useState } from 'react'
import { ExamState, SkillType } from '@/interface/exam'
import FilterAction from '@/components/FilterAction'
import examApi from '@/apis/exam.api'
import LoadingCustom from '@/components/LoadingCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'

const { Meta } = Card

const ChoiceQuestionPage = () => {
  const [skillChange, setSkillChange] = useState<SkillType>()
  const [examData, setExamData] = useState<{ docs: ExamState[]; totalDocs: number; page: number } | null>(null)
  const [isLoad, setIsLoad] = useState<boolean>(true)
  // const [pageSize, setPageSize] = useState<number>(1)

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
      {skillChange && examData && (
        <Space direction='vertical' className={'sp100'}>
          <FilterAction
            apiFind={examApi.findExam}
            type='test'
            keyFilter='examFind'
            filterQuery={{ type: 'QUIZ' }}
            callBackData={setExamData}
            setLoading={setIsLoad}
            page={1}
            limit={6}
          ></FilterAction>
          <LoadingCustom loading={isLoad} tip='Vui lòng chờ...'>
            <Row gutter={[24, 24]}>
              {examData.totalDocs === 0 ? (
                <EmptyCustom description='Không có bài trắc nghiệm nào'></EmptyCustom>
              ) : (
                examData.docs.map((item) => (
                  <Col span={24} md={8} key={item._id}>
                    <Card cover={<img src='' alt='' height={250}></img>}>
                      <h3>{item.name}</h3>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </LoadingCustom>
        </Space>
      )}
    </Header>
  )
}

export default ChoiceQuestionPage
