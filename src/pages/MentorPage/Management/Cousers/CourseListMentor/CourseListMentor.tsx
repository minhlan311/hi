import courseApi from '@/apis/course.api'
import { imageFallback } from '@/constants/utils'
import { TCourse } from '@/types/course.type'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Card, Col, Image, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import PopConfirmAntd from '@/components/PopConfirmAntd/PopConfirmAntd'
type Props = {
  data: TCourse[]
  reset: (reset: boolean) => void
}

export default function CourseListMentor({ data, reset }: Props) {
  const [checkReset, setCheckReset] = useState<boolean>(false)
  const { mutate } = useMutation({ mutationFn: (id: string) => courseApi.deleteCourses(id) })

  const navigate = useNavigate()
  const { Meta } = Card

  useEffect(() => {
    reset(checkReset)
  }, [checkReset])

  const onConfirm = async (id: string) => {
    mutate(id)
    setCheckReset(!checkReset)
  }

  return (
    <>
      <Row style={{ marginTop: '50px' }} gutter={[20, 20]}>
        {data
          ? data?.map((item) => (
              <>
                <Col>
                  {' '}
                  <Card
                    style={{ width: 300 }}
                    cover={
                      <Image
                        onClick={() => {
                          navigate(`/courses/${item._id}`)
                        }}
                        height={'150px'}
                        alt='example'
                        src={import.meta.env.VITE_FILE_ENDPOINT + `/` + item?.coverMedia}
                        fallback={imageFallback}
                      />
                    }
                    actions={[
                      <>
                        <EditOutlined key='edit' />
                      </>,
                      <PopConfirmAntd
                        desc='Bạn có muốn xóa khóa học này ?'
                        onConfirm={() => {
                          onConfirm(item._id)
                        }}
                      >
                        <DeleteOutlined key='ellipsis' />
                      </PopConfirmAntd>
                    ]}
                  >
                    <Meta
                      title={item?.name}
                      description={
                        <>
                          <p>Mentor : {item?.mentor?.fullName}</p>
                          <p>{item?.descriptions || 'Không có mô tả'}</p>
                        </>
                      }
                    />
                  </Card>
                </Col>
              </>
            ))
          : 'Không có dữ liệu'}
      </Row>
    </>
  )
}
