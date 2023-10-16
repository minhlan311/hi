/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillStar } from 'react-icons/ai'
import { FiMoreVertical } from 'react-icons/fi'
import style from './Feedback.module.scss'
import { Avatar, Tooltip } from 'antd'
import ProductRating from '@/components/ProductRating'
import { DislikeOutlined, LikeOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import Paragraph from 'antd/es/typography/Paragraph'

const item = [
  {
    id: 1,
    name: 'Yamada',
    img: 'https://picsum.photos/200/300',
    score: 4.5,
    some: '1 tuần trước',
    desc: 'Tôi đã lập trình được gần 30 năm. Tôi mua khóa học này vì tôi muốn hiểu sâu về Python. Ngoài việc trình bày những kiến ​​thức cơ bản về lập trình Python, còn có rất nhiều bài giảng dựa trên các xu hướng mà các lập trình viên nên biết, điều mà tôi rất biết ơn. Tuy nhiên, tôi cảm thấy rằng những rào cản sẽ đột ngột xuất hiện giữa chừng đối với "những người mới bắt đầu lập trình", vì vậy tôi nghĩ tốt nhất là những người mới bắt đầu nên có hiểu biết cơ bản về máy tính.',
  },
  {
    id: 2,
    name: 'Obito',
    score: 4,
    img: 'https://picsum.photos/200/301',
    some: '2 tuần trước',
    desc: 'Tôi đã lập trình được gần 30 năm. Tôi mua khóa học này vì tôi muốn hiểu sâu về Python. Ngoài việc trình bày những kiến ​​thức cơ bản về lập trình Python, còn có rất nhiều bài giảng dựa trên các xu hướng mà các lập trình viên nên biết, điều mà tôi rất biết ơn. Tuy nhiên, tôi cảm thấy rằng những rào cản sẽ đột ngột xuất hiện giữa chừng đối với "những người mới bắt đầu lập trình", vì vậy tôi nghĩ tốt nhất là những người mới bắt đầu nên có hiểu biết cơ bản về máy tính.',
  },
  {
    id: 3,
    name: 'CCC',
    score: 4.5,
    img: 'https://picsum.photos/201/300',
    some: '3 tuần trước',
    desc: 'Tôi cảm thấy những trở ngại đột ngột tăng lên giữa chừng khóa học, vì vậy tôi nghĩ tốt nhất những người mới bắt đầu nên có hiểu biết cơ bản về máy tính.',
  },
  {
    id: 4,
    name: 'DDD',
    score: 5,
    img: 'https://picsum.photos/201/301',
    some: '4 tuần trước',
    desc: 'Tôi cảm thấy những trở ngại đột ngột tăng lên giữa chừng khóa học, vì vậy tôi nghĩ tốt nhất những người mới bắt đầu nên có hiểu biết cơ bản về máy tính.',
  },
]

export default function Feedback() {
  return (
    <div className={style.boxFeedback}>
      <div className={style.flex}>
        <div>
          {' '}
          <AiFillStar className={style.icon} />
        </div>
        <div>
          {' '}
          <p className={style.flexText}> Xếp hạng khóa học : 4.4 - Lượt đánh giá: 21K</p>
        </div>
      </div>

      <div className={style.gridContainer}>
        {item?.map((item: any, index: number) => (
          <>
            <div key={index} className={style.gridItem}>
              <div className={style.topBoxFeedback}>
                {/* left */}
                <div className={style.topBoxFeedbackLeft}>
                  <div>
                    <Avatar src={item.img} />
                  </div>
                  <div>
                    <div className={style.name}>{item.name}</div>
                    <div className={style.some}>
                      <ProductRating rating={item.score} />
                      <div>{item.some}</div>
                    </div>
                  </div>
                </div>
                {/* right  */}
                <div className={style.more}>
                  <Tooltip
                    color='white'
                    placement='bottom'
                    trigger={'click'}
                    title={
                      <div className={style.tooltipTitle}>
                        {' '}
                        <span>
                          {' '}
                          <ExclamationCircleOutlined style={{ marginRight: '5px' }} />
                          Báo cáo
                        </span>
                      </div>
                    }
                    arrow={false}
                  >
                    <FiMoreVertical style={{ fontSize: '22px', fontWeight: '800' }} />
                  </Tooltip>
                </div>
              </div>
              {/* desc  */}
              <div className={style.paragraph}>
                <Paragraph
                  style={{ fontWeight: '400', fontSize: '15px' }}
                  ellipsis={{
                    rows: 5,
                    expandable: true,
                    symbol: <span className={style.buttonPara}>Xem thêm</span>,
                  }}
                >
                  {item.desc}
                </Paragraph>
              </div>
              {/* like  */}
              <div className={style.boxLike}>
                <div className={style.textLike}>Bình luận có hữu ích không ?</div>
                <div>
                  <LikeOutlined className={style.like} />
                </div>
                <div>
                  <DislikeOutlined className={style.disLike} />
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
