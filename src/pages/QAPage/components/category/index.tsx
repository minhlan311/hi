import { CategoryState } from '@/interface/category'
import { Avatar, Divider, List, Skeleton } from 'antd'

import InfiniteScroll from 'react-infinite-scroll-component'

import { useQuery } from '@tanstack/react-query'
import categoryApi from '@/apis/categories.api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
interface ICateGoriesListProps {
  setCategoryId: (id: string) => void
}

export default function CateGoriesList(props: ICateGoriesListProps) {
  const { setCategoryId } = props
  const [page, setPage] = useState<number>(1)

  const [categoryIdActive, setCategoryIdActive] = useState<string>('')

  const [categoryAll, setCategoryAll] = useState<CategoryState[]>([])

  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryFn: () =>
      categoryApi.getCategories(
        {
          parentId: '64ffde9c746fe5413cf8d1af',
        },
        {
          limit: 12,
          page,
        },
      ),
    queryKey: ['getCategoryCourse', page],
  })

  const categoryList = data?.data?.docs
  useEffect(() => {
    if (categoryList) {
      setCategoryAll((categoryAll) => [...categoryAll, ...categoryList])
    }
  }, [categoryList])

  return (
    <>
      <div id='scrollableDiv'>
        <InfiniteScroll
          dataLength={categoryList && categoryList.length ? categoryList.length : 10}
          next={() => setPage((page) => page + 1)}
          hasMore={categoryList && categoryList.length ? categoryList.length < 50 : false}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget='scrollableDiv'
        >
          <List
            itemLayout='horizontal'
            dataSource={categoryAll}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  setCategoryIdActive(item._id)
                  setCategoryId(item._id)
                  navigate('/hoi-dap?categoryId=' + item._id)
                }}
                className='category_list'
                style={categoryIdActive === item._id ? { backgroundColor: '#EEEEEE' } : {}}
              >
                <List.Item.Meta
                  avatar={<Avatar src={`${item.icon}`} />}
                  title={<p>{item.name}</p>}
                  description={
                    <>
                      <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                    </>
                  }
                />
                {isLoading && (
                  <Skeleton loading={isLoading} active avatar>
                    <List.Item.Meta
                      avatar={<Avatar src={item.icon} />}
                      title={item.name}
                      description={item.description}
                    />
                    {item.content}
                  </Skeleton>
                )}
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  )
}
