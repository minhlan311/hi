/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext } from 'react'
import style from './MycoursesLearning.module.scss'
import VideoComponent from '@/components/VideoComponent/VideoComponent'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import Paragraph from 'antd/es/typography/Paragraph'
import TagCustom from '@/components/TagCustom/TagCustom'

import { AppContext } from '@/contexts/app.context'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import WrapMoreDetail from '../CoursesPage/components/WrapMore/WrapMoreDetail'
import WrapMore from '@/components/WrapMore/WrapMore'

type ActiveState = {
  video?: string
  active?: number | string
}

export default function MycoursesLearning() {
  const [state, setState] = useState<ActiveState>({
    video: '',
    active: '',
  })
  const { scaleScreen } = useContext(AppContext)
  const coursesData = [
    {
      id: '1',
      title: '【SAA-C03版】これだけでOK！ AWS 認定ソリューションアーキテクト – アソシエイト試験突破講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/4436714_1821_2.jpg',
      score: 3,
      totalScore: 670,
      price: 307000,
      delPrice: 1200000,
      special: 1,
      video: 'https://www.dailymotion.com/video/x5e9eog',
      decs: '現役シリコンバレーエンジニアが教えるPython入門！応用では、データ解析、データーベース、ネットワーク、暗号化、並列化、テスト、インフラ自動化、キューイングシステム、非同期処理など盛り沢山の内容です！',
    },
    {
      id: '2',
      title: 'みんなのAI講座 ゼロからPythonで学ぶ人工知能と機械学習 【2023年最新版】',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1014354_b2e9_4.jpg',
      score: 4.5,
      totalScore: 670,
      price: 222000,
      delPrice: 1200000,
      video: 'https://vimeo.com/90509568',
      special: 0,
    },
    {
      id: '3',
      title: '【ゼロから始めるデータ分析】 ビジネスケースで学ぶPythonデータサイエンス入門',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1354552_12d9_2.jpg',
      score: 4.5,
      totalScore: 670,
      price: 199000,
      delPrice: 1200000,
      video: 'https://www.youtube.com/watch?v=U2rB68ouwJY&list=RDU2rB68ouwJY&index=1',
      special: 1,
    },
    {
      id: '4',
      title: 'プログラミング初心者でも安心、Python/Django入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/4097006_3ea4_2.jpg',
      score: 4,
      totalScore: 670,
      price: 987000,
      delPrice: 1200000,
      video: 'https://www.youtube.com/watch?v=3wMf0hc1dvs',
      special: 0,
    },
    {
      id: '5',
      title: 'Python+FlaskでのWebアプリケーション開発講座！！～0からFlaskをマスターしてSNSを作成する～',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1739202_cffd_4.jpg',
      score: 2,
      totalScore: 670,
      price: 347000,
      delPrice: 1200000,
      video: 'https://www.youtube.com/watch?v=dz6xe0xXqYE',
      special: 0,
    },
    {
      id: '6',
      title: '現役シリコンバレーエンジニアが教えるPython 3 入門 + 応用 +アメリカのシリコンバレー流コードスタイル',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1159316_eaab_8.jpg',
      score: 4.5,
      totalScore: 670,
      price: 347000,
      delPrice: 1200000,
      video: 'https://www.youtube.com/watch?v=jNgP6d9HraI',
      special: 1,
    },
    {
      id: '7',
      title: 'Python + Django Djangoを基礎から応用まで、アプリケーション開発マスターpython付き',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1518132_7f48_2.jpg',
      score: 5,
      totalScore: 670,
      video: 'https://www.youtube.com/watch?v=xv6Q6DIZzbc',
      price: 347000,
      delPrice: 1200000,
      special: 0,
    },
    {
      id: '8',
      title: '【完全初心者向け】絶対に挫折させないPython入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1965718_d933.jpg',
      score: 4.5,
      totalScore: 670,
      price: 347000,
      video: 'https://www.youtube.com/watch?v=jNgP6d9HraI',
      delPrice: 1200000,
      special: 1,
    },
    {
      id: '9',
      title: '【完全初心者向け】絶対に挫折させないPython入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1965718_d933.jpg',
      score: 4.5,
      totalScore: 670,
      price: 347000,
      video: 'https://www.youtube.com/watch?v=jNgP6d9HraI',
      delPrice: 1200000,
      special: 1,
    },
    {
      id: '10',
      title: '【完全初心者向け】絶対に挫折させないPython入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1965718_d933.jpg',
      score: 4.5,
      totalScore: 670,
      price: 347000,
      delPrice: 1200000,
      video: 'https://www.youtube.com/watch?v=jNgP6d9HraI',
      special: 1,
    },
  ]

  const myTabs = [
    {
      id: '1',
      name: '信頼',
      children: (
        <div>
          <h3>デッサンを学んでクリエイティブスキルを高める</h3>
          <p>
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
          </p>
          <hr className={style.hr} />
          <h3>デッサンを学んでクリエイティブスキルを高める</h3>
          <p>
            {' '}
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
          </p>
          <hr className={style.hr} />
          <h3>デッサンを学んでクリエイティブスキルを高める</h3>
          <p>
            {' '}
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
          </p>
        </div>
      ),
    },
    {
      id: '2',
      name: 'デッサン',
      children: (
        <>
          <h3>アプリ開発から業務効率化まで、仕事の幅が広がる「Python」</h3>
          <p>
            {' '}
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
          </p>
          <hr className={style.hr} />
          <h3>アプリ開発から業務効率化まで、仕事の幅が広がる「Python」</h3>{' '}
          <p>
            {' '}
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
          </p>
          <hr className={style.hr} />
          <h3>アプリ開発から業務効率化まで、仕事の幅が広がる「Python」</h3>{' '}
          <p>
            {' '}
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
          </p>
          <hr className={style.hr} />
          <h3>デッサンを学んでクリエイティブスキルを高める</h3>
          <p>
            {' '}
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
          </p>
        </>
      ),
    },
  ]

  const handleActive = (item: any) => {
    console.log(item, 'item')

    setState({ ...state, video: item.video, active: item.id })
  }

  return (
    <div className={`  ${!scaleScreen ? style.boxContainerFalse : style.boxContainerTrue} `}>
      <div className={style.col1}>
        <div className={style.boxVideoContent}>
          <VideoComponent video={state.video} dataLession={coursesData} />
        </div>
        <div className={style.boxTabs}>
          <WrapMore maxWidth='100%' wrapper={'nonBorder'} title=''>
            <TabsCustom data={myTabs} />
          </WrapMore>
        </div>
      </div>
      <div hidden={scaleScreen} className={style.col2}>
        <div className={style.onBoxCol2}>
          <div>
            <h4 className={style.h4Col2}>同じカテゴリのコース</h4>
          </div>
          <WrapMoreDetail>
            <div className={style.scroll}>
              {coursesData.map((item) => (
                <>
                  <div
                    className={style.itemBoxCol2}
                    onClick={() => {
                      handleActive(item)
                    }}
                  >
                    <div>
                      <ImageCustom preview={false} width='80px' height='60px' src={item.img} />
                    </div>
                    <div>
                      <Paragraph
                        className={`${
                          state.active === item.id ? `${style.typoCol2Active} ${style.typoCol2}` : `${style.typoCol2}`
                        }`}
                        ellipsis={{ rows: 2 }}
                      >
                        {item.title}
                      </Paragraph>
                      <TagCustom
                        intArrType={['BESS SELLER', 'REVISION', 'NEW']}
                        intColor={['gold', 'green', 'red']}
                        intAlternativeType={['ベストセラー', '改訂', '話題・新着']}
                        content={'BESS SELLER'}
                      />
                      <div className={style.flex}>
                        <div className={style.marginRight}>
                          <span>合計7.5時間</span> <span className={style.dot}></span>
                        </div>
                        <div>
                          <span>更新済み2023/7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </WrapMoreDetail>
        </div>
      </div>
    </div>
  )
}
