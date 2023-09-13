import './Roles.scss'
import { Button } from 'antd'
import { ROLE } from './constants'

// type Props{}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Roles({ pickRoleChange }: any) {
  //   const [pickRole, setRole] = useState('')

  const pickRoles = (role: string) => {
    pickRoleChange(role)
  }

  return (
    <div>
      <h3>VAI TRÒ CỦA BẠN</h3>
      <p>Chọn vai trò của bạn để đăng ký phù hợp hơn nhé!</p>
      <Button
        onClick={() => {
          pickRoles(ROLE.MENTOR)
        }}
      >
        Giảng Viên
      </Button>
      <Button
        onClick={() => {
          pickRoles(ROLE.STUDENT)
        }}
      >
        Học Viên
      </Button>
    </div>
  )
}
