import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import { Flex, Space } from 'antd'
import { GiTeacher } from 'react-icons/gi'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { PiStudentFill } from 'react-icons/pi'
import { ROLE } from './constants'

// type Props{}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Roles({ pickRoleChange }: any) {
  const pickRoles = (role: string) => {
    pickRoleChange(role)
  }

  return (
    <Space direction='vertical' className='sp100'>
      <h3>VAI TRÒ CỦA BẠN</h3>
      <p>Chọn vai trò của bạn để đăng ký phù hợp hơn nhé!</p>

      <ButtonCustom
        onClick={() => {
          pickRoles(ROLE.MENTOR)
        }}
        icon={<GiTeacher />}
        size='large'
        className='sp100'
      >
        <Flex justify='space-between' align='center'>
          <b> Giảng viên</b>
          <MdOutlineNavigateNext />
        </Flex>
      </ButtonCustom>

      <ButtonCustom
        onClick={() => {
          pickRoles(ROLE.STUDENT)
        }}
        icon={<PiStudentFill />}
        size='large'
        className='sp100'
      >
        <Flex justify='space-between' align='center'>
          <b className='sp100'>Học viên</b>
          <MdOutlineNavigateNext />
        </Flex>
      </ButtonCustom>
    </Space>
  )
}
