import { BsCheckLg } from 'react-icons/bs'
import './IconCheck.scss'
export default function IconCheck(style: React.CSSProperties) {
  return (
    <div>
      <div className='iconTopBox' style={style}>
        <BsCheckLg className='icons-steps iconTop' />
      </div>
    </div>
  )
}
