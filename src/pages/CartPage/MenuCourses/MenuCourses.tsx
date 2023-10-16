/* eslint-disable @typescript-eslint/no-explicit-any */
import style from './MenuCourses.module.scss'
// import { AiFillStar } from 'react-icons/ai'
import cartApi from '@/apis/cart.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import PriceCalculator from '@/components/PriceCalculator/PriceCalculator'
import TagCustom from '@/components/TagCustom/TagCustom'
import Header from '@/components/layout/Header/Header'
import { CoursesState } from '@/interface/coursesData'
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Checkbox, Col, Row } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  coursesData: CoursesState[]
  setPriceParent: React.Dispatch<React.SetStateAction<number>>
  setselectLength: React.Dispatch<React.SetStateAction<any>>
}

export default function MenuCourses({ coursesData, setPriceParent, setselectLength }: Props) {
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const [selectedItems, setSelectedItems] = useState<string[]>(() => {
    const savedSelectedItems = localStorage.getItem('selectedItems')

    return savedSelectedItems ? JSON.parse(savedSelectedItems) : []
  })

  useEffect(() => {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems))
    setselectLength(selectedItems)
  }, [selectedItems])

  const allSelected =
    selectedItems?.length === coursesData?.length && coursesData.every((item) => selectedItems.includes(item._id))

  const handleItemSelection = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems((prevSelected) => prevSelected?.filter((id) => id !== itemId))
    } else {
      setSelectedItems((prevSelected) => [...prevSelected, itemId])
    }
  }

  useEffect(() => {
    const newTotalCost = coursesData
      ?.filter((item) => selectedItems.includes(item._id))
      ?.reduce((sum, item) => sum + (item.cost || 0), 0)
    setTotalPrice(newTotalCost)
  }, [coursesData, selectedItems])

  useEffect(() => {
    setPriceParent(totalPrice)
  }, [totalPrice])

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutate = useMutation({
    mutationFn: (body: any) => cartApi.deleteCourseCart(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dataCart'] })
    },
  })

  const deleteCart = (itemId: string) => {
    setSelectedItems((prevSelected) => prevSelected?.filter((id) => id !== itemId))
    mutate.mutate(itemId)
  }

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([])
    } else {
      setSelectedItems(coursesData.map((item) => item._id))
    }
  }

  return (
    <>
      <div className={style.boxContainer}>
        <div className={style.flexSelectAll}>
          <Button
            style={{
              color: allSelected ? 'white' : '',
            }}
            type={allSelected ? 'primary' : 'dashed'}
            onClick={toggleSelectAll}
            className='dashed'
          >
            <CheckOutlined /> Chọn tất cả
          </Button>
        </div>
        <div className={style.boxScroll}>
          {coursesData?.map((item) => (
            <div className={style.menuBox}>
              <Header>
                <Row gutter={16} className={style.divFlexBox}>
                  <Col span={22} className={style.boxContent} onClick={() => handleItemSelection(item?._id)}>
                    <div className={style.onbox}>
                      <div>
                        <Checkbox checked={selectedItems.includes(item?._id)} />
                      </div>
                      <ImageCustom
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
                              intAlternativeType={['Best seller', '改訂', '話題・新着']}
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

                    <div className={style.flexPrice} onClick={() => handleItemSelection(item?._id)}>
                      <div className={style.marginRightPrice}>
                        <PriceCalculator price={item.cost || 0} discount={0} showTotal direction='column' />
                      </div>
                    </div>
                  </Col>

                  <Col span={2}>
                    <ButtonCustom
                      onClick={() => deleteCart(item?._id)}
                      className='dashed'
                      type='dashed'
                      icon={<DeleteOutlined style={{ fontSize: '22px', marginTop: '3px' }} />}
                      size='large'
                    ></ButtonCustom>
                  </Col>
                </Row>
              </Header>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
