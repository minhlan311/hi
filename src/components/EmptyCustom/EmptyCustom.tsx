import { Empty, Space } from 'antd'
import ButtonCustom from '../ButtonCustom/ButtonCustom'

type Props = {
  buttonText?: string
  buttonHref?: string
  buttonPrimaryText?: string
  buttonPrimaryHref?: string
  imageUrl?: string
  heightImage?: string | number
  description?: string
  margin?: string | number
}

const EmptyCustom = (props: Props) => {
  const { buttonText, buttonHref, buttonPrimaryText, buttonPrimaryHref, imageUrl, heightImage, description, margin } =
    props
  return (
    <Empty
      image={imageUrl}
      imageStyle={{
        height: heightImage,
        margin: margin
      }}
      description={description}
    >
      <Space>
        {buttonText && <ButtonCustom href={buttonHref}>{buttonText}</ButtonCustom>}
        {buttonPrimaryText && (
          <ButtonCustom type='primary' href={buttonPrimaryHref}>
            {buttonPrimaryText}
          </ButtonCustom>
        )}
      </Space>
    </Empty>
  )
}

export default EmptyCustom
