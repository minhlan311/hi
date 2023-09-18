import userApi from '@/apis/user.api'
import LoadingCustom from '@/components/LoadingCustom'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import Feedback from './Feedback'
import MentorInfor from './MentorInfor'
import css from './styles.module.scss'

import Avatar from '@/components/Avatar/Avatar'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import Header from '@/components/layout/Header/Header'
import { Space } from 'antd'
import Certificate from './Certificate'
import MentorVideo from './MentorVideo'
import MyCourses from './MyCourses'
const ProfilePage = () => {
  const location = useLocation()
  const userId = location.pathname.split('/')[2]
  const {
    data: userData,

    isLoading
  } = useQuery({
    queryKey: ['userDetail'],
    queryFn: () => {
      return userApi.getUserDetail(userId)
    }
  })
  const user = userData?.data

  document.title = 'Thầy ' + user?.fullName + ' | Ucam'

  return isLoading ? (
    <LoadingCustom tip='Vui lòng chờ...' className={css.loading} />
  ) : user ? (
    <div className={css.prfMain}>
      <img
        src={user?.coverImgUrl ? user?.coverImgUrl : 'https://picsum.photos/1920/300'}
        alt='background'
        className={css.bg}
      />
      <div className={css.infor}>
        <Header>
          <Space size='large'>
            <Avatar avtUrl={user.avatarUrl} userData={user} size={180} />
            <Space direction='vertical' className={css.inf}>
              <h1>{user.fullName}</h1>
              <p>Giảng viên Ielts</p>
            </Space>
          </Space>
        </Header>
      </div>
      <Header background='var(--whiteBg)' padding='0 0 0 50px'>
        <TabsCustom
          data={[
            {
              id: '1',
              name: 'Video',
              children: <MentorVideo user={user} />
            },
            {
              id: '2',
              name: 'Thông tin',
              children: <MentorInfor user={user} />
            },
            {
              id: '3',
              name: 'Bằng cấp',
              children: <Certificate user={user} />
            },
            {
              id: '4',
              name: 'Khóa học',
              children: <MyCourses user={user} />
            },
            {
              id: '5',
              name: 'Đánh giá',
              children: <Feedback />
            }
          ]}
          setting={{
            size: 'large',
            style: { justifyContent: 'center' }
          }}
        />
      </Header>
    </div>
  ) : (
    <div>Không tìm thấy giảng viên</div>
  )
}

export default ProfilePage
