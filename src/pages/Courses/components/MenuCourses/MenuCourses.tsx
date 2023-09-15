import style from './MenuCourses.module.scss'
import { AiFillStar } from 'react-icons/ai'
import Header from '@/components/layout/Header/Header'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import TagCustom from '@/components/TagCustom/TagCustom'
import Paragraph from 'antd/es/typography/Paragraph'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import { HeartOutlined } from '@ant-design/icons'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'

export default function MenuCourses() {
  const coursesData = [
    {
      id: '1',
      title: '【SAA-C03版】これだけでOK！ AWS 認定ソリューションアーキテクト – アソシエイト試験突破講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/4436714_1821_2.jpg',
      score: 3,
      totalScore: 670,
      price: 30700,
      delPrice: 1200000,
      special: 1,
      decs: '現役シリコンバレーエンジニアが教えるPython入門！応用では、データ解析、データーベース、ネットワーク、暗号化、並列化、テスト、インフラ自動化、キューイングシステム、非同期処理など盛り沢山の内容です！'
    },
    {
      id: '2',
      title: 'みんなのAI講座 ゼロからPythonで学ぶ人工知能と機械学習 【2023年最新版】',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1014354_b2e9_4.jpg',
      score: 4.5,
      totalScore: 670,
      price: 22200,
      delPrice: 1200000,
      special: 0
    },
    {
      id: '3',
      title: '【ゼロから始めるデータ分析】 ビジネスケースで学ぶPythonデータサイエンス入門',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1354552_12d9_2.jpg',
      score: 4.5,
      totalScore: 670,
      price: 1990,
      delPrice: 1200000,
      special: 1
    },
    {
      id: '4',
      title: 'プログラミング初心者でも安心、Python/Django入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/4097006_3ea4_2.jpg',
      score: 4,
      totalScore: 670,
      price: 9822,
      delPrice: 1200000,
      special: 0
    },
    {
      id: '5',
      title: 'Python+FlaskでのWebアプリケーション開発講座！！～0からFlaskをマスターしてSNSを作成する～',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1739202_cffd_4.jpg',
      score: 2,
      totalScore: 670,
      price: 9000,
      delPrice: 1200000,
      special: 0
    },
    {
      id: '6',
      title: '現役シリコンバレーエンジニアが教えるPython 3 入門 + 応用 +アメリカのシリコンバレー流コードスタイル',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1159316_eaab_8.jpg',
      score: 4.5,
      totalScore: 670,
      price: 22155,
      delPrice: 1200000,
      special: 1
    },
    {
      id: '7',
      title: 'Python + Django Djangoを基礎から応用まで、アプリケーション開発マスターpython付き',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1518132_7f48_2.jpg',
      score: 5,
      totalScore: 670,
      price: 12333,
      delPrice: 1200000,
      special: 0
    },
    {
      id: '8',
      title: '【完全初心者向け】絶対に挫折させないPython入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1965718_d933.jpg',
      score: 4.5,
      totalScore: 670,
      price: 31000,
      delPrice: 1200000,
      special: 1
    },
    {
      id: '9',
      title: '【完全初心者向け】絶対に挫折させないPython入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1965718_d933.jpg',
      score: 4.5,
      totalScore: 670,
      price: 17000,
      delPrice: 1200000,
      special: 1
    },
    {
      id: '10',
      title: '【完全初心者向け】絶対に挫折させないPython入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1965718_d933.jpg',
      score: 4.5,
      totalScore: 670,
      price: 34700,
      delPrice: 1200000,
      special: 1
    },
    {
      id: '11',
      title: '【完全初心者向け】絶対に挫折させないPython入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1965718_d933.jpg',
      score: 4.5,
      totalScore: 670,
      price: 37000,
      delPrice: 1200000,
      special: 1
    },
    {
      id: '12',
      title: '【完全初心者向け】絶対に挫折させないPython入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1965718_d933.jpg',
      score: 4.5,
      totalScore: 670,
      price: 34700,
      delPrice: 1200000,
      special: 1
    },
    {
      id: '13',
      title: '【完全初心者向け】絶対に挫折させないPython入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1965718_d933.jpg',
      score: 4.5,
      totalScore: 670,
      price: 34700,
      delPrice: 1200000,
      special: 1
    },
    {
      id: '14',
      title: '【完全初心者向け】絶対に挫折させないPython入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1965718_d933.jpg',
      score: 4.5,
      totalScore: 670,
      price: 37000,
      delPrice: 1200000,
      special: 1
    },
    {
      id: '15',
      title: '【完全初心者向け】絶対に挫折させないPython入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1965718_d933.jpg',
      score: 4.5,
      totalScore: 670,
      price: 34700,
      delPrice: 1200000,
      special: 1
    },
    {
      id: '16',
      title: '【完全初心者向け】絶対に挫折させないPython入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1965718_d933.jpg',
      score: 4.5,
      totalScore: 670,
      price: 34700,
      delPrice: 1200000,
      special: 1
    },
    {
      id: '17',
      title: '【完全初心者向け】絶対に挫折させないPython入門講座',
      actor: '酒井 潤 (Jun Sakai)',
      img: 'https://img-c.udemycdn.com/course/240x135/1965718_d933.jpg',
      score: 4.5,
      totalScore: 670,
      price: 347000,
      delPrice: 1200000,
      special: 1
    }
  ]
  return (
    <>
      {coursesData.map((item) => (
        <div className={style.menuBox}>
          <Header>
            <div className={style.boxContent}>
              <div className={style.onbox}>
                <ImageCustom src={item.img} className={style.img} width='70px' height='65px' />
                {/* div conten  */}
                <div className={style.flexCol}>
                  <div className={style.boxTitle}>
                    <Paragraph className={style.title} ellipsis={{ rows: 2 }}>
                      {item.title}
                    </Paragraph>
                  </div>
                  {/* //  div tren */}
                  <div className={style.divBottom}>
                    <div>
                      <TagCustom
                        intArrType={['BESS SELLER', 'REVISION', 'NEW']}
                        intColor={['var(--yellowish-green)', 'var(--teal)', 'var(--red)']}
                        intAlternativeType={['ベストセラー', '改訂', '話題・新着']}
                        content={'BESS SELLER'}
                        colorText='var(--black)'
                      />
                    </div>
                    <div className={style.flex}>
                      <div className={style.marginRight}>
                        <span>合計7.5時間</span> <span className={style.dot}></span>
                      </div>
                      <div>
                        <span>更新済み2023/7</span>
                      </div>
                    </div>
                  </div>
                  {/* end div tren */}
                </div>
                {/* div conten  */}
              </div>

              <div className={style.flexStar}>
                <div> {item.score}</div>
                <AiFillStar style={{ marginTop: '1px' }} />
              </div>
              <div className={style.flexPrice}>
                <div className={style.marginRightPrice}>
                  <PriceCalculator price={item.price} discount={30} showTotal direction='column' />
                </div>
                <div>
                  <ButtonCustom
                    shape='circle'
                    icon={<HeartOutlined style={{ fontSize: '22px', marginTop: '3px' }} />}
                    size='large'
                    // onClick={() => {
                    //   setFavorite(item)
                    // }}
                  ></ButtonCustom>
                </div>
              </div>
            </div>
          </Header>
        </div>
      ))}
    </>
  )
}
