import React, { useMemo, useEffect, memo } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Empty, Collapse, Tag } from 'antd'
import speaker from '../../../assets/images/exam-page/speaker.svg'
import bling from '../../../assets/images/exam-page/bling.svg'
import target from '../../../assets/images/exam-page/target.svg'
import paperSmall from '../../../assets/images/exam-page/paper-small.svg'
import paper from '../../../assets/images/exam-page/paper.svg'
import spaceShip from '../../../assets/images/exam-page/spaceship.svg'
import { CheckOutlined } from '@ant-design/icons'
import '../ExamListing/styles.scss'
import './style.scss'
import { getStorage } from '../../../services/storage'
import { USER_INFO } from '../../../constants/storageKeys'
import { useDispatch, useSelector } from 'react-redux'
import {
    getCategoriesRequest,
    categoriesSelector,
} from '../../../slices/category'
import { useMediaQuery } from 'react-responsive'

const { Panel } = Collapse

const EmptyCustom = () => (
    <Empty
        style={{ padding: '100px 0' }}
        description={<span>Hiện không có bài thi nào phù hợp với bạn !</span>}
    ></Empty>
)
const TestList = (props) => {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const userInfo = useMemo(() => getStorage(USER_INFO), [])
    const dispatch = useDispatch()
    const history = useHistory()
    const categories = useSelector(categoriesSelector)
    useEffect(() => {
        if (userInfo?.educationType) {
            const body = {
                filterQuery: {
                    educationType: [userInfo?.educationType, ''],
                    educationId: userInfo.educationId,
                    onModel: 'EXAM',
                    testType: props.testType,
                    status: 'ACTIVE',
                },
                options: {
                    pagination: false,
                    sort: { position: 1 },
                },
            }
            dispatch(getCategoriesRequest(body))
        }
    }, [userInfo])

    const handleClickExam = (exam) => {
        history.push(`${history.location.pathname}/${exam._id}`)
    }
    return (
        <>
            <div
                className={`${
                    isMobile || isTablet ? 'mtz-container-m' : 'mtz-container'
                } exam-test`}
            >
                <div className="rowM">
                    <div className="l-4 m-4 c-6">
                        <div className="header-title">{props.label}</div>
                    </div>
                </div>
                {categories?.data.length < 1 ? (
                    <EmptyCustom />
                ) : (
                    <div className="rowM">
                        <div className="col l-8 m-12 c-12">
                            <div className="mtz-exam-list">
                                <Collapse
                                    className="exam-listing mt-15 mb-15"
                                    ghost
                                    expandIconPosition="end"
                                >
                                    {categories?.data &&
                                        categories?.data.map((category) => (
                                            <Panel
                                                header={category?.name}
                                                key={category?._id}
                                            >
                                                {category?.details.length <
                                                1 ? (
                                                    <div className="quiz-test">
                                                        Không có môn học.
                                                    </div>
                                                ) : (
                                                    <Collapse
                                                        className="exam-list-test-for-cate mt-5 mb-10"
                                                        ghost
                                                    >
                                                        {category?.details &&
                                                            category?.details.map(
                                                                (detail) =>
                                                                    detail.subjectId && (
                                                                        <Panel
                                                                            header={
                                                                                detail
                                                                                    ?.subjectId
                                                                                    ?.name
                                                                            }
                                                                            key={
                                                                                detail
                                                                                    .subjectId
                                                                                    ?._id
                                                                            }
                                                                        >
                                                                            {detail
                                                                                ?.subjectId
                                                                                ?.tests
                                                                                ?.length <
                                                                            1 ? (
                                                                                <div className="quiz-test">
                                                                                    Không
                                                                                    có
                                                                                    bộ
                                                                                    đề
                                                                                    cho
                                                                                    năm
                                                                                    học.
                                                                                </div>
                                                                            ) : (
                                                                                detail
                                                                                    ?.subjectId
                                                                                    ?.tests &&
                                                                                detail?.subjectId?.tests?.map(
                                                                                    (
                                                                                        exam
                                                                                    ) =>
                                                                                        exam.plan ===
                                                                                        'FREE' ? (
                                                                                            <div
                                                                                                className="quiz-test"
                                                                                                onClick={() =>
                                                                                                    handleClickExam(
                                                                                                        exam
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    exam?.name
                                                                                                }
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div
                                                                                                className="quiz-test"
                                                                                                onClick={() =>
                                                                                                    handleClickExam(
                                                                                                        exam
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                <div
                                                                                                    className="title-quiz-test"
                                                                                                    style={{
                                                                                                        display:
                                                                                                            'contents',
                                                                                                    }}
                                                                                                >
                                                                                                    <span>
                                                                                                        {' '}
                                                                                                        {
                                                                                                            exam?.name
                                                                                                        }
                                                                                                    </span>
                                                                                                    <Tag color="#f50">
                                                                                                        Mất
                                                                                                        phí
                                                                                                    </Tag>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                )
                                                                            )}
                                                                        </Panel>
                                                                    )
                                                            )}
                                                    </Collapse>
                                                )}
                                            </Panel>
                                        ))}
                                </Collapse>
                            </div>
                        </div>
                        {/* right */}
                        <div className="col l-4 m-0 c-0">
                            <div className="box-top">
                                <div className="content">
                                    <h3 className="title">
                                        Có thể bạn chưa biết ?
                                    </h3>
                                    <p className="title-sp">
                                        Bạn có thể tạo ra những bài Thi bằng
                                        cách đăng ký làm Mentor.
                                    </p>
                                    <Link
                                        to="/regis-is-mentor"
                                        className="content-bottom"
                                    >
                                        Đăng ký ngay!
                                    </Link>
                                </div>
                                <div className="image-intro">
                                    <img
                                        className="image-bling"
                                        src={bling}
                                        align="right"
                                        alt="speaker-top-box"
                                    />
                                    <img
                                        className="image-speaker"
                                        src={speaker}
                                        align="right"
                                        alt="speaker-top-box"
                                    />
                                </div>
                            </div>
                            <div className="box-bottom">
                                <div className="content-top">
                                    <img
                                        className="image-target"
                                        src={target}
                                        align="left"
                                        alt="target-top-box"
                                    />
                                    <p className="title-content-box-bottom">
                                        Tạo ra các bài Test bạn sẽ được gì?
                                    </p>
                                    <img
                                        className="image-paper-small"
                                        src={paperSmall}
                                        align="right"
                                        alt="target-top-box"
                                    />
                                </div>
                                <div className="top-content-box">
                                    <div>
                                        <CheckOutlined
                                            style={{
                                                color: '#6aff60',
                                                fontSize: 25,
                                            }}
                                        />
                                        Giúp bạn ghi nhớ nhanh những kiến thức
                                        bạn được học.
                                    </div>
                                    <div
                                        style={{
                                            margin: '25px 0',
                                        }}
                                    >
                                        <CheckOutlined
                                            style={{
                                                color: '#6aff60',
                                                fontSize: 25,
                                            }}
                                        />
                                        Bạn có thể chia sẻ những bài Test mà bạn
                                        đã tạo ra cho các thành viên trong lớp
                                        của bạn.
                                    </div>

                                    <div style={{ maxWidth: 200 }}>
                                        <CheckOutlined
                                            style={{
                                                color: '#6aff60',
                                                fontSize: 25,
                                            }}
                                        />
                                        Bạn có thể gia tăng thu nhập từ việc tạo
                                        ra các bài Test có trả phí.
                                    </div>
                                </div>
                                <img
                                    className="image-paper-large"
                                    src={paper}
                                    align="left"
                                    alt="target-top-box"
                                />

                                <img
                                    className="image-paper-large-right"
                                    src={paper}
                                    align="right"
                                    alt="target-top-box"
                                />
                                <img
                                    className="image-paper-spaceShip"
                                    src={spaceShip}
                                    align="right"
                                    alt="target-top-box"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default memo(TestList)
