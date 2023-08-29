import { Form, Input, InputNumber, Modal, Select, message } from 'antd'
import React from 'react'
import axiosInstance from '../../../../utils/axios'
import settings from '../../../../settings'
import bankData from '../../bank.json'
import { TRANSACTION_PATH } from '../../../../constants/paths'
import { getStorage } from '../../../../services/storage'
import { USER_INFO } from '../../../../constants/storageKeys'
export default function ModalPoint({ type, open, onClose }) {
    const bank = []
    bankData.banksnapas.forEach((item) =>
        bank.push({
            value: item.name + ' - ' + item.code,
            label: item.name + ' - ' + item.code,
        })
    )
    const user = getStorage(USER_INFO)

    const [form] = Form.useForm()
    form.setFieldsValue({ score: 50 })

    const handleOnfinish = (values) => {
        if (type === 'add') {
            axiosInstance
                .post(`${settings.API_URL}/vnpay/checkout`, {
                    value: values.value,
                })
                .then((res) => {
                    const a = document.createElement('a')
                    a.href = res.data.url
                    a.target = '_blank'
                    a.click()
                    a.remove()
                })
        } else {
            axiosInstance
                .post(`${settings.API_URL}${TRANSACTION_PATH}`, {
                    bank: values.bank,
                    cardNumber: values.cardNumber,
                    fullName: values.fullName,
                    value: values.value,
                    note: values.note,
                    userId: user._id,
                    type: 'WITHDRAW',
                })
                .then((res) => {
                    message.success(
                        'Rút điểm thành công. Vui lòng chờ xác nhận'
                    )
                    onClose()
                })
                .catch((err) => {
                    message.error('Rút điểm thất bại')
                })
        }
    }

    return (
        <div>
            <Modal
                title={type === 'add' ? 'Thêm điểm' : 'Rút điểm'}
                onCancel={onClose}
                open={open}
                cancelText="Hủy"
                okText="Xác nhận"
                onOk={form.submit}
            >
                <Form layout="vertical" form={form} onFinish={handleOnfinish}>
                    {type === 'add' ? (
                        <Form.Item
                            label="Số điểm cần thêm"
                            name="value"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điểm cần thêm',
                                },
                            ]}
                        >
                            <InputNumber
                                addonAfter={'A+'}
                                min={50}
                                precision={0}
                                placeholder="50"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    ) : (
                        <>
                            <Form.Item
                                label="Chọn ngân hàng"
                                name="bank"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui chọn ngân hàng',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn ngân hàng"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '')
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui chọn ngân hàng',
                                        },
                                    ]}
                                    options={bank}
                                ></Select>
                            </Form.Item>
                            <Form.Item
                                label="Số tài khoản"
                                name="cardNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Số tài khoản',
                                    },
                                ]}
                            >
                                <Input
                                    type="number"
                                    placeholder="Nhập Số tài khoản"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Họ Tên chủ tài khoản"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập Họ Tên chủ tài khoản',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập Họ Tên chủ tài khoản" />
                            </Form.Item>
                            <Form.Item
                                label="Số điểm cần rút"
                                name="value"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập số điểm cần rút',
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="Nhập số điểm cần rút"
                                    addonAfter={'A+'}
                                    min={30}
                                    precision={0}
                                    style={{ width: '100%' }}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập số điểm cần rút',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item label="Ghi chú" name="note">
                                <Input.TextArea placeholder="Nhập ghi chú" />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>
        </div>
    )
}
