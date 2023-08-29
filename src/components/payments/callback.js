import React, { useEffect } from 'react'
import { message as $message } from 'antd'
import './index.scss'
import { useHistory } from 'react-router'
import axiosInstance from '../../utils/axios'
import settings from '../../settings'
import { PAYMENT_CALLBACK_PATH } from '../../constants/paths'
const PaymentCallback = (props) => {
    const params = props.params
    const history = useHistory()

    useEffect(() => {
        if (params) {
            axiosInstance
                .post(settings.API_URL + PAYMENT_CALLBACK_PATH, params)
                .then((res) => {
                    $message.success('Thanh toán thành công')
                    history.push('/point-management')
                })
                .catch((err) => {
                    $message.error('Thanh toán thất bại')
                    history.push('/point-management')
                })
        }
    }, [params])
    return <></>
}
export default PaymentCallback
