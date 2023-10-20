/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import openNotification from '@/components/Notification'
import PopConfirmAntd from '@/components/PopConfirmAntd/PopConfirmAntd'
import { imageFallback } from '@/constants/utils'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, Col, Image, Row } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CourseListMentor({ data }: any) {
  const queryClient = useQueryClient()

  const [checkReset, setCheckReset] = useState<boolean>(false)

  const { mutate } = useMutation({
    mutationFn: (id: string) => courseApi.deleteCourses(id),
    onSuccess: (value: any) => {
      queryClient.invalidateQueries({ queryKey: ['course'] })
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: `Xóa khóa học ${value?.data?.name} thành công ! `,
      })
    },
    onError() {
      openNotification({
        status: 'error',
        message: 'Thông báo',
        description: `Có lỗi xảy ra, vui lòng thử lại sau ! `,
      })
    },
  })

  const navigate = useNavigate()
  const { Meta } = Card

  const onConfirm = async (id: string) => {
    mutate(id)
    setCheckReset(!checkReset)
  }

  return (
    <>
      <Row style={{ marginTop: '50px' }} gutter={[20, 20]}>
        {data
          ? data?.docs?.map((item: any) => (
              <>
                <Col>
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
                        <EditOutlined
                          key='edit'
                          onClick={() => {
                            navigate(`/mentor/courses/update/${item._id}`)
                          }}
                        />
                      </>,
                      <PopConfirmAntd
                        desc='Bạn có muốn xóa khóa học này ?'
                        onConfirm={() => {
                          onConfirm(item._id)
                        }}
                      >
                        <DeleteOutlined key='ellipsis' />
                      </PopConfirmAntd>,
                    ]}
                  >
                    <Meta
                      title={item?.name}
                      description={
                        <>
                          <p>Mentor : {item?.mentor?.fullName}</p>
                          {/* <p>{item?.descriptions || 'Không có mô tả'}</p> */}
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
