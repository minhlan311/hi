import categoryApi from '@/apis/categories.api'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Card, Skeleton } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CateGoriesList({ categoryId }: { categoryId?: string }) {
  const [categoryIdActive, setCategoryIdActive] = useState<string>('')
  const navigate = useNavigate()
  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => {
      return categoryApi.getCategories({ parentId: null })
    },
  })

  const categoryList = categoriesData?.data?.docs?.find((item) => item.name === 'Khóa học')
  if (categoryList)
    return categoryList.children.map((item) => (
      <Card
        key={item._id}
        size='small'
        hoverable
        style={categoryIdActive === item._id || categoryId === item._id ? { backgroundColor: '#EEEEEE' } : {}}
        onClick={() => {
          setCategoryIdActive(item._id)
          navigate(`?categoryId=${item._id}`)
        }}
      >
        <Card.Meta
          avatar={<Avatar src={`${import.meta.env.VITE_FILE_ENDPOINT + '/' + item.icon}`} />}
          title={<p>{item.name}</p>}
          description={<div dangerouslySetInnerHTML={{ __html: item.description }}></div>}
        />
        {isLoading && (
          <Skeleton loading={isLoading} active avatar>
            <Card.Meta
              avatar={<Avatar src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item.icon} />}
              title={item.name}
              description={item.description}
            />
            {item.content}
          </Skeleton>
        )}
      </Card>
    ))
}
