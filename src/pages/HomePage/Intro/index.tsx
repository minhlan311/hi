import { Button, Card, Space } from 'antd'
import { BsBookFill, BsFillPauseBtnFill, BsFillPencilFill } from 'react-icons/bs'
import { RiEmotionLaughFill } from 'react-icons/ri'
import point from '../../../assets/icons/place.svg'
import place from '../../../assets/icons/point.svg'
import Header from '../../../components/layout/Header/Header'
import './styles.scss'

export default function Intro() {
  const introData = [
    {
      title: 'Đa Dạng Khóa Học',
      desc: 'Với chương trình học đa dạng đáp ứng nhu cầu làm việc, du học - định cư, với các chứng chỉ như VSTEP, TOEIC, IELTS, HSK, TOCFL, JLPT, TOPIK… để tốt nghiệp, xét tuyển đầu vào các Trường v.v..',
      icon: <BsBookFill fontSize={24} />,
      keyId: ''
    },
    {
      title: 'Phương Pháp 1 - 1',
      desc: 'Mỗi học viên sẽ học với một giáo viên, tương tác 2 chiều suốt buổi học, giáo viên sẽ theo sát trình độ của học viên để giúp học viên tiến bộ cực nhanh.',
      icon: <RiEmotionLaughFill fontSize={24} />,
      keyId: '2'
    },
    {
      title: 'Đổi Giảng viên',
      desc: 'Trong quá trình học tập học viên – sinh viên được đổi Giảng viên phù hợp phương pháp học tập của các em để các em có thể nắm kiến thức – hiệu quả tất nhất.',
      icon: <BsFillPauseBtnFill fontSize={24} />,
      keyId: '3'
    },
    {
      title: 'Chủ Động Thời Gian',
      desc: 'Chỉ cần máy tính, smartphone hoặc máy tính bảng có kết nối internet, Bạn có thể học các tiếng với Giáo viên UCAM ở bất cứ nơi đâu, bất cứ khi nào.',
      icon: <BsFillPencilFill fontSize={18} />,
      keyId: '4'
    },
    {
      title: 'Đội ngũ giảng viên',
      desc: 'Gần 1.000 giáo viên bản xứ và Việt Nam, 100% có bằng giảng dạy ngoại ngữ của các Nước theo tiêu chuẩn quốc tế. Đặc biệt, 80% giáo viên bản xứ là giáo viên của các hội đồng chấm thi .',
      icon: <BsBookFill fontSize={24} />,
      keyId: ''
    },
    {
      title: 'Trợ Lý Cá Nhân',
      desc: 'Sử dụng công nghệ độc quyền - Có khả năng thiết kế một lộ trình học riêng biệt cho từng người, hoàn toàn phù hợp với năng lực & mục tiêu của bạn Công nghệ học tập hiện đại, tăng khả năng tương tác hiệu quả',
      icon: <RiEmotionLaughFill fontSize={24} />,
      keyId: '2'
    },
    {
      title: 'Thi Thử - Trắc Nghiệm',
      desc: 'Trước khi học sinh viên được làm bài test đầu vào đánh giá năng lực từ đó có phương pháp đào tạo phù hợp hiệu quả nhất Thi đánh giá năng lực sau mỗi bài học Thi thử đánh giá năng lực theo đúng bộ đề của các hội đồng thi',
      icon: <BsFillPauseBtnFill fontSize={24} />,
      keyId: '3'
    },
    {
      title: 'Luyện Thi Cấp Tốc',
      desc: 'Các khoá học luyện thi cấp tốc cho các sinh viên đang cần chứng chỉ đầu ra sớm Giáo trình luyện thi bám sát với đề thi đầu ra của các hội đồng thi chứng chỉ như VSTEP, TOEIC, IELTS, HSK, TOCFL, JLPT, TOPIK',
      icon: <BsFillPencilFill fontSize={18} />,
      keyId: '4'
    }
  ]
  return (
    <Header
      size='sm'
      title='UCAM là trung tâm ngoại ngữ uy tín, tận tình'
      desc='VÌ SAO NÊN CHỌN CHÚNG TÔI?'
      padding='60px 0'
      background='var(--lighish-white)'
    >
      <img src={place} alt='place' className='place' />
      <img src={point} alt='point' className='point' />

      <div className='mb-scroll'>
        <div className='intor-main'>
          {introData.map((item, id) => (
            <Card className='intro-card' key={id}>
              <Space direction='vertical'>
                <Space>
                  <div className={`i-bg${item.keyId} icon-bg`}>{item.icon}</div>
                  <h3 style={{ margin: 0 }}>{item.title}</h3>
                </Space>
                <div style={{ margin: 0 }}>{item.desc}</div>
              </Space>
            </Card>
          ))}
        </div>
        <div className='buttTest'>
          <Button type='primary' size='large'>
            KIỂM TRA TRÌNH ĐỘ MIỄN PHÍ
          </Button>
        </div>
      </div>

      {/* <Row gutter={[20, 20]} className="intor-main">
                {introData.map((item, id) => (
                    <Col span={24} md={6} key={id}>
                        <Card className="intro-card">
                            <Space direction="vertical">
                                <Space>
                                    <div
                                        className={`i-bg${item.keyId} icon-bg`}
                                    >
                                        {item.icon}
                                    </div>
                                    <h3 style={{ margin: 0 }}>{item.title}</h3>
                                </Space>
                                <div style={{ margin: 0 }}>{item.desc}</div>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row> */}
    </Header>
  )
}
