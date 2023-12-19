/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import userApi from '@/apis/user.api'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import PageResult from '@/components/PageResult'
import Header from '@/components/layout/Header/Header'
import { AppContext } from '@/contexts/app.context'
import { UserState } from '@/interface/user'
import { setProfileToLS } from '@/utils/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BannerProfile from './Banner'
import Certificate from './Certificate'
import Feedback from './Feedback'
import MentorInfor from './MentorInfor'
import MyCourses from './MyCourses'
import css from './styles.module.scss'

type Props = {
  profile: UserState
}

const ProfilePage = ({ profile }: Props) => {
  const location = useLocation()
  const { setProfile } = useContext(AppContext)
  const userId = location.pathname.split('/')[2]
  const queryClient = useQueryClient()

  const uploadProfile = useMutation({
    mutationFn: (body: UserState) => userApi.updateUser(body),
    onSuccess: () => {
      const newData = { ...profile, ...payload }
      setProfile(newData)
      setProfileToLS(newData)
      queryClient.invalidateQueries({ queryKey: ['userDetail'] })
      openNotification({ status: 'success', message: 'Thông báo', description: 'Cập nhật thông tin thành công!' })
    },
  })
  const { data: userData, isLoading } = useQuery({
    queryKey: ['userDetail', location, uploadProfile],
    queryFn: () => {
      return userApi.getUserDetail(userId)
    },
    enabled: Boolean(userId) || uploadProfile.isSuccess,
  })
  const user = userData?.data

  if (user)
    document.title = (user.isMentor ? (user?.gender === 'famale' ? 'Cô' : 'Thầy ') : '') + user?.fullName + ' | Ucam'

  const [payload, setPayload] = useState<UserState | null>(null)

  useEffect(() => {
    if (payload) {
      uploadProfile.mutate({ ...payload, _id: profile?._id })
    }
  }, [payload])

  const isShow = false

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
      <BannerProfile user={user} profile={profile} setPayload={setPayload} />
      <Header background='var(--whiteBg)' padding='0 0 50px 0'>
        <MentorInfor
          user={user}
          coursesLength={coursesData?.totalDocs ? coursesData?.totalDocs : 0}
          profile={profile}
          setPayload={setPayload}
        />
        {/* <MentorVideo /> */}
        {isShow && <Certificate user={user} />}
        <MyCourses coursesData={coursesData as unknown as any} loading={loading} setCurrent={setCurrent} />
        <Feedback userId={user._id} meId={profile?._id} />
      </Header>
    </div>
  ) : (
    <PageResult code={404} title='Không tìm thấy người dùng' desc='Người dùng không tồn tại!' />
  )
}

export default ProfilePage
