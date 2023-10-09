/* eslint-disable @typescript-eslint/no-explicit-any */
import style from './MenuCourses.module.scss'
// import { AiFillStar } from 'react-icons/ai'
import Header from '@/components/layout/Header/Header'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import TagCustom from '@/components/TagCustom/TagCustom'
import Paragraph from 'antd/es/typography/Paragraph'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import { DeleteOutlined } from '@ant-design/icons'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import { CoursesState } from '@/interface/coursesData'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import cartApi from '@/apis/cart.api'
import { useNavigate } from 'react-router-dom'

type Props = {
  coursesData: CoursesState[]
}

export default function MenuCourses({ coursesData }: Props) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: (body: any) => cartApi.deleteCourseCart(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataCart'] })
    },
  })

  const deleteCart = (id: string) => {
    mutate.mutate(id)
  }

  return (
    <>
      <div className='boxContainer'>
        {coursesData?.map((item) => (
          <div className={style.menuBox}>
            <Header>
              <div className={style.boxContent}>
                <div className={style.onbox}>
                  <ImageCustom
                    onClick={() => {
                      navigate('/courses/' + item._id)
                    }}
                    preview={false}
                    src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverMedia}
                    className={style.img}
                    width='80px'
                    height='75px'
                  />
                  {/* div conten  */}
                  <div className={style.flexCol}>
                    <div className={style.boxTitle}>
                      <Paragraph
                        className={style.title}
                        ellipsis={{ rows: 2 }}
                        onClick={() => {
                          navigate('/courses/' + item._id)
                        }}
                      >
                        {item.name}
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
                  {/* <div> {item.score || 5}</div>
                  <AiFillStar style={{ marginTop: '1px' }} /> */}
                </div>
                <div className={style.flexPrice}>
                  <div className={style.marginRightPrice}>
                    <PriceCalculator price={item.cost || 0} discount={0} showTotal direction='column' />
                  </div>
                </div>
                <div>
                  <ButtonCustom
                    onClick={() => deleteCart(item?._id)}
                    className='dashed'
                    type='dashed'
                    // shape='circle'
                    icon={<DeleteOutlined style={{ fontSize: '22px', marginTop: '3px' }} />}
                    size='large'
                    // onClick={() => {
                    //   setFavorite(item)
                    // }}
                  ></ButtonCustom>
                </div>
              </div>
            </Header>
          </div>
        ))}
      </div>
    </>
  )
}
