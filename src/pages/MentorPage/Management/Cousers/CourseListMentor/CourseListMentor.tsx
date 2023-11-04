/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import openNotification from '@/components/Notification'
import PopConfirmAntd from '@/components/PopConfirmAntd/PopConfirmAntd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, Col, Row } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CourseListMentor.scss'

export default function CourseListMentor({ data }: any) {
  console.log(data, 'lolpwodpwld')

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
      <div className='scroll-x-div'>
        <Row style={{ marginTop: '50px', width: '100%' }} gutter={[20, 20]}>
          {data
            ? data?.docs?.map((item: any) => (
                <>
                  <Col xs={24} md={12} lg={6}>
                    <Card
                      cover={
                        <ImageCustom
                          onClick={() => {
                            navigate(`/courses/${item._id}`)
                          }}
                          width='100%'
                          height={'150px'}
                          src={import.meta.env.VITE_FILE_ENDPOINT + `/` + item?.coverMedia}
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
      </div>
    </>
  )
}
