/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useState } from 'react'
import {
    Space,
    Button,
    Form,
    Checkbox,
    Select,
    message,
    Input,
    InputNumber,
} from 'antd'
import { BigPlayButton, Player } from 'video-react'
import mtzVideoPostImg from '../../../assets/images/homepage/video-poster.svg'
import './styles.scss'
import { useMediaQuery } from 'react-responsive'
import Editor from '../../../components/editor'
import { useSelector } from 'react-redux'
import axiosInstance from '../../../utils/axios'
import settings from '../../../settings'
import { PEDAGOGY_PATH } from '../../../constants/paths'
import { compact } from 'lodash'
import { educationDetailSelector } from '../../../slices/education'
const AskingQuestion = () => {
    const [form] = Form.useForm()
    const [point, setPoint] = useState(true)
    const [content, setContent] = useState('')
    const educationDetail = useSelector(educationDetailSelector)
    const subjects = compact(educationDetail?.data?.subjects)

    const subjectOption = []
    subjects?.forEach((item) =>
        subjectOption.push({ label: item.name, value: item._id })
    )

    const onFinish = (values) => {
        const query = values
        query.question = content
        query.plan = point ? 'PREMIUM' : 'FREE'
        axiosInstance
            .post(`${settings.API_URL}${PEDAGOGY_PATH}`, query)
            .then((res) => {
                form.resetFields()
                message.success(
                    'Câu hỏi của bạn đã được gửi thành công! Mentor sẽ trả lời bạn trong thời gian sớm nhất.',
                    5
                )
            })
            .catch((err) => {
                message.error(err?.response?.data?.message, 3)
            })
    }

    const onFinishFailed = () => {
        message.error('Vui lòng điền đầy đủ thông tin')
    }

    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })

    return (
        <div
            className={`${
                isMobile || isTablet ? 'uc-container-m' : 'uc-container'
            } mtz-submit-question pb-30`}
        >
            <div className="question-container">
                <div className="question-description">
                    <Space direction="vertical">
                        <h4 className="title">Đặt câu hỏi cho Mentor</h4>

                        <h4 className="title-label">
                            Với đội ngũ Mentor từ khắp mọi nơi, đầy kinh nghiệm
                            sẽ hỗ trợ các bạn trả lời câu hỏi. Đặt câu hỏi ngay!
                        </h4>
                    </Space>
                </div>
                <div
                    className="question-form pb-15"
                    style={
                        isMobile
                            ? null
                            : {
                                  display: 'flex',
                                  justifyContent: 'space-between',
                              }
                    }
                >
                    <div style={isMobile ? null : { width: '48%' }}>
                        <Player
                            poster={mtzVideoPostImg}
                            src="https://gdurl.com/0RyQ"
                        >
                            <BigPlayButton position="center" />
                        </Player>
                    </div>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={isMobile ? null : { width: '48%' }}
                    >
                        <Form.Item
                            name="name"
                            style={isMobile ? { marginTop: 15 } : null}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tiêu đề!',
                                },
                            ]}
                        >
                            <Input placeholder={'Tiêu đề câu hỏi'}></Input>
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
                                name="subjectId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn môn học!',
                                    },
                                ]}
                                style={isMobile ? null : { width: '50%' }}
                            >
                                <Select
                                    placeholder="Môn học"
                                    onChange={() => {}}
                                    allowClear
                                    options={subjectOption}
                                ></Select>
                            </Form.Item>
                            <Form.Item
                                name="plan"
                                // style={{ width: '30%' }}
                            >
                                <Checkbox
                                    checked={point}
                                    onChange={() => {
                                        setPoint(!point)
                                        form.resetFields(['cost'])
                                    }}
                                >
                                    Sử dụng điểm
                                </Checkbox>
                            </Form.Item>

                            <Form.Item
                                name="cost"
                                rules={[
                                    {
                                        required: point,
                                        message: 'Vui lòng nhập số điểm!',
                                    },
                                ]}
                            >
                                <InputNumber
                                    disabled={!point}
                                    min={1}
                                    placeholder={'Số điểm'}
                                ></InputNumber>
                            </Form.Item>
                        </div>
                        <div
                            style={
                                isMobile
                                    ? null
                                    : {
                                          display: 'flex',
                                          justifyContent: 'flex-start',
                                      }
                            }
                        ></div>
                        <Form.Item
                            name="question"
                            style={isMobile ? { marginTop: 15 } : null}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập câu hỏi!',
                                },
                            ]}
                        >
                            <Editor
                                handleChange={(value) => {
                                    setContent(value)
                                    form.setFieldsValue({
                                        question: value,
                                    })
                                }}
                            ></Editor>
                        </Form.Item>

                        <Button
                            type="primary"
                            block
                            size="large"
                            htmlType="submit"
                            style={isMobile ? null : { width: '100%' }}
                        >
                            Đặt câu hỏi
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default memo(AskingQuestion)
