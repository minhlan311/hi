/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillStar } from 'react-icons/ai'
import { FiMoreVertical } from 'react-icons/fi'
import style from './Feedback.module.scss'
import { Avatar, Tooltip } from 'antd'
import ProductRating from '@/components/ProductRating'
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import Paragraph from 'antd/es/typography/Paragraph'

const item = [
  {
    id: 1,
    name: 'AAA',
    score: 4.5,
    some: '1週間前',
    desc: '当方、プログラミング歴30年近くの者です。Pythonを深く理解したくて本コースを購入させて頂きました。Pythonプログラミングの基礎的な部分は元より、プログラマーとして知っておくと良いトレンドを踏まえた講義がふんだんに収録されていて、とても有り難かったです。ただ「プログラミング初学者」にとっては、途中から急にハードルがあがるかな、という内容だと感じましたので、初学者の方はコンピューターの基礎的な理解はされた方がよろしいかと思います。'
  },
  {
    id: 2,
    name: 'BBB',
    score: 4,
    some: '2週間前',
    desc: '当方、プログラミング歴30年近くの者です。Pythonを深く理解したくて本コースを購入させて頂きました。Pythonプログラミングの基礎的な部分は元より、プログラマーとして知っておくと良いトレンドを踏まえた講義がふんだんに収録されていて、とても有り難かったです。ただ「プログラミング初学者」にとっては、途中から急にハードルがあがるかな、という内容だと感じましたので、初学者の方はコンピューターの基礎的な理解はされた方がよろしいかと思います。'
  },
  {
    id: 3,
    name: 'CCC',
    score: 4.5,
    some: '3週間前',
    desc: 'にとっては、途中から急にハードルがあがるかな、という内容だと感じましたので、初学者の方はコンピューターの基礎的な理解はされた方がよろしいかと思います。'
  },
  {
    id: 4,
    name: 'DDD',
    score: 5,
    some: '4週間前',
    desc: '当方、プログラミング歴30年近くの者です。Pythonを深く理解したくて本コースを購入させて頂きました。Pythonプログラミングの基礎的な部分は元より、プログラマーとして知っておくと良いトレンドを踏まえた講義がふんだんに収録されていて、とても有り難かったです。ただ「プログラミング初学者」にとっては、途中から急にハードルがあがるかな、という内容だと感じましたので、初学者の方はコンピューターの基礎的な理解はされた方がよろしいかと思います。'
  }
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
          <p className={style.flexText}> コース評価: 4.4 評価: 21K</p>
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
                    <Avatar
                      src={
                        'https://upload.wikimedia.org/wikipedia/vi/thumb/e/e0/Avatar_D%C3%B2ng_ch%E1%BA%A3y_c%E1%BB%A7a_n%C6%B0%E1%BB%9Bc_-_Poster_ch%C3%ADnh_th%E1%BB%A9c.jpg/220px-Avatar_D%C3%B2ng_ch%E1%BA%A3y_c%E1%BB%A7a_n%C6%B0%E1%BB%9Bc_-_Poster_ch%C3%ADnh_th%E1%BB%A9c.jpg'
                      }
                    />
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
                        <span>レポート</span>
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
                    symbol: <span className={style.buttonPara}>もっと見る</span>
                  }}
                >
                  {item.desc}
                </Paragraph>
              </div>
              {/* like  */}
              <div className={style.boxLike}>
                <div className={style.textLike}>役に立ちましたか？</div>
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
