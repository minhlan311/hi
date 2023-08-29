import { Button, Form, Input, Modal, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import settings from '../../../../settings'
import { UPLOAD_ATTACHMENT } from '../../../../constants/paths'
import { useDispatch, useSelector } from 'react-redux'
import Vimeo from '@u-wave/react-vimeo'
import {
    createLessonDetailSelector,
    createLessonsRequest,
    updateLessonsRequest,
} from '../../../../slices/lessons'
import Editor from '../../../../components/editor'
import { UploadOutlined } from '@ant-design/icons'
import { createDocumentRequest } from '../../../../slices/document'

export default function CreateLessons({
    topicId,
    openLessonMd,
    setOpenLessonMd,
    editLesson,
    lessonData,
    coursesId,
    educations,
}) {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [link, setLink] = useState('')
    const handleChangeLink = (e) => {
        setLink(e.target.value)
    }
    const createLesson = useSelector(createLessonDetailSelector)

    useEffect(() => {
        if (createLesson.status === 'success') {
            form.resetFields()
            setOpenLessonMd(false)
        }
    }, [createLesson])

    const [attachmentList, setAttachmentList] = useState([])
    const [lessonDescriptions, setLessonDescriptions] = useState('')
    const [uploadDocumentFile, setUploadDocumentFile] = useState([])
    const uploadAttachmentProps = {
        name: 'attachment',
        multiple: false,
        action: settings.FILE_URL + UPLOAD_ATTACHMENT,
        fileList: attachmentList,
        onChange(info) {
            const { status } = info.file

            if (status === 'done') {
                message.success(`Tải file ${info.file.name} thành công.`)
                setUploadDocumentFile(info.file.response)
            } else if (status === 'error') {
                message.error(`Tải file ${info.file.name} thất bại.`)
            }
        },
        onRemove(info) {
            const { status } = info

            if (status === 'removed') {
                setAttachmentList(
                    attachmentList.filter((e) => e.name !== info.name)
                )
                message.success(`Xóa file ${info.name} thành công.`)
            }
        },
    }

    useEffect(() => {
        if (lessonData) {
            const findData = lessonData.find((item) => {
                return item._id === editLesson
            })
            form.setFieldsValue({
                name: findData?.name,
                lessonEditor: findData?.descriptions,
                parentId: topicId,
                media: findData?.media,
                length: findData?.length
                    ? parseInt(findData?.length)
                    : undefined,
            })
            setLessonDescriptions(findData?.descriptions)
        }
    }, [lessonData, editLesson])
    const handleSubmitLession = (values) => {
        const payload = {
            name: values.name,
            descriptions: lessonDescriptions,
            parentId: topicId ? topicId : lessonData.parentId,
            media: values.media,
            length: parseInt(values.length),
        }
        const payloadDocument = {
            name: 'Tài liệu ' + values.name,
            type: 'CURRICULUM',
            lessonId: topicId ? topicId : lessonData.parentId,
            courseId: coursesId,
            description: 'Giáo trình học tập ' + values.name,
            isDownloadable: true,
            files: uploadDocumentFile,
            educations: educations,
        }

        if (editLesson) {
            const data = {
                id: editLesson,
                body: payload,
            }
            dispatch(updateLessonsRequest(data))
        } else dispatch(createLessonsRequest(payload))
        if (uploadDocumentFile) dispatch(createDocumentRequest(payloadDocument))
    }

    return (
        <Modal
            title={`${editLesson ? 'Cập nhật' : 'Thêm'} bài học`}
            open={openLessonMd}
            okText={editLesson ? 'Cập nhật' : 'Thêm mới'}
            cancelText="Hủy"
            onOk={() => {
                form.submit()
                setOpenLessonMd(false)
            }}
            onCancel={() => {
                setOpenLessonMd(false)
                form.resetFields()
            }}
            width="80%"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmitLession}
                onFinishFailed={(err) => console.log(err)}
            >
                <Form.Item
                    label="Tiêu đề bài học"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Tiêu đề không được bỏ trống',
                        },
                    ]}
                >
                    <Input placeholder="Nhập tiêu đề bài học" />
                </Form.Item>

                <Form.Item
                    label="Link video"
                    name="media"
                    rules={[
                        {
                            required: true,
                            message: 'Link video không được bỏ trống',
                        },
                    ]}
                >
                    <Input
                        placeholder="Nhập link video trên trang vimeo.com"
                        onChange={handleChangeLink}
                    />
                </Form.Item>

                {link ? <Vimeo responsive={true} video={link} /> : null}

                <Form.Item
                    label="Thời lượng bài học"
                    name="length"
                    rules={[
                        {
                            required: true,
                            message: 'Thời lượng không được bỏ trống',
                        },
                    ]}
                >
                    <Input placeholder="Nhập thời lượng bài học" />
                </Form.Item>

                <Form.Item label="Nội dung giới thiệu" name="lessonEditor">
                    <Editor
                        handleChange={(value) => {
                            setLessonDescriptions(value)
                        }}

                        // value={lessonDescriptions}
                    ></Editor>
                </Form.Item>

                <Form.Item
                    label="Tài liệu"
                    name="documents"
                    onChange={(info) => {
                        setAttachmentList(info.fileList)
                    }}
                >
                    <Upload {...uploadAttachmentProps}>
                        <Button icon={<UploadOutlined />}>
                            Tải tài liệu bài học
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}
