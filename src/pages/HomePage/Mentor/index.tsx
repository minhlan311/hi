import userApi from '@/apis/user.api'
import { formatNumber } from '@/common'
import Avatar from '@/components/Avatar/Avatar'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import LoadingCustom from '@/components/LoadingCustom'
import SliderCustom from '@/components/SliderCustom'
import useResponsives from '@/hooks/useResponsives'
import { UserState } from '@/interface/user'
import { useQuery } from '@tanstack/react-query'
import { Card, Rate, Space, Tooltip } from 'antd'
import moment from 'moment-timezone'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import book from '../../../assets/icons/book.svg'
import point2 from '../../../assets/icons/point2.svg'
import Header from '../../../components/layout/Header/Header'
import './styles.scss'

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
  const now = moment()

  const RenderMentor = ({ user }: { user: UserState }) => {
    const diffDuration = moment.duration(now.diff(user.createdAt))

    return (
      <Card className='mentor-introduce'>
        <Space direction='vertical' align='center' className='it-main'>
          <div className='image'>
            <Avatar avtUrl={user.avatarUrl} userData={user} size={140} />
          </div>
          <div>
            <Tooltip title={user.fullName}>
              <h2 className='oneLine'>{user.fullName}</h2>
            </Tooltip>
            {user.mentorInfo?.certificateType ? <div>Chứng chỉ {user.mentorInfo?.certificateType}</div> : <br />}
            <Rate defaultValue={user.assessment?.totalAssessmentsAverages} allowHalf style={{ fontSize: 12 }} />
            <p>
              <b>{formatNumber(user.countAssessment as number)}</b> lượt đánh giá
            </p>
          </div>

          <Space className='it-butt'>
            <ButtonCustom size='small' type='primary'>
              {diffDuration.asHours().toFixed(0)} giờ
            </ButtonCustom>
            <ButtonCustom size='small'>{formatNumber(user.countStudents)} học viên</ButtonCustom>
          </Space>
          <ButtonCustom className='sm-butt sp100' size='large' href={`/profiles/${user._id}`}>
            <Space>
              <div>Chọn giáo viên</div>
              <BsArrowRight
                style={{
                  margin: '0 0 -3px',
                }}
              />
            </Space>
          </ButtonCustom>
        </Space>
      </Card>
    )
  }

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
                slidesToScroll={sm ? 1 : 2}
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
                  <RenderMentor user={item} key={item._id} />
                ))}
              </SliderCustom>
            )) || <EmptyCustom description='Không có Mentor nào' />}
        </div>
      </div>
    </Header>
  )
}

export default Mentor
