import Header from '@/components/layout/Header/Header'
import useResponsives from '@/hooks/useResponsives'
import { Card, Col, Row } from 'antd'
import { useSearchParams } from 'react-router-dom'
import './QAPage.scss'
import CateGoriesList from './components/category'
import Questions from './components/question'

export default function QAPage() {
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId')
  const { md, sm } = useResponsives()

  return (
    <Header padding={'50px 0'} title='Hỏi đáp'>
      <Row gutter={[24, 24]}>
        <Col span={24} lg={6} className={sm && md ? '' : 'sticky'}>
          <Card className='category_card' style={{ height: sm && md ? undefined : 'calc(100vh - 30px)' }}>
            <CateGoriesList categoryId={categoryId!} />
          </Card>
        </Col>
        <Col span={24} lg={18}>
          <Questions categoryId={categoryId!} />
        </Col>
      </Row>
    </Header>
  )
}
