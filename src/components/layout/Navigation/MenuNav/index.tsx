import Avatar from '@/components/Avatar/Avatar'
import AvatarDropMenu from '../../AvatarDropMenu'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import categoryApi from '@/apis/categories.api'
import Header from '../../Header/Header'
import LanguageChange from '@/components/LanguageChange'
import RenderSubMenu from './RenderSubMenu'
import useResponsives from '../../../../hooks/useResponsives'
import { BiSolidUserCircle } from 'react-icons/bi'
import { Button, Divider, Drawer, Row, Space } from 'antd'
import { CategoryState } from '@/interface/category'
import { DownOutlined } from '@ant-design/icons'
import { HiMiniHome, HiOutlineHome } from 'react-icons/hi2'
import { IoCalendar, IoCalendarOutline, IoSchoolOutline } from 'react-icons/io5'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MdSchool } from 'react-icons/md'
import { PiExam, PiExamFill, PiUserCircle } from 'react-icons/pi'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { UserState } from '@/interface/user'
import './styles.scss'
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

export default function MenuNav({ user, type }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState<boolean>(false)
  const { sm, md } = useResponsives()
  const { data: categories } = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => {
      return categoryApi.getCategories({ parentId: null })
    },
  })

  useEffect(() => {
    setOpen(false)
  }, [location])
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

  const test = categoriesData?.find((item) => item.label === 'Luyện thi')
  const opening = categoriesData?.find((item) => item.label === 'Lịch khai giảng')
  const choice = categoriesData?.find((item) => item.label === 'Trắc nghiệm')
  const mobileMenu = [
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
      href: `${opening?.href}${opening?.children?.[0]?.href}`,
    },
    {
      label: 'Trắc nghiệm',
      icon: <PiExam />,
      activeIcon: <PiExamFill />,
      href: `${choice?.href}${choice?.children?.[0]?.href}`,
    },
    { label: 'Tài khoản', icon: <PiUserCircle />, activeIcon: <BiSolidUserCircle /> },
  ]
  if (choice)
    if (type)
      return (
        <Space direction='vertical' className='sp100' size='large'>
          {categoriesData.map((item) => (
            <div key={`${item._id}`} className='menuLabel'>
              <div className='labelItem'>
                {item.children && !item.children.length ? (
                  <Link to={item.href} className='title'>
                    <Space className='sp100' size='small'>
                      {item.label}
                    </Space>
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
    else
      return (
        <>
          <div className='menu'>
            <Header type='fullsize'>
              {md ? (
                <Row justify='space-between' align='middle' className='uc-container menuItem'>
                  {mobileMenu.map((item) =>
                    item.href ? (
                      <NavLink
                        key={`${item.href}`}
                        to={`${item.href}`}
                        className={({ isActive }) => `${isActive ? (open ? '' : 'navActive') : ''} navMb`}
                      >
                        <div className='labelItem'>
                          <div className='labelIcon'>
                            <div className='icon-unActive'>{item.icon}</div>
                            <div className='icon-active'>{item.activeIcon}</div>
                            <div className='title'>{item.label}</div>
                          </div>
                        </div>
                      </NavLink>
                    ) : (
                      <div className={`${open ? 'navActive' : ''} navMb`} onClick={() => setOpen(!open)}>
                        <div className='labelItem'>
                          <div className='labelIcon'>
                            <div className='icon-unActive'>{item.icon}</div>
                            <div className='icon-active'>{item.activeIcon}</div>
                            <div className='title'>{item.label}</div>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </Row>
              ) : (
                <Row justify='space-between' align='middle' className='uc-container menuItem'>
                  {categoriesData.map((item) => (
                    <div key={`${item._id}`} className='menuLabel'>
                      <div className='labelItem'>
                        <Link
                          to={`${
                            item.label === 'Giáo viên' ||
                            item.label === 'Khóa học' ||
                            item.label === 'Luyện thi' ||
                            item.label === 'Lịch khai giảng'
                              ? '#'
                              : item.href
                          } `}
                          className='title'
                        >
                          <Space style={{ width: '100%' }} size='small'>
                            {item?.href ? item.label : <div className='title'>{item.label}</div>}
                            {item.children ? item.children.length > 0 && <DownOutlined /> : <></>}
                          </Space>
                        </Link>
                        {item.children ? item.children.length > 0 && <div className='arr'></div> : null}
                      </div>
                      {item.children ? (
                        item.children.length > 0 && (
                          <div className='chilMenu uc-container'>
                            <div className='sub-menu'>
                              {item.children.map((chil) => (
                                <div className='chil' key={`${chil._id}`}>
                                  <Space direction='vertical'>
                                    <Link to={`${item.href + chil.href}`}>
                                      <h3 className='chilTitle'>{chil.label}</h3>
                                    </Link>
                                    {chil?.children?.map((menuChil) => (
                                      <Space className='sp100' direction='vertical' key={`${menuChil._id}`}>
                                        <Link to={`${item.href + chil.href + menuChil.href}`} className='lastTitle'>
                                          {menuChil.label}
                                        </Link>
                                      </Space>
                                    ))}
                                  </Space>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}

                  {user ? (
                    <AvatarDropMenu userData={user} />
                  ) : (
                    <div className='butt-auth'>
                      <Link to='/login'>
                        <ButtonCustom type='text' className='butt-item'>
                          Đăng nhâp
                        </ButtonCustom>
                      </Link>
                      /
                      <Link to='/register'>
                        <ButtonCustom type='text' className='butt-item'>
                          Đăng ký
                        </ButtonCustom>
                      </Link>
                    </div>
                  )}
                </Row>
              )}
            </Header>

            <Drawer
              placement='right'
              closable={sm}
              onClose={() => setOpen(!open)}
              open={!md ? false : open}
              style={{
                textAlign: 'center',
                maxHeight: '100vh',
              }}
              className='nav-drawer'
              size={sm ? 'large' : 'default'}
            >
              <Space direction='vertical'>
                <Link to={'/profiles/' + `${userData?.data?._id}`}>
                  <Space direction='vertical'>
                    <Avatar avtUrl={user?.avatarUrl} userData={user} size={65}></Avatar>
                    <h3>{user?.fullName}</h3>
                  </Space>
                </Link>
                <Link to={'/profiles/' + `${userData?.data?._id}`} state='infor'>
                  <ButtonCustom type='text'>Thông tin giới thiệu</ButtonCustom>
                </Link>
                <Link to={'/profiles/' + `${userData?.data?._id}`} state='category'>
                  <ButtonCustom type='text'>Bằng cấp</ButtonCustom>
                </Link>

                {user?.isMentor && (
                  <Link to={'/profiles/' + `${userData?.data?._id}`} state='feedback'>
                    <ButtonCustom type='text'>Đánh giá</ButtonCustom>
                  </Link>
                )}
                <Divider style={{ margin: '10px 0' }} />
                <LanguageChange />
                {!user ? (
                  <Space>
                    <ButtonCustom type='text' href='/login'>
                      Đăng nhâp
                    </ButtonCustom>
                    /
                    <ButtonCustom type='text' href='/register'>
                      Đăng ký
                    </ButtonCustom>
                  </Space>
                ) : (
                  <AvatarDropMenu userData={user} renderMenu />
                )}
              </Space>
            </Drawer>
          </div>
          {userData?.data?.isMentor && userData?.data?.mentorInfo === null && (
            <div className='verifyInfo'>
              Hãy cập nhật đầy đủ thông tin để sử dụng những tính năng dành riêng cho bạn
              <Button
                className='btn-ms'
                type='primary'
                onClick={() => {
                  navigate('/profiles/' + `${userData?.data?._id}`)
                }}
              >
                Cập nhật ngay
              </Button>
            </div>
          )}
        </>
      )
}
