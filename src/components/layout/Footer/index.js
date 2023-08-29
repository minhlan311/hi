/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect } from 'react'
import { List, Space, Typography } from 'antd'

import mtzLogoImg from '../../../assets/images/backgrounds/mtz-logo.svg'
import mtzFacebookIcon from '../../../assets/images/homepage/facebook-icon.svg'
import mtzInstagramIcon from '../../../assets/images/homepage/instagram-icon.svg'
import mtzTwitterIcon from '../../../assets/images/homepage/twitter-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import './styles.scss'
import '../../../assets/css/bonus.css'
import '../../../assets/css/grid.css'
import { configsSelector, getconfigsRequest } from '../../../slices/configs'
const { Text } = Typography

const Footer = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getconfigsRequest())
    }, [])

    const configs = useSelector(configsSelector)
    const data = configs?.data
    return (
        <>
            <div className="footer">
                <div className="footer-col">
                    <div className="grid wide">
                        <div className="rowM">
                            <div className="col-footer l-3 m-6 c-6">
                                <div className="col-footer-left">
                                    <Space
                                        direction="vertical"
                                        style={{ position: 'relative' }}
                                    >
                                        <div className="mtz-footer-logo">
                                            <img
                                                src={mtzLogoImg}
                                                alt="mtz logo"
                                            />
                                        </div>
                                        <Text className="footer-title">
                                            Follow Us
                                        </Text>
                                        <Space className="social-group">
                                            {data?.socials?.map((item) => (
                                                <div key={item._id}>
                                                    {item.type ===
                                                    'FACEBOOK' ? (
                                                        <img
                                                            src={
                                                                mtzFacebookIcon
                                                            }
                                                            alt="social network"
                                                            onClick={() =>
                                                                (window.location.href =
                                                                    item.url)
                                                            }
                                                        />
                                                    ) : null}
                                                    {item.type === 'TWITTER' ? (
                                                        <img
                                                            src={mtzTwitterIcon}
                                                            alt="social network"
                                                            onClick={() =>
                                                                (window.location.href =
                                                                    item.url)
                                                            }
                                                        />
                                                    ) : null}{' '}
                                                    {item.type ===
                                                    'INSTAGRAM' ? (
                                                        <img
                                                            src={
                                                                mtzInstagramIcon
                                                            }
                                                            alt="social network"
                                                            onClick={() =>
                                                                (window.location.href =
                                                                    item.url)
                                                            }
                                                        />
                                                    ) : null}
                                                </div>
                                            ))}
                                        </Space>
                                    </Space>
                                </div>
                            </div>
                            <div className="col-footer l-3 m-6 c-6">
                                <div className="col-footer-right">
                                    <Space direction="vertical">
                                        <Text className="footer-heading">
                                            LIÊN HỆ
                                        </Text>
                                        {data?.contacts?.map((item) => (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                                key={item._id}
                                            >
                                                <Text className="footer-title">
                                                    {item.name} -{' '}
                                                    {item.phoneNumber}
                                                </Text>
                                                <Text className="footer-title">
                                                    {item.email}
                                                </Text>
                                            </div>
                                        ))}

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <h4
                                                style={{
                                                    color: 'white',
                                                    margin: 0,
                                                }}
                                            >
                                                Liên hệ tài trợ - đối tác:
                                            </h4>
                                            {data?.partners?.map((pm) => (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                    key={pm._id}
                                                >
                                                    <Text className="footer-title">
                                                        {pm.name} -{' '}
                                                        {pm.phoneNumber}
                                                    </Text>
                                                    <Text className="footer-title">
                                                        {pm.email}
                                                    </Text>
                                                </div>
                                            ))}
                                        </div>
                                    </Space>
                                </div>
                            </div>
                            <div className="col-footer l-3 m-6 c-6">
                                <div className="col-footer-left">
                                    <Space direction="vertical">
                                        <Text className="footer-heading">
                                            MENTORZ
                                        </Text>
                                        <Text className="footer-title">
                                            Về MentorZ
                                        </Text>
                                        <Text className="footer-title">
                                            Tuyển dụng giảng viên
                                        </Text>
                                        <Text className="footer-title">
                                            Liên hệ MentorZ
                                        </Text>
                                        <Text className="footer-title">
                                            Trả góp – Hỗ trợ tài chính
                                        </Text>
                                        <Text className="footer-title">
                                            FAQs
                                        </Text>
                                    </Space>
                                </div>
                            </div>
                            <div className="col-footer l-3 m-6 c-6">
                                <div className="col-footer-right">
                                    <Space direction="vertical">
                                        <Text className="footer-heading">
                                            LINKS
                                        </Text>
                                        <Text className="footer-title">
                                            ACCA
                                        </Text>
                                        <Text className="footer-title">
                                            Kinh nghiệm tuyển dụng
                                        </Text>
                                        <Text className="footer-title">
                                            Test
                                        </Text>
                                        <Text className="footer-title">
                                            Voucher
                                        </Text>
                                        <Text className="footer-title">
                                            Excel thực hành
                                        </Text>
                                    </Space>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid wide">
                <div className="rowM">
                    <div className="col l-12 m-12 c-12">
                        © 2022. MentorZ Vietnam Joint Stock Company.
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Footer)
