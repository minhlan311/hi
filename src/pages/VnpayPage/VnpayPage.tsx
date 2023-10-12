/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable padding-line-between-statements */
import vnpayApi from '@/apis/vnpay.api'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './VnpayPage.scss'

export default function VnpayPage() {
  const location = useLocation()
  const [status, setStatus] = useState('')

  function convertSearchParamsToObject(searchParams: any) {
    const obj: any = {}
    for (let [key, value] of searchParams.entries()) {
      obj[key] = value
    }
    return obj
  }

  const queryParams = new URLSearchParams(location.search)

  const paymentData = convertSearchParamsToObject(queryParams)

  const mutate = useMutation({
    mutationFn: (body: { value: any }) => vnpayApi.callback(body),
    onSuccess: (data) => {
      setStatus(data?.data?.status as any)
      setTimeout(() => {
        window.close()

        if (window.opener) {
          window.opener.window.location.reload()
        }
      }, 3000)
    },
  })

  useEffect(() => {
    mutate.mutate(paymentData)
  }, [location])

  return (
    <div className='div-flex-vnpay'>
      {status === 'SUCCESS' ? (
        <>
          <h1>Thanh toán đơn hàng thành công ! tự động chuyển hướng về khóa học sau 3s</h1>
        </>
      ) : (
        <h1>Đang kiểm tra thanh toán...</h1>
      )}
    </div>
  )
}
