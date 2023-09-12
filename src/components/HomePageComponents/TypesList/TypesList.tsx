import css from './TypesList.module.scss'
import { Link } from 'react-router-dom'
import pic1 from '../../../../public/images/lohp-category-design-2x-v2.jpg'
import pic2 from '../../../../public/images/lohp-category-development-2x-v2.jpg'
import pic3 from '../../../../public/images/lohp-category-marketing-2x-v2.jpg'
import pic4 from '../../../../public/images/lohp-category-it-and-software-2x-v2.jpg'
import pic5 from '../../../../public/images/lohp-category-personal-development-2x-v2.jpg'
import pic6 from '../../../../public/images/lohp-category-business-2x-v2.jpg'
import pic7 from '../../../../public/images/lohp-category-photography-2x-v2.jpg'
import pic8 from '../../../../public/images/lohp-category-music-2x-v2.jpg'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
const TypesList = () => {
  const data = [
    { title: 'デザイン', img: pic1, to: '/' },
    { title: '開発 ', img: pic2, to: '/' },
    { title: 'マーケティング', img: pic3, to: '/' },
    { title: 'IT・ソフトウェア', img: pic4, to: '/' },
    { title: '自己秦発', img: pic5, to: '/' },
    { title: 'ビジネススキル', img: pic6, to: '/' },
    { title: '写真', img: pic7, to: '/' },
    { title: '音楽', img: pic8, to: '/' }
  ]
  return (
    <ul className={css.list}>
      {data.map((item) => (
        <li key={item.title}>
          <Link to={item.to} className={css.itemCard}>
            <div className={css.mb}>
              {/* <ButtonCustom
                  txt={item.title}
                  link={item.to}
                  extraCss={{
                    margin: "0px",
                    padding: "0.5rem",
                    borderRadius: "50px",
                  }}
                /> */}
              <ButtonCustom>{item.title}</ButtonCustom>
            </div>

            <div className={css.pc}>
              <div className={css.image}>
                <img src={item.img} alt={item.title} />
              </div>
              <h3 className={css.title}>{item.title}</h3>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TypesList
