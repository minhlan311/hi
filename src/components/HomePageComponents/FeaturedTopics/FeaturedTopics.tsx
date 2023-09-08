import { Link } from 'react-router-dom'
import css from './FeaturedTopics.module.scss'
import { Col, Row, Space } from 'antd'
import { TopicList } from '~/interface/topic'
import ButtonCustom from '~/components/ButtonCustom/ButtonCustom'

type Props = {
  data: TopicList[]
  buttonText?: string
  buttonHref?: string
}
const FeaturedTopics = (props: Props) => {
  const { data, buttonText, buttonHref } = props
  return (
    <div>
      <Row gutter={24} className={css.body}>
        {data.map((item) => (
          <Col span={24} md={24 / data.length} key={item.id}>
            <h4 className={css.cateTitle}>{item.category}</h4>
            <Space direction='vertical' className={css.item}>
              {item.topics?.map((tp) => (
                <Space direction='vertical' size='large' key={tp.id}>
                  <Link to={tp.href} className={css.topicTitle}>
                    {tp.topicName}
                  </Link>
                  <p className={css.studentCount}>{parseInt(tp.studentsEnrolled).toLocaleString('ja-JP')} 学生</p>
                </Space>
              ))}
            </Space>
          </Col>
        ))}
      </Row>
      {buttonText && (
        <ButtonCustom href={buttonHref || '/'} style={{ fontWeight: 700 }}>
          {buttonText}
        </ButtonCustom>
      )}
    </div>
  )
}

export default FeaturedTopics
