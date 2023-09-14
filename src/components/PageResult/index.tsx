import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { ResultStatusType } from 'antd/lib/result'
type Props = {
  code: ResultStatusType
  title?: string | React.ReactNode
  desc?: string | React.ReactNode
  extra?: React.ReactNode
}
const PageResult = (props: Props) => {
  const {
    code = 404,
    title,
    desc = 'Xin lỗi, trang không tồn tại hoặc đã bị xóa!',
    extra = (
      <Link to='/'>
        <Button type='primary'>Trở về trang chủ</Button>
      </Link>
    )
  } = props
  return <Result status={code} title={title ? title : code} subTitle={desc} extra={extra} />
}

export default PageResult
