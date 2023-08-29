import {
    Button,
    Modal,
    Form,
    Input,
    Row,
    Select,
    Checkbox,
    message,
    Upload,
    Col,
} from 'antd'
import ImgCrop from 'antd-img-crop'
import settings from '../../../settings'
import { v4 as autoGenerateId } from 'uuid'
import {
    educationDetailSelector,
    educationsSelector,
    getEducationsRequest,
} from '../../../slices/education'
import { useDispatch, useSelector } from 'react-redux'
import { USER_INFO } from '../../../constants/storageKeys'
import { getStorage } from '../../../services/storage'
import { DOCUMENT_TYPE } from '../../../constants'
import { UPLOAD_ATTACHMENT, UPLOAD_IMAGE } from '../../../constants/paths'
import { InboxOutlined } from '@ant-design/icons'
import React, { useEffect, useMemo, useState } from 'react'
import {
    documentDetailSelector,
    getDocumentDetailRequest,
    updateDocumentRequest,
} from '../../../slices/document'

import './styles.scss'
import { useMediaQuery } from 'react-responsive'
import Editor from '../../../components/editor'
const { Dragger } = Upload

export const DocumentUploadModal = ({
    showModalUpload,
    setShowModalUpload,
    setUpdateSuccess,
    documentId,
    setDocumentId,
    setCountUpdate,
}) => {
    const dispatch = useDispatch()
    const [fileList, setFileList] = useState([])
    const [description, setDescription] = useState('')
    const [defaultValue, setDefaultValue] = useState({})
    const [defaultFileListAttchement, setDefaultFileListAttchement] = useState(
        []
    )
    const user = getStorage(USER_INFO)
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const [form] = Form.useForm()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    }

    const document = useSelector(documentDetailSelector)
    useEffect(() => {
        dispatch(getDocumentDetailRequest(documentId))
    }, [documentId, dispatch])
    useEffect(() => {
        if (document.data) {
            if (document.data.image) {
                setFileList([
                    {
                        uid: autoGenerateId(),
                        name: document.data.image,
                        status: 'done',
                        url: settings.FILE_URL + '/' + document.data.image,
                        response: [document.data.image],
                    },
                ])
                setCheckedList(document?.data?.educations)
                setDescription(document?.data?.description)
                setDefaultFileListAttchement(
                    document?.data?.files?.map((attachment) => {
                        return {
                            uid: autoGenerateId(),
                            name: attachment.name,
                            status: 'done',
                            type: attachment.type,
                            url: settings.FILE_URL + '/' + attachment.url,
                        }
                    })
                )
                setDefaultValue({
                    name: document?.data?.name,
                    isDownloadable: document?.data?.isDownloadable,
                    plan: document?.data?.plan,
                    subjectId: document?.data?.subjectId?._id,
                    type: document?.data?.type,
                    educations: document?.data?.educations,
                })
            }
        }
    }, [document])

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
    const propsImageDocument = {
        name: 'image',
        action: settings.FILE_URL + UPLOAD_IMAGE,
        listType: 'picture-card',
        fileList: fileList,
        onChange: onChange,
        onPreview: onPreview,
    }
    const propsImageCrop = {
        aspect: 2 / 1,
        rotate: true,
        shape: 'rect',
    }

    const userInfo = useMemo(() => getStorage(USER_INFO), [])

    const [checkedList, setCheckedList] = useState([])
    const [checkAll, setCheckAll] = useState(false)
    const educationInfo = useSelector(educationDetailSelector)
    const educations = useSelector(educationsSelector)
    const [subjects, setSubjects] = useState([])
    const [plan, setPlan] = useState('PREMIUM')
    const [typePlan, setTypePlan] = useState('POINT')
    const educationOptions =
        educations.data.length > 0
            ? educations.data.map((education) => {
                  return {
                      label: education.name,
                      value: education.id,
                      disabled: false,
                  }
              })
            : []
    useEffect(() => {
        if (educationInfo) {
            setSubjects(educationInfo.data?.subjects)
        }
    }, [educationInfo])
    educations?.data?.forEach((data) =>
        educationOptions.push({
            value: data._id,
            label: data.name,
        })
    )
    const uniqueSubject = Array.from(new Set(subjects?.map((a) => a?._id))).map(
        (id) => {
            return subjects?.find((a) => a?._id === id)
        }
    )
    const subjectData = []
    uniqueSubject?.forEach((subject) => {
        subjectData.push({
            value: subject?._id,
            label: subject?.name,
        })
    })
    const handleFormClose = () => {
        setDocumentId(null)
        setShowModalUpload(false)
        setCheckedList([])
        setFileList([])
        form.resetFields()
    }

    const handleSubmit = (values) => {
        if (checkedList.length <= 0) return
        const query = values
        query.id = documentId

        query.image = null
        values.description = description
        if (values.uploadFiles?.fileList.length > 0) {
            query.files = []
            values.uploadFiles?.fileList.map((file) => {
                query.files.push(file.response[0])
            })
        }
        query.image =
            fileList.length > 0 && fileList[0].response
                ? fileList[0].response.url
                : undefined
        query.educations = checkedList
        delete query.uploadFiles
        delete query.uploadImage
        form.resetFields()

        dispatch(updateDocumentRequest(query))
        setShowModalUpload(false)
        form.resetFields()
        setDocumentId(null)
        setUpdateSuccess(true)
        setCountUpdate((countUpdate) => countUpdate + 1)
        setFileList([])
    }
    useEffect(() => {
        form.setFieldsValue(defaultValue)
        setPlan(defaultValue.plan)
        // eslint-disable-next-line no-use-before-define
    }, [defaultValue])
    useEffect(() => {
        if (userInfo?.educationType) {
            const body = {
                filterQuery: {
                    educationType: userInfo?.educationType,
                },
                options: {
                    pagination: false,
                },
            }
            dispatch(getEducationsRequest(body))
        }
    }, [dispatch, userInfo])
    const props = {
        name: 'attachment',
        multiple: true,
        action: settings.FILE_URL + UPLOAD_ATTACHMENT,
        accept: '.pdf, .xlsx, .xls, .docx, .doc',

        onChange(info) {
            const { status } = info.file
            if (status === 'done') {
                message.success(`Tải file ${info.file.name} thành công.`)
            } else if (status === 'error') {
                message.error(`Tải file ${info.file.name} thất bại.`)
            }
        },
        onDrop(e) {},
    }

    return (
        <div>
            <Modal
                destroyOnClose={true}
                className="docment-upload-modal"
                title="Cập nhật tài liệu"
                centered
                onOk={form.submit}
                open={showModalUpload}
                onCancel={handleFormClose}
                footer={[
                    <Button
                        className="mr-10"
                        type="default"
                        onClick={handleFormClose}
                    >
                        Hủy bỏ
                    </Button>,
                    <Button
                        className="ml-10"
                        type="primary"
                        key="submit"
                        onClick={form.submit}
                    >
                        Cập nhật tài liệu
                    </Button>,
                ]}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={handleSubmit}
                    initialValues={{
                        isDownloadable: true,
                        plan: plan,
                        typePlan: typePlan,
                    }}
                >
                    <Row gutter={10}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Tên tài liệu"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Tên tài liệu không được bỏ trống!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên tài liệu" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="plan"
                                label="Trạng thái"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn trạng thái!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn phí"
                                    onChange={(e) => {
                                        setPlan(e)
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
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="typePlan"
                                label="Kiểu trả phí"
                                rules={[
                                    {
                                        required: plan === 'PREMIUM',
                                        message: 'Vui lòng chọn kiểu trả phí!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Kiểu trả phí"
                                    disabled={plan === 'FREE'}
                                    onChange={(e) => {
                                        setTypePlan(e)
                                    }}
                                    options={[
                                        {
                                            label: 'Nhập điểm',
                                            value: 'POINT',
                                        },
                                        // ...(user?.role?.includes('CODE') ? [{
                                        //     label: 'Nhập code',
                                        //     value: 'CODE',
                                        // }] : [])
                                    ]}
                                ></Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="cost"
                                label={
                                    typePlan === 'POINT' ? 'Số điểm' : 'Code'
                                }
                                rules={[
                                    {
                                        required: plan === 'PREMIUM',
                                        message: `Vui lòng nhập ${
                                            typePlan === 'POINT'
                                                ? 'số điểm'
                                                : 'code'
                                        }`,
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
                                                }
                                            }
                                        },
                                    },
                                ]}
                            >
                                <Input
                                    disabled={plan === 'FREE'}
                                    type={
                                        typePlan === 'POINT' ? 'number' : 'text'
                                    }
                                    placeholder={
                                        typePlan === 'POINT'
                                            ? 'Nhập số điểm'
                                            : 'Nhập code'
                                    }
                                ></Input>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                style={{ width: '99%' }}
                                name="educations"
                                label="Chọn trường học"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn trường học!',
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Trường học"
                                    optionLabelProp="label"
                                    options={educationOptions}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '')
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    allowClear
                                    maxTagCount="responsive"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="type"
                                label="Chọn danh mục"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn danh mục!',
                                    },
                                ]}
                                style={{ width: '99%' }}
                            >
                                <Select placeholder="Danh mục">
                                    <Select.Option
                                        value={DOCUMENT_TYPE.CURRICULUM}
                                    >
                                        Giáo trình học tập
                                    </Select.Option>
                                    <Select.Option value={DOCUMENT_TYPE.SLIDE}>
                                        Slide
                                    </Select.Option>
                                    <Select.Option value={DOCUMENT_TYPE.OTHER}>
                                        Tài liệu tổng hợp
                                    </Select.Option>
                                    <Select.Option value={DOCUMENT_TYPE.EXAM}>
                                        Đề thi thử
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="subjectId"
                                label="Chọn môn học"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn môn học!',
                                    },
                                ]}
                                style={{ width: '100%' }}
                            >
                                <Select
                                    className="mr-15"
                                    placeholder="Môn học"
                                    allowClear
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.label ?? '')
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    options={subjectData}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="isDownloadable" valuePropName="checked">
                        <Checkbox>Cho phép tải xuống?</Checkbox>
                    </Form.Item>
                    <div
                        style={
                            isMobile
                                ? null
                                : {
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                  }
                        }
                    >
                        <Form.Item
                            name="uploadImage"
                            style={{ margin: '5px 0' }}
                        >
                            <ImgCrop {...propsImageCrop}>
                                <Upload {...propsImageDocument}>
                                    {propsImageDocument.fileList.length < 1 &&
                                        '+ Ảnh bìa'}
                                </Upload>
                            </ImgCrop>
                        </Form.Item>

                        <Form.Item
                            style={{ width: '100%' }}
                            name="uploadFiles"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng thêm tài liệu môn học!',
                                },
                            ]}
                        >
                            <Dragger {...props} style={{ width: '98%' }}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click hoặc thả tài liệu của bạn vào đây
                                </p>
                                <p className="ant-upload-hint">
                                    Hỗ trợ các dạng tài liệu: PDF, XLSX, XLS,
                                    DOC hoặc DOCX
                                </p>
                            </Dragger>
                        </Form.Item>
                    </div>
                    <h4>Chú thích tài liệu</h4>
                    <Form.Item name="description">
                        <Editor
                            style={{ minHeight: '320px !important' }}
                            handleChange={(value) => {
                                setDescription(value)
                            }}
                            value={description}
                        ></Editor>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
