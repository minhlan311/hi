import React from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { ReactComponent as BallSVG } from '../../../assets/icons/ball.svg'
import { ReactComponent as BirdSVG } from '../../../assets/icons/bird.svg'
import { ReactComponent as PencilSVG } from '../../../assets/icons/pencil.svg'
import './VideoContent.scss'
import IconCheck from './components/IconCheck'

export default function VideoContent() {
    const ArrayDesc = [
        {
            id: 1,
            name: 'Linh động thời gian, địa điểm',
            desc: 'Linh hoạt thời gian - phù hợp với người bận rộn',
        },
        {
            id: 2,
            name: 'Đào tạo 1:1',
            desc: 'Một giảng viên kèm 1 học viên - giao tiếp sửa lỗi liên tục',
        },
        {
            id: 3,
            name: 'Đội ngũ giảng viên giàu kinh nghiệm',
            desc: '100% giảng viên đạt 7.0+ IELTS/850+ TOEIC hoặc có bằng cấp tương đương',
        },
        {
            id: 4,
            name: 'Lộ trình rõ ràng',
            desc: 'Lộ trình cá nhân hóa - thiết kế bài giảng theo nhu cầu',
        },
        {
            id: 5,
            name: 'Phương pháp học hiệu qủa',
            desc: 'X5 hiệu quả với các phương pháp tiên tiến',
        },
    ]

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
                <div className="content-div-container">
                    <div className="content">
                        <div className="content-col">
                            <p className="desc-steps">GIẢI PHÁP HOÀN HẢO</p>
                            <h2>UCAM THIẾT KẾ RIÊNG CHO BẠN</h2>
                        </div>
                        <div className="content-col flex-steps">
                            <div className="steps">
                                <IconCheck />
                                <IconCheck marginTop={'55px'} />
                                <IconCheck marginTop={'80px'} />
                                <IconCheck marginTop={'80px'} />
                                <IconCheck marginTop={'80px'} />
                            </div>
                            <div className="content-steps">
                                {ArrayDesc?.map((item) => (
                                    <>
                                        <div>
                                            <p className="title-steps">
                                                {' '}
                                                {item.name}
                                            </p>
                                            <p className="desc-steps">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="video-content">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/U2rB68ouwJY?si=uVDSO-wAO6y8Rgc_"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer;fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
