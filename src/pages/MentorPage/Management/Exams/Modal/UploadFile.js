import { Modal, message } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import React, { useEffect, useState } from 'react'
import settings from '../../../../../settings'
import { UPLOAD_ATTACHMENT } from '../../../../../constants/paths'
import { InboxOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
    importQuestionDataSelector,
    importQuestionRequest,
} from '../../../../../slices/question'

const UploadFile = (props) => {
    const { isModalOpen, setIsModalOpen, refreshPage, testId } = props
    const [urlAttachment, setUrlAttachment] = useState()
    const dispatch = useDispatch()
    const importQuestion = useSelector(importQuestionDataSelector)
    const uploadFileAttachment = {
        name: 'attachment',
        multiple: true,
        action: settings.FILE_URL + UPLOAD_ATTACHMENT,
        onChange(info) {
            const { status } = info.file

            if (status === 'done') {
                message.success(`Tải file ${info.file.name} thành công.`)
                setUrlAttachment(info.file.response)
            } else if (status === 'error') {
                message.error(`Tải file ${info.file.name} thất bại.`)
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files)
        },
    }
    useEffect(() => {
        if (importQuestion.status === 'success') {
            refreshPage()
            setIsModalOpen(false)
        }
    }, [importQuestion])
    const onSubmit = () => {
        const payload = {
            url: urlAttachment[0].url,
            testId: testId,
        }
        dispatch(importQuestionRequest(payload))
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    return (
        <Modal
            title="Gắn file câu hỏi"
            open={isModalOpen}
            onOk={onSubmit}
            okText="Xác nhận"
            onCancel={handleCancel}
            cancelText="Hủy"
        >
            <Dragger {...uploadFileAttachment}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited
                    from uploading company data or other banned files.
                </p>
            </Dragger>
        </Modal>
    )
}

export default UploadFile
