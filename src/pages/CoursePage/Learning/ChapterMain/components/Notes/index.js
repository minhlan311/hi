import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    PushpinOutlined,
    TagFilled,
} from '@ant-design/icons'
import {
    Button,
    Card,
    Dropdown,
    Form,
    Input,
    List,
    Space,
    Spin,
    Tooltip,
    message,
} from 'antd'
import moment from 'moment-timezone'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './styles.scss'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import {
    createNoteDetailSelector,
    createNotesRequest,
    deleteNoteDetailSelector,
    deleteNotesRequest,
    getNotesRequest,
    notesSelector,
    updateNoteDetailSelector,
    updateNotesRequest,
} from '../../../../../../slices/notes'

export default function Notes({
    currentTime,
    enlarge,
    setOpenNote,
    setCurrentTime,
    lessonId,
    userId,
}) {
    const dispatch = useDispatch()
    const noteData = useSelector(notesSelector)
    const noteLists = noteData?.data?.docs
    const createNote = useSelector(createNoteDetailSelector)
    const updateNote = useSelector(updateNoteDetailSelector)
    const deleteNote = useSelector(deleteNoteDetailSelector)
    const isDesktop = useMediaQuery({ minWidth: 1920 })
    const [form] = Form.useForm()
    const [notes, setNotes] = useState([])
    const [show, setShow] = useState(false)
    const [pinNote, setPinNote] = useState('')
    const [noteAction, setNoteAction] = useState('')
    const [checkPin, setCheckPin] = useState()

    useEffect(() => {
        if (checkPin) setPinNote(checkPin)
    }, [checkPin])

    const { TextArea } = Input
    useEffect(() => {
        const payload = {
            filterQuery: {
                lessonId: lessonId,
                userId: userId,
            },
            options: {
                pagination: false,
            },
        }
        dispatch(getNotesRequest(payload))
    }, [lessonId, userId])
    useEffect(() => {
        if (noteData.status === 'success') {
            setNotes(noteLists)
            setCheckPin(
                noteLists ? noteLists?.find((nt) => nt.isPinned === true) : null
            )
        }
    }, [noteData, noteLists])

    useEffect(() => {
        if (createNote.status === 'success' && noteAction === 'create') {
            form.resetFields()
            message.success('Ghi chú thành công')
            const payload = {
                filterQuery: {
                    lessonId: lessonId,
                    userId: userId,
                },
                options: {
                    pagination: false,
                },
            }
            dispatch(getNotesRequest(payload))
        }
    }, [createNote])

    useEffect(() => {
        if (updateNote.status === 'success') {
            if (noteAction === 'pin') {
                message.success('Ghim ghi chú thành công')
            } else if (noteAction === 'un-pin')
                message.success('Bỏ ghim ghi chú thành công')
            else if (noteAction === 'update') {
                message.success('Cập nhật ghi chú thành công')
                const payload = {
                    filterQuery: {
                        lessonId: lessonId,
                        userId: userId,
                    },
                    options: {
                        pagination: false,
                    },
                }
                dispatch(getNotesRequest(payload))
            }
        }
    }, [updateNote, noteAction])

    useEffect(() => {
        if (deleteNote.status === 'success' && noteAction === 'delete') {
            setPinNote('')
            form.resetFields()
            message.success('Xóa ghi chú thành công')
            // const payload = {
            //     filterQuery: {
            //         lessonId: lessonId,
            //         userId: userId,
            //     },
            //     options: {
            //         pagination: false,
            //     },
            // }
            // dispatch(getNotesRequest(payload))
        }
    }, [deleteNote, noteAction])

    const handleNoteAdd = (value) => {
        if (value.content.trim() !== '') {
            const payload = {
                lessonId: lessonId,
                userId: userId,
                content: value.content,
                time: currentTime,
            }

            dispatch(createNotesRequest(payload))
            setNoteAction('create')
        }
    }

    const scrollBottom = useRef(null)
    const textareaRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            textareaRef.current?.focus()
        }, 100)
        setTimeout(() => {
            scrollBottom.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }, 200)
    }, [notes])

    const markedElementRef = useRef(null)
    const scrollToMarkedElement = () => {
        if (markedElementRef.current) {
            markedElementRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }
        setTimeout(() => {
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 500)
        }, 500)
    }
    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            form.submit()
        }
    }

    const NoteItem = ({
        note,
        action,
        setPinNote,
        setNoteAction,
        checkPin,
    }) => {
        const handlePinNote = (data) => {
            if (!checkPin) {
                const payload = {
                    id: data._id,
                    body: { isPinned: true },
                }
                dispatch(updateNotesRequest(payload))
                setPinNote(data)
                setNoteAction('pin')
                setCheckPin(data)
            }
            if (checkPin) {
                setCheckPin(data)
                if (checkPin?._id !== data._id) {
                    const removePin = {
                        id: checkPin?._id,
                        body: { isPinned: false },
                    }
                    dispatch(updateNotesRequest(removePin))
                    setTimeout(() => {
                        const payload = {
                            id: data._id,
                            body: { isPinned: true },
                        }
                        dispatch(updateNotesRequest(payload))
                    }, 200)

                    setPinNote(data)
                    setNoteAction('pin')
                }
            }
        }

        const handleRemoveNote = (id) => {
            dispatch(deleteNotesRequest(id))
            setNoteAction('delete')
        }
        const [update, setUpdate] = useState('')

        const [value, setValue] = useState('')

        const handleUpdateNote = () => {
            if (value.trim() !== '') {
                const payload = {
                    id: update,
                    body: { content: value },
                }
                dispatch(updateNotesRequest(payload))
                setNoteAction('update')
            }
        }

        const handleRemovePin = (id) => {
            setPinNote('')
            setNoteAction('un-pin')
            const payload = {
                id: id,
                body: { isPinned: false },
            }
            dispatch(updateNotesRequest(payload))
        }

        const items = [
            {
                key: '1',
                label: (
                    <div onClick={() => handlePinNote(note)}>
                        <PushpinOutlined className="mr-5" /> Ghim ghi chú
                    </div>
                ),
            },
            {
                key: '2',
                label: (
                    <div onClick={() => setUpdate(note._id)}>
                        <EditOutlined className="mr-5" /> Sửa ghi chú
                    </div>
                ),
            },
            {
                key: '3',
                label: (
                    <div onClick={() => handleRemoveNote(note._id)}>
                        <DeleteOutlined className="mr-5" /> Xóa ghi chú
                    </div>
                ),

                danger: true,
            },
        ]
        const duration = moment.duration(note.time, 'seconds')
        const formattedTime = moment
            .utc(duration.asMilliseconds())
            .format('mm:ss')

        return (
            <div className="note-item">
                <Button type="link" onClick={() => setCurrentTime(note.time)}>
                    {formattedTime}
                </Button>

                <Space
                    className="note-body"
                    style={{
                        position: 'relative',
                        width: '100%',
                    }}
                >
                    <div className="note-content">
                        {update ? (
                            <TextArea
                                className="note-update "
                                autoSize
                                placeholder="Nhập nội dung ghi chú"
                                defaultValue={note.content}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        ) : (
                            note.content
                        )}
                    </div>

                    <div className="note-more">
                        {action === 'pin' && (
                            <Tooltip title="Bỏ đánh dấu">
                                <Button
                                    onClick={() => handleRemovePin(pinNote._id)}
                                    icon={<TagFilled />}
                                    type="text"
                                    size="small"
                                    className="note-more-butt"
                                />
                            </Tooltip>
                        )}
                        {action === 'show' && !update ? (
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottomRight"
                            >
                                <Button
                                    icon={<EllipsisOutlined />}
                                    type="text"
                                    size="small"
                                    className="note-more-butt mr-10"
                                />
                            </Dropdown>
                        ) : (
                            update && (
                                <Space>
                                    <Button
                                        icon={<CheckOutlined />}
                                        type="text"
                                        size="small"
                                        onClick={() => handleUpdateNote()}
                                    />
                                    <Button
                                        icon={<CloseOutlined />}
                                        type="text"
                                        size="small"
                                        onClick={() => setUpdate(false)}
                                    />
                                </Space>
                            )
                        )}
                    </div>
                </Space>
            </div>
        )
    }
    return (
        <Card
            className="note-main"
            style={{
                display: enlarge ? 'none' : null,
            }}
            title="Ghi chú"
            extra={
                <Button
                    icon={<CloseOutlined />}
                    onClick={() => setOpenNote(false)}
                    shape="circle"
                    type="text"
                ></Button>
            }
            size="small"
        >
            <Card className="screen-main">
                {pinNote ? (
                    <Card
                        size="small"
                        className="pin-note"
                        onClick={scrollToMarkedElement}
                    >
                        <NoteItem
                            note={pinNote}
                            action="pin"
                            setPinNote={setPinNote}
                            setNoteAction={setNoteAction}
                            checkPin={checkPin}
                        />
                    </Card>
                ) : null}
                <div
                    className="note-screen"
                    style={
                        pinNote
                            ? {
                                  height: isDesktop ? '86%' : '82%',
                                  marginTop: isDesktop ? '14%' : '18%',
                              }
                            : { height: '100%', marginTop: 0 }
                    }
                >
                    {noteData?.status === 'loading' ? (
                        <Spin tip="Loading..." style={{ marginTop: '20vh' }}>
                            <div className="content" />
                        </Spin>
                    ) : (
                        <List
                            dataSource={notes}
                            renderItem={(note) => (
                                <List.Item
                                    key={note._id}
                                    ref={
                                        pinNote._id === note._id
                                            ? markedElementRef
                                            : null
                                    }
                                    style={{
                                        padding: '10px 0',
                                        background:
                                            pinNote._id === note._id && show
                                                ? 'aliceblue'
                                                : 'none',
                                    }}
                                >
                                    <NoteItem
                                        note={note}
                                        action="show"
                                        setPinNote={setPinNote}
                                        setNoteAction={setNoteAction}
                                        checkPin={checkPin}
                                    />
                                </List.Item>
                            )}
                        ></List>
                    )}

                    <div ref={scrollBottom}></div>
                </div>{' '}
            </Card>
            <Form form={form} onFinish={handleNoteAdd}>
                <Form.Item name="content" style={{ width: '100%' }}>
                    <TextArea
                        style={{ maxHeight: 210, overflowY: 'auto' }}
                        autoSize
                        placeholder="Nhập nội dung ghi chú"
                        onKeyDown={handleKeyDown}
                        ref={textareaRef}
                    ></TextArea>
                </Form.Item>
                <Form.Item style={{ marginTop: -18, marginBottom: 0 }}>
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
