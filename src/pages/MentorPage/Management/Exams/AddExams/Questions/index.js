import { UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Radio, Space, Upload } from 'antd'
import React, { useState } from 'react'

export default function Questions(props) {
    const { field, remove } = props
    const [typeQue, setTypeQue] = useState('')

    const onChange = (e) => {
        setTypeQue(e.target.value)
    }

    const CheckboxGroup = Checkbox.Group

    const questionList = [
        { id: 'A', text: 'A' },
        { id: 'B', text: 'B' },
        { id: 'C', text: 'C' },
        { id: 'D', text: 'D' },
    ]
    const [form] = Form.useForm()
    const [answers, setAnswers] = useState([])

    const handleSubmit = (values) => {
        // Chuyển đổi dữ liệu thành mảng các cặp câu hỏi và câu trả lời
    }

    return (
        <>
            <div>
                <Form.Item
                    {...field}
                    label="Loại câu hỏi"
                    name={[field.name, 'typeQue']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn loại câu hỏi',
                        },
                    ]}
                >
                    <Radio.Group onChange={onChange}>
                        <Radio value="choice">Trắc nghiệm</Radio>
                        <Radio value="essay">Tự luận</Radio>
                        <Radio value="arrange">Sắp xếp</Radio>
                    </Radio.Group>
                </Form.Item>

                {(typeQue === 'choice' && (
                    <>
                        <p>Câu {field.name + 1}</p>

                        <CheckboxGroup>
                            {questionList.map((question) => (
                                <div key={question.id}>
                                    <Form.Item
                                        name={question.id}
                                        label={question.text}
                                    >
                                        <Input
                                            placeholder={`Đáp án cho câu ${question.text}`}
                                        />
                                    </Form.Item>
                                </div>
                            ))}
                        </CheckboxGroup>
                    </>
                )) ||
                    (typeQue === 'essay' && (
                        <Form.Item
                            {...field}
                            label={`Câu ${field.name + 1}`}
                            name={[field.name, 'content']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập câu hỏi',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập câu hỏi" />
                        </Form.Item>
                    )) || (
                        <>
                            <p>Câu {field.name + 1}</p>
                            <Form.Item
                                {...field}
                                label="Price"
                                name={[field.name, 'price']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Missing price',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </>
                    )}
                <Upload action="" listType="picture">
                    <Button icon={<UploadOutlined />}>Thêm hình ảnh</Button>
                </Upload>
            </div>
            <Button
                danger
                onClick={() => remove(field.name)}
                style={{ margin: '10px 0' }}
            >
                Xóa câu hỏi
            </Button>
        </>
    )
}
