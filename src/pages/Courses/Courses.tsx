import style from './courses.module.scss'
import Detail from './components/Detail/Detail'
import FixedElement from './components/FixedElement/FixedElement'
import VideoContent from './components/VideoContent/VideoContent'
import { LayoutGrid } from './components/LayoutGrid/LayoutGrid'
import MenuCourses from './components/MenuCourses/MenuCourses'
import WrapMore from '@/components/WrapMore/WrapMore'
import WrapMoreDetail from './components/WrapMore/WrapMoreDetail'
import Request from './components/Request/Request'
import CommentDetail from './components/Comment/CommentDetail'
import Feedback from './components/Feedback/Feedback'

export default function Courses() {
  const items = [
    'プログラミングの組み方のヒントが得られます',
    'プログラムを自力で組める力が圧倒的に向上します',
    'アルゴリズムとは？が理解できます',
    'Pythonの文法がマスターできます',
    'PythonによるWebアプリケーションの実装方法が身につきます',
    'PythonでWebスクレイピングを実装する力が身につきます',
    'StreamlitによるWebアプリケーションの開発方法が身につきます',
    'Yahoo! Financeから株式情報を取得する方法がわかります',
    'Text-to-Speech APIを用いて、テキストから音声生成を行うことができます',
    'Altairを用いたグラフの作成方法が身につきます',
    'YouTube Data APIを用いて、YouTube内の動画、チャンネル情報を取得することができます',
    'Herokuで定期実行の仕組みを構築する方法がわかります',
    '初学者の次の一歩としてPythonを用いたスキルの幅を広げることができます'
  ]

  return (
    <>
      {/* Thanh màu đen   */}
      {/* <FixedElement /> */}
      {/* Container box toàn bộ */}
      <div className={style.boxContaier}>
        {/* container bg black  */}
        <div className={style.container}>
          {/* grid 2/1 black */}
          <div className={style.content}>
            {/* cột bên trái */}
            <Detail />
            {/* cột bên phải  */}
            <VideoContent />
            {/* end cột bên phải  */}
          </div>
          {/* end grid 2/1 */}
        </div>
        {/* end container bg black  */}
        {/* phần trắng bên dưới  */}
        <div className={style.body}>
          <div className={style.col11}>
            <WrapMore
              wrapper='border'
              title='学習内容'
              titleStyle={{ fontWeight: '600', fontSize: '24px', padding: '10px 20px 30px 10px', margin: '0' }}
            >
              <LayoutGrid item={items} />
            </WrapMore>
            <div className={style.titleText}>同じカテゴリのコース</div>
            <WrapMoreDetail>
              <MenuCourses />
            </WrapMoreDetail>
            <Request />

            <WrapMore
              padding={0}
              wrapper='nonBorder'
              title='解説'
              titleStyle={{ fontWeight: '600', fontSize: '24px', padding: '20px 20px 10px 0', margin: '0' }}
            >
              {' '}
              <CommentDetail />
            </WrapMore>
            <Feedback />
          </div>
          <div className={style.col22}>
            {/* <Header title='学習内容' titleStyle={{ fontSize: '24px' }}>
              <div></div>
            </Header> */}
          </div>
        </div>
        {/*end phần trắng bên dưới  */}
      </div>
      {/* end container box  */}
    </>
  )
}
