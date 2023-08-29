import { Button, Form, Input, Space } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { updateCommentsRequest } from '../../../../../slices/comment'
import { useMediaQuery } from 'react-responsive'

export default function UpadteComment(props) {
    const { comments, setUpdate } = props
    const dispatch = useDispatch()
    const { TextArea } = Input
    const [form] = Form.useForm()

    form.setFieldsValue({
        content: comments?.content.content,
    })

    const handleAddComment = (values) => {
        if (values.content.trim() !== '') {
            const payload = {
                id: comments._id,
                content: {
                    content: values.content,
                },
            }
            dispatch(updateCommentsRequest(payload))
        }

        form.resetFields()
    }

    const handleKeyUp = (e) => {
        // Enter
        if (e.keyCode === 13 && !e.shiftKey) {
            form.submit()
        }
    }
    // const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    return (
        <Form
            style={
                isMobile
                    ? { width: '100%' }
                    : { width: '100%', display: 'flex' }
            }
            form={form}
            onFinish={handleAddComment}
            onKeyUp={handleKeyUp}
        >
            <Form.Item style={{ width: '100%' }} name="content">
                <TextArea placeholder="Bình luận..." autoSize />
            </Form.Item>
            <Space style={isMobile ? null : { marginLeft: 10 }}>
                <Form.Item>
                    <Button onClick={() => setUpdate(false)}>Hủy</Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
            </Space>
        </Form>
    )
}
