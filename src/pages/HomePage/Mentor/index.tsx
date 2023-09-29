import { Button, Card, Rate, Space, Tooltip } from 'antd'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import book from '../../../assets/icons/book.svg'
import point2 from '../../../assets/icons/point2.svg'
import Header from '../../../components/layout/Header/Header'
import './styles.scss'
import SliderCustom from '@/components/SliderCustom'
import useResponsives from '@/hooks/useResponsives'
import { useQuery } from '@tanstack/react-query'
import userApi from '@/apis/user.api'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import LoadingCustom from '@/components/LoadingCustom'
import Avatar from '@/components/Avatar/Avatar'

const Mentor = () => {
  const { sm, md } = useResponsives()

  const { data: userData, isLoading } = useQuery({
    queryKey: ['getMentor'],
    queryFn: () => {
      return userApi.findUser({
        filterQuery: {
          isMentor: true,
          mentorStatus: 'APPROVED',
        },
      })
    },
  })
  const mentorData = userData?.data.docs
  console.log(mentorData)

  return (
    <Header
      title='Đội ngũ giảng viên tại UCAM'
      desc='ĐỘI NGŨ GIẢNG DẠY CHUYÊN NGHIỆP'
      styleChild={{
        background: 'var(--red)',
        color: 'var(--white)',
        padding: md || sm ? '50px 0 80px' : '120px 60px 70px',
        borderRadius: md || sm ? 0 : 12,
      }}
      background='var(--lighish-white)'
    >
      <img src={point2} alt='point2' className='point2' />
      <img src={book} alt='book' className='book' />
      <div className='mtz-cooperate'>
        <div className='mtz-dt'>
          {(isLoading && <LoadingCustom tip='Vui lòng chờ...' />) ||
            (mentorData && mentorData?.length > 0 && (
              <SliderCustom
                dataLength={mentorData.length}
                autoplay
                arrows
                autoHitdenArrow
                slidesToScroll={2}
                slidesToShow={sm ? 1 : 4}
                infinite
                dots
                buttonStyle={{
                  color: 'var(--white)',
                  background: 'var(--red)',
                  border: '2px solid #ED2F3E',
                }}
                nextArrow={<BsArrowRight />}
                prevArrow={<BsArrowLeft />}
              >
                {mentorData.map((item) => (
                  <Card key={item._id} className='mentor-introduce'>
                    <Space direction='vertical' align='center' className='it-main'>
                      <div className='image'>
                        <Avatar avtUrl={item.avatarUrl} userData={item} size={140} />
                      </div>
                      <div>
                        <Tooltip title={item.fullName}>
                          <h2 className='oneLine'>{item.fullName}</h2>
                        </Tooltip>
                        <div>Chứng chỉ Teft</div>
                        <Rate value={4.5} allowHalf style={{ fontSize: 12 }} />
                        <p>
                          <b>{350}</b> lượt đánh giá
                        </p>
                      </div>

                      <Space className='it-butt'>
                        <Button size='small' type='primary'>
                          {360} giờ
                        </Button>
                        <Button size='small'>{370} học viên</Button>
                      </Space>
                      <Button className='sm-butt' size='large' style={{ width: '100%' }}>
                        <Space>
                          <div>Chọn giáo viên</div>
                          <BsArrowRight
                            style={{
                              margin: '0 0 -3px',
                            }}
                          />
                        </Space>
                      </Button>
                    </Space>
                  </Card>
                ))}
              </SliderCustom>
            )) || <EmptyCustom description='Không có Mentor nào' />}
        </div>
      </div>
    </Header>
  )
}

export default Mentor
