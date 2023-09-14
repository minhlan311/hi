import './Roles.scss'
import { Button } from 'antd'
import { ROLE } from './constants'
import { useState } from 'react'

// type Props{}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Roles({ pickRoleChange }: any) {
  const [active, setActive] = useState<string>(ROLE.MENTOR)

  const pickRoles = (role: string) => {
    pickRoleChange(role)
    setActive(role)
  }

  return (
    <div>
      <h3>VAI TRÒ CỦA BẠN</h3>
      <p>Chọn vai trò của bạn để đăng ký phù hợp hơn nhé!</p>
      <Button
        className={`${active === ROLE.MENTOR ? 'buttonMentor activeButton' : 'buttonMentor'}`}
        onClick={() => {
          pickRoles(ROLE.MENTOR)
        }}
      >
        Giảng Viên
      </Button>
      <Button
        disabled
        className={`${active === ROLE.STUDENT ? 'activeButton' : ''}`}
        onClick={() => {
          pickRoles(ROLE.STUDENT)
        }}
      >
        Học Viên
      </Button>
    </div>
  )
}
