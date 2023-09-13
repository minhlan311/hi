import css from './Introduce.module.scss'
import { Col, Row, Space } from 'antd'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
const Introduce = () => {
  const data = {
    title: 'チームを強化し、業界をリードする',
    desc: 'Udemyがスキルを前進させるための戦略的学習パートナーになります。',
    intro: '※Udemy Businessのご契約は20名様～承っております。'
  }

  return (
    <Row className={css.connect} justify='space-between' align='middle'>
      <Col span={24} md={15} className={css.introList}>
        <h2 className={css.title}>{data.title}</h2>
        <h1>{data.desc}</h1>
        <p>{data.intro}</p>
      </Col>

      <Col span={24} md={7}>
        <Space size='large' direction='vertical'>
          <ButtonCustom href='/' type='primary' className={css.button}>
            お問い合わせはこちら {'>'}
          </ButtonCustom>
          <ButtonCustom href='/' className={css.button}>
            無料トライアルはこちら {'>'}
          </ButtonCustom>
        </Space>
      </Col>
    </Row>
  )
}

export default Introduce
