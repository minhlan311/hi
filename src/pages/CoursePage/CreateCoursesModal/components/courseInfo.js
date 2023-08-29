import React, { useEffect, useState } from 'react'
import Editor from '../../../../components/editor'
import { useMediaQuery } from 'react-responsive'
import { Empty, Form, Input, Modal, Select, Spin, Upload, message } from 'antd'
import { EDUCATION_TYPE } from '../../../../constants'
import { PlusOutlined } from '@ant-design/icons'
import settings from '../../../../settings'
import { UPLOAD_IMAGE } from '../../../../constants/paths'
import { useDispatch, useSelector } from 'react-redux'
import {
    educationsSelector,
    getEducationsRequest,
} from '../../../../slices/education'
import './styles.scss'
import {
    findSubjectRequest,
    subjectsSelector,
} from '../../../../slices/subjects'
import { debounce } from 'lodash'

export default function CourseInfo({ form, data }) {
    const dispatch = useDispatch()
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const [plan, setPlan] = useState(data?.plan)
    const [typePlan, setTypePlan] = useState('POINT')
    const [eduType, setEduType] = useState('')
    const subjectsData = useSelector(subjectsSelector)
    const educations = useSelector(educationsSelector)
    useEffect(() => {
        if (eduType || data) {
            const body = {
                filterQuery: {
                    educationType: eduType || data?.subject?.educationType,
                },
                options: {
                    pagination: false,
                },
            }
            dispatch(getEducationsRequest(body))
        }
    }, [eduType, data])

    const [educationOptions, setEducationOptions] = useState([])
    useEffect(() => {
        if (educations.status === 'success' && educations?.data?.length > 0) {
            const eduList = []
            educations?.data?.forEach((data) =>
                eduList?.push({
                    value: data._id,
                    label: data.name,
                })
            )

            const educationList =
                eduList.length > 0
                    ? [
                          {
                              value: 'all',
                              label: 'Tất cả',
                          },
                          ...eduList,
                      ]
                    : []

            setEducationOptions(educationList)
        }
    }, [educations, data])
    const all = []
    educations?.data?.forEach((item) => all.push(item._id))
    const [searchSj, setSearchSj] = useState('')

    useEffect(() => {
        if ((searchSj !== ' ' && searchSj?.trim()) || data) {
            const payload = {
                filterQuery: {
                    status: 'ACTIVE',
                    search: searchSj,
                    _id: data?.subjectId,
                },
                options: {
                    pagination: false,
                    sort: {
                        position: 1,
                    },
                },
            }
            dispatch(findSubjectRequest(payload))
        }
    }, [searchSj, data])

    // set data subject
    const [subjectOption, setSubjectOptions] = useState([])
    useEffect(() => {
        if (
            subjectsData.status === 'success' &&
            subjectsData?.data?.length > 0 &&
            searchSj
        ) {
            const subjects = []
            subjectsData?.data?.forEach((item) =>
                subjects.push({ label: item.name, value: item._id })
            )
            setSubjectOptions(subjects)
        } else if (
            subjectsData.status === 'success' &&
            subjectsData?.data?.length > 0
        ) {
            const subjects = []
            subjectsData?.data?.forEach((item) =>
                subjects.push({ label: item.name, value: item._id })
            )
            setSubjectOptions(subjects)
        } else if (
            subjectsData.status === 'success' &&
            subjectsData?.data?.length === 0
        ) {
            setSubjectOptions([])
        }
    }, [subjectsData, searchSj, data])

    const [fileList, setFileList] = useState(
        data?.coverMedia
            ? [
                  {
                      uid: '-1',
                      name: 'upload.png',
                      status: 'done',
                      url: settings.FILE_URL + '/' + data.coverMedia,
                  },
              ]
            : []
    )
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')

    const [previewTitle, setPreviewTitle] = useState('')

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
        })

    const propsImageCourse = {
        name: 'image',
        multiple: false,
        maxCount: 1,
        accept: '.png, .jpg, .jpge, .webp',
        listType: 'picture-card',
        fileList: fileList,
        action: settings.FILE_URL + UPLOAD_IMAGE,
        onChange(info) {
            const { status } = info.file

            setFileList(info.fileList)

            if (status === 'done') {
                message.success(`Tải file ${info.file.name} thành công.`)
                form.setFieldValue('coverMedia', info)
            } else if (status === 'error') {
                message.error(`Tải file ${info.file.name} thất bại.`)
            }
        },
        async onPreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj)
            }

            setPreviewImage(file.url || file.preview)
            setPreviewOpen(true)
            setPreviewTitle(
                file.name || file.url?.substring(file.url?.lastIndexOf('/') + 1)
            )
        },
    }

    const propsImageCrop = {
        aspect: 2 / 1,
        rotate: true,
        shape: 'rect',
    }

    const [check, setCheck] = useState(false)

    const handleChangeEdu = (val) => {
        if (val.includes('all')) setCheck(true)
        else setCheck(false)
    }
    useEffect(() => {
        if (check) {
            form.setFieldsValue({
                educations: all,
            })
        } else form.setFieldsValue({ educations: [] })
    }, [check])
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={() => form.submit()}
            onFinishFailed={() => console.log('false')}
            autoComplete="off"
            initialValues={{ plan: 'PREMIUM' }}
        >
            <div className={isMobile || isTablet ? null : 'd-space-flex'}>
                <div style={isMobile || isTablet ? null : { width: '80%' }}>
                    <div
                        className={isMobile || isTablet ? null : 'd-space-flex'}
                    >
                        <div
                            className={`${
                                isMobile ? null : 'd-space-flex'
                            } upload-course`}
                            style={
                                isMobile || isTablet ? null : { width: '30%' }
                            }
                        >
                            <Form.Item
                                name="plan"
                                label="Trạng thái"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn trạng thái!',
                                    },
                                ]}
                                style={
                                    isMobile
                                        ? null
                                        : { width: '65%', marginRight: 10 }
                                }
                            >
                                <Select
                                    placeholder="Chọn phí"
                                    onChange={(e) => {
                                        setPlan(e)
                                        if (e === 'FREE') {
                                            form.setFieldsValue({
                                                cost: undefined,
                                            })
                                        }
                                    }}
                                    options={[
                                        {
                                            label: 'Miễn phí',
                                            value: 'FREE',
                                        },
                                        {
                                            label: 'Trả phí',
                                            value: 'PREMIUM',
                                        },
                                    ]}
                                ></Select>
                            </Form.Item>

                            <Form.Item
                                name="cost"
                                label="Số điểm"
                                rules={[
                                    {
                                        required: plan === 'PREMIUM',
                                        message: 'Vui lòng nhập số điểm',
                                    },
                                    {
                                        validator: (
                                            rule,
                                            value,
                                            callback,
                                            source,
                                            options
                                        ) => {
                                            if (typePlan === 'POINT') {
                                                if (
                                                    value &&
                                                    parseInt(value) < 1
                                                ) {
                                                    callback(
                                                        'Số điểm phải lớn hơn 0'
                                                    )
                                                } else {
                                                    callback()
                                                }
                                            }
                                        },
                                    },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <Input
                                    disabled={
                                        plan === 'FREE' || plan === undefined
                                    }
                                    type="number"
                                    min={0}
                                    placeholder={'Nhập số điểm'}
                                ></Input>
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="name"
                            label="Tiêu đề khóa học"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Tiêu đề khóa học không được bỏ trống!',
                                },
                            ]}
                            style={
                                isMobile || isTablet ? null : { width: '69%' }
                            }
                        >
                            <Input placeholder="Nhập Tiêu đề khóa học" />
                        </Form.Item>
                    </div>

                    <div
                        className={isMobile ? null : 'd-space-flex'}
                        style={isMobile ? null : { margin: '10px 0 15px' }}
                    >
                        <Form.Item
                            label="Khối trường"
                            name="educationType"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Khối trường học không được bỏ trống!',
                                },
                            ]}
                            style={isMobile ? null : { width: '88%' }}
                        >
                            <Select
                                placeholder="Chọn khối trường"
                                options={[
                                    {
                                        value: EDUCATION_TYPE.UNIVERSITY,
                                        label: 'Đại học',
                                    },
                                    {
                                        value: EDUCATION_TYPE.HIGH_SCHOOL,
                                        label: 'Trung học phổ thông',
                                    },
                                ]}
                                onChange={(val) => setEduType(val)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Trường học"
                            name="educations"
                            rules={[
                                {
                                    required: true,
                                    message: 'Trường học không được bỏ trống!',
                                },
                            ]}
                            style={
                                isMobile
                                    ? null
                                    : {
                                          width: '100%',
                                          margin: '0 10px 24px',
                                      }
                            }
                        >
                            <Select
                                disabled={educationOptions.length === 0}
                                mode="multiple"
                                style={{
                                    width: '100%',
                                }}
                                optionLabelProp="label"
                                options={educationOptions}
                                placeholder="Chọn trường học"
                                onChange={handleChangeEdu}
                                maxTagCount="responsive"
                                showSearch
                                filterOption={(i, o) =>
                                    (o?.label?.toLowerCase() ?? '').includes(
                                        i.toLowerCase()
                                    )
                                }
                            ></Select>
                        </Form.Item>

                        <Form.Item
                            label="Môn học"
                            name="subjectId"
                            style={{ width: '100%' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Môn học không được bỏ trống!',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Tìm kiếm và chọn môn học"
                                allowClear
                                showSearch
                                labelInValue
                                filterOption={false}
                                notFoundContent={
                                    subjectsData.status === 'loading' ? (
                                        <div style={{ height: 120 }}>
                                            <Spin
                                                size="small"
                                                style={{ marginTop: 50 }}
                                                tip="Loading..."
                                            >
                                                <div className="content"></div>
                                            </Spin>
                                        </div>
                                    ) : (
                                        <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        ></Empty>
                                    )
                                }
                                onSearch={debounce(
                                    (text) => setSearchSj(text),
                                    800
                                )}
                                options={subjectOption}
                            />
                        </Form.Item>
                    </div>
                </div>
                <Form.Item
                    label="Ảnh khoá học"
                    name="coverMedia"
                    cropOptions={propsImageCrop}
                    style={isMobile ? null : { width: '19%', height: 175 }}
                    className="upload-form"
                >
                    <Upload
                        {...propsImageCourse}
                        style={isMobile ? null : { width: 300, height: 175 }}
                    >
                        {fileList.length >= 1 ? null : <PlusOutlined />}
                    </Upload>
                </Form.Item>
            </div>

            <Form.Item
                name="question"
                innerProps={{
                    data: form.getFieldValue('descriptions'),
                }}
            >
                {' '}
                <Editor
                    handleChange={(value) => {
                        // setContent(value)
                        form.setFieldsValue({
                            question: value,
                        })
                    }}
                    value={data?.descriptions}
                ></Editor>
            </Form.Item>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
            >
                <img
                    alt="example"
                    style={{ width: '100%' }}
                    src={previewImage}
                />
            </Modal>
        </Form>
    )
}
