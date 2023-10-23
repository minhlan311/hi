import courseApi from '@/apis/course.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import TagCustom from '@/components/TagCustom/TagCustom'
import Header from '@/components/layout/Header/Header'
import { HeartOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import Paragraph from 'antd/es/typography/Paragraph'
import style from './MenuCourses.module.scss'
import LoadingCustom from '@/components/LoadingCustom'
import { TCourse } from '@/types/course.type'
import { useNavigate, useParams } from 'react-router-dom'
import useResponsives from '@/hooks/useResponsives'

type Props = {
  dataCourses?: TCourse
}

export default function MenuCourses({ dataCourses }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['courseCates', dataCourses],
    queryFn: () =>
      courseApi.getCourses({
        filterQuery: {
          categoryId: dataCourses?.data?.categoryId,
          related: true,
        },
        options: {
          limit: 10,
        },
      }),
    enabled: dataCourses?.data?.categoryId ? true : false,
  })

  const coursesData = data?.data?.docs?.filter((item) => item._id !== id)
  const { xs } = useResponsives()

  return (
    <>
      <div className={style.boxContainer}>
        {!isLoading ? (
          coursesData &&
          coursesData?.map((item) => (
            <div className={style.menuBox}>
              <Header>
                <div className={style.boxContent}>
                  <div className={style.onbox}>
                    <ImageCustom
                      onClick={() => {
                        navigate('/courses/' + item._id)
                      }}
                      preview={false}
                      src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item.coverMedia}
                      className={style.img}
                      width='75px'
                      height='75px'
                    />
                    {/* div conten  */}
                    <div className={style.flexCol}>
                      <div className={style.boxTitle}>
                        <Paragraph
                          onClick={() => {
                            navigate('/courses/' + item._id)
                          }}
                          className={style.title}
                          ellipsis={{ rows: 2 }}
                        >
                          {item.name}
                        </Paragraph>
                      </div>
                      {/* //  div tren */}
                      <div className={style.divBottom}>
                        {!xs && (
                          <div>
                            <TagCustom
                              intArrType={['BESS SELLER', 'REVISION', 'NEW']}
                              intColor={['#eceb98', 'var(--teal)', 'var(--red)']}
                              intAlternativeType={['BEST SELLER', '改訂', '話題・新着']}
                              content={'BESS SELLER'}
                              colorText='var(--black)'
                            />
                          </div>
                        )}

                        <div className={style.flex}>
                          <div className={style.marginRight}>
                            <span>Tổng cộng : 7.5 giờ</span> <span className={style.dot}></span>
                          </div>
                          <div>
                            <span>Cập nhật 10/2023</span>
                          </div>
                        </div>
                      </div>
                      {/* end div tren */}
                    </div>
                    {/* div conten  */}
                  </div>

                  <div className={style.flexStar}>
                    {/* <div> {item.score}</div>
                    <AiFillStar style={{ marginTop: '1px' }} /> */}
                  </div>
                  <div className={style.flexPrice}>
                    <div className={style.marginRightPrice}>
                      <PriceCalculator price={item.cost || 0} showTotal direction='column' />
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
          ))
        ) : (
          <LoadingCustom
            style={{
              marginTop: '10vh',
            }}
          />
        )}
      </div>
    </>
  )
}
