import { Button, Checkbox, Col, Form, Input, Radio, Row } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import Editor from '../../../../../../components/editor'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import './style.scss'

const CreateQuestionForm = (props) => {
    const { data, questionType, form, handleRadioChange } = props
    const [question, setQuestion] = useState('')
    const [hint, setHint] = useState('')
    const [explanation, setExplanation] = useState('')
    useEffect(() => {
        if (data) {
            setQuestion(data.question)
            setHint(data.hint ? data.hint : '')
            setExplanation(data.explanation ? data.explanation : '')
            form.setFieldValue('choices', data.choices)
        } else {
            setQuestion('')
            setHint('')
            setExplanation('')
        }
    }, [data])

    const renderChoiceList = () => {
        return (
            <Form.List
                name="choices"
                rules={[
                    {
                        validator: async (_, choices) => {
                            if (!choices || choices.length < 2) {
                                return Promise.reject(
                                    new Error('Nhập ít nhất 2 câu trả lời')
                                )
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item required={false} key={field.key}>
                                <Row>
                                    <Col span={3}>Đáp án {index + 1}</Col>
                                    <Col span={19}>
                                        <Form.Item
                                            {...field}
                                            required={false}
                                            key={[field.key, 'answer']}
                                            name={[field.name, 'answer']}
                                            style={{ marginBottom: '-5px' }}
                                            validateTrigger={[
                                                'onChange',
                                                'onBlur',
                                            ]}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message:
                                                        'Vui lòng nhập đáp án.',
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input
                                                placeholder="Nội dung đáp án"
                                                style={{
                                                    width: '60%',
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={1}>
                                        <Form.Item
                                            {...field}
                                            required={false}
                                            key={[field.key, 'isCorrect']}
                                            name={[field.name, 'isCorrect']}
                                            style={{ marginBottom: '-5px' }}
                                            valuePropName="checked"
                                        >
                                            {questionType ===
                                            'SINGLE CHOICE' ? (
                                                <>
                                                    <Radio
                                                        onChange={() =>
                                                            handleRadioChange(
                                                                index
                                                            )
                                                        }
                                                    ></Radio>
                                                </>
                                            ) : (
                                                <>
                                                    <Checkbox></Checkbox>
                                                </>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={1}>
                                        {fields.length > 2 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                style={{
                                                    color: 'red',
                                                    paddingTop: '10px',
                                                }}
                                                onClick={() =>
                                                    remove(field.name)
                                                }
                                            />
                                        ) : null}
                                    </Col>
                                </Row>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() =>
                                    add({ answer: '', isCorrect: false })
                                }
                                style={{
                                    width: '60%',
                                }}
                                icon={<PlusOutlined />}
                            >
                                Thêm đáp án
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        )
    }

    return (
        <>
            <Form
                layout="vertical"
                form={form}
                initialValues={{
                    choices: [
                        { answer: '', isCorrect: true },
                        { answer: '', isCorrect: false },
                    ],
                }}
            >
                <Row gutter={16} style={{ marginTop: 10 }}>
                    <Col span={12}>
                        <Form.Item
                            label={<h3>Nội dung câu hỏi:</h3>}
                            labelCol={{ span: 24 }}
                            name="question"
                        >
                            <Editor
                                options={{
                                    data: question,
                                }}
                                handleChange={(value) => {
                                    form.setFieldValue('question', value)
                                }}
                            ></Editor>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div class="ant-col ant-col-24 ant-form-item-label css-dev-only-do-not-override-15rg2km">
                            <label class="" title="">
                                <h3>Đáp án:</h3>
                            </label>
                        </div>
                        {renderChoiceList()}
                    </Col>
                </Row>

                <Row gutter={16} style={{ marginTop: 10 }}>
                    <Col span={12}>
                        <Form.Item
                            label={<h3>Gợi ý:</h3>}
                            labelCol={{ span: 24 }}
                            name="hint"
                        >
                            <Editor
                                options={{ data: hint }}
                                handleChange={(value) => {
                                    form.setFieldValue('hint', value)
                                }}
                            ></Editor>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={<h3>Giải thích:</h3>}
                            labelCol={{ span: 24 }}
                            name="explanation"
                        >
                            <Editor
                                options={{ data: explanation }}
                                handleChange={(value) => {
                                    form.setFieldValue('explanation', value)
                                }}
                            ></Editor>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default memo(CreateQuestionForm)
