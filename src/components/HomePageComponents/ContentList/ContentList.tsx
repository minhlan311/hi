import css from './ContentList.module.scss'
import triangleRight from '/icons/triangle-right.svg'
import stars from '/icons/stars.svg'
import infinite from '/icons/infinite.svg'
const ContentList = () => {
  return (
    <div className={css.connect}>
      <div className={css.introBody}>
        <div className={css.item}>
          <img src={triangleRight} alt='triangleRight' className={css.icon} />
          <b>210000以上のオンライン動画コースで、好きな時にスキルを身につけよう</b>
        </div>
        <div className={css.item}>
          <img src={stars} alt='stars' className={css.icon} />
          <b>現場で活躍しているプロフェッショナルが教えるコースを学ぼう</b>
        </div>
        <div className={css.item}>
          <img src={infinite} alt='infinite' className={css.icon} />
          <b>講座買い切り型で、視聴期限なし。自分のペースで学ぼう</b>
        </div>
      </div>
    </div>
  )
}

export default ContentList
