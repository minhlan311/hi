import React from 'react'
import mtzPremiumIcon from '../../../assets/images/documents-page/premium-icon.svg'
import mtzDocumentImg3 from '../../../assets/images/documents-page/documents-img3.svg'
import {
    Avatar,
    Card,
    Descriptions,
    Input,
    Space,
    Typography,
    Modal,
    Empty,
    Form,
    message,
} from 'antd'
import { Link } from 'react-router-dom'
import { getStorage } from '../../../services/storage'
import { USER_INFO } from '../../../constants/storageKeys'
import moment from 'moment-timezone'
import 'moment/locale/vi'
import { useMediaQuery } from 'react-responsive'
import Editor from '../../../components/editor'
moment().locale('vi')

export default function ModalOpen(props) {
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const { records, data, detail, setDetail, value, setValue } = props
    const { TextArea } = Input
    const { Text } = Typography
    const [form] = Form.useForm()

    const user = getStorage(USER_INFO)

    const onFinish = (values) => {
        const payload = {
            recordId: records.id,
            mentor: {
                fullName: user.fullName,
                avatarUrl: user?.avatarUrl,
            },
            answers: {
                text: values.answers,
                createdAt: new Date(Date.now()),
            },
        }

        if (values.answers) {
            setValue([...value, payload])
            form.resetFields()
            message.success('Gửi câu trả lời thành công!')
        }
    }
    const onFinishFailed = (errorInfo) => {}

    const handelCancelModal = () => {
        setDetail(!detail)
        form.resetFields()
    }

    return (
        <Modal
            title={records.title}
            centered
            open={detail}
            onOk={form.submit}
            onCancel={() => handelCancelModal()}
            okText="Gửi đáp án"
            cancelText="Hủy bỏ"
            width={isMobile ? '90%' : '50%'}
        >
            <img
                className="image-detail"
                style={{ width: '100%' }}
                src={mtzDocumentImg3}
                alt="mtz home banner"
            />
            <div className="documents-tag mt-10">
                <img alt="eye icon" src={mtzPremiumIcon} />
                <Text
                    style={{
                        color: '#DF5534',
                        fontSize: 13,
                        marginLeft: 10,
                    }}
                >
                    {data?.plan === 'FREE' ? 'Miễn phí' : records.price}
                </Text>
            </div>
            <p>Câu hỏi...?</p>

            <Descriptions>
                <Descriptions.Item label="Môn">
                    <Link to="#">Toán</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Câu hỏi của">
                    <Link to="#">Hangzhou</Link>
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian gửi">
                    {moment(records.createdAt).fromNow()}
                </Descriptions.Item>
            </Descriptions>
            <div>
                <h3>Câu trả lời của Mentor</h3>

                {value?.length > 0 &&
                value?.find((item) => item.recordId === records.id) ? (
                    value?.map((data, id) =>
                        data.recordId === records.id ? (
                            <div style={{ margin: '10px 0' }} key={id}>
                                {isMobile ? (
                                    <Space>
                                        <Avatar
                                            src={data.mentor.avatarUrl}
                                            size="large"
                                        />
                                        <div>
                                            <Link to="#">
                                                {data.mentor.fullName}
                                            </Link>
                                            <div>
                                                {moment(
                                                    data.answers.createdAt
                                                ).fromNow()}
                                            </div>
                                        </div>
                                    </Space>
                                ) : (
                                    <Space>
                                        <Avatar
                                            src={data.mentor.avatarUrl}
                                            size="large"
                                        />{' '}
                                        <Link to="#">
                                            {data.mentor.fullName}
                                        </Link>
                                        •
                                        <div>
                                            {moment(
                                                data.answers.createdAt
                                            ).fromNow()}
                                        </div>
                                    </Space>
                                )}
                                <Card
                                    size="small"
                                    style={
                                        isMobile
                                            ? {
                                                  background: '#F3F9FD',
                                                  margin: '5px 0 0 25px',
                                                  whiteSpace: 'break-spaces',
                                              }
                                            : {
                                                  background: '#F3F9FD',
                                                  marginLeft: 55,
                                                  whiteSpace: 'break-spaces',
                                              }
                                    }
                                >
                                    {data.answers.text}
                                </Card>
                            </div>
                        ) : null
                    )
                ) : (
                    <Empty
                        style={{ margin: 25 }}
                        description={<span>Hiện chưa có câu trả lời nào!</span>}
                    ></Empty>
                )}
            </div>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="answers"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập câu trả lời',
                        },
                    ]}
                >
                    <Editor
                        placeholder="Nhập câu trả lời của bạn..."
                        handleChange={(value) => {
                            form.setFieldsValue({ answers: value })
                        }}
                    ></Editor>
                </Form.Item>
            </Form>
        </Modal>
    )
}
