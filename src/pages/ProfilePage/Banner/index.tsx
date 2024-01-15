/* eslint-disable @typescript-eslint/no-explicit-any */
import userApi from '@/apis/user.api'
import openNotification from '@/components/Notification'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { UserState } from '@/interface/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Space } from 'antd'
import { LuImagePlus } from 'react-icons/lu'
import css from '../styles.module.scss'

type Props = {
  user: UserState
  profile?: UserState
  showInfor?: boolean
}

const BannerProfile = (props: Props) => {
  const { user, profile, showInfor } = props
  const queryClient = useQueryClient()
  const uploadProfile = useMutation({
    mutationFn: (body: UserState) => userApi.updateUser(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userDetail'] })
      openNotification({ status: 'success', message: 'Thông báo', description: 'Cập nhật ảnh bìa thành công!' })
    },
    onError: () => {
      openNotification({ status: 'error', message: 'Thông báo', description: 'Có lỗi sảy ra' })
    },
  })

  return profile && profile._id === user._id ? (
    <UploadCustom
      cropBeforeUpload
      cropAspect={32 / 9}
      onChange={(data: any) => {
        if (data.file.response) uploadProfile.mutate({ _id: user._id, coverUrl: data.file.response.url } as UserState)
      }}
      uploadQuality='high'
    >
      <div className={css.bg}>
        <img
          src={
            user?.coverUrl
              ? import.meta.env.VITE_FILE_ENDPOINT + '/' + user?.coverUrl
              : 'https://picsum.photos/1920/300'
          }
          alt='background'
        />
        <h1>{user.fullName}</h1>
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
            : showInfor
            ? 'https://picsum.photos/1920/650'
            : 'https://picsum.photos/1920/300'
        }
        alt='background'
        style={{ width: '100%', height: showInfor ? 550 : undefined, objectFit: 'cover' }}
      />
      {showInfor ? <p></p> : <h1>{user.fullName}</h1>}
    </div>
  )
}

export default BannerProfile
