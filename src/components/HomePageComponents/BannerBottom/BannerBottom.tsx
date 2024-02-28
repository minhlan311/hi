import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import { Col, Row, Space } from 'antd'
import css from './BannerBottom.module.scss'

interface DataProps {
  title: string
  desc: string
  imageUrl: string
  button?: string
  href?: string
  buttonPrimary?: string
  buttonPrimaryHref?: string
  logo?: string
}
type Props = {
  data: DataProps
  dir?: 'left' | 'right'
}

const BannerBottom = (props: Props) => {
  const { data, dir = 'right' } = props
  const { title, desc, imageUrl, href, button, buttonPrimary, buttonPrimaryHref, logo } = data

  return (
    <Row
      className={`${dir === 'left' && css.dirLeft} ${css.bodyBanner}`}
      justify='space-between'
      align='middle'
      gutter={96}
    >
      <Col span={24} md={12}>
        {logo && <img src={logo} className={css.logo} alt='logo' />}
        <div className={css.title}>{title}</div>
        <div className={`${css.desc} dangerHTML`} dangerouslySetInnerHTML={{ __html: desc }}></div>
        <Space>
          {buttonPrimary && (
            <ButtonCustom type='primary' href={buttonPrimaryHref}>
              {buttonPrimary}
            </ButtonCustom>
          )}
          {button && <ButtonCustom href={href}>{button}</ButtonCustom>}
        </Space>
      </Col>
      <Col span={24} md={12}>
        <img src={imageUrl} alt='show case image' className={css.image} />
      </Col>
    </Row>
  )
}

export default BannerBottom
