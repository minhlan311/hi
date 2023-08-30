import React, { useState } from 'react'
import { Button, Image } from 'antd'
import './CourseCalender.scss'
import { ReactComponent as EngSVG } from '../../../assets/icons/eng_flag.svg'
import { ReactComponent as GermanySVG } from '../../../assets/icons/germany_flag.svg'
import { ReactComponent as JapanSVG } from '../../../assets/icons/japan_flag.svg'
import { ReactComponent as KoreaSVG } from '../../../assets/icons/korea_flag.svg'
import { ReactComponent as ChinaSVG } from '../../../assets/icons/china_flag.svg'
import { ReactComponent as CalenderSVG } from '../../../assets/icons/calendar.svg'
export default function CourseCalender() {
    const [active, setActive] = useState('eng')
    return (
        <div className="courseCalender-container">
            <div className="container-1200px">
                <p>ĐÀO TẠO NHIỀU NGÔN NGỮ</p>
                <h3>Lịch khai giảng khóa học online</h3>
                <div className="groupButton">
                    <Button
                        className={active === 'eng' ? 'buttonActive' : 'button'}
                        onClick={() => {
                            setActive('eng')
                        }}
                    >
                        <EngSVG />
                        Tiếng Anh
                    </Button>
                    <Button
                        className={
                            active === 'germany' ? 'buttonActive' : 'button'
                        }
                        onClick={() => {
                            setActive('germany')
                        }}
                    >
                        <GermanySVG />
                        Tiếng Đức
                    </Button>
                    <Button
                        className={
                            active === 'japan' ? 'buttonActive' : 'button'
                        }
                        onClick={() => {
                            setActive('japan')
                        }}
                    >
                        <JapanSVG />
                        Tiếng Nhật
                    </Button>
                    <Button
                        className={
                            active === 'korea' ? 'buttonActive' : 'button'
                        }
                        onClick={() => {
                            setActive('korea')
                        }}
                    >
                        <KoreaSVG />
                        Tiếng Hàn
                    </Button>
                    <Button
                        className={
                            active === 'china' ? 'buttonActive' : 'button'
                        }
                        onClick={() => {
                            setActive('china')
                        }}
                    >
                        <ChinaSVG />
                        Tiếng Trung
                    </Button>
                </div>

                <div className="listCourse">
                    <div className="col">
                        <div className="imgCol">
                            <Image
                                className="imgColin"
                                src="https://static.anhnguathena.vn/anhngu//img.media/2020/07/159436821388.jpg"
                            />
                        </div>
                        <div className="contentList">
                            <h4>Giao tiếp ứng dụng 101</h4>
                            <div className="flex">
                                <CalenderSVG className="icons" />
                                <p>
                                    Khai giảng 22.08.2023 - Thứ 3-5-7 Từ 17:20 -
                                    19:20
                                </p>
                            </div>
                            <div className="flex" style={{ marginTop: '10px' }}>
                                <CalenderSVG className="icons" />
                                <p>
                                    Khai giảng 22.08.2023 - Thứ 3-5-7 Từ 17:20 -
                                    19:20
                                </p>
                            </div>
                            <div className="flexPrice">
                                <span className="name">Chi phí: </span>
                                <span className="price">1.650.00 vnđ</span>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="imgCol">
                            <Image
                                className="imgColin"
                                src="https://static.anhnguathena.vn/anhngu//img.media/2020/07/159436821388.jpg"
                            />
                        </div>
                        <div className="contentList">
                            <h4>Giao tiếp ứng dụng 101</h4>
                            <div className="flex">
                                <CalenderSVG className="icons" />
                                <p>
                                    Khai giảng 22.08.2023 - Thứ 3-5-7 Từ 17:20 -
                                    19:20
                                </p>
                            </div>
                            <div className="flex" style={{ marginTop: '10px' }}>
                                <CalenderSVG className="icons" />
                                <p>
                                    Khai giảng 22.08.2023 - Thứ 3-5-7 Từ 17:20 -
                                    19:20
                                </p>
                            </div>
                            <div className="flexPrice">
                                <span className="name">Chi phí: </span>
                                <span className="price">1.650.00 vnđ</span>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="imgCol">
                            <Image
                                className="imgColin"
                                src="https://static.anhnguathena.vn/anhngu//img.media/2020/07/159436821388.jpg"
                            />
                        </div>
                        <div className="contentList">
                            <h4>Giao tiếp ứng dụng 101</h4>
                            <div className="flex">
                                <CalenderSVG className="icons" />
                                <p>
                                    Khai giảng 22.08.2023 - Thứ 3-5-7 Từ 17:20 -
                                    19:20
                                </p>
                            </div>
                            <div className="flex" style={{ marginTop: '10px' }}>
                                <CalenderSVG className="icons" />
                                <p>
                                    Khai giảng 22.08.2023 - Thứ 3-5-7 Từ 17:20 -
                                    19:20
                                </p>
                            </div>
                            <div className="flexPrice">
                                <span className="name">Chi phí: </span>
                                <span className="price">1.650.00 vnđ</span>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="imgCol">
                            <Image
                                className="imgColin"
                                src="https://static.anhnguathena.vn/anhngu//img.media/2020/07/159436821388.jpg"
                            />
                        </div>
                        <div className="contentList">
                            <h4>Giao tiếp ứng dụng 101</h4>
                            <div className="flex">
                                <CalenderSVG className="icons" />
                                <p>
                                    Khai giảng 22.08.2023 - Thứ 3-5-7 Từ 17:20 -
                                    19:20
                                </p>
                            </div>
                            <div className="flex" style={{ marginTop: '10px' }}>
                                <CalenderSVG className="icons" />
                                <p>
                                    Khai giảng 22.08.2023 - Thứ 3-5-7 Từ 17:20 -
                                    19:20
                                </p>
                            </div>
                            <div className="flexPrice">
                                <span className="name">Chi phí: </span>
                                <span className="price">1.650.00 vnđ</span>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="imgCol">
                            <Image
                                className="imgColin"
                                src="https://static.anhnguathena.vn/anhngu//img.media/2020/07/159436821388.jpg"
                            />
                        </div>
                        <div className="contentList">
                            <h4>Giao tiếp ứng dụng 101</h4>
                            <div className="flex">
                                <CalenderSVG className="icons" />
                                <p>
                                    Khai giảng 22.08.2023 - Thứ 3-5-7 Từ 17:20 -
                                    19:20
                                </p>
                            </div>
                            <div className="flex" style={{ marginTop: '10px' }}>
                                <CalenderSVG className="icons" />
                                <p>
                                    Khai giảng 22.08.2023 - Thứ 3-5-7 Từ 17:20 -
                                    19:20
                                </p>
                            </div>
                            <div className="flexPrice">
                                <span className="name">Chi phí: </span>
                                <span className="price">1.650.00 vnđ</span>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="imgCol">
                            <Image
                                className="imgColin"
                                src="https://static.anhnguathena.vn/anhngu//img.media/2020/07/159436821388.jpg"
                            />
                        </div>
                        <div className="contentList">
                            <h4>Giao tiếp ứng dụng 101</h4>
                            <div className="flex">
                                <CalenderSVG className="icons" />
                                <p>
                                    Khai giảng 22.08.2023 - Thứ 3-5-7 Từ 17:20 -
                                    19:20
                                </p>
                            </div>
                            <div className="flex" style={{ marginTop: '10px' }}>
                                <CalenderSVG className="icons" />
                                <p>
                                    Khai giảng 22.08.2023 - Thứ 3-5-7 Từ 17:20 -
                                    19:20
                                </p>
                            </div>
                            <div className="flexPrice">
                                <span className="name">Chi phí: </span>
                                <span className="price">1.650.00 vnđ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
