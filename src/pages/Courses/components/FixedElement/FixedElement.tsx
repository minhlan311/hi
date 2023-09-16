import { useEffect, useRef } from 'react'
import style from './FixedElement.module.scss'
// import { colorStar } from '~/components/ProductRating/pickColor.enum'
// import ProductRating from '~/components/ProductRating'
import { AiFillStar } from 'react-icons/ai'
export default function FixedElement() {
  const fixedRef = useRef<HTMLHeadingElement | null>(null)
  useEffect(() => {
    let prevScrollPos = window.scrollY
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      if (prevScrollPos > currentScrollPos) {
        if (fixedRef.current) {
          // headerRef.current.style.top = '-100px'
        }
      } else {
        if (fixedRef.current) {
          fixedRef.current.style.top = '0'
        }
      }
      prevScrollPos = currentScrollPos
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className={style.fixed} ref={fixedRef}>
      <div className={style.fixedBox}>
        <p className={style.titleFixed}>ゼロから始めるデータ分析】 ビジネスケースで学ぶPythonデータサイエンス入門</p>
        <p>
          {' '}
          <div className={style.detailPrice}>
            <div className={style.specialPrice}>ベストセラー</div>
            <div className={style.flex}>
              <div className={style.flexStar}>
                <div> {4.5}</div>
                <AiFillStar style={{ marginTop: '1px' }} />
              </div>
              <p className={style.total}>(9999 件の評価)</p>
              <p className={style.member}>72,785人の受講生</p>
            </div>
          </div>
        </p>
      </div>
    </div>
  )
}
