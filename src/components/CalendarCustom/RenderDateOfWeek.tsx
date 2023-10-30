/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space } from 'antd'
import { Dayjs } from 'dayjs'
import { useState } from 'react'

type Props = {
  buttonAdd?: React.ReactNode
  children: React.ReactNode
  setCallBackWeekSelect: React.Dispatch<React.SetStateAction<any>>
}

const RenderDateOfWeek = (props: Props) => {
  const { buttonAdd, children, setCallBackWeekSelect } = props
  const [dateOfWeek, setDateOfWeek] = useState<Dayjs[]>([])

  return <Space direction='vertical' size='large' className='sp100'></Space>
}

export default RenderDateOfWeek
