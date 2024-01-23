import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { UserState } from '@/interface/user'
import { Col, Row, Space } from 'antd'
import { FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import style from '../../style.module.scss'
type Props = { user: UserState }

const MentorData = ({ user }: Props) => {
  return (
    <Row gutter={[24, 24]} style={{ marginBottom: 24 }} align='middle'>
      <Col span={24} md={8}>
        <ImageCustom
          width='100%'
          height='232px'
          styles={{ objectFit: 'cover', borderRadius: 4 }}
          src={import.meta.env.VITE_FILE_ENDPOINT + '/' + user.avatarUrl}
        />
      </Col>
      <Col span={24} md={12}>
        <Space size='large' direction='vertical' className={style.sp100}>
          <Link to={'/profiles/' + user._id}>
            <h1>{user.fullName}</h1>
            <h4 style={{ color: 'var(--green)' }}>
              {user.mentorInfo?.educationType ? user.mentorInfo?.educationType : 'Giảng viên'}
            </h4>
          </Link>
          {user.descriptions ? (
            <div dangerouslySetInnerHTML={{ __html: user.descriptions as string }}></div>
          ) : (
            'Không có giới thiệu'
          )}
          <Space>
            {user.socials?.map((item) => (
              <ButtonCustom
                className={style.price}
                key={item.type}
                href={item.url}
                size='large'
                shape='circle'
                icon={
                  (item.type === 'instagram' && <FaInstagram size={25} />) ||
                  (item.type === 'facebook' && <FaFacebookF size={25} />) ||
                  (item.type === 'tiktok' && <FaTiktok size={25} />) || <FaYoutube size={25} />
                }
              ></ButtonCustom>
            ))}
          </Space>
        </Space>
      </Col>
    </Row>
  )
}

export default MentorData
