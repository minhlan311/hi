/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
// import DropdownCustom from '@/components/DropdownCustom/DropdownCustom'
import LanguageChange from '@/components/LanguageChange'
import Logo from '@/components/Logo/Logo'
// import { MenuItemData } from '@/interface/menuItemData'
import categoryApi from '@/apis/categories.api'
import { CategoryState } from '@/interface/category'
import { UserState } from '@/interface/user'
import { DownOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Col, Divider, Drawer, Row, Space } from 'antd'
import { IoMenuSharp } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import useResponsives from '../../../../hooks/useResponsives'
import AvatarDropMenu from '../../AvatarDropMenu'
import Header from '../../Header/Header'
import './styles.scss'
import userApi from '@/apis/user.api'
import { useContext } from 'react'
import { AppContext } from '@/contexts/app.context'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  user?: UserState
}

interface TransformedItem {
  _id: string
  label: string
  children: TransformedItem[]
  href: string
}

export default function MenuPc({ open, setOpen }: Props) {
  const { profile } = useContext(AppContext)

  const navigate = useNavigate()

  const query = useQuery({ queryKey: ['userDetail'], queryFn: () => userApi.getUserDetail(profile._id) })
  const user = query?.data?.data
  const { sm, md } = useResponsives()
  const { data: categories } = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => {
      return categoryApi.getCategories({ parentId: null })
    },
  })

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

  return (
    <>
      <div className='menu'>
        <Header type='fullsize'>
          {md ? (
            <Row justify='space-between' align='middle' style={{ padding: '10px 12px' }}>
              <Col span={16} className='menuItem'>
                <Logo type='light' />
              </Col>
              <Col>
                <ButtonCustom
                  type='text'
                  size='small'
                  style={{ height: 40 }}
                  onClick={() => setOpen(!open)}
                  icon={<IoMenuSharp size={35} color='white' />}
                ></ButtonCustom>
              </Col>
            </Row>
          ) : (
            <Row justify='space-between' align='middle' className='uc-container menuItem'>
              {categoriesData.map((item) => (
                <div key={`${item._id}`} className='menuLabel'>
                  <div className='labelItem'>
                    <Link to={`${item.href}`} className='title'>
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
          placement={sm ? 'top' : 'right'}
          closable={sm}
          onClose={() => setOpen(!open)}
          open={!md ? false : open}
          style={{
            textAlign: 'center',
            maxHeight: '100vh',
          }}
          className='nav-drawer'
          size={sm ? 'large' : 'default'}
          extra={
            // user && (
            //   <Space>
            //     <h4 style={{ color: 'white' }}>{user?.fullName}</h4>
            //     <Avatar avtUrl={user.avatarUrl} userData={user}></Avatar>
            //   </Space>
            // )
            <div></div>
          }
        >
          <Space direction='vertical'>
            {categoriesData.map((item) => (
              <Link to={`${item.href}`} key={`${item._id}`}>
                <ButtonCustom type='text' size='small' style={{ width: '100%' }}>
                  {item.label}
                </ButtonCustom>
              </Link>
            ))}
          </Space>

          <Divider />
          <Space direction='vertical'>
            <LanguageChange />
            {!user ? (
              <Space>
                <Link to='/login'>
                  <ButtonCustom type='text'>Đăng nhâp</ButtonCustom>
                </Link>
                /
                <Link to='/register'>
                  <ButtonCustom type='text'>Đăng ký</ButtonCustom>
                </Link>
              </Space>
            ) : (
              <AvatarDropMenu userData={user} renderMenu />
            )}
          </Space>
        </Drawer>
      </div>
      {user?.isMentor && user?.mentorInfo === null && (
        <div className='verifyInfo'>
          Hãy cập nhật đầy đủ thông tin để trở sử dụng đầy đủ những tính năng dành riêng cho bạn
          <Button
            className='btn-ms'
            type='primary'
            onClick={() => {
              navigate('/profiles/' + `${user._id}`)
            }}
          >
            Cập nhật ngay
          </Button>
        </div>
      )}
    </>
  )
}
