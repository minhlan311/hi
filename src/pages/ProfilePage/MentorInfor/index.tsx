/* eslint-disable @typescript-eslint/no-explicit-any */
import assessmentApi from '@/apis/assessment.api'
import userApi from '@/apis/user.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import Header from '@/components/layout/Header/Header'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { UserState } from '@/interface/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Card, Col, Flex, Progress, Row, Space } from 'antd'
import moment from 'moment-timezone'
import { useContext, useEffect, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { FaBookOpen, FaClock, FaStar } from 'react-icons/fa6'
import { IoSchoolSharp } from 'react-icons/io5'
import { LuImagePlus } from 'react-icons/lu'
import { PiCertificateFill } from 'react-icons/pi'
import { TbUserEdit } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'
import famalePic from '../../../assets/images/examimg/famale-teacher.png'
import malePic from '../../../assets/images/examimg/male-teacher.png'
import UpdateMentor from './UpdateMentor'
import css from './styles.module.scss'
type Props = {
  user: UserState
  profile?: UserState
  coursesLength: number
  fullSize?: boolean
  md?: number
}

const MentorInfor = ({ user, profile, coursesLength, md, fullSize }: Props) => {
  const [update, setUpdate] = useState(false)
  const { setProfile } = useContext(AppContext)
  const location = useLocation().state
  useEffect(() => {
    if (location) {
      setUpdate(true)
    }
  }, [location])

  const examDesc =
    '<p>Tôi là một giáo viên Tiếng Anh với niềm đam mê sâu sắc trong việc truyền đạt kiến thức và kỹ năng ngôn ngữ cho học viên. Sứ mệnh của tôi không chỉ đơn giản là dạy ngữ pháp và từ vựng, mà còn là tạo ra môi trường học tập thú vị và cung cấp những cơ hội để học viên thể hiện bản thân một cách tự tin.</p><br/><p>Trâm ngôn của tôi về học tập bằng Tiếng Anh là: <b>"Embrace the challenge, embrace the growth."</b> Đối mặt với thách thức, chấp nhận nó và từ đó, bạn sẽ trưởng thành. Việc học ngôn ngữ không chỉ là việc học từ sách vở, mà còn là việc mở cửa tâm hồn và sẵn sàng đối mặt với những cơ hội mới, từ đó phát triển bản thân một cách toàn diện.</p>'

  const detailedAssessments = [
    { name: 'expertise', label: 'Kiến thức chuyên môn' },
    { name: 'skills', label: 'Kỹ năng giảng dạy' },
    { name: 'care', label: 'Quan tâm học viên' },
    { name: 'interact', label: 'Tương tác với lớp' },
    { name: 'creative', label: 'Sáng tạo giảng dạy' },
    { name: 'tuitionFee', label: 'Hài lòng về học phí' },
    { name: 'classify', label: 'Tư vấn xếp lớp' },
    { name: 'ready', label: 'Sẵn sàng giới thiệu' },
  ]

  const { data: getAssessmentDetail } = useQuery({
    queryKey: ['getAssessmentDetail'],
    queryFn: () => {
      return assessmentApi.getAssessmentDetail(user._id)
    },

    enabled: Boolean(user._id),
  })

  const now = moment()
  const diffDuration = moment.duration(now.diff(user.createdAt))
  let days = diffDuration.asDays()
  let time = ''

  if (days >= 365) {
    time += `${Math.floor(days / 365)} năm`
    days %= 365
  } else if (days >= 30) {
    time += `${Math.floor(days / 30)} tháng`
    days %= 30
  } else if (days > 0) {
    time += `${Math.floor(days)} ngày`
  }

  const totalStudent = 0

  const formatNumber = (num: number) => {
    if (num < 1000) {
      return num.toString()
    } else if (num < 1000000) {
      return (num / 1000).toFixed(0) + 'k'
    } else {
      return (num / 1000000).toFixed(0) + 'm'
    }
  }

  const { sm } = useResponsives()
  const queryClient = useQueryClient()
  const uploadProfile = useMutation({
    mutationFn: (body: UserState) => userApi.updateUser(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userDetail'] })
      setProfile(data.data as unknown as UserState)
      openNotification({ status: 'success', message: 'Thông báo', description: 'Cập nhật ảnh đại diện thành công!' })
    },
    onError: () => {
      openNotification({ status: 'error', message: 'Thông báo', description: 'Có lỗi sảy ra' })
    },
  })

  return (
    <Header padding={'30px 0 50px 0'} size={fullSize ? undefined : 'sm'}>
      <div className={css.card}>
        <Row gutter={[24, 24]}>
          <Col span={24} md={md ? md : 10} className={`${css.avt} ${sm ? '' : 'sticky'}`} style={{ top: 30 }}>
            {profile && profile._id === user._id ? (
              <UploadCustom
                cropBeforeUpload
                cropAspect={1 / 1}
                onChange={(data: any) => {
                  if (data.file.response)
                    uploadProfile.mutate({ _id: user._id, avatarUrl: data.file.response.url } as UserState)
                }}
                uploadQuality='high'
              >
                <img
                  src={
                    user.avatarUrl
                      ? import.meta.env.VITE_FILE_ENDPOINT + '/' + user.avatarUrl
                      : user?.gender === 'MALE'
                      ? malePic
                      : famalePic
                  }
                  alt='avt'
                />
                <div className={css.editBg}>
                  <div className={css.icon}>
                    <Space direction='vertical'>
                      <LuImagePlus />
                      <p>Thay đổi ảnh đại diện</p>
                    </Space>
                  </div>
                </div>
              </UploadCustom>
            ) : (
              <div className={css.bg}>
                <img
                  src={
                    user.avatarUrl
                      ? import.meta.env.VITE_FILE_ENDPOINT + '/' + user.avatarUrl
                      : user?.gender === 'MALE'
                      ? malePic
                      : famalePic
                  }
                  alt='avt'
                />
              </div>
            )}
          </Col>
          <Col span={24} md={md ? 24 - md : 14}>
            {!update ? (
              <div className={css.infor}>
                <Space direction='vertical' size='large'>
                  <Flex justify='space-between' align='center'>
                    <h1>{user.fullName}</h1>
                    {user._id === profile?._id && (
                      <ButtonCustom
                        onClick={() => setUpdate(true)}
                        icon={<TbUserEdit />}
                        tooltip={sm ? 'Chỉnh sửa' : ''}
                      >
                        {!sm && 'Chỉnh sửa'}
                      </ButtonCustom>
                    )}
                  </Flex>
                  <div className={css.certificate}>
                    <Card className={css.cerCard} size='small'>
                      <Flex justify='space-between'>
                        <Space>
                          <IoSchoolSharp size={30} />
                          <b>
                            {user.mentorInfo?.educationType
                              ? user.mentorInfo?.educationType
                              : user.isMentor
                              ? 'Giảng viên'
                              : 'Học viên'}
                          </b>
                        </Space>
                        <Space>
                          <PiCertificateFill size={30} />
                          <b>Ielts 8.0</b>
                        </Space>
                      </Flex>
                    </Card>
                  </div>
                  <p
                    dangerouslySetInnerHTML={{ __html: user?.descriptions ? user?.descriptions : examDesc }}
                    className={css.desc}
                  ></p>
                  <Row gutter={[24, 6]}>
                    {getAssessmentDetail?.data?.totalDetailedAverages?.map((item) => (
                      <Col span={24} md={12}>
                        <div>
                          <p>{detailedAssessments.find((i) => i.name === item.name)?.label}</p>
                          <Progress
                            percent={(item.evaluate / 5) * 100}
                            strokeColor='var(--green)'
                            format={(percent) => `${percent}%`}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <Row gutter={[24, 30]} className={css.progress}>
                    <Col span={12} md={12} lg={6}>
                      <div className={css.main}>
                        <Progress
                          type='circle'
                          format={() => (
                            <div>
                              <h3>{formatNumber(coursesLength)}</h3>
                              <p>Khóa học</p>
                            </div>
                          )}
                        ></Progress>
                        <div className={css.icon}>
                          <FaBookOpen size={33} />
                        </div>
                      </div>
                    </Col>
                    <Col span={12} md={12} lg={6}>
                      <div className={css.main}>
                        <Progress
                          type='circle'
                          format={() => (
                            <div>
                              <h3>
                                {getAssessmentDetail?.data?.totalAssessmentsAverages
                                  ? getAssessmentDetail?.data?.totalAssessmentsAverages
                                  : 0}
                              </h3>
                              <p>Đánh giá</p>
                            </div>
                          )}
                        ></Progress>
                        <div className={css.icon}>
                          <FaStar size={34} />
                        </div>
                      </div>
                    </Col>
                    <Col span={12} md={12} lg={6}>
                      <div className={css.main}>
                        <Progress
                          type='circle'
                          format={() => (
                            <div>
                              <h3>{formatNumber(totalStudent)}</h3>
                              <p>Học viên</p>
                            </div>
                          )}
                        ></Progress>
                        <div className={css.icon}>
                          <FaUserAlt size={30} />
                        </div>
                      </div>
                    </Col>
                    <Col span={12} md={12} lg={6}>
                      <div className={css.main}>
                        <Progress
                          type='circle'
                          format={() => (
                            <div>
                              <h3>{time}</h3>
                              <p>Kinh nghiệm</p>
                            </div>
                          )}
                        ></Progress>
                        <div className={css.icon}>
                          <FaClock size={34} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Space>
              </div>
            ) : (
              <UpdateMentor user={user} setUpdate={setUpdate} activeKey={location?.key} />
            )}
          </Col>
        </Row>
      </div>
    </Header>
  )
}

export default MentorInfor
