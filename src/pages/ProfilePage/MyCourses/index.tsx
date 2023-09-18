import courseApi from '@/apis/course.api'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import Header from '@/components/layout/Header/Header'
import { UserState } from '@/interface/user'
import { useQuery } from '@tanstack/react-query'
import { Divider } from 'antd'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
type Props = { user: UserState }

const MyCourses = ({ user }: Props) => {
  const { data: courseData } = useQuery({
    queryKey: ['coursesByMentor'],
    queryFn: () => {
      return courseApi.getCourses({ filterQuery: { mentorId: user._id } })
    }
  })
  const courses = courseData?.data.docs

  return (
    <div>
      <Header
        title={
          <Divider>
            <VscDebugBreakpointLog />
          </Divider>
        }
        desc={<h3>KHÓA HỌC CỦA TÔI</h3>}
        padding={'25px 0 50px 0'}
        size='sm'
      >
        <div>{courses?.length === 0 ? <EmptyCustom description='Hiện không có khóa học nào' /> : <p></p>}</div>
      </Header>
    </div>
  )
}

export default MyCourses
