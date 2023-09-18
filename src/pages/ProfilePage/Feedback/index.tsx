import Header from '@/components/layout/Header/Header'
import { Divider, List, Rate, Space } from 'antd'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import css from './styles.module.scss'
import { useState } from 'react'
interface Feedback {
  _id: string
  fullName: string
  cityAddress: string
  title: string
  desc: string
  assess: number
  createdAt: string
}
const Feedback = () => {
  const data: Feedback[] = [
    {
      _id: '1',
      fullName: 'Nguyễn Văn A',
      cityAddress: 'Hà Nội',
      title: 'Giảng viên nhiệt tình',
      desc: 'Giảng viên này rất nhiệt tình trong việc giảng dạy. Anh ấy luôn sẵn sàng giải đáp mọi thắc mắc của sinh viên và tạo điều kiện tốt để học tập.',
      assess: 4.5,
      createdAt: '2023-09-18'
    },
    {
      _id: '2',
      fullName: 'Trần Thị B',
      cityAddress: 'Hồ Chí Minh',
      title: 'Kiến thức sâu rộng',
      desc: 'Giảng viên này có kiến thức sâu rộng về môn học. Bài giảng của cô ấy luôn rất chi tiết và dễ hiểu, giúp sinh viên nắm vững kiến thức.',
      assess: 4.8,
      createdAt: '2023-09-18'
    },
    {
      _id: '3',
      fullName: 'Lê Văn C',
      cityAddress: 'Đà Nẵng',
      title: 'Thái độ không tốt',
      desc: 'Giảng viên này thường xuyên đến trễ và không nhiệt tình trong việc giảng dạy. Điều này khiến cho việc học tập trở nên khó khăn hơn.',
      assess: 2.0,
      createdAt: '2023-09-18'
    },
    {
      _id: '4',
      fullName: 'Phạm Văn D',
      cityAddress: 'Hà Nội',
      title: 'Giảng viên xuất sắc',
      desc: 'Giảng viên này thực sự xuất sắc trong việc truyền đạt kiến thức. Anh ấy luôn tạo ra môi trường học tập tích cực và thú vị.',
      assess: 5.0,
      createdAt: '2023-09-18'
    },
    {
      _id: '5',
      fullName: 'Mai Thị E',
      cityAddress: 'Hồ Chí Minh',
      title: 'Trình độ chuyên môn kém',
      desc: 'Giảng viên này thường xuyên mắc sai sót trong việc giảng dạy và không có kiến thức sâu rộng về môn học. Không nên chọn môn học này với cô ấy.',
      assess: 1.5,
      createdAt: '2023-09-18'
    }
  ]
  const [isHover, setHover] = useState(false)

  return (
    <Header
      background='var(--whiteBg)'
      title={
        <Divider>
          <VscDebugBreakpointLog />
        </Divider>
      }
      desc={<h3>ĐÁNH GIÁ TỪ HỌC SINH</h3>}
      padding={'25px 0 50px 0'}
      size='sm'
    >
      <div
        className={css.fbMain}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ overflowY: isHover ? 'auto' : 'hidden' }}
      >
        <Space direction='vertical' size='large'>
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item._id} className={css.fbItem}>
                <Space direction='vertical'>
                  <h3>{item.title}</h3>
                  <span>
                    "{item.desc}" -{' '}
                    <b>
                      {item.fullName} ({item.cityAddress})
                    </b>
                  </span>
                  <Rate disabled value={item.assess} style={{ fontSize: 16 }} />
                </Space>
              </List.Item>
            )}
          />
        </Space>
      </div>
    </Header>
  )
}

export default Feedback
