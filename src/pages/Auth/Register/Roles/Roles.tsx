import './Roles.scss'
import { ROLE } from './constants'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { GiTeacher } from 'react-icons/gi'
import { PiStudentFill } from 'react-icons/pi'

// type Props{}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Roles({ pickRoleChange }: any) {
  const pickRoles = (role: string) => {
    pickRoleChange(role)
  }

  return (
    <div>
      <h3>VAI TRÒ CỦA BẠN</h3>
      <p>Chọn vai trò của bạn để đăng ký phù hợp hơn nhé!</p>
      <div
        className='div-flex'
        onClick={() => {
          pickRoles(ROLE.MENTOR)
        }}
      >
        <div className='div-flex-button'>
          <GiTeacher className='icon' />
          <p className='mentor'> Giảng viên</p>
        </div>

        <div>
          <MdOutlineNavigateNext className='icons' />
        </div>
      </div>

      <div
        className='div-flex'
        onClick={() => {
          pickRoles(ROLE.STUDENT)
        }}
      >
        <div className='div-flex-button'>
          <PiStudentFill className='icon' />
          <p className='mentor'>Học viên</p>
        </div>

        <div>
          <MdOutlineNavigateNext className='icons' />
        </div>
      </div>
    </div>
  )
}
