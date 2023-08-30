import React from 'react'
import Header from '../../../components/layout/Header/Header'
import { Card, Col, Row, Space } from 'antd'
import { RiEmotionLaughFill } from 'react-icons/ri'
import './styles.scss'
import {
    BsBookFill,
    BsFillPencilFill,
    BsFillPauseBtnFill,
} from 'react-icons/bs'
import point from '../../../assets/icons/place.svg'
import place from '../../../assets/icons/point.svg'

export default function Intro() {
    const introData = [
        {
            title: 'Phương pháp 1-1',
            desc: 'Mỗi học viên sẽ học với một giáo viên, tương tác 2 chiều suốt buổi học, giáo viên sẽ theo sát trình độ của học viên để giúp học viên tiến bộ cực nhanh.',
            icon: <BsBookFill fontSize={24} />,
            keyId: '',
        },
        {
            title: 'Đổi giảng viên',
            desc: 'Trong quá trình học tập học viên – sinh viên được đổi Giảng viên phù hợp phương pháp học tập của các em để các em có thể nắm kiến thức – hiệu quả tất nhất.',
            icon: <RiEmotionLaughFill fontSize={24} />,
            keyId: '2',
        },
        {
            title: 'Đa dạng khóa học',
            desc: 'Với chương trình học đa dạng đáp ứng nhu cầu làm việc, du học - định cư, với các chứng chỉ như VSTEP, TOEIC, IELTS, HSK, TOCFL, JLPT, TOPIK… để tốt nghiệp, xét tuyển đầu vào các Trường v.v..',
            icon: <BsFillPauseBtnFill fontSize={24} />,
            keyId: '3',
        },
        {
            title: 'Đa dạng khóa học',
            desc: 'Chỉ cần máy tính, smartphone hoặc máy tính bảng có kết nối internet, Bạn có thể học các tiếng với Giáo viên UCAM ở bất cứ nơi đâu, bất cứ khi nào.',
            icon: <BsFillPencilFill fontSize={18} />,
            keyId: '4',
        },
        {
            title: 'Phương pháp 1-1',
            desc: 'Mỗi học viên sẽ học với một giáo viên, tương tác 2 chiều suốt buổi học, giáo viên sẽ theo sát trình độ của học viên để giúp học viên tiến bộ cực nhanh.',
            icon: <BsBookFill fontSize={24} />,
            keyId: '',
        },
        {
            title: 'Đổi giảng viên',
            desc: 'Trong quá trình học tập học viên – sinh viên được đổi Giảng viên phù hợp phương pháp học tập của các em để các em có thể nắm kiến thức – hiệu quả tất nhất.',
            icon: <RiEmotionLaughFill fontSize={24} />,
            keyId: '2',
        },
        {
            title: 'Đa dạng khóa học',
            desc: 'Với chương trình học đa dạng đáp ứng nhu cầu làm việc, du học - định cư, với các chứng chỉ như VSTEP, TOEIC, IELTS, HSK, TOCFL, JLPT, TOPIK… để tốt nghiệp, xét tuyển đầu vào các Trường v.v..',
            icon: <BsFillPauseBtnFill fontSize={24} />,
            keyId: '3',
        },
        {
            title: 'Đa dạng khóa học',
            desc: 'Chỉ cần máy tính, smartphone hoặc máy tính bảng có kết nối internet, Bạn có thể học các tiếng với Giáo viên UCAM ở bất cứ nơi đâu, bất cứ khi nào.',
            icon: <BsFillPencilFill fontSize={18} />,
            keyId: '4',
        },
    ]
    return (
        <Header
            size="sm"
            title="UCAM là trung tâm ngoại ngữ uy tín, tận tình"
            titleSize={50}
            desc="VÌ SAO NÊN CHỌN CHÚNG TÔI?"
            padding={60}
            background="var(--lighish-white)"
        >
            <img src={place} alt="place" className="place" />
            <img src={point} alt="point" className="point" />
            <Row gutter={[24, 24]} className="intor-main">
                {introData.map((item, id) => (
                    <Col span={24} md={6} key={id}>
                        <Card size="small" className="intro-card">
                            <Space direction="vertical">
                                <div className={`i-bg${item.keyId} icon-bg`}>
                                    {item.icon}
                                </div>
                                <h3 style={{ margin: 0 }}>{item.title}</h3>
                                <div style={{ margin: 0 }}>{item.desc}</div>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Header>
    )
}
