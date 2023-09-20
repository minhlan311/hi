import { UserState } from '@/interface/user'
import css from './styles.module.scss'
import Header from '@/components/layout/Header/Header'
import { Col, Divider, Row, Space } from 'antd'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import malePic from '../../../assets/images/examimg/male-teacher.png'
import famalePic from '../../../assets/images/examimg/famale-teacher.png'
type Props = { user: UserState }

const QuickIntro = ({ user }: Props) => {
  const gender = 'male'
  return (
    <div className={css.qiBody}>
      <Header size='sm'>
        <Row
          justify='space-between'
          align='middle'
          style={{ flexDirection: gender === 'male' ? 'row-reverse' : 'unset' }}
        >
          <Col span={24} md={9}>
            <div className={css.qiLeft}>
              <h1>
                <Space direction='vertical' size='small' className={`sp100`}>
                  {gender === 'male' ? 'THẦY' : 'CÔ'}
                  <Divider style={{ fontSize: 50 }} />
                  <div className={`${css.name} ${css.center}`}>{user.fullName}</div>
                  <Divider>
                    <VscDebugBreakpointLog />
                  </Divider>
                  <p className={`${css.center}`}>Giảng viên ielts</p>
                </Space>
              </h1>
            </div>
          </Col>
          <Col span={24} md={15}>
            <div className={css.qiRight}>
              <img
                src={user.avatarUrl ? user.avatarUrl : gender === 'male' ? malePic : famalePic}
                alt='avt'
                className={css.avtPic}
              />
            </div>
          </Col>
        </Row>
      </Header>
    </div>
  )
}

export default QuickIntro
