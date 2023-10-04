import Header from '@/components/layout/Header/Header'
import style from './Request.module.scss'

export default function Request() {
  const listRequest = [
    { id: 1, title: 'JavaScriptについてなんとなく知っている方。' },
    { id: 2, title: '他の先生のJavaScriptの入門編を受けられたことがある方。' },
    { id: 3, title: 'ドットインストールでJavaScriptの入門編を終えられたレベルの方。' },
    { id: 4, title: 'ProgateでJavaScriptの入門編を終えられたレベルの方。' },
    { id: 5, title: 'JavaScriptについての理解を深めたい現役エンジニアの方。' },
    { id: 6, title: 'JavaScriptでif文、for文、関数、変数を使ったことがあるレベルの方。' },
    { id: 7, title: '簡単なHTMLを書いたことがある方。' },
    { id: 8, title: '他のプログラミング言語を使ったことがある方。' },
    { id: 9, title: 'JavaScriptでなにか開発してみたいと考えている方。' }
  ]
  return (
    <div className={style.boxRequest}>
      <Header title='要件' titleSize={22} titleStyle={{ marginBottom: '20px' }}>
        <ul className={style.ulBox}>{listRequest?.map((item) => <li key={item.id}>{item.title}</li>)}</ul>
      </Header>
    </div>
  )
}
