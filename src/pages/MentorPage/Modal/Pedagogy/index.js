import React, { useCallback, useEffect, useMemo, useState } from 'react'
import mtzPremiumIcon from '../../../../assets/images/documents-page/premium-icon.svg'
import mtzDocumentImg3 from '../../../../assets/images/documents-page/documents-img3.svg'
import {
    Descriptions,
    Typography,
    Modal,
    Form,
    message,
    Button,
    Table,
    Avatar,
} from 'antd'
import { Link } from 'react-router-dom'
import { getStorage } from '../../../../services/storage'
import { USER_INFO } from '../../../../constants/storageKeys'
import moment from 'moment-timezone'
import 'moment/locale/vi'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'

import '../../styles.scss'
import Editor from '../../../../components/editor'
import axiosInstane from '../../../../utils/axios'
import settings from '../../../../settings'
import { ANSWER_PEDAGOGY_PATH } from '../../../../constants/paths'
import {
    answersPedagogySelector,
    getAnswersRequest,
} from '../../../../slices/pedagogy'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
moment().locale('vi')

export default function ModalOpen(props) {
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const { dataDetail, data, detail, setDetail, onSuccess, type } = props
    const dispatch = useDispatch()
    const { Text } = Typography
    const [form] = Form.useForm()
    const user = getStorage(USER_INFO)
    const [answer, setAnswer] = useState('')
    const answers = useSelector(answersPedagogySelector)
    const [openAnswer, setOpenAnswer] = useState(false)
    const [dataAnswer, setDataAnswer] = useState([])

    // useEffect(() => {
    //     if (dataDetail) {
    //         setAnswer(dataDetail.answer)
    //     }
    // }, [dataDetail])

    // useEffect(() => {
    //     if (type === 'reply') {
    //         form.setFieldsValue({
    //             answer: answer,
    //         })
    //     }
    // }, [answer])

    useEffect(() => {
        if (type === 'detail') {
            dispatch(
                getAnswersRequest({
                    filterQuery: {
                        pedagogyId: dataDetail._id,
                    },
                })
            )
        }
    }, [type, dispatch, dataDetail._id])

    useEffect(() => {
        if (answers.status === 'success') {
        }
    }, [answers])

    const columnAnswer = [
        {
            title: 'Người trả lời',
            dataIndex: 'owner',
            key: 'owner',
            render: (text, record) => (
                <div className="d-flex align-items-center">
                    <Avatar
                        className="mr-10"
                        size={40}
                        src={record?.owner?.avatarUrl}
                    />
                    <div>
                        <Link to="#">{record?.owner?.fullName}</Link>
                    </div>
                </div>
            ),
        },
        {
            title: 'Thời gian trả lời',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record) => (
                <div>{moment(record.createdAt).format('LLLL')}</div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <div>
                    {record.status === 'PENDING' && (
                        <Text type="warning">Đang chờ</Text>
                    )}
                    {record.status === 'APPROVED' && (
                        <Text type="success">Đã duyệt</Text>
                    )}
                    {record.status === 'REJECTED' && (
                        <Text type="danger">Đã từ chối</Text>
                    )}
                </div>
            ),
        },
        {
            title: 'Hành động',
            dataIndex: 'Action',
            key: 'Action',
            render: (text, record) => (
                <div>
                    <Button
                        className="mr-10"
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setOpenAnswer(true)
                            setDataAnswer(record)
                        }}
                    />
                </div>
            ),
        },
    ]

    const handleReply = () => {
        const payload = {
            pedagogyId: dataDetail.id,
            userId: user._id,
            answer: answer,
        }
        axiosInstane
            .post(`${settings.API_URL}${ANSWER_PEDAGOGY_PATH}`, payload)
            .then((res) => {
                message.success(
                    `Gửi câu trả lời thành công tới ${dataDetail?.owner?.fullName}`
                )
                setDetail(!detail)
                form.resetFields()
                onSuccess()
            })
            .catch((err) => {
                message.error('Gửi câu trả lời thất bại!')
            })
    }

    const handelCancelModal = () => {
        setDetail(!detail)
        form.resetFields()
    }

    return (
        <>
            <Modal
                title={dataDetail?.name}
                centered
                open={detail}
                onCancel={() => handelCancelModal()}
                footer={
                    <>
                        <Button onClick={() => handelCancelModal()}>
                            Hủy bỏ
                        </Button>
                        {type === 'reply' && (
                            <Button type="primary" onClick={handleReply}>
                                Trả lời
                            </Button>
                        )}
                    </>
                }
                width={isMobile ? '90%' : '60%'}
            >
                <div
                    id="scrollableDiv"
                    style={{
                        overflow: 'auto',
                    }}
                    className="question-detail"
                >
                    <div
                        className="question"
                        dangerouslySetInnerHTML={{
                            __html: `${dataDetail.question}`,
                        }}
                    />
                    <div className="documents-tag mt-10">
                        <img alt="eye icon" src={mtzPremiumIcon} />
                        {data?.isPoints ? (
                            <Text type="danger"> Trả phí</Text>
                        ) : (
                            <Text type="success"> Miễn phí</Text>
                        )}
                    </div>

                    <Descriptions>
                        <Descriptions.Item label="Môn" span={2}>
                            {dataDetail?.subjectId?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Người hỏi" span={2}>
                            <Link to="#">{dataDetail?.owner?.fullName}</Link>
                        </Descriptions.Item>
                        <Descriptions.Item label="Thời gian gửi" span={2}>
                            {moment(dataDetail.createdAt).format('LLLL')}
                        </Descriptions.Item>
                    </Descriptions>
                    {type === 'reply' ? (
                        <Editor
                            handleChange={(value) => {
                                setAnswer(value)
                            }}
                        ></Editor>
                    ) : (
                        <Table
                            dataSource={answers.data}
                            columns={columnAnswer}
                        ></Table>
                    )}
                </div>
            </Modal>
            <Modal
                centered
                open={openAnswer}
                onCancel={() => {
                    setOpenAnswer(false)
                    setDataAnswer([])
                }}
                width={isMobile ? '90%' : '50%'}
                footer={
                    <>
                        <Button
                            onClick={() => {
                                setOpenAnswer(false)
                                setDataAnswer([])
                            }}
                        >
                            Đóng
                        </Button>
                    </>
                }
            >
                <div
                    dangerouslySetInnerHTML={{ __html: `${dataAnswer.answer}` }}
                />
            </Modal>
        </>
    )
}
