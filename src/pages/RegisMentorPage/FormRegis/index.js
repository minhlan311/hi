import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    educationsSelector,
    getEducationsRequest,
} from '../../../slices/education'
import { Button, Form, List, Select, Upload } from 'antd'
import settings from '../../../settings'
import { UPLOAD_CERTIFICATES } from '../../../constants/paths'
import { PaperClipOutlined, PlusOutlined } from '@ant-design/icons'
import axios from 'axios'
import { USER_INFO } from '../../../constants/storageKeys'
import { getStorage } from '../../../services/storage'
import { useMediaQuery } from 'react-responsive'

export default function FormRegis({ form }) {
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })

    const dispatch = useDispatch()
    const user = getStorage(USER_INFO)
    const educations = useSelector(educationsSelector)

    const [educationType, setEducationType] = useState('')
    const [educationId, setEducationId] = useState('')

    useEffect(() => {
        if (educationId) setEducationType(educationId)
        else setEducationType(user.educationType)
    }, [educationId])

    useEffect(() => {
        const payload = {
            filterQuery: {
                educationType: educationType,
            },
            options: {
                pagination: false,
            },
        }
        dispatch(getEducationsRequest(payload))
    }, [educationType])

    const education = []
    educations?.data?.forEach((o) =>
        education.push({
            value: o._id,
            label: o.name,
        })
    )

    const [loading, setLoading] = useState(false)

    const onPreview = async (file) => {
        let src = file.url
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader()
                reader.readAsDataURL(file.originFileObj)
                reader.onload = () => resolve(reader.result)
            })
        }
        const image = new Image()
        image.src = src
        const imgWindow = window.open(src)
        imgWindow?.document.write(image.outerHTML)
    }
    const props = {
        name: 'image',
        multiple: true,
        accept: '.png, .jpg, .jpge, .webp, .docx, .doc, .pdf',
        onChange(info) {
            if (info.file.status === 'uploading') {
                setLoading(true)
            }
            if (info.file.status === 'done') {
                setLoading(false)
                return info.file.response
            } else if (info.file.status === 'error') {
                setLoading(false)
            }
        },
        onPreview: onPreview,
        customRequest: async ({ onSuccess, onError, file }) => {
            const formData = new FormData()
            formData.append('certificate', file)
            formData.append('subjectIds', '')

            try {
                const response = await axios.post(
                    settings.FILE_URL + UPLOAD_CERTIFICATES,
                    formData
                )
                const data = response.data
                onSuccess(data)
            } catch (error) {
                onError(error)
            }
        },
    }

    return (
        <>
            <h3
                style={{
                    position: 'sticky',
                    top: 0,
                    background: 'white',
                    zIndex: 10,
                    margin: 0,
                }}
            >
                Thông tin đào tạo
            </h3>
            <Form.Item
                name="universityDegree"
                label="Trình độ đào tạo"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn trình độ đào tạo!',
                    },
                ]}
            >
                <Select
                    placeholder={'Chọn trình độ đào tạo'}
                    disabled={educationType ? false : true}
                >
                    <Select.Option value="Cử nhân">Cử nhân</Select.Option>
                    <Select.Option value="Thạc Sĩ">Thạc Sĩ</Select.Option>
                    <Select.Option value="Tiến Sĩ">Tiến Sĩ</Select.Option>
                    <Select.Option value="Phó GS">Phó GS</Select.Option>
                    <Select.Option value="Khác">Khác</Select.Option>
                </Select>
            </Form.Item>
            <Form.List
                name="certificate"
                initialValue={[
                    {
                        files: [],
                    },
                ]}
            >
                {(fields, { add, remove }) => {
                    return (
                        <>
                            <List
                                dataSource={fields}
                                renderItem={({ key, name, ...field }) => (
                                    <List.Item
                                        style={{
                                            padding: '0 0 10px 0',
                                        }}
                                        key={key}
                                    >
                                        <div
                                            className="d-col-c"
                                            style={{ width: '100%' }}
                                        >
                                            <b
                                                style={{
                                                    position: 'sticky',
                                                    top: 0,
                                                    background: 'white',
                                                    zIndex: 10,
                                                    margin: 0,
                                                    width: '100%',
                                                    padding: '10px 0',
                                                }}
                                            >
                                                <h4>
                                                    {name === 1
                                                        ? 'Bằng cấp - Chứng chỉ khác'
                                                        : null}
                                                </h4>

                                                {name === 0
                                                    ? 'Bằng cấp - Chứng chỉ Cao nhất'
                                                    : 'Bằng cấp - Chứng chỉ ' +
                                                      name}
                                            </b>
                                            <div style={{ width: '100%' }}>
                                                <Form.Item
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    {...field}
                                                    label="Bằng cấp - Chứng chỉ liên quan"
                                                    name={[name, 'files']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Vui lòng upload chứng chỉ liên quan!',
                                                        },
                                                    ]}
                                                >
                                                    <Upload
                                                        {...props}
                                                        listType="picture"
                                                    >
                                                        <Button
                                                            icon={
                                                                <PaperClipOutlined />
                                                            }
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            disabled={
                                                                loading ||
                                                                educationType
                                                                    ? false
                                                                    : true
                                                            }
                                                        >
                                                            {loading
                                                                ? 'Đang tải lên...'
                                                                : 'Tải lên'}
                                                        </Button>
                                                    </Upload>
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <Button
                                                        onClick={() =>
                                                            remove(name)
                                                        }
                                                        danger
                                                        style={
                                                            isMobile
                                                                ? {
                                                                      width: '100%',
                                                                      marginBottom: 15,
                                                                  }
                                                                : {
                                                                      width: 'auto',
                                                                      marginBottom: 15,
                                                                  }
                                                        }
                                                    >
                                                        Xóa
                                                    </Button>
                                                ) : null}
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                            />

                            <Form.Item>
                                <Button
                                    onClick={() => {
                                        add()
                                    }}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Thêm
                                </Button>
                            </Form.Item>
                        </>
                    )
                }}
            </Form.List>
        </>
    )
}
