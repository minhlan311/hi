import categoryApi from '@/apis/categories.api'
import Avatar from '@/components/Avatar/Avatar'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import LanguageChange from '@/components/LanguageChange'
import { CategoryState } from '@/interface/category'
import { UserState } from '@/interface/user'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Col, Divider, Drawer, Flex, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import { BiSolidUserCircle } from 'react-icons/bi'
import { HiMiniHome, HiOutlineHome } from 'react-icons/hi2'
import { IoCalendar, IoCalendarOutline, IoChevronDown, IoSchoolOutline } from 'react-icons/io5'
import { MdSchool } from 'react-icons/md'
import { PiExam, PiExamFill, PiUserCircle } from 'react-icons/pi'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import useResponsives from '../../../../hooks/useResponsives'
import AvatarDropMenu from '../../AvatarDropMenu'
import Header from '../../Header/Header'
import RenderSubMenu from './RenderSubMenu'
import style from './styles.module.scss'
/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  user?: UserState
  type?: 'subMenu'
}

interface TransformedItem {
  _id: string
  label: string
  children: TransformedItem[]
  href: string
}

const UpdateMentor = ({ userData }: { userData: UserState }) => {
  const navigate = useNavigate()
  if (userData?.isMentor && !userData.mentorInfo?._id)
    return (
      <Flex vertical align='center' gap={12} className={style.verifyInfo}>
        <p>Hãy cập nhật đầy đủ thông tin để sử dụng những tính năng dành riêng cho bạn</p>
        <ButtonCustom
          type='primary'
          onClick={() => {
            navigate('/profiles/' + `${userData?._id}`, { state: { key: 'centificate' } })
          }}
        >
          Cập nhật ngay
        </ButtonCustom>
      </Flex>
    )
}

const MenuMb = ({ categoriesData, userData }: { categoriesData: TransformedItem[]; userData: UserState }) => {
  const { sm, md } = useResponsives()
  const location = useLocation()
  const [open, setOpen] = useState<boolean>(false)
  const [mobileMenu, setMobileMenu] = useState<any[]>([])
  useEffect(() => {
    setOpen(false)
  }, [location])
  const test = categoriesData?.find((item) => item.label === 'Luyện thi')
  const opening = categoriesData?.find((item) => item.label === 'Lịch khai giảng')
  const choice = categoriesData?.find((item) => item.label === 'Trắc nghiệm')

  useEffect(() => {
    if (categoriesData.length > 0) {
      setMobileMenu([
        { label: 'Trang chủ', icon: <HiOutlineHome />, activeIcon: <HiMiniHome />, href: '/' },
        {
          label: 'Luyện thi',
          icon: <IoSchoolOutline />,
          activeIcon: <MdSchool />,
          href: `${test?.href}${test?.children?.[0]?.href}`,
        },
        {
          label: 'Lịch khai giảng',
          icon: <IoCalendarOutline />,
          activeIcon: <IoCalendar />,
          href: `${opening?.href}`,
        },
        {
          label: 'Trắc nghiệm',
          icon: <PiExam />,
          activeIcon: <PiExamFill />,
          href: `${choice?.href}`,
        },
        { label: 'Tài khoản', icon: <PiUserCircle />, activeIcon: <BiSolidUserCircle /> },
      ])
    }
  }, [categoriesData])

  return (
    <Header background='var(--whiteBg)'>
      <div className={style.menu}>
        <Flex justify='space-between' align='center' className={style.navMb}>
          {mobileMenu.map((item) =>
            item.href ? (
              <NavLink
                key={`${item.href}`}
                to={`${item.href}`}
                className={({ isActive }) => `${isActive ? (open ? '' : style.navActive) : style.navColor}`}
              >
                <div className={style.labelItem}>
                  <div className={style.labelIcon}>
                    <div className={style.iconUnActive}>{item.icon}</div>
                    <div className={style.iconActive}>{item.activeIcon}</div>
                    <div className={style.title}>{item.label}</div>
                  </div>
                </div>
              </NavLink>
            ) : (
              <div className={`${open ? style.navActive : style.navColor}`} onClick={() => setOpen(!open)}>
                <div className={style.labelItem}>
                  <div className={style.labelIcon}>
                    <div className={style.iconUnActive}>{item.icon}</div>
                    <div className={style.iconActive}>{item.activeIcon}</div>
                    <div className={style.title}>{item.label}</div>
                  </div>
                </div>
              </div>
            ),
          )}
        </Flex>
      </div>
      <Drawer
        onClose={() => setOpen(!open)}
        open={!md ? false : open}
        style={{
          textAlign: 'center',
        }}
        className={style.navDrawer}
        size={sm ? 'large' : 'default'}
      >
        <Space direction='vertical'>
          {userData ? (
            <>
              <Link to={'/profiles/' + `${userData?._id}`}>
                <Space direction='vertical'>
                  <Avatar avtUrl={userData?.avatarUrl} userData={userData} size={65}></Avatar>
                  <h3>{userData?.fullName}</h3>
                </Space>
              </Link>
              <Link to={'/profiles/' + `${userData?._id}`} state='infor'>
                <ButtonCustom type='text'>Thông tin giới thiệu</ButtonCustom>
              </Link>
              <Link to={'/profiles/' + `${userData?._id}`} state='category'>
                <ButtonCustom type='text'>Bằng cấp</ButtonCustom>
              </Link>

              {userData?.isMentor && (
                <Link to={'/profiles/' + `${userData?._id}`} state='feedback'>
                  <ButtonCustom type='text'>Đánh giá</ButtonCustom>
                </Link>
              )}
              <Divider style={{ margin: '10px 0' }} />
              <AvatarDropMenu userData={userData} renderMenu />
            </>
          ) : (
            <Space>
              <ButtonCustom type='text' href='/login'>
                Đăng nhâp
              </ButtonCustom>
              /
              <ButtonCustom type='text' href='/register'>
                Đăng ký
              </ButtonCustom>
            </Space>
          )}
          <LanguageChange />
        </Space>
      </Drawer>
    </Header>
  )
}

const MenuNav = ({ user, type }: Props) => {
  const { md, sm } = useResponsives()
  const { data: categories } = useQuery({
    queryKey: ['categoriesMenu'],
    queryFn: () => {
      return categoryApi.getCategories({ parentId: null }, { sort: { createdAt: -1 } })
    },
  })
  const queryClient = useQueryClient()
  const userData = queryClient.getQueryData<any>(['userDetail'])

  const transformArray = (originalArray: CategoryState[]): TransformedItem[] => {
    return originalArray?.map((item) => ({
      _id: item._id,
      label: item.name,
      children: transformArray(item.children),
      href: '/' + item.slug,
    }))
  }

  const categoriesData: TransformedItem[] = transformArray(
    categories ? (categories?.data.docs as unknown as CategoryState[]) : [],
  )

  if (type) {
    return (
      <Space direction='vertical' className={'sp100'} size='large'>
        {categoriesData.map((item) => (
          <div key={`${item._id}`} className={style.menuLabel}>
            <div className={style.labelItem}>
              {item.children && !item.children.length ? (
                <Link to={item.href} className={style.title}>
                  <Flex gap={5}>{item.label}</Flex>
                </Link>
              ) : (
                <RenderSubMenu item={item} />
              )}
            </div>
          </div>
        ))}
        <Divider style={{ margin: 0 }}></Divider>
        <Link to='/card'>Giỏ hàng</Link>
      </Space>
    )
  } else {
    if (md || sm) {
      return (
        <div>
          <UpdateMentor userData={userData?.data} />
          <MenuMb categoriesData={categoriesData} userData={userData?.data} />
        </div>
      )
    } else {
      return (
        <div>
          <Header
            background='var(--green)'
            style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08),0 4px 12px rgba(0, 0, 0, 0.08)' }}
          >
            <div className={style.menu}>
              <Flex justify='space-between' className={'sp100'}>
                {categoriesData.map((item) => (
                  <div key={`${item._id}`} className={style.menuLabel}>
                    <Link to={`${item.href}`}>
                      <div className={style.labelItem} style={{ color: 'var(--white)' }}>
                        {item.children && item.children.length === 0 ? (
                          <div>{item.label}</div>
                        ) : (
                          <>
                            <Flex gap={5}>
                              <div className={style.title}>{item.label}</div>
                              {item.children ? item.children.length > 0 && <IoChevronDown /> : null}
                            </Flex>
                            {item.children ? item.children.length > 0 && <div className={style.arr}></div> : null}
                          </>
                        )}
                      </div>
                    </Link>
                    {item.children
                      ? item.children.length > 0 && (
                          <Row gutter={[0, 24]} className={style.chilMenu}>
                            {item.children.map((chil) =>
                              chil?.children.length > 0 ? (
                                <Col span={6} className={style.chil} key={`${chil._id}`}>
                                  <Flex vertical gap={15}>
                                    <Flex gap={10} vertical>
                                      <Link to={`${item.href + chil.href}`}>
                                        <h3 className={style.chilTitle}>{chil.label}</h3>
                                      </Link>
                                      <Flex gap={5} vertical>
                                        {chil?.children?.map((menuChil) => (
                                          <Link to={`${item.href + chil.href + menuChil.href}`} key={`${menuChil._id}`}>
                                            {menuChil.label}
                                          </Link>
                                        ))}
                                      </Flex>
                                    </Flex>
                                  </Flex>
                                </Col>
                              ) : (
                                <Col span={6}>
                                  <Link to={`${item.href + chil.href}`}>{chil.label}</Link>
                                </Col>
                              ),
                            )}
                          </Row>
                        )
                      : null}
                  </div>
                ))}
                {user ? (
                  <AvatarDropMenu userData={user} />
                ) : (
                  <div className={style.buttAuth}>
                    <Link to='/login'>
                      <ButtonCustom type='text' className={style.buttItem}>
                        Đăng nhâp
                      </ButtonCustom>
                    </Link>
                    /
                    <Link to='/register'>
                      <ButtonCustom type='text' className={style.buttItem}>
                        Đăng ký
                      </ButtonCustom>
                    </Link>
                  </div>
                )}
              </Flex>
            </div>
          </Header>
          <UpdateMentor userData={userData?.data} />
        </div>
      )
    }
  }
}

export default MenuNav
