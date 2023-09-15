import courseApi from '@/apis/course.api'
import { imageFallback } from '@/constants/utils'
import { TCourse } from '@/types/course.type'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Card, Col, Image, Popconfirm, Row, notification } from 'antd'
type Props = {
  data: TCourse[]
}

export default function CourseListMentor({ data }: Props) {
  const { Meta } = Card
  console.log(data, ',data')

  const onConfirm = async (ids: string) => {
    const dataDelete = await courseApi.deleteCourses(ids)
    if (dataDelete) {
      notification.open({
        type: 'success',
        message: 'Thông báo',
        description: 'Đã xóa thành công khóa học'
      })
    }
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
                        height={'150px'}
                        alt='example'
                        src={import.meta.env.VITE_FILE_ENDPOINT + `/` + item?.coverMedia}
                        fallback={imageFallback}
                      />
                    }
                    actions={[
                      <EditOutlined key='edit' />,
                      <Popconfirm
                        destroyTooltipOnHide
                        arrow
                        title='Thông báo'
                        description='Bạn có muốn xóa khóa học này?'
                        onConfirm={() => onConfirm(item._id)}
                        okText='Yes'
                        cancelText='No'
                      >
                        <DeleteOutlined key='ellipsis' />
                      </Popconfirm>
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
