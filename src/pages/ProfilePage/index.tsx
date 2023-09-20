/* eslint-disable @typescript-eslint/no-explicit-any */
import userApi from '@/apis/user.api'
import Avatar from '@/components/Avatar/Avatar'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import Header from '@/components/layout/Header/Header'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { UserState } from '@/interface/user'
import { setProfileToLS } from '@/utils/auth'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Row, Space } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { LuImagePlus } from 'react-icons/lu'
import { useLocation } from 'react-router-dom'
import Certificate from './Certificate'
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

  const { setProfile } = useContext(AppContext)
  const [payload, setPayload] = useState<UserState>()
  const userId = location.pathname.split('/')[2]
  const { sm, md } = useResponsives()
  const { data: userData, isLoading } = useQuery({
    queryKey: ['userDetail'],
    queryFn: () => {
      return userApi.getUserDetail(userId)
    },
  })
  const user = userData?.data

  if (user) document.title = 'Thầy ' + user?.fullName + ' | Ucam'

  const { data, mutate } = useMutation({ mutationFn: (body: UserState) => userApi.updateUser(body) })

  useEffect(() => {
    if (payload) {
      mutate(
        { ...payload, _id: profile._id },
        {
          onSuccess: () => {
            const newData = { ...profile, ...payload }
            setProfile(newData)
            setProfileToLS(newData)
            openNotification({ status: 'success', message: 'Thông báo', description: 'Cập nhật thông tin thành công!' })
          },
        },
      )
    }
  }, [payload])
  console.log(data)

  return isLoading ? (
    <LoadingCustom tip='Vui lòng chờ...' className={css.loading} />
  ) : user ? (
    <div className={css.prfMain}>
      {profile._id === user._id ? (
        <UploadCustom
          cropBeforeUpload
          cropAspect={32 / 9}
          callBackFileList={(data: any) => {
            const newData = { coverUrl: data?.[0].url }
            setPayload(newData as unknown as UserState)
          }}
        >
          <div className={css.bg}>
            <img
              src={
                data?.data.coverUrl
                  ? import.meta.env.VITE_FILE_ENDPOINT + '/' + data?.data.coverUrl
                  : user?.coverUrl
                  ? import.meta.env.VITE_FILE_ENDPOINT + '/' + user?.coverUrl
                  : 'https://picsum.photos/1920/300'
              }
              alt='background'
            />
            <div className={css.editBg}>
              <div className={css.icon}>
                <Space direction='vertical'>
                  <LuImagePlus />
                  <p>Thay đổi ảnh bìa của bạn</p>
                </Space>
              </div>
            </div>
          </div>
        </UploadCustom>
      ) : (
        <div className={css.bg}>
          <img
            src={
              user?.coverUrl
                ? import.meta.env.VITE_FILE_ENDPOINT + '/' + user?.coverUrl
                : 'https://picsum.photos/1920/300'
            }
            alt='background'
          />
        </div>
      )}
      <div className={`${css.infor} uc-container`}>
        <Row justify='space-between' align='middle'>
          <Space size='large'>
            <Avatar
              avtUrl={data?.data.avatarUrl ? data?.data.avatarUrl : user.avatarUrl}
              userData={user}
              size={(sm && 80) || (md && 120) || 180}
              uploadImg={profile._id === user._id ? true : false}
              callbackPayload={(data) => setPayload(data as unknown as UserState)}
            />
            <Space direction='vertical' className={css.inf}>
              {sm ? <h3>{user.fullName}</h3> : <h1>{user.fullName}</h1>}
              <p>Giảng viên Ielts</p>
            </Space>
          </Space>
          {profile._id === user._id && <ButtonCustom href={`/pedagogys/${user._id}`}>Cập nhật thông tin</ButtonCustom>}
        </Row>
      </div>
      <Header background='var(--whiteBg)' padding='0 0 50px 0'>
        <TabsCustom
          data={[
            {
              id: '1',
              name: 'Video',
              children: <MentorVideo user={user} />,
            },
            {
              id: '2',
              name: 'Thông tin',
              children: <MentorInfor user={user} />,
            },
            {
              id: '3',
              name: 'Bằng cấp',
              children: <Certificate user={user} />,
            },
            {
              id: '4',
              name: 'Khóa học',
              children: <MyCourses user={user} />,
            },
            {
              id: '5',
              name: 'Đánh giá',
              children: <Feedback />,
            },
          ]}
          setting={{
            size: 'large',
          }}
        />
      </Header>
    </div>
  ) : (
    <div>Không tìm thấy giảng viên</div>
  )
}

export default ProfilePage
