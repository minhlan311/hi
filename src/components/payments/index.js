import { Button, Modal, Space, message } from 'antd'
import React, { memo } from 'react'

import { TRANSACTION_PATH } from '../../constants/paths'
import { USER_INFO } from '../../constants/storageKeys'
import { getStorage } from '../../services/storage'
import settings from '../../settings'
import axiosInstance from '../../utils/axios'

const Payments = (props) => {
    const { isModalOpen, onCancel, data, handleCode, targetModel } = props

    const user = getStorage(USER_INFO)
    const title = () => {
        switch (targetModel) {
            case 'DOCUMENT':
                return 'Tài liệu: ' + data.name
            case 'COURSE':
                return 'Khóa học: ' + data.name
            case 'TEST':
                return 'Đề thi: ' + data.name
            case 'QUIZ':
                return 'Đề thi: ' + data.name
            default:
                return 'Tài liệu: ' + data.name
        }
    }

    const createPayment = (paymentMethod) => {
        if (paymentMethod === 'point') {
            const payload = {
                targetModel: !targetModel ? 'DOCUMENT' : targetModel,
                target: data,
                userId: user?._id,
                value: data?.cost,
                type: 'WITHDRAW',
            }
            axiosInstance
                .post(settings.API_URL + TRANSACTION_PATH, payload)
                .then((res) => {
                    if (res.status === 201) {
                        message.success(res.data.message)
                        setTimeout(() => {
                            message.success('Xin chờ tải lại trang')
                        }, 1000)
                        setTimeout(() => {
                            window.location.reload()
                        }, 2000)
                    }
                })
                .catch((err) => {
                    message.error(err?.response?.data?.message)
                })
        } else if (paymentMethod === 'code') {
            handleCode()
        }
    }
    return (
        <Modal
            title={title()}
            open={isModalOpen}
            footer={
                <>
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => createPayment('point')}
                        >
                            Điểm
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => createPayment('code')}
                        >
                            Nhập code
                        </Button>
                        <Button onClick={() => onCancel()}>Hủy</Button>
                    </Space>
                </>
            }
            onCancel={onCancel}
        >
            <p>
                <b>Điểm: </b>{' '}
                <span style={{ color: 'red' }}>
                    {data.cost ? `${data.cost}A+` : 0}
                </span>
            </p>
            <p>Bạn có thể mua bằng điểm hoặc nhập code.</p>
        </Modal>
    )
}

export default memo(Payments)
