/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import openNotification from '@/components/Notification'
import PopConfirmAntd from '@/components/PopConfirmAntd/PopConfirmAntd'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import { CoursesState } from '@/interface/courses'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, Flex } from 'antd'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

type Props = {
  data: CoursesState
}

const CourseCard = ({ data }: Props) => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (id: string) => courseApi.deleteCourses(id),
    onSuccess: (value: any) => {
      queryClient.invalidateQueries({ queryKey: ['courseData'] })
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: `Xóa khóa học ${value?.data?.name} thành công!`,
      })
    },
    onError() {
      openNotification({
        status: 'error',
        message: 'Thông báo',
        description: `Có lỗi xảy ra, vui lòng thử lại sau!`,
      })
    },
  })

  return (
    <Card
      hoverable
      cover={
        <ImageCustom
          preview={false}
          height='180px'
          width='100%'
          src={import.meta.env.VITE_FILE_ENDPOINT + '/' + data?.coverMedia}
          onClick={() => navigate('/courses/' + data._id)}
        />
      }
      actions={[
        <BiEdit
          key='edit'
          onClick={() => {
            navigate(`/mentor/courses/update/${data._id}`)
          }}
          size={18}
        />,
        <PopConfirmAntd
          key='delete'
          desc='Bạn có muốn xóa khóa học này ?'
          onConfirm={() => {
            mutate(data._id)
          }}
        >
          <MdDelete key='ellipsis' size={18} />
        </PopConfirmAntd>,
      ]}
    >
      <Card.Meta
        title={data.name}
        description={
          <div>
            <p>Mentor: {data.mentor.fullName}</p>
            <Flex align='center' gap={5}>
              Giá:
              <PriceCalculator price={data.plan === 'FREE' ? 0 : data.cost} discount={0} showTotal priceSize={14} />
            </Flex>
          </div>
        }
      />
    </Card>
  )
}

export default CourseCard
