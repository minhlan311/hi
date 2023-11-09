import { Col, Layout, Row } from 'antd'
const { Content } = Layout
import './QAPage.scss'
import CateGoriesList from './components/category'
import { useState, useEffect, useMemo } from 'react'
import Questions from './components/question'
import { useLocation } from 'react-router-dom'

export default function QAPage() {
  const [categoryId, setCategoryId] = useState<string>('')

  useEffect(() => {
    console.log(categoryId)
  }, [categoryId])

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
    <Content id='qa-page_container'>
      <Row gutter={16}>
        <Col span={7} lg={6}>
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
    </Content>
  )
}
