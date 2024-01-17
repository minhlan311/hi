/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import userApi from '@/apis/user.api'
import LoadingCustom from '@/components/LoadingCustom'
import PageResult from '@/components/PageResult'
import Header from '@/components/layout/Header/Header'
import { UserState } from '@/interface/user'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import BannerProfile from './Banner'

import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { Col, Row, Space } from 'antd'
import Feedback from './Feedback'
import MentorInfor from './MentorInfor'
import MentorVideo from './MentorVideo'
import MyCourses from './MyCourses'
import css from './styles.module.scss'

type Props = {
  profile: UserState
}

const ProfilePage = ({ profile }: Props) => {
  const location = useLocation()

  const userId = location.pathname.split('/')[2]

  const { data: userData, isLoading } = useQuery({
    queryKey: ['userDetail', location],
    queryFn: () => {
      return userApi.getUserDetail(userId)
    },
    enabled: Boolean(userId),
  })
  const user = userData?.data

  if (user)
    document.title = (user.isMentor ? (user?.gender === 'FEMALE' ? 'Cô ' : 'Thầy ') : '') + user?.fullName + ' | Ucam'

  const [current, setCurrent] = useState<number>(1)

  const { data: courseData, isLoading: loading } = useQuery({
    queryKey: ['coursesByMentor', current],
    queryFn: () => {
      return courseApi.getCourses({ filterQuery: { createdById: userId }, options: { page: current, limit: 6 } })
    },
  })
  const coursesData = courseData?.data

  return isLoading ? (
    <LoadingCustom tip='Vui lòng chờ...' className={css.loading} />
  ) : user ? (
    <div className={css.prfMain}>
      <BannerProfile user={user} profile={profile} />
      <Header background='var(--whiteBg)' padding='0 0 50px 0'>
        <MentorInfor
          user={user}
          coursesLength={coursesData?.totalDocs ? coursesData?.totalDocs : 0}
          profile={profile}
        />
        {user?.videoInfoUrl && <MentorVideo videoUrl={user.videoInfoUrl} />}
        {user.mentorInfo?.showCentificate?.length > 0 && (
          <Header title='Bằng cấp & Chứng chỉ' titleSize={35} size='sm'>
            <Space direction='vertical' className={'sp100'} size={'large'}>
              {user.mentorInfo?.showCentificate?.map((item) => (
                <div key={item}>
                  <h3 style={{ marginBottom: 10 }}>{item === 'centificate' ? 'Chứng chỉ' : 'Bằng cấp'}</h3>
                  <Row gutter={[24, 24]} justify='center'>
                    {item === 'centificate' ? (
                      user.mentorInfo?.certificates?.length > 0 ? (
                        user.mentorInfo.certificates.map((c) => (
                          <Col span={24} md={8} key={c.name}>
                            <ImageCustom width='100%' src={import.meta.env.VITE_FILE_ENDPOINT + '/' + c.url} />
                          </Col>
                        ))
                      ) : (
                        <EmptyCustom description='Không có chứng chỉ nào' />
                      )
                    ) : user.mentorInfo?.diploma?.length > 0 ? (
                      user.mentorInfo.diploma.map((d) => (
                        <Col span={24} md={8} key={d.name}>
                          <ImageCustom width='100%' src={import.meta.env.VITE_FILE_ENDPOINT + '/' + d.url} />
                        </Col>
                      ))
                    ) : (
                      <EmptyCustom description='Không có bằng cấp nào' />
                    )}
                  </Row>
                </div>
              ))}
            </Space>
          </Header>
        )}
        {user.isMentor && (
          <MyCourses coursesData={coursesData as unknown as any} loading={loading} setCurrent={setCurrent} />
        )}
        <Feedback userId={user._id} meId={profile?._id} />
      </Header>
    </div>
  ) : (
    <PageResult code={404} title='Không tìm thấy người dùng' desc='Người dùng không tồn tại!' />
  )
}

export default ProfilePage
