import { Button, Result } from 'antd'
import { ResultStatusType } from 'antd/lib/result'
import React from 'react'
import { useNavigate } from 'react-router-dom'
type Props = {
  code?: ResultStatusType
  title?: string | React.ReactNode
  desc?: string | React.ReactNode
  extra?: React.ReactNode
}

const PageResult = (props: Props) => {
  const navigate = useNavigate()
  const {
    code = 404,
    title,
    desc = 'Xin lỗi, trang không tồn tại hoặc đã bị xóa!',
    extra = (
      <Button type='primary' onClick={() => navigate(-1)}>
        Quay lại trang trước đó
      </Button>
    ),
  } = props

  return <Result status={code} title={title ? title : code} subTitle={desc} extra={extra} />
}

export default PageResult
