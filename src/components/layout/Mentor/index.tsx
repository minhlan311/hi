import { Button, Card, Rate, Space } from 'antd'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import book from '../../../assets/icons/book.svg'
import point2 from '../../../assets/icons/point2.svg'
import Header from '../Header/Header'
import './styles.scss'
import SliderCustom from '@/components/SliderCustom'
import useResponsives from '@/hooks/useResponsives'

const Mentor = () => {
  const { sm, md } = useResponsives()

  const data = [
    {
      _id: '1',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      fullName: 'Nguyễn Văn A',
      certificate: 'Teft',
      time: 50,
      student: 30,
      avgRate: 4,
      countRate: 385
    },
    {
      _id: '2',
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
      fullName: 'Trần Thị B',
      certificate: 'Teft',
      time: 60,
      student: 25,
      avgRate: 5,
      countRate: 68
    },
    {
      _id: '3',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
      fullName: 'Lê Văn C',
      certificate: 'Teft',
      time: 45,
      student: 40,
      avgRate: 4.5,
      countRate: 125
    },
    {
      _id: '4',
      avatarUrl: 'https://i.pravatar.cc/150?img=4',
      fullName: 'Phạm Thị D',
      certificate: 'Teft',
      time: 55,
      student: 35,
      avgRate: 5,
      countRate: 355
    },
    {
      _id: '5',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
      fullName: 'Hoàng Văn E',
      certificate: 'Teft',
      time: 70,
      student: 20,
      avgRate: 4,
      countRate: 128
    },
    {
      _id: '6',
      avatarUrl: 'https://i.pravatar.cc/150?img=6',
      fullName: 'Nguyễn Thị F',
      certificate: 'Teft',
      time: 48,
      student: 38,
      avgRate: 5,
      countRate: 46
    },
    {
      _id: '7',
      avatarUrl: 'https://i.pravatar.cc/150?img=7',
      fullName: 'Trần Văn G',
      certificate: 'Teft',
      time: 62,
      student: 22,
      avgRate: 4.5,
      countRate: 78
    },
    {
      _id: '8',
      avatarUrl: 'https://i.pravatar.cc/150?img=8',
      fullName: 'Lê Thị H',
      certificate: 'Teft',
      time: 53,
      student: 33,
      avgRate: 4,
      countRate: 66
    },
    {
      _id: '9',
      avatarUrl: 'https://i.pravatar.cc/150?img=9',
      fullName: 'Phạm Văn I',
      certificate: 'Teft',
      time: 47,
      student: 42,
      avgRate: 4.5,
      countRate: 128
    },
    {
      _id: '10',
      avatarUrl: 'https://i.pravatar.cc/150?img=10',
      fullName: 'Hoàng Thị K',
      certificate: 'Teft',
      time: 65,
      student: 28,
      avgRate: 5,
      countRate: 254
    }
  ]
  return (
    <Header
      title='Đội ngũ giảng viên tại UCAM'
      desc='ĐỘI NGŨ GIẢNG DẠY CHUYÊN NGHIỆP'
      styleChild={{
        background: 'var(--red)',
        color: 'var(--white)',
        padding: md || sm ? '50px 0' : '120px 60px 70px',
        borderRadius: md || sm ? 0 : 12
      }}
      background='var(--lighish-white)'
    >
      <img src={point2} alt='point2' className='point2' />
      <img src={book} alt='book' className='book' />
      <div className='mtz-cooperate'>
        <div className='mtz-dt'>
          <SliderCustom
            dataLength={data.length}
            autoplay
            arrows
            autoHitdenArrow
            slidesToScroll={2}
            infinite
            dots
            buttonStyle={{
              color: 'var(--white)',
              background: 'var(--red)',
              border: '2px solid #ED2F3E'
            }}
            nextArrow={<BsArrowRight />}
            prevArrow={<BsArrowLeft />}
          >
            {data.map((item) => (
              <Card key={item._id} className='mentor-introduce'>
                <Space direction='vertical' align='center' className='it-main'>
                  <div className='image'>
                    <img src={item.avatarUrl} alt='mtz cooperate university' className='logo-img' />
                  </div>
                  <div>
                    <h2>{item.fullName}</h2>
                    <div>Chứng chỉ {item.certificate}</div>
                    <Rate value={item.avgRate} allowHalf style={{ fontSize: 12 }} />
                    <p>
                      <b>{item.countRate}</b> lượt đánh giá
                    </p>
                  </div>

                  <Space className='it-butt'>
                    <Button size='small' type='primary'>
                      {item.time} giờ
                    </Button>
                    <Button size='small'>{item.student} học viên</Button>
                  </Space>
                  <Button className='sm-butt' size='large' style={{ width: '100%' }}>
                    <Space>
                      <div>Chọn giáo viên</div>
                      <BsArrowRight
                        style={{
                          margin: '0 0 -3px'
                        }}
                      />
                    </Space>
                  </Button>
                </Space>
              </Card>
            ))}
          </SliderCustom>
        </div>
      </div>
    </Header>
  )
}

export default Mentor
