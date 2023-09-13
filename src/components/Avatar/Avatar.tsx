import { UserState } from '@/interface/user'
import { Avatar as Avt } from 'antd'
import noAvt from '../../assets/images/navigation/No-avt.jpg'

type Props = {
  avtUrl?: string
  userData?: UserState
  size?: number
  style?: React.CSSProperties
}

function Avatar(props: Props) {
  const { avtUrl, userData, size, style } = props
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
      '#8663C3'
    ]

    return (
      <Avt
        style={{
          background: colorList[firstNumber as unknown as number],
          fontWeight: 700,
          fontSize: size ? (size > 50 ? 36 : size - 18) : 14,
          ...style
        }}
        size={size}
        src={avtUrl ? avtUrl : undefined}
      >
        {nameParts[nameParts?.length - 1].charAt(0)}
      </Avt>
    )
  }
}
export default Avatar
