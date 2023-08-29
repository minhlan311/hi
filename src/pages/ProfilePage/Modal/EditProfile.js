import { Checkbox, Form, Input, message, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { USER_INFO } from '../../../constants/storageKeys'
import { getStorage, setStorage } from '../../../services/storage'
import { updateUserRequest } from '../../../slices/user'
import { useMediaQuery } from 'react-responsive'
import { REGEX_PATTERN } from '../../../constants'

export default function EditProfile(props) {
    const { open, onCancel, setUpdate, userData, educations } = props
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const dispatch = useDispatch()

    const [form] = Form.useForm()

    const [checkedValues, setCheckedValues] = useState([])
    const [inputValues, setInputValues] = useState({})
    const dataEducation = []
    educations &&
        educations?.forEach((item, key) => {
            dataEducation.push({
                value: item._id,
                label: item.name,
                key: key,
            })
        })

    const socialData = [
        { type: 'Facebook' },
        { type: 'Youtube' },
        { type: 'TikTok' },
        { type: 'Instagram' },
    ]

    const handleInputChange = (id, e) => {
        const value = e.target?.value
        const name = e.target?.name
        const newArray = [...inputValues]
        if (name === 'url' && value === '') {
            delete newArray[id].url
        } else {
            newArray[id][name] = value
        }
        setInputValues(newArray)
    }

    form.setFieldsValue({
        fullName: userData?.fullName,
        email: userData?.email,
        phoneNumber: userData?.phoneNumber,
        educationId: userData?.educationId,
    })

    useEffect(() => {
        if (userData?.social?.length > 0) {
            const initialValues = {}
            userData?.social?.forEach((item) => {
                initialValues[item.type] = item.url
            })
            form.setFieldsValue(initialValues)
        }
    }, [userData])

    const onFinish = (values) => {
        const newData = socialData
            .map((item) => {
                const url = values[item.type]
                if (!url) {
                    return null
                }
                return { type: item.type, url }
            })
            .filter((item) => item !== null)

        const payload = {
            ...values,
            social: newData,
        }
        dispatch(updateUserRequest(payload))
        setUpdate(true)
        onCancel(false)
        userData.social = newData
        userData.fullName = values.fullName
        setStorage({
            key: USER_INFO,
            val: userData,
        })

        form.resetFields()
    }

    const onFinishFailed = () => {
        message.error('Vui lòng điền đầy đủ thông tin để tiếp tục!')
    }

    return (
        <Modal
            open={open}
            onOk={form.submit}
            onCancel={() => onCancel(!open)}
            okText="Cập nhật"
            cancelText="Hủy"
            title="Sửa thông tin cá nhân"
            width={isMobile ? '80%' : '25%'}
        >
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
                <Form.Item
                    name="fullName"
                    label="Tên tài khoản"
                    rules={[
                        {
                            required: true,
                            message: 'Tên tài khoản không được bỏ trống!',
                        },
                    ]}
                >
                    <Input placeholder="Nhập tên tài khoản" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email',
                        },
                        {
                            pattern: REGEX_PATTERN.regexEmail,
                            message: `Email hoặc SĐT không hợp lệ!`,
                        },
                    ]}
                >
                    <Input type="email" placeholder="Nhập địa chỉ Email" />
                </Form.Item>
                <Form.Item
                    label="SĐT Zalo"
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại',
                        },
                        {
                            pattern: REGEX_PATTERN.regexPhoneNumber,
                            message: `SĐT không hợp lệ!`,
                        },
                    ]}
                >
                    <Input type="number" placeholder="Nhập số điện thoại" />
                </Form.Item>

                <Form.Item
                    name="educationId"
                    label="Chọn trường học"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn trường để tiếp tục!',
                        },
                    ]}
                >
                    <Select
                        allowClear
                        placeholder="Vui lòng chọn trường học"
                        options={dataEducation}
                    />
                </Form.Item>
                <h3>Mạng xã hội</h3>

                {socialData.map((option) => (
                    <Form.Item
                        key={option.type}
                        name={option.type}
                        label={option.type}
                        rules={[
                            {
                                pattern: REGEX_PATTERN.regexUrl,
                                message: `Link liên kết không hợp lệ!`,
                            },
                        ]}
                    >
                        <Input
                            name={option.type}
                            className="mt-5 mb-10"
                            placeholder={`https://www.${option.type.toLowerCase()}.com/abc...`}
                            value={inputValues[option.type]}
                            onChange={(id, val) => handleInputChange(id, val)}
                        />
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    )
}
