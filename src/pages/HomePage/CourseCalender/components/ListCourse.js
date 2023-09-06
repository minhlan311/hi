import React from 'react'
import { ReactComponent as CalenderSVG } from '../../../../assets/icons/calendar.svg'
import { ROUTERS_URL } from '../../../../constants/routerUrl'
import { Image, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { coursesSelector } from '../../../../slices/course'
import { useConvertSlug } from '../../../../hooks'
import { useHistory } from 'react-router-dom'
export default function ListCourse() {
    const dataCourse = useSelector(coursesSelector)
    const history = useHistory()
    const handleClickCourse = (id, subject, name) => {
        history.push(
            // eslint-disable-next-line react-hooks/rules-of-hooks
            `/courses/${useConvertSlug(subject)}/${useConvertSlug(name)}`,
            {
                courseId: id,
            }
        )
    }

    const ArrayCouse = dataCourse?.data?.docs
    console.log(ArrayCouse, 'ArrayCouse')
    return (
        <div className="listCourse">
            {dataCourse.status === 'loading' ? (
                <div>
                    <Spin />
                </div>
            ) : dataCourse.status === 'success' ? (
                <>
                    {' '}
                    {ArrayCouse?.map((item) => (
                        <div className="col">
                            <div className="imgCol">
                                <Image
                                    className="imgColin"
                                    src="https://static.anhnguathena.vn/anhngu//img.media/2020/07/159436821388.jpg"
                                />
                            </div>
                            <div className="contentList">
                                <Link
                                    onClick={() => {
                                        handleClickCourse(
                                            item.id,
                                            item.subjectId.name,
                                            item.name
                                        )
                                    }}
                                    className="link"
                                >
                                    <h4 className="link-h4">{item.name}</h4>
                                </Link>
                                <div className="flex">
                                    <CalenderSVG className="icons" />
                                    <p className="text-date">
                                        Khai giảng 22.08.2023 - Thứ 3-5-7
                                        <br />
                                        Từ 17:20 - 19:20
                                    </p>
                                </div>
                                <div
                                    className="flex"
                                    style={{ marginTop: '10px' }}
                                >
                                    <CalenderSVG className="icons" />
                                    <p className="text-date">
                                        Khai giảng 22.08.2023 - Thứ 3-5-7
                                        <br />
                                        Từ 17:20 - 19:20
                                    </p>
                                </div>
                                <div className="flexPrice">
                                    <span className="name">Chi phí: </span>
                                    <span className="price">1.650.00 vnđ</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <>Không có data</>
            )}
        </div>
    )
}
