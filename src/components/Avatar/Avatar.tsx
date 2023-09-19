import { UserState } from '@/interface/user'
import { Avatar as Avt } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { useEffect, useState } from 'react'
import { LuImagePlus } from 'react-icons/lu'
import noAvt from '../../assets/images/navigation/No-avt.jpg'
import UploadCustom from '../UploadCustom/UploadCustom'
import css from './styles.module.scss'

type Props = {
  avtUrl?: string
  userData?: UserState
  size?: number
  style?: React.CSSProperties
  uploadImg?: boolean
  callbackPayload?: React.Dispatch<React.SetStateAction<UserState>>
}

const Avatar = (props: Props) => {
  const { avtUrl, userData, size, style, uploadImg = false, callbackPayload } = props
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (fileList?.length > 0 && uploadImg) {
      const payload = {
        avatarUrl: fileList[0].url,
      }
      callbackPayload && callbackPayload(payload as unknown as UserState)
    }
  }, [fileList])

  if (!userData && !avtUrl) {
    return <Avt src={noAvt}></Avt>
  } else {
    const nameParts: string[] = userData ? userData.fullName.split(' ') : []

    const reversedId: string = userData ? userData._id.split('').reverse().join('') : ''
    const firstNumber: string = reversedId.match(/\d/)?.[0] || ''
    const colorList: string[] = [
      '#FF5157',
      '#70e129',
      '#299de1',
      '#8b80e3',
      '#e96969',
      '#565656',
      '#658fdd',
      '#658fdd',
      '#6B99D1',
      '#8663C3',
    ]

    return (
      <div className={uploadImg ? css.avt : undefined}>
        <Avt
          style={{
            background: avtUrl ? 'var(--green)' : colorList[firstNumber as unknown as number],
            fontWeight: 700,
            fontSize: size ? (size > 50 ? 36 : size - 18) : 14,
            ...style,
          }}
          size={size}
          src={avtUrl ? import.meta.env.VITE_FILE_ENDPOINT + '/' + avtUrl : undefined}
        >
          {nameParts[nameParts?.length - 1].charAt(0)}
        </Avt>
        {uploadImg && (
          <UploadCustom cropBeforeUpload cropAspect={1} cropShape='round' callBackFileList={setFileList}>
            <div className={css.iconAdd}>
              <div className={css.icon}>
                <LuImagePlus />
              </div>
            </div>
          </UploadCustom>
        )}
      </div>
    )
  }
}
export default Avatar
