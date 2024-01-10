/* eslint-disable @typescript-eslint/no-explicit-any */
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { UserState } from '@/interface/user'
import { Space } from 'antd'
import { LuImagePlus } from 'react-icons/lu'
import css from '../styles.module.scss'

type Props = {
  user: UserState
  profile?: UserState
  showInfor?: boolean
  setPayload?: React.Dispatch<React.SetStateAction<UserState | null>>
}

const BannerProfile = (props: Props) => {
  const { user, profile, showInfor, setPayload } = props

  return profile && profile._id === user._id ? (
    <UploadCustom
      cropBeforeUpload
      cropAspect={32 / 9}
      callBackFileList={(data: any) => {
        setPayload && setPayload({ coverUrl: data?.[0].url } as UserState)
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
