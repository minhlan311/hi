/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import { useQuery } from '@tanstack/react-query'

import Avatar from '@/components/Avatar/Avatar'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import Header from '@/components/layout/Header/Header'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { Card, Col, Divider, Flex, Image, Rate, Row, Space } from 'antd'
import moment from 'moment-timezone'
import { useContext } from 'react'
import { BsPeople } from 'react-icons/bs'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { FaFacebookF, FaLinkedinIn, FaPinterestP, FaTwitter } from 'react-icons/fa6'
import { HiOutlineNewspaper } from 'react-icons/hi2'
import { IoPodiumOutline } from 'react-icons/io5'
import { MdAccessTime, MdOutlineCalendarMonth, MdPlayArrow } from 'react-icons/md'
import { RiBookReadLine } from 'react-icons/ri'
import { TbLanguage } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import { FacebookShareButton, LinkedinShareButton, PinterestShareButton, TwitterShareButton } from 'react-share'
import BannerProfile from '../ProfilePage/Banner'
import Feedback from '../ProfilePage/Feedback'
import MentorInfor from '../ProfilePage/MentorInfor'
import MyCourses from '../ProfilePage/MyCourses'
import FeedbackCourse from './components/FeedbackCourse'
import TopCourse from './components/TopCourse'
import style from './style.module.scss'

const CoursesDetail = () => {
  const { id } = useParams()
  const navitage = useNavigate()
  const { profile } = useContext(AppContext)
  const { data: courseData } = useQuery({
    queryKey: ['courseDetail', id],
    queryFn: () => {
      if (id) return courseApi.courseDetail(id)
    },
    enabled: Boolean(id),
  })

  const courseDetail = courseData?.data

  const { data: courseList, isLoading } = useQuery({
    queryKey: ['coursesByMentor'],
    queryFn: () => {
      return courseApi.getCourses({
        filterQuery: { createdById: courseDetail?.mentorId },
        options: { limit: 3 },
      })
    },
    enabled: Boolean(courseDetail?.mentorId),
  })

  const coursesData = courseList?.data
  const user = courseDetail?.owner

  const courseInfor: { label: string; value: any; icon: React.ReactNode }[] =
    user && courseDetail
      ? [
          {
            label: 'Thời gian',
            value: courseDetail.class?.[0]?.startDate
              ? `${moment(courseDetail.class?.[0]?.endDate).diff(
                  moment(courseDetail.class?.[0]?.startDate),
                  'weeks',
                )} Tuần`
              : 'Đang cập nhật',
            icon: <MdAccessTime />,
          },
          {
            label: 'Số học viên',
            value: courseDetail.class.reduce((acc, obj) => {
              return acc + obj.students.length
            }, 0),
            icon: <BsPeople />,
          },
          { label: 'Bài học', value: courseDetail.countTopics, icon: <RiBookReadLine /> },
          { label: 'Cấp độ', value: '', icon: <IoPodiumOutline /> },
          { label: 'Ngôn ngữ', value: courseDetail.category.name, icon: <TbLanguage /> },
          { label: 'Bài kiểm tra', value: courseDetail.countTests, icon: <HiOutlineNewspaper /> },
          {
            label: 'Ngày bắt đầu',
            value: courseDetail.class?.[0]?.startDate
              ? moment(courseDetail.class?.[0]?.startDate).format('DD [Tháng] MM, YYYY')
              : 'Đang cập nhật',
            icon: <MdOutlineCalendarMonth />,
          },
          { label: 'Giảng viên', value: user.fullName, icon: <FaChalkboardTeacher /> },
        ]
      : []

  const shareLink = window.location.href
  const { md, lg, sm } = useResponsives()
  // const mutationPay = useMutation({
  //   mutationFn: (body: { value: number; targetModel: string; targetId: string }) => vnpayApi.pay(body),
  //   onSuccess: (data: any) => {
  //     window.open(data?.data?.url)
  //   },
  // })

  const handleBuy = () => {
    if (courseDetail) {
      if (!profile?._id) {
        navitage('/login')
      } else {
        // navitage('/myCourseLearning/' + courseDetail?._id)
        // mutationPay.mutate({
        //   value: courseDetail.cost,
        //   targetModel: 'COURSE',
        //   targetId: courseDetail._id,
        // })
      }
    }
  }

  if (courseDetail && user)
    return (
      <div className={style.courseMain}>
        <TopCourse name={courseDetail.name} />
        <Header padding={'180px 0 0'}>
          <BannerProfile user={user} showInfor />
        </Header>
        <Header size='sm'>
          <Space direction={sm ? 'vertical' : 'horizontal'} size='large' style={{ margin: '24px 0 0' }}>
            <Space>
              <Avatar userData={user} avtUrl={user.avatarUrl} />
              <h4>{user.fullName}</h4>
            </Space>

            <p>
              <Rate disabled style={{ fontSize: 14, marginRight: 5 }}></Rate>
              (1 Đánh giá)
            </p>
          </Space>
          <Row gutter={24}>
            <Col span={24} lg={17}>
              <h1 style={{ marginTop: 24 }}>{courseDetail.name}</h1>

              <TabsCustom
                data={[
                  {
                    name: 'Tổng quan',
                    id: 'overview',
                    children: <p>Tổng quan</p>,
                  },
                  {
                    name: 'Lộ trình',
                    id: 'lession',
                    children: <p>Lộ trình</p>,
                  },
                  {
                    name: 'Giảng viên',
                    id: 'owner',
                    children: (
                      <MentorInfor
                        user={user}
                        coursesLength={coursesData?.totalDocs ? coursesData?.totalDocs : 0}
                        fullSize
                        md={(md && 10) || (lg && 6) || 8}
                      />
                    ),
                  },
                  {
                    name: 'Đánh giá',
                    id: 'feedback',
                    children: <Feedback userId={user._id} fullSize />,
                  },
                ]}
              />

              <h1>Khóa học nổi bật</h1>
              <MyCourses
                coursesData={coursesData as unknown as any}
                loading={isLoading}
                showPagination={false}
                fullSize
                maxLength={2}
              />
              <h1>Đánh giá</h1>
              <FeedbackCourse courseId={courseDetail._id} userId={profile?._id} />
            </Col>
            <Col span={24} lg={7}>
              <Card
                className={`sticky ${style.courseAction}`}
                cover={
                  <div className={style.preview}>
                    <Image
                      height={200}
                      width='100%'
                      style={{ objectFit: 'cover' }}
                      preview={{
                        imageRender: () =>
                          courseDetail.coverVideo ? (
                            <video
                              width='100%'
                              controls
                              src={import.meta.env.VITE_FILE_ENDPOINT + '/' + courseDetail.coverVideo}
                            />
                          ) : (
                            <img
                              src={import.meta.env.VITE_FILE_ENDPOINT + '/' + courseDetail.coverMedia}
                              alt={import.meta.env.VITE_FILE_ENDPOINT + '/' + courseDetail.coverMedia}
                            />
                          ),
                        toolbarRender: () => null,
                      }}
                      src={import.meta.env.VITE_FILE_ENDPOINT + '/' + courseDetail.coverMedia}
                    ></Image>
                    <div className={style.playIcon}>
                      <MdPlayArrow />
                    </div>
                  </div>
                }
              >
                <Space direction='vertical' className={`sp100 ${style.courseInfor}`}>
                  <div>
                    {courseInfor.map((item, id) => (
                      <div key={item.label}>
                        <Flex justify='space-between' align='center'>
                          <p>
                            <i className={style.icon} style={{ marginRight: 5 }}>
                              {item.icon}
                            </i>
                            {item.label}
                          </p>
                          <b>{item.value}</b>
                        </Flex>
                        {id < courseInfor.length - 1 && <Divider style={{ margin: '8px 0' }} />}
                      </div>
                    ))}
                  </div>
                  <Space direction='vertical' className={'sp100'} style={{ margin: '20px 0' }}>
                    <ButtonCustom className={'sp100'}>
                      <h2>
                        <Space>
                          <p>Giá:</p> <PriceCalculator price={courseDetail.cost ? courseDetail.cost : 0} />
                        </Space>
                      </h2>
                    </ButtonCustom>
                    <ButtonCustom className={'sp100'} size='large' type='primary' onClick={handleBuy}>
                      Mua ngay
                    </ButtonCustom>
                  </Space>
                  <Flex justify='center' gap={10}>
                    <p>Chia sẻ:</p>
                    <Flex align='center'>
                      <LinkedinShareButton url={shareLink}>
                        <ButtonCustom
                          icon={<FaLinkedinIn size={14} />}
                          type='link'
                          size='small'
                          shape='circle'
                        ></ButtonCustom>
                      </LinkedinShareButton>
                      <FacebookShareButton url={shareLink}>
                        <ButtonCustom
                          icon={<FaFacebookF size={12} />}
                          type='link'
                          size='small'
                          shape='circle'
                        ></ButtonCustom>
                      </FacebookShareButton>
                      <TwitterShareButton url={shareLink}>
                        <ButtonCustom
                          icon={<FaTwitter size={14} />}
                          type='link'
                          size='small'
                          shape='circle'
                        ></ButtonCustom>
                      </TwitterShareButton>
                      <PinterestShareButton url={shareLink} media={`${String(window.location)}`}>
                        <ButtonCustom
                          icon={<FaPinterestP size={14} />}
                          type='link'
                          size='small'
                          shape='circle'
                        ></ButtonCustom>
                      </PinterestShareButton>
                    </Flex>
                  </Flex>
                </Space>
                <div className={style.buttonAction}>
                  <Row gutter={12} align='middle'>
                    <Col span={12} md={8}>
                      <ButtonCustom className={'sp100'} size='small'>
                        <h2>
                          <PriceCalculator price={courseDetail.cost ? courseDetail.cost : 2500000} />
                        </h2>
                      </ButtonCustom>
                    </Col>

                    <Col span={12} md={16}>
                      <ButtonCustom className={'sp100'} size='small' type='primary' onClick={handleBuy}>
                        <p style={{ fontSize: 20 }}>Mua ngay</p>
                      </ButtonCustom>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
          <h1>Khóa học liên quan</h1>
          <MyCourses coursesData={coursesData as unknown as any} loading={isLoading} showPagination={false} fullSize />
        </Header>
      </div>
    )
}

export default CoursesDetail
