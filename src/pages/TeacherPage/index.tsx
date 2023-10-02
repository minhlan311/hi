import { useLocation } from 'react-router-dom'
import ChildTeacher from './childTeacher'
import ParentTeacher from './parentTeacher'

type Props = {}

const TeacherPage = (props: Props) => {
  const location = useLocation()
  const slug = location.pathname.split('/')

  if (!slug[2] && !slug[3]) return <div>Đội ngũ giảng viên tại Ucam</div>
  if (slug[2] && !slug[3]) return <ParentTeacher />
  if (slug[1] && slug[2] && slug[3]) return <ChildTeacher />
}

export default TeacherPage
