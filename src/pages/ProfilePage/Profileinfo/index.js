/* eslint-disable react-hooks/rules-of-hooks */
import './styles.scss'
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
import {
    CameraFilled,
    EditFilled,
    ExclamationCircleFilled,
} from '@ant-design/icons'
import { getStorage, setStorage } from '../../../services/storage'
import { USER_INFO } from '../../../constants/storageKeys'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateUserRequest,
    userDetailRequest,
    userDetailSelector,
} from '../../../slices/user'
import { Button, Card, message, Skeleton, Space, Upload } from 'antd'
import settings from '../../../settings'
import { UPLOAD_IMAGE } from '../../../constants/paths'
import EditProfile from '../Modal/EditProfile'
import noAvt from '../../../assets/images/navigation/No-avt.jpg'
import {
    getEducationsRequest,
    educationsSelector,
} from '../../../slices/education'
export default function ProfileInfo() {
    const userLocal = getStorage(USER_INFO)
    const dispatch = useDispatch()
    const userDetail = useSelector(userDetailSelector)
    const educations = useSelector(educationsSelector)
    const [fileUp, setFileUp] = useState('')
    const [avtBase, setAvtBase] = useState(false)
    const [bgBase, setBgBase] = useState(false)
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        dispatch(userDetailRequest(userLocal._id))
    }, [])

    useEffect(() => {
        if (userDetail.status === 'success' && update) {
            message.success('Cập nhật thành công!')
            dispatch(userDetailRequest(userLocal._id))
            setTimeout(() => {
                setUpdate(false)
            }, 200)
        }
    }, [userDetail])

    const user = userDetail?.data
    const load = userDetail.status === 'loading'

    useEffect(() => {
        const body = {
            filterQuery: {
                educationType: user?.educationType,
            },
            options: {
                pagination: false,
            },
        }
        dispatch(getEducationsRequest(body))
    }, [user])

    const education = educations?.data?.find(
        (it) => it._id === user?.educationId
    )

    const handleSubmit = async () => {
        if (avtBase) {
            const payload = {
                avatarUrl: fileUp,
            }
            dispatch(updateUserRequest(payload))
            userLocal.avatarUrl = fileUp
        } else if (bgBase) {
            const payload = {
                coverImgUrl: fileUp,
            }
            dispatch(updateUserRequest(payload))
            userLocal.coverImgUrl = fileUp
        }

        setAvtBase(false)
        setBgBase(false)
        setFileUp('')

        setStorage({
            key: USER_INFO,
            val: userLocal,
        })
        setUpdate(true)
    }

    const propsImageProfile = {
        name: 'image',
        multiple: false,
        action: settings.FILE_URL + UPLOAD_IMAGE,
        accept: '.png, .jpg, .jpge, .gif',
        listType: 'none',
        onChange(info) {
            const { status } = info.file
            setLoading(true)
            if (status === 'done') {
                message.success(`Tải ảnh ${info.file.name} thành công!`)
                setFileUp(settings.FILE_URL + '/' + info.file.response.url)
                setLoading(false)
            } else if (status === 'error') {
                message.error(`Tải ảnh ${info.file.name} thất bại!`)
                setLoading(false)
            }
        },
        onDrop(e) {
            message.success(`Đã thả ảnh ${e.dataTransfer.files} thành công!`)
        },
    }

    const [MEditOpen, setMEditOpen] = useState(false)
    return (
        <div className="prf-container">
            {fileUp ? (
                <Card size="small" style={{ marginBottom: 25 }}>
                    <ExclamationCircleFilled
                        style={{
                            fontSize: 18,
                            marginRight: 10,
                            color: '#faad14',
                        }}
                    />
                    Bạn có chắc chắn muốn cập nhật{' '}
                    {(avtBase && ' ảnh đại diện của bạn?') ||
                        (bgBase && ' ảnh bìa của bạn?')}
                    <Button
                        type="primary"
                        style={{ margin: '0 15px' }}
                        onClick={handleSubmit}
                    >
                        Lưu
                    </Button>
                    <Button
                        onClick={() => {
                            setAvtBase(false)
                            setBgBase(false)
                            setFileUp('')
                        }}
                    >
                        Hủy
                    </Button>
                </Card>
            ) : null}
            <div className="prf-background">
                <img
                    src={
                        user?.coverImgUrl
                            ? bgBase && fileUp
                                ? fileUp
                                : user?.coverImgUrl
                            : bgBase && fileUp
                            ? fileUp
                            : 'https://picsum.photos/seed/picsum/1200/400'
                    }
                    alt="bg"
                />

                <Upload {...propsImageProfile} showUploadList={false}>
                    <Button
                        loading={loading}
                        onClick={() => setBgBase(true)}
                        className="bg-upload d-space-c"
                        icon={<CameraFilled style={{ fontSize: '16px' }} />}
                        disabled={(avtBase && true) || (fileUp && false)}
                    >
                        <p>Chỉnh sửa ảnh bìa</p>
                    </Button>
                </Upload>
            </div>
            <div className="prf">
                <div className="prf-info">
                    <div className="prf-avt">
                        <div className="avt">
                            <img
                                src={
                                    user?.avatarUrl
                                        ? avtBase && fileUp
                                            ? fileUp
                                            : user?.avatarUrl
                                        : avtBase && fileUp
                                        ? fileUp
                                        : noAvt
                                }
                                alt="avt"
                            />
                        </div>
                        <Upload {...propsImageProfile} showUploadList={false}>
                            <Button
                                loading={loading}
                                shape="circle"
                                className="avt-upload"
                                icon={
                                    <CameraFilled
                                        style={{ fontSize: '14px' }}
                                    />
                                }
                                onClick={() => setAvtBase(true)}
                                disabled={(bgBase && true) || (fileUp && false)}
                            />
                        </Upload>
                    </div>

                    <div className="prf-name">
                        {load ? (
                            <Space direction="vertical">
                                <Skeleton.Button
                                    active
                                    style={{ height: 25, width: 150 }}
                                />
                                <Skeleton.Button
                                    active
                                    style={{ height: 15, width: 200 }}
                                />

                                {/* <Skeleton active rows={1} /> */}
                                <Space>
                                    <Skeleton.Avatar
                                        active
                                        shape="circle"
                                        size="small"
                                    />
                                    <Skeleton.Avatar
                                        active
                                        shape="circle"
                                        size="small"
                                    />
                                    <Skeleton.Avatar
                                        active
                                        shape="circle"
                                        size="small"
                                    />
                                    <Skeleton.Avatar
                                        active
                                        shape="circle"
                                        size="small"
                                    />
                                </Space>
                            </Space>
                        ) : (
                            <>
                                <h3>{user?.fullName}</h3>
                                <p>{education?.name}</p>
                                <div className="social">
                                    <ul>
                                        {user?.social?.map(
                                            (url) =>
                                                (url.type === 'Facebook' && (
                                                    <li
                                                        key={url.type}
                                                        onClick={() =>
                                                            window
                                                                .open(
                                                                    url.url,
                                                                    '_blank'
                                                                )
                                                                .focus()
                                                        }
                                                    >
                                                        <FaFacebookF color="#4267B2" />
                                                    </li>
                                                )) ||
                                                (url.type === 'Instagram' && (
                                                    <li
                                                        key={url.type}
                                                        onClick={() =>
                                                            window
                                                                .open(
                                                                    url.url,
                                                                    '_blank'
                                                                )
                                                                .focus()
                                                        }
                                                    >
                                                        <FaInstagram
                                                            style={{
                                                                color: '#E4405F',
                                                            }}
                                                        />
                                                    </li>
                                                )) ||
                                                (url.type === 'Youtube' && (
                                                    <li
                                                        key={url.type}
                                                        onClick={() =>
                                                            window
                                                                .open(
                                                                    url.url,
                                                                    '_blank'
                                                                )
                                                                .focus()
                                                        }
                                                    >
                                                        <FaYoutube color="#FF0000" />
                                                    </li>
                                                )) ||
                                                (url.type === 'TikTok' && (
                                                    <li
                                                        key={url.type}
                                                        onClick={() =>
                                                            window
                                                                .open(
                                                                    url.url,
                                                                    '_blank'
                                                                )
                                                                .focus()
                                                        }
                                                    >
                                                        <FaTiktok />
                                                    </li>
                                                ))
                                        )}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="prf-intro">
                    <Button
                        icon={<EditFilled />}
                        className="prf-edit-button"
                        onClick={() => setMEditOpen(!MEditOpen)}
                    >
                        Chỉnh sửa trang cá nhân
                    </Button>
                    <EditProfile
                        open={MEditOpen}
                        onCancel={setMEditOpen}
                        setUpdate={setUpdate}
                        userData={user}
                        educations={educations?.data}
                    />
                </div>
            </div>
        </div>
    )
}
