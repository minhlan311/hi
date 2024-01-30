/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import enrollsApi from '@/apis/enrolls.api'
import vnpayApi from '@/apis/vnpay.api'
import { formatNumber } from '@/common'
import Avatar from '@/components/Avatar/Avatar'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import CollapseCustom from '@/components/CollapseCustom/CollapseCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import openNotification from '@/components/Notification'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import TagCustom from '@/components/TagCustom/TagCustom'
import Header from '@/components/layout/Header/Header'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Card, Col, Divider, Flex, Image, Rate, Row, Space } from 'antd'
import moment from 'moment-timezone'
import { useContext } from 'react'
import { BsPeople } from 'react-icons/bs'
import { FaChalkboardTeacher, FaRegEdit } from 'react-icons/fa'
import { FaFacebookF, FaLinkedinIn, FaPinterestP, FaTwitter } from 'react-icons/fa6'
import { HiOutlineNewspaper } from 'react-icons/hi2'
import { IoPodiumOutline } from 'react-icons/io5'
import { MdAccessTime, MdOutlineCalendarMonth, MdPlayArrow } from 'react-icons/md'
import { RiBookReadLine } from 'react-icons/ri'
import { TbLanguage, TbLock } from 'react-icons/tb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FacebookShareButton, LinkedinShareButton, PinterestShareButton, TwitterShareButton } from 'react-share'
import BannerProfile from '../ProfilePage/Banner'
import MyCourses from '../ProfilePage/MyCourses'
import FeedbackCourse from './components/FeedbackCourse'
import MentorData from './components/MentorData'
import TopCourse from './components/TopCourse'
import style from './style.module.scss'

const CoursesDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

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
        options: { limit: 10 },
      })
    },
    enabled: Boolean(courseDetail?.mentorId),
  })

  const mutationLocked = useMutation({
    mutationFn: (body: any) => enrollsApi.createEnroll(body),
    onSuccess: () => {
      openNotification({
        description: 'Tham gia khóa học thành công',
        status: 'success',
        message: 'Thông báo',
      })
    },
  })

  const { data: enrollData } = useQuery({
    queryKey: ['enrolls', mutationLocked.isSuccess],
    queryFn: () => {
      return enrollsApi.findEnroll({
        filterQuery: {
          userId: profile._id,
          targetId: courseDetail && courseDetail._id,
          targetModel: 'COURSE',
        },
      })
    },
    enabled: Boolean(courseDetail?._id),
  })

  const checkEnrolls = enrollData?.data.docs && enrollData.data.docs.some((item) => item.targetId === courseDetail?._id)
  const coursesData = courseList?.data
  const user = courseDetail?.mentor

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
            value: courseDetail?.countStudents,
            icon: <BsPeople />,
          },
          { label: 'Bài học', value: courseDetail.countTopics, icon: <RiBookReadLine /> },
          { label: 'Cấp độ', value: '', icon: <IoPodiumOutline /> },
          { label: 'Ngôn ngữ', value: courseDetail.category?.name, icon: <TbLanguage /> },
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
  const { sm } = useResponsives()
  const mutationCheckout = useMutation({
    mutationFn: (body: { value: number; targetModel: string; targetId: string }) => vnpayApi.pay(body),
    onSuccess: (data: any) => {
      window.open(data?.data?.url)
    },
  })

  document.title = courseDetail?.name + ' | Ucam'

  const handleBuy = () => {
    if (courseDetail) {
      if (!profile?._id) {
        navigate('/login')
      } else {
        if (checkEnrolls) navigate('/myCourseLearning/' + courseDetail?._id)
        else {
          if (courseDetail.plan === 'FREE') {
            mutationLocked.mutate({
              targetId: courseDetail?._id,
              mentorId: courseDetail.mentorId,
              targetModel: 'COURSE',
              type: profile.isMentor ? 'MENTOR' : 'STUDENT',
              userIds: [profile._id],
            })
          } else {
            mutationCheckout.mutate({
              value: courseDetail.cost ? courseDetail.cost : 0,
              targetModel: 'COURSE',
              targetId: courseDetail._id,
            })
          }
        }
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
            <Link to={'/profiles/' + courseDetail?.mentorId}>
              <Space>
                <Avatar userData={user} avtUrl={user.avatarUrl} />
                <h4>{user.fullName}</h4>
              </Space>
            </Link>
            <p>
              <Rate
                disabled
                style={{ fontSize: 14, marginRight: 5 }}
                defaultValue={user.assessment?.totalAssessmentsAverages}
              ></Rate>
              ({formatNumber(user.countAssessment as number)} Đánh giá)
            </p>
          </Space>
          <Row gutter={24}>
            <Col span={24} lg={16}>
              <Space direction='vertical' className={'sp100'} size='large'>
                <div>
                  <h1 style={{ marginTop: 15 }}>{courseDetail.name}</h1>
                  <div className={'tabCourseCustom'}>
                    <TabsCustom
                      align='center'
                      data={[
                        {
                          name: 'Tổng quan',
                          id: 'overview',
                          children: (
                            <div>
                              <Space
                                direction='vertical'
                                className={'sp100'}
                                style={{ paddingBottom: 24, minHeight: '60vh' }}
                              >
                                {courseDetail.descriptions ? (
                                  <div dangerouslySetInnerHTML={{ __html: courseDetail.descriptions }}></div>
                                ) : (
                                  'Không có mô tả'
                                )}
                              </Space>
                            </div>
                          ),
                        },
                        {
                          name: 'Lộ trình',
                          id: 'lession',
                          children: (
                            <Space
                              direction='vertical'
                              size='large'
                              className={'sp100'}
                              style={{ paddingBottom: 24, minHeight: '60vh' }}
                            >
                              {courseDetail.countTopics > 0 ? (
                                courseDetail.topics?.map((item, id) => (
                                  <CollapseCustom
                                    size='large'
                                    expandIconPosition='end'
                                    items={[
                                      {
                                        key: item._id,
                                        label: item.name,
                                        children: (
                                          <Space direction='vertical' className={'sp100'}>
                                            {item.lessons.length > 0 ? (
                                              item.lessons.map((ls, index) => (
                                                <div key={ls._id}>
                                                  <Flex justify='space-between' align='center'>
                                                    <Space>
                                                      <FaRegEdit />
                                                      <h3 className={'dangerHTMLOneLine'}>{ls.name}</h3>
                                                    </Space>
                                                    <Space>
                                                      {index === 0 && id === 0 && checkEnrolls ? (
                                                        <ButtonCustom
                                                          size='small'
                                                          href={'/myCourseLearning/' + courseDetail?._id}
                                                          type='primary'
                                                        >
                                                          Preview
                                                        </ButtonCustom>
                                                      ) : (
                                                        <>
                                                          <TagCustom
                                                            content={`${ls.length ? ls.length : 0} phút`}
                                                            color='green'
                                                          />
                                                          <TbLock />
                                                        </>
                                                      )}
                                                    </Space>
                                                  </Flex>
                                                  {index < item.countLessons - 1 && (
                                                    <Divider style={{ margin: '8px 0' }} />
                                                  )}
                                                </div>
                                              ))
                                            ) : (
                                              <EmptyCustom description='Không có bài học nào!' />
                                            )}
                                          </Space>
                                        ),
                                      },
                                    ]}
                                    defaultActiveKey={courseDetail?.topics?.[0] ? [courseDetail?.topics?.[0]._id] : []}
                                    key={item._id}
                                  />
                                ))
                              ) : (
                                <EmptyCustom description='Không có lộ trình nào!' />
                              )}
                            </Space>
                          ),
                        },
                        {
                          name: 'Giảng viên',
                          id: 'owner',
                          children: <MentorData user={user} />,
                        },
                        {
                          name: 'Đánh giá',
                          id: 'feedback',
                          children: (
                            <FeedbackCourse
                              courseId={courseDetail._id}
                              userId={profile?._id}
                              checkEnrolls={checkEnrolls}
                            />
                          ),
                        },
                      ]}
                    />
                  </div>
                </div>

                <div style={{ minHeight: 300 }}>
                  <h1 style={{ marginBottom: 10 }}>Lịch khai giảng</h1>
                  {courseDetail.class?.length > 0 ? (
                    <Space direction='vertical' className={'sp100'}>
                      {courseDetail.class?.map((item, id) => (
                        <Card size='small' key={id} hoverable>
                          {id + 1}.{' '}
                          <b>
                            {moment(item?.startDate).format('DD/MM/YYYY')} -{' '}
                            {moment(item?.endDate).format('DD/MM/YYYY')}
                          </b>
                        </Card>
                      ))}
                    </Space>
                  ) : (
                    <EmptyCustom description='Không có lịch khai giảng nào!' />
                  )}
                </div>

                <div>
                  <h1 style={{ marginBottom: 10 }}>Khóa học nổi bật</h1>
                  <MyCourses
                    coursesData={coursesData as unknown as any}
                    loading={isLoading}
                    showPagination={false}
                    fullSize
                    maxLength={2}
                  />
                </div>
              </Space>
            </Col>
            <Col span={24} lg={8}>
              <Card
                className={`sticky ${style.courseAction}`}
                size={sm ? 'small' : undefined}
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
                              alt='Không có vi deo giới thiệu nào'
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
                    <ButtonCustom className={style.price}>
                      <Space>
                        <p>Giá:</p>
                        <PriceCalculator price={courseDetail.cost ? courseDetail.cost : 0} />
                      </Space>
                    </ButtonCustom>

                    <ButtonCustom
                      className={style.buy}
                      size='large'
                      type='primary'
                      onClick={handleBuy}
                      disabled={courseDetail.countTopics < 1}
                    >
                      {courseDetail.countTopics > 0
                        ? (checkEnrolls && 'Vào học ngay') ||
                          (courseDetail.plan === 'FREE' && 'Tham gia ngay') ||
                          'Mua ngay'
                        : 'Đang cập nhật'}
                    </ButtonCustom>
                  </Space>
                  <Flex justify='center' gap={10}>
                    <p>Chia sẻ:</p>
                    <Flex align='center'>
                      <LinkedinShareButton url={shareLink}>
                        <ButtonCustom
                          icon={<FaLinkedinIn size={18} />}
                          type='link'
                          size='small'
                          shape='circle'
                        ></ButtonCustom>
                      </LinkedinShareButton>
                      <FacebookShareButton url={shareLink}>
                        <ButtonCustom
                          icon={<FaFacebookF size={16} />}
                          type='link'
                          size='small'
                          shape='circle'
                        ></ButtonCustom>
                      </FacebookShareButton>
                      <TwitterShareButton url={shareLink}>
                        <ButtonCustom
                          icon={<FaTwitter size={18} />}
                          type='link'
                          size='small'
                          shape='circle'
                        ></ButtonCustom>
                      </TwitterShareButton>
                      <PinterestShareButton url={shareLink} media={`${String(window.location)}`}>
                        <ButtonCustom
                          icon={<FaPinterestP size={18} />}
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
                      <ButtonCustom className={style.price} size='small'>
                        <PriceCalculator price={courseDetail.cost ? courseDetail.cost : 2500000} />
                      </ButtonCustom>
                    </Col>

                    <Col span={12} md={16}>
                      <ButtonCustom
                        className={style.buy}
                        style={{ padding: '10px 13px' }}
                        type='primary'
                        onClick={handleBuy}
                        disabled={courseDetail.countTopics < 1}
                      >
                        {courseDetail.countTopics > 0
                          ? (checkEnrolls && 'Vào học ngay') ||
                            (courseDetail.plan === 'FREE' && 'Tham gia ngay') ||
                            'Mua ngay'
                          : 'Đang cập nhật'}
                      </ButtonCustom>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
          <h1>Khóa học liên quan</h1>
          <MyCourses
            coursesData={coursesData as unknown as any}
            maxLength={3}
            loading={isLoading}
            showPagination={false}
            fullSize
          />
        </Header>
      </div>
    )
}

export default CoursesDetail
