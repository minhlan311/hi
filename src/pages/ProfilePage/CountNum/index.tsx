import { Col, Row, Space } from 'antd'
import css from './styles.module.scss'

const CountNum = () => {
  return (
    <div className={css.countNum}>
      <Row>
        <Col span={24} md={8}>
          <Space direction='vertical' align='center' className={`${css.count} sp100`}>
            <div className={css.title}> 50.000 +</div>
            <div className={css.line}></div>
            <p className={css.desc}>học sinh đang theo dõi</p>
          </Space>
        </Col>
        <Col span={24} md={8}>
          <Space direction='vertical' align='center' className={`${css.count} sp100`}>
            <div className={css.title}> 450 +</div>
            <div className={css.line}></div>
            <p className={css.desc}>bài giảng online</p>
          </Space>
        </Col>
        <Col span={24} md={8}>
          <Space direction='vertical' align='center' className={`${css.count} sp100`}>
            <div className={css.title}>11 +</div>
            <div className={css.line}></div>
            <p className={css.desc}>năm kinh nghiệm</p>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default CountNum
