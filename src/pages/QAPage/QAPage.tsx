import { Col, Row } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './QAPage.scss'
import CateGoriesList from './components/category'
import Questions from './components/question'

export default function QAPage() {
  const [categoryId, setCategoryId] = useState<string>('')

  const useQuery = () => {
    const { search } = useLocation()

    return useMemo(() => new URLSearchParams(search), [search])
  }

  const query = useQuery()

  useEffect(() => {
    const categoryId = query.get('categoryId')

    if (categoryId) {
      setCategoryId(categoryId)
    }
  }, [query])

  return (
    <div id='qa-page_container'>
      <Row gutter={16} justify={'center'}>
        <Col span={7} lg={6} className='position-fixed-div'>
          <CateGoriesList
            setCategoryId={(id: string) => {
              console.log('categoryId', id)
              setCategoryId(id)
            }}
          ></CateGoriesList>
        </Col>
        <Col span={17} lg={18}>
          <Questions categoryId={categoryId} />
        </Col>
      </Row>
    </div>
  )
}
