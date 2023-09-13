import Logo from '@/components/Logo/Logo'
import { Col, Row, Space } from 'antd'
import imgbg from '../../../assets/images/backgrounds/login-img.png'
import css from './styles.module.scss'
type Props = {
  title: string
  align?: 'start' | 'end'
  imgBg?: string
  imgBgSize?: string | number
  imgSize?:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
  formSize?:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
  children: React.ReactNode
  titleForm?: string
  titleSize?: number
  titleStyle?: React.CSSProperties
  descForm?: string
  descSize?: number
  descStyle?: React.CSSProperties
}

const AuthLayout = (props: Props) => {
  const {
    title,
    align,
    imgBg = imgbg,
    imgBgSize = '100%',
    imgSize = 12,
    formSize,
    children,
    titleForm,
    titleSize = 32,
    titleStyle,
    descForm,
    descSize = 14,
    descStyle
  } = props
  window.document.title = title + ' | Ucam'
  return (
    <div className={css.authMain}>
      <Row justify='space-between' style={{ flexDirection: align === 'end' ? 'row-reverse' : 'row' }}>
        <Col
          span={24}
          md={
            (imgSize && !formSize && imgSize) ||
            (imgSize && formSize && imgSize) ||
            (!imgSize && formSize && 24 - formSize) ||
            24
          }
        >
          <Space direction='vertical' size='large'>
            <Logo />
            <img src={imgBg} alt='bg' width={imgBgSize} />
          </Space>
        </Col>
        <Col
          span={24}
          md={
            (imgSize && !formSize && 24 - imgSize) ||
            (imgSize && formSize && formSize) ||
            (!imgSize && formSize && formSize) ||
            24
          }
        >
          <Space direction='vertical' size='large' className={`sp100`}>
            <Space direction='vertical'>
              <h1 style={{ fontSize: titleSize, ...titleStyle }} className={css.title}>
                {titleForm}
              </h1>
              <p style={{ fontSize: descSize, ...descStyle }} className={css.desc}>
                {descForm}
              </p>
            </Space>
            <div className={css.formMain}> {children}</div>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default AuthLayout
