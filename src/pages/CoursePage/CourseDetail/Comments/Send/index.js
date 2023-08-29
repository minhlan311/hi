import { SendOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'

import { useDispatch } from 'react-redux'
import {
    createCommentsRequest,
    replyCommentsRequest,
} from '../../../../../slices/comment'

export default function SendComment(props) {
    const { targetId, parentId, comments } = props
    const dispatch = useDispatch()

    const { TextArea } = Input
    const [form] = Form.useForm()
    if (parentId)
        form.setFieldsValue({
            content: `@${comments?.user.fullName} `,
        })

    const handleAddComment = (values) => {
        if (values.content.trim() !== '' && parentId) {
            const payload = {
                parentId: parentId,
                targetId: targetId,
                targetModel: 'COURSE',
                content: {
                    content: values.content,
                },
            }
            dispatch(replyCommentsRequest(payload))

            form.resetFields()
        }

        if (values.content.trim() !== '' && !parentId) {
            const payload = {
                targetId: targetId,
                targetModel: 'COURSE',
                content: {
                    content: values.content,
                },
            }
            dispatch(createCommentsRequest(payload))
            form.resetFields()
        }
    }

    const handleKeyUp = (e) => {
        // Enter
        if (e.keyCode === 13 && !e.shiftKey) {
            form.submit()
        }
    }
    return (
        <Form
            style={{ width: '100%' }}
            form={form}
            onFinish={handleAddComment}
            onKeyUp={handleKeyUp}
            className="d-flex"
        >
            <Form.Item style={{ width: '100%' }} name="content">
                <TextArea placeholder="Bình luận..." autoSize />
            </Form.Item>
            <Form.Item className="ml-5">
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SendOutlined />}
                    shape="circle"
                ></Button>
            </Form.Item>
        </Form>
    )
}
