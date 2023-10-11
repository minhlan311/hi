import { TCourse } from '@/types/course.type'
import style from './CommentDetail.module.scss'

type Props = {
  data: TCourse
}

export default function CommentDetail({ data }: Props) {
  return (
    <div className={style.boxCommentDetail} dangerouslySetInnerHTML={{ __html: data?.descriptions }}>
      {/* <p className={style.text}>
        多くのプログラマーはJavaScriptのメカニズムを理解せず、React、Vue、AngularJSなどのフレームワークを使った開発に携わります。
      </p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>
        多くのプログラマーはJavaScriptのメカニズムを理解せず、React、Vue、AngularJSなどのフレームワークを使った開発に携わります。
      </p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>
        多くのプログラマーはJavaScriptのメカニズムを理解せず、React、Vue、AngularJSなどのフレームワークを使った開発に携わります。
      </p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p>
      <p className={style.text}>JavaScriptは誰でも簡単に、そして素早く実行できる素晴らしい言語です。</p> */}
    </div>
  )
}
