import React, { memo, useEffect, useState } from 'react'
import { Button, Card, Popconfirm, Space, Table, message, Tooltip } from 'antd'
import MentorLayout from '../../../../../components/layout/MentorLayout'
import { useParams } from 'react-router-dom'
import {
    CarryOutOutlined,
    DeleteOutlined,
    EditOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteQuestionRequest,
    getQuestionsRequest,
    questionsSelector,
} from '../../../../../slices/question'
import UploadFile from '../Modal/UploadFile'
import DrawerQuestion from '../Drawer/DrawerQuestion'
import { deleteQuestionDataSelector } from '../../../../../slices/question'
import { useHistory } from 'react-router-dom'
import './styles.scss'

const Questions = (props) => {
    const history = useHistory()
    const { id } = useParams()

    const [refresh, setRefresh] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const questions = useSelector(questionsSelector)
    const deleteQuestion = useSelector(deleteQuestionDataSelector)
    const [typeBtn, setTypeBtn] = useState('')
    const dispatch = useDispatch()

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            align: 'center',
            width: '5%',
            render: (id, record, index) => {
                ++index

                return index
            },
            showSorterTooltip: false,
        },
        {
            title: 'Câu hỏi',
            dataIndex: 'type',
            render: (_, record) => (
                <p
                    dangerouslySetInnerHTML={{
                        __html: `${record.question}`,
                    }}
                ></p>
            ),
        },
        {
            title: 'Đáp án',
            dataIndex: 'anwLength',
            width: '40%',
            render: (_, record) => {
                let choice = ''
                const inputType =
                    record.type === 'SINGLE CHOICE' ? 'radio' : 'checkbox'
                record.choices?.forEach((c) => {
                    if (c.isCorrect) {
                        choice = choice.concat(
                            `<Col span={4}><Input type='${inputType}' checked disabled> </Col>`
                        )
                    } else {
                        choice = choice.concat(
                            `<Col span={4}><Input type='${inputType}' disabled></Col>`
                        )
                    }
                    choice = choice.concat(' ')
                    choice = choice.concat(`<Col span={20}>${c.answer}</Col>`)
                    choice = choice.concat('</br>')
                })

                return (
                    <p
                        dangerouslySetInnerHTML={{
                            __html: choice,
                        }}
                    ></p>
                )
            },
        },
        {
            title: 'Hành động',
            width: '10%',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title={'Sửa câu hỏi'}>
                        <EditOutlined
                            className="edit-icon"
                            onClick={(event) => updateAnw(event, record)}
                        />
                    </Tooltip>
                    <Tooltip title={'Xóa câu hỏi'}>
                        <Popconfirm
                            placement="right"
                            title={'Bạn có muốn xóa ?'}
                            onConfirm={(event) => deleteM(event, record)}
                            okText="Đồng ý"
                            cancelText="Hủy"
                        >
                            <DeleteOutlined style={{ color: 'red' }} />
                        </Popconfirm>
                    </Tooltip>
                </Space>
            ),
        },
    ]
    const refreshPage = () => {
        setRefresh(!refresh)
    }
    useEffect(() => {
        if (deleteQuestion.status === 'success') {
            refreshPage()
            message.success('Xóa thành công!')
        }
    }, [deleteQuestion.status])

    const deleteM = (e, value) => {
        dispatch(deleteQuestionRequest(value._id))
    }
    const [data, setData] = useState({})

    const updateAnw = (e, value) => {
        setOpenDrawer(true)
        setTypeBtn('update')
        setData(value)
    }

    useEffect(() => {
        const body = {
            filterQuery: {
                testId: id,
            },
            options: {
                pagination: false,
            },
        }
        dispatch(getQuestionsRequest(body))
    }, [id, refresh])

    const showModal = () => {
        setIsModalOpen(true)
    }
    const showDrawerCreate = () => {
        setOpenDrawer(true)
        setTypeBtn('create')
    }

    return (
        <MentorLayout>
            <Card className="questions-list">
                {/* {renderTable} */}

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '10px 0',
                    }}
                >
                    <Button
                        type="primary"
                        icon={<CarryOutOutlined />}
                        onClick={() => history.push('/mentor/exams')}
                    >
                        Danh sách câu hỏi
                    </Button>

                    <div>
                        <Button
                            type="primary"
                            icon={<UploadOutlined />}
                            onClick={showModal}
                            style={{ marginRight: 10 }}
                        >
                            Upload câu hỏi{' '}
                        </Button>

                        <Button type="primary" onClick={showDrawerCreate}>
                            Tạo câu hỏi{' '}
                        </Button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={questions?.data}
                    bordered
                />
            </Card>
            <UploadFile
                testId={id}
                isModalOpen={isModalOpen}
                refreshPage={refreshPage}
                setIsModalOpen={setIsModalOpen}
            />
            {typeBtn === 'create' ? (
                <DrawerQuestion
                    open={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    testId={id}
                    refreshPage={refreshPage}
                    type="create"
                />
            ) : (
                <DrawerQuestion
                    open={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    testId={id}
                    refreshPage={refreshPage}
                    type="update"
                    data={data}
                />
            )}
        </MentorLayout>
    )
}

export default memo(Questions)
