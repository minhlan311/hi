import {
    Modal,
    Form,
    Input,
    Select,
    Checkbox,
    message,
    Upload,
    Space,
    Spin,
    Empty,
} from 'antd'
import ImgCrop from 'antd-img-crop'
import settings from '../../../settings'
import {
    createDocumentRequest,
    documentDetailSelector,
    getDocumentsRequest,
} from '../../../slices/document'
import {
    educationsSelector,
    getEducationsRequest,
} from '../../../slices/education'
import { useDispatch, useSelector } from 'react-redux'
import { USER_INFO } from '../../../constants/storageKeys'
import { getStorage } from '../../../services/storage'
import { DOCUMENT_TYPE } from '../../../constants'
import { UPLOAD_ATTACHMENT, UPLOAD_IMAGE } from '../../../constants/paths'
import { InboxOutlined } from '@ant-design/icons'
import React, { memo, useEffect, useMemo, useState } from 'react'
import './styles.scss'
import { useMediaQuery } from 'react-responsive'
import Editor from '../../../components/editor'
import { debounce } from 'lodash'
import { findSubjectRequest, subjectsSelector } from '../../../slices/subjects'

const DocumentUploadModal = ({
    showModalUpload,
    setShowModalUpload,
    actionUpload,
    setActionUpload,
}) => {
    const dispatch = useDispatch()
    const createDocument = useSelector(documentDetailSelector)
    const [form] = Form.useForm()
    const [fileList, setFileList] = useState([])
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    }
    const [uploadSuccess, setUploadSuccess] = useState(false)

    const [description, setDescription] = useState('')
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
        accept: '.png, .jpg, .jpge, .webp',
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

    const { Dragger } = Upload
    const props = {
        name: 'attachment',
        multiple: true,
        action: settings.FILE_URL + UPLOAD_ATTACHMENT,
        accept: '.pdf, .xlsx, .xls, .docx, .doc',

        onChange(info) {
            const { status } = info.file
            if (status === 'uploading') {
                message.loading(`Vui lòng chờ..`)
                setUploadSuccess(true)
            } else if (status === 'done') {
                message.success(`Tải file ${info.file.name} thành công.`)
                setUploadSuccess(false)
            } else if (status === 'error') {
                message.error(`Tải file ${info.file.name} thất bại.`)
            }
        },
        onDrop(e) {},
    }

    const userInfo = useMemo(() => getStorage(USER_INFO), [])

    const educations = useSelector(educationsSelector)

    const educationOptions = []
    educations?.data?.forEach((data) =>
        educationOptions.push({
            value: data._id,
            label: data.name,
        })
    )

    const all = []
    educationOptions?.forEach((item) => all.push(item.value))
    const educationList =
        educationOptions.length > 0
            ? [
                  {
                      value: 'all',
                      label: 'Tất cả',
                  },
                  ...educationOptions,
              ]
            : []

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

    const subjectsData = useSelector(subjectsSelector)
    const [searchSj, setSearchSj] = useState('')

    useEffect(() => {
        if (searchSj !== ' ' && searchSj?.trim()) {
            const payload = {
                filterQuery: {
                    status: 'ACTIVE',
                    search: searchSj,
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
    }, [searchSj])

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
            subjectsData?.data?.length === 0
        ) {
            setSubjectOptions([])
        }
    }, [subjectsData, searchSj])

    const handleFormClose = () => {
        setShowModalUpload(false)
        setFileList([])
        form.resetFields()
    }

    const handleSubmit = (values) => {
        const files = []
        values.cost = values.cost ? parseInt(values.cost) : undefined
        values.uploadFiles?.fileList.forEach((file) => {
            files.push(file.response[0])
        })
        const payload = {
            name: values.name,
            plan: values.plan,
            cost: values.cost,
            educations: values.educations,
            type: values.type,
            subjectId: values.subjectId.value,
            isDownloadable: values.isDownloadable,
            image:
                fileList.length > 0 && fileList[0].response
                    ? fileList[0].response?.url
                    : undefined,
            files: files,
            description: description,
        }

        dispatch(createDocumentRequest(payload))
        setShowModalUpload(false)
        setFileList([])
        setActionUpload('create')
    }

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
    }, [userInfo])

    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })

    const [plan, setPlan] = useState('PREMIUM')
    const [typePlan, setTypePlan] = useState('POINT')
    useEffect(() => {
        if (createDocument.status === 'success' && actionUpload === 'create') {
            message.success('Đăng tài liệu thành công!')
            form.resetFields()
            setActionUpload('')
        }
    }, [createDocument, actionUpload])

    return (
        <div>
            <Modal
                destroyOnClose={true}
                className="docment-upload-modal"
                title="Đăng tải tài liệu"
                centered
                onOk={form.submit}
                okText="Đăng tài liệu"
                open={showModalUpload}
                onCancel={handleFormClose}
                cancelText="Hủy bỏ"
                width={isMobile ? '96%' : '62%'}
                style={{ zIndex: 1050 }}
                confirmLoading={uploadSuccess}
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
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Space
                            direction={isMobile ? 'vertical' : 'horizontal'}
                            style={{ width: '100%' }}
                        >
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
                                style={{ width: '32vw' }}
                            >
                                <Input placeholder="Nhập tên tài liệu" />
                            </Form.Item>
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
                                                } else {
                                                    callback()
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
                        </Space>
                        <Space
                            direction={isMobile ? 'vertical' : 'horizontal'}
                            style={{ width: '100%' }}
                        >
                            <Form.Item
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
                                    disabled={educationList.length === 0}
                                    mode="multiple"
                                    placeholder="Trường học"
                                    optionLabelProp="label"
                                    options={educationList}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '')
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    onChange={handleChangeEdu}
                                    allowClear
                                    maxTagCount="responsive"
                                />
                            </Form.Item>

                            <Form.Item
                                name="type"
                                label="Chọn danh mục"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn danh mục!',
                                    },
                                ]}
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

                            <Form.Item
                                name="subjectId"
                                label="Chọn môn học"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn môn học!',
                                    },
                                ]}
                            >
                                <Select
                                    className="mr-15"
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
                                                image={
                                                    Empty.PRESENTED_IMAGE_SIMPLE
                                                }
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
                        </Space>
                    </Space>

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
                        ></Editor>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default memo(DocumentUploadModal)
