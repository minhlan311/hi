import Header from '@/components/layout/Header/Header'
import { UserState } from '@/interface/user'
import { Divider } from 'antd'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
type Props = { user: UserState }

const Certificate = ({ user }: Props) => {
  console.log(user)

  return (
    <Header
      title={
        <Divider>
          <VscDebugBreakpointLog />
        </Divider>
      }
      desc={<h3>BẰNG CẤP CỦA TÔI</h3>}
      padding={'25px 0 50px 0'}
      size='sm'
    >
      <div> Bằng cấp</div>
    </Header>
  )
}

export default Certificate
