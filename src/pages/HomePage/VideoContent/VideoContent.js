import React from 'react'
import './VideoContent.scss'
import { Button } from 'antd'
import { BsCheckLg } from 'react-icons/bs'
import { ReactComponent as PencilSVG } from '../../../assets/icons/pencil.svg'
import { ReactComponent as BallSVG } from '../../../assets/icons/ball.svg'
import { ReactComponent as BirdSVG } from '../../../assets/icons/bird.svg'

export default function VideoContent() {
    return (
        <div className="video-content-container">
            <div className="container-1920px">
                <div className="pencilSVG">
                    <PencilSVG />
                </div>
                <div className="ballSVG">
                    <BallSVG />
                </div>
                <div className="birdSVG">
                    <BirdSVG />
                </div>
                <div className="video-content">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/U2rB68ouwJY?si=uVDSO-wAO6y8Rgc_"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
                <div className="content">
                    <div className="content-col">
                        <p className="desc-steps">KHÓA HỌC NÀY DÀNH CHO AI?</p>
                        <h2>Học Tiếng Anh Online Cho Người Bận Rộn</h2>
                        <Button className="button-primary">
                            Tìm hiểu thêm
                        </Button>
                    </div>
                    <div className="content-col flex-steps">
                        <div className="steps">
                            <div className="iconTopBox">
                                <BsCheckLg className="icons-steps iconTop" />
                            </div>
                            <div className="steps-inline"></div>
                            <div className="iconBotBox">
                                <BsCheckLg className="icons-steps iconBot" />
                            </div>
                        </div>
                        <div className="content-steps">
                            <div>
                                <p className="title-steps">Đào tạo 1:1</p>
                                <p className="desc-steps">
                                    Học Tiếng Anh Online 1 thầy 1 trò Skype ngay
                                    trên máy tính hoặc điện thoại
                                </p>
                            </div>
                            <div>
                                <p className="title-steps gap-steps">
                                    {' '}
                                    Linh động thời gian, địa điểm
                                </p>
                                <p className="desc-steps">
                                    Học Tiếng Anh ở bất cứ nơi đâu và bất cứ
                                    thời gian nào mà bạn lựa chọn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
