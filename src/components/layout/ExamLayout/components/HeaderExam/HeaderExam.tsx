import { AppContext } from '@/contexts/app.context'
import { Col, Row } from 'antd'
import { useContext } from 'react'

export default function HeaderExam() {
  const { profile } = useContext(AppContext)

  return (
    <Row>
      <Col>
        <p>{profile?.fullName}</p>
      </Col>
    </Row>
  )
}
