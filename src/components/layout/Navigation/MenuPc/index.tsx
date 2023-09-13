/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from '@/components/Avatar/Avatar'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
// import DropdownCustom from '@/components/DropdownCustom/DropdownCustom'
import LanguageChange from '@/components/LanguageChange'
import Logo from '@/components/Logo/Logo'
// import { MenuItemData } from '@/interface/menuItemData'
import categoryApi from '@/apis/categories.api'
import DropdownCustom from '@/components/DropdownCustom/DropdownCustom'
import { CategoryState } from '@/interface/category'
import { UserState } from '@/interface/user'
import { clearLS } from '@/utils/auth'
import { DownOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Col, Divider, Drawer, Row, Space } from 'antd'
import { IoMenuSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import useResponsives from '../../../../hooks/useResponsives'
import Header from '../../Header/Header'
import './styles.scss'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: UserState | null
}

interface TransformedItem {
  _id: string
  label: string
  children: TransformedItem[]
  href: string
}

export default function MenuPc({ open, setOpen, user = null }: Props) {
  const { sm, md } = useResponsives()
  const { data: categories } = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => {
      return categoryApi.getCategories({ parentId: null })
    }
  })

  // const menu: TransformedItem[] = [
  //   {
  //     label: 'Giới thiệu',
  //     href: 'gioi-thieu'
  //   },
  //   {
  //     label: 'Giáo viên',
  //     href: 'giao-vien',
  //     children: [
  //       {
  //         label: 'Giáo viên Việt Nam',
  //         href: 'giao-vien-viet-nam',
  //         children: [
  //           {
  //             label: 'Giáo viên tiếng Anh',
  //             href: 'giao-vien-tieng-anh'
  //           },
  //           {
  //             label: 'Giáo viên tiếng Trung',
  //             href: 'giao-vien-tieng-trung'
  //           },
  //           {
  //             label: 'Giáo viên tiếng Nhật',
  //             href: 'giao-vien-tieng-nhat'
  //           },
  //           {
  //             label: 'Giáo viên tiếng Hàn',
  //             href: 'giao-vien-tieng-han'
  //           },
  //           {
  //             label: 'Giáo viên tiếng Đức',
  //             href: 'giao-vien-tieng-duc'
  //           }
  //         ]
  //       },
  //       {
  //         label: 'Giáo viên Bản địa',
  //         children: [
  //           {
  //             label: 'Giáo viên tiếng Anh',
  //             href: 'giao-vien-tieng-anh'
  //           },
  //           {
  //             label: 'Giáo viên tiếng Trung',
  //             href: 'giao-vien-tieng-trung'
  //           },
  //           {
  //             label: 'Giáo viên tiếng Nhật',
  //             href: 'giao-vien-tieng-nhat'
  //           },
  //           {
  //             label: 'Giáo viên tiếng Hàn',
  //             href: 'giao-vien-tieng-han'
  //           },
  //           {
  //             label: 'Giáo viên tiếng Đức',
  //             href: 'giao-vien-tieng-duc'
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Khóa học',
  //     children: [
  //       {
  //         label: 'Tiếng Anh',
  //         children: [
  //           {
  //             label: 'Trung học cơ sở',
  //             href: 'trung-hoc-co-so'
  //           },
  //           {
  //             label: 'Trung học phổ thông',
  //             href: 'trung-hoc-pho-thong'
  //           },
  //           {
  //             label: 'Tiếng Anh mất gốc',
  //             href: 'tieng-anh-mat-goc'
  //           },
  //           {
  //             label: 'Tiếng Anh giao tiếp',
  //             href: 'tieng-anh-giao-tiep'
  //           },
  //           {
  //             label: 'Tiếng Anh Doanh nghiệp',
  //             href: 'tieng-anh-doanh-nghiep'
  //           },
  //           {
  //             label: 'Tiếng Anh theo yêu cầu',
  //             href: 'tieng-anh-theo-yeu-cau'
  //           }
  //         ]
  //       },
  //       {
  //         label: 'Tiếng Đức',
  //         children: [
  //           {
  //             label: 'Tiếng Đức cơ bản',
  //             href: 'tieng-duc-co-ban'
  //           },
  //           {
  //             label: 'Tiếng Đức giao tiếp',
  //             href: 'tieng-duc-giao-tiep'
  //           },
  //           {
  //             label: 'Tiếng Đức ngữ pháp',
  //             href: 'tieng-duc-ngu-phap'
  //           },
  //           {
  //             label: 'Tiếng Đức du học & XKLĐ',
  //             href: 'tieng-duc-du-hoc-xkld'
  //           },
  //           {
  //             label: 'Tiếng Đức luyện thi',
  //             href: 'tieng-duc-luyen-thi'
  //           },
  //           {
  //             label: 'Tiếng Đức theo yêu cầu',
  //             href: 'tieng-duc-theo-yeu-cau'
  //           }
  //         ]
  //       },
  //       {
  //         label: 'Tiếng Hàn',
  //         children: [
  //           {
  //             label: 'Tiếng Hàn cơ bản',
  //             href: 'tieng-han-co-ban'
  //           },
  //           {
  //             label: 'Tiếng Hàn giao tiếp',
  //             href: 'tieng-han-giao-tiep'
  //           },
  //           {
  //             label: 'Tiếng Hàn Ngữ pháp',
  //             href: 'tieng-han-ngu-phap'
  //           },
  //           {
  //             label: 'Tiếng Hàn Du học & XKLĐ',
  //             href: 'tieng-han-du-hoc-xkld'
  //           },
  //           {
  //             label: 'Tiếng Hàn Luyện thi',
  //             href: 'tieng-han-luyen-thi'
  //           },
  //           {
  //             label: 'Tiếng Hàn theo yêu cầu',
  //             href: 'tieng-han-theo-yeu-cau'
  //           }
  //         ]
  //       },
  //       {
  //         label: 'Tiếng Nhật',
  //         children: [
  //           {
  //             label: 'Tiếng Nhật cơ bản',
  //             href: 'tieng-nhat-co-ban'
  //           },
  //           {
  //             label: 'Tiếng Nhật giao tiếp',
  //             href: 'tieng-nhat-giao-tiep'
  //           },
  //           {
  //             label: 'Tiếng Nhật Ngữ pháp',
  //             href: 'tieng-nhat-ngu-phap'
  //           },
  //           {
  //             label: 'Tiếng Nhật Du học & XKLĐ',
  //             href: 'tieng-nhat-du-hoc-xkld'
  //           },
  //           {
  //             label: 'Tiếng Nhật Luyện thi',
  //             href: 'tieng-nhat-luyen-thi'
  //           },
  //           {
  //             label: 'Tiếng Nhật theo yêu cầu',
  //             href: 'tieng-nhat-theo-yeu-cau'
  //           }
  //         ]
  //       },
  //       {
  //         label: 'Tiếng Trung',
  //         children: [
  //           {
  //             label: 'Tiếng Trung cơ bản',
  //             href: 'tieng-trung-co-ban'
  //           },
  //           {
  //             label: 'Tiếng Trung giao tiếp',
  //             href: 'tieng-trung-giao-tiep'
  //           },
  //           {
  //             label: 'Tiếng Trung Ngữ pháp',
  //             href: 'tieng-trung-ngu-phap'
  //           },
  //           {
  //             label: 'Tiếng Trung Du học & XKLĐ',
  //             href: 'tieng-trung-du-hoc-xkld'
  //           },
  //           {
  //             label: 'Tiếng Trung Luyện thi',
  //             href: 'tieng-trung-luyen-thi'
  //           },
  //           {
  //             label: 'Tiếng Trung theo yêu cầu',
  //             href: 'tieng-trung-theo-yeu-cau'
  //           }
  //         ]
  //       }
  //     ]
  //   },

  //   {
  //     label: 'Luyện thi',
  //     children: [
  //       {
  //         label: 'Tiếng Anh',
  //         children: [
  //           {
  //             label: 'Chứng chỉ IELTS',
  //             href: 'chung-chi-ielts'
  //           },
  //           {
  //             label: 'Chứng chỉ TOEIC',
  //             href: 'chung-chi-toeic'
  //           },
  //           {
  //             label: 'Chứng chỉ TOEFL',
  //             href: 'chung-chi-toefl'
  //           },
  //           {
  //             label: 'Chứng chỉ Cambridge',
  //             href: 'chung-chi-cambridge'
  //           },
  //           {
  //             label: 'Chứng chỉ 6 bậc Vstep',
  //             href: 'chung-chi-6-bac-vstep'
  //           }
  //         ]
  //       },
  //       {
  //         label: 'Tiếng Đức',
  //         children: [
  //           {
  //             label: 'Chứng chỉ TestAS',
  //             href: 'chung-chi-testas'
  //           },
  //           {
  //             label: 'Chứng chỉ DSD',
  //             href: 'chung-chi-dsd'
  //           },
  //           {
  //             label: 'Chứng chỉ TELC',
  //             href: 'chung-chi-telc'
  //           },
  //           {
  //             label: 'Chứng chỉ DSHV',
  //             href: 'chung-chi-dshv'
  //           }
  //         ]
  //       },
  //       {
  //         label: 'Tiếng Hàn',
  //         children: [
  //           {
  //             label: 'Chứng chỉ Topik I',
  //             href: 'chung-chi-topik-i'
  //           },
  //           {
  //             label: 'Chứng chỉ Topik II',
  //             href: 'chung-chi-topik-ii'
  //           },
  //           {
  //             label: 'Chứng chỉ KLPT',
  //             href: 'chung-chi-klpt'
  //           }
  //         ]
  //       },
  //       {
  //         label: 'Tiếng Nhật',
  //         children: [
  //           {
  //             label: 'Chứng chỉ JIPT N5',
  //             href: 'chung-chi-jipt-n5'
  //           },
  //           {
  //             label: 'Chứng chỉ JIPT N4',
  //             href: 'chung-chi-jipt-n4'
  //           },
  //           {
  //             label: 'Chứng chỉ JIPT N3',
  //             href: 'chung-chi-jipt-n3'
  //           },
  //           {
  //             label: 'Chứng chỉ JIPT N2',
  //             href: 'chung-chi-jipt-n2'
  //           },
  //           {
  //             label: 'Chứng chỉ JIPT N1',
  //             href: 'chung-chi-jipt-n1'
  //           }
  //         ]
  //       },
  //       {
  //         label: 'Tiếng Trung',
  //         children: [
  //           {
  //             label: 'Chứng chỉ HSK 1',
  //             href: 'chung-chi-hsk-1'
  //           },
  //           {
  //             label: 'Chứng chỉ HSK 2',
  //             href: 'chung-chi-hsk-2'
  //           },
  //           {
  //             label: 'Chứng chỉ HSK 3',
  //             href: 'chung-chi-hsk-3'
  //           },
  //           {
  //             label: 'Chứng chỉ HSK 4',
  //             href: 'chung-chi-hsk-4'
  //           },
  //           {
  //             label: 'Chứng chỉ HSK 5',
  //             href: 'chung-chi-hsk-5'
  //           },
  //           {
  //             label: 'Chứng chỉ HSK 6',
  //             href: 'chung-chi-hsk-6'
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Lịch khai giảng',
  //     children: [
  //       {
  //         label: 'Lịch khai giảng tháng 9',
  //         children: [
  //           {
  //             label: 'Trung học cơ sở',
  //             href: 'trung-hoc-co-so'
  //           },
  //           {
  //             label: 'Trung học phổ thông',
  //             href: 'trung-hoc-pho-thong'
  //           },
  //           {
  //             label: 'Tiếng Anh mất gốc',
  //             href: 'tieng-anh-mat-goc'
  //           },
  //           {
  //             label: 'Tiếng Anh giao tiếp',
  //             href: 'tieng-anh-giao-tiep'
  //           },
  //           {
  //             label: 'Tiếng Anh Doanh nghiệp',
  //             href: 'tieng-anh-doanh-nghiep'
  //           },
  //           {
  //             label: 'Tiếng Anh theo yêu cầu',
  //             href: 'tieng-anh-theo-yeu-cau'
  //           },
  //           {
  //             label: 'Tiếng Đức cơ bản',
  //             href: 'tieng-duc-co-ban'
  //           },
  //           {
  //             label: 'Tiếng Đức giao tiếp',
  //             href: 'tieng-duc-giao-tiep'
  //           },
  //           {
  //             label: 'Tiếng Đức ngữ pháp',
  //             href: 'tieng-duc-ngu-phap'
  //           },
  //           {
  //             label: 'Tiếng Đức du học & XKLĐ',
  //             href: 'tieng-duc-du-hoc-xkld'
  //           },
  //           {
  //             label: 'Tiếng Đức luyện thi',
  //             href: 'tieng-duc-luyen-thi'
  //           },
  //           {
  //             label: 'Tiếng Đức theo yêu cầu',
  //             href: 'tieng-duc-theo-yeu-cau'
  //           }
  //         ]
  //       },
  //       {
  //         label: 'Lịch khai giảng tháng 10',
  //         children: [
  //           {
  //             label: 'Tiếng Hàn cơ bản',
  //             href: 'tieng-han-co-ban'
  //           },
  //           {
  //             label: 'Tiếng Hàn giao tiếp',
  //             href: 'tieng-han-giao-tiep'
  //           },
  //           {
  //             label: 'Tiếng Hàn Ngữ pháp',
  //             href: 'tieng-han-ngu-phap'
  //           },
  //           {
  //             label: 'Tiếng Hàn Du học & XKLĐ',
  //             href: 'tieng-han-du-hoc-xkld'
  //           },
  //           {
  //             label: 'Tiếng Hàn Luyện thi',
  //             href: 'tieng-han-luyen-thi'
  //           },
  //           {
  //             label: 'Tiếng Hàn theo yêu cầu',
  //             href: 'tieng-han-theo-yeu-cau'
  //           },
  //           {
  //             label: 'Tiếng Nhật cơ bản',
  //             href: 'tieng-nhat-co-ban'
  //           },
  //           {
  //             label: 'Tiếng Nhật giao tiếp',
  //             href: 'tieng-nhat-giao-tiep'
  //           },
  //           {
  //             label: 'Tiếng Nhật Ngữ pháp',
  //             href: 'tieng-nhat-ngu-phap'
  //           },
  //           {
  //             label: 'Tiếng Nhật Du học & XKLĐ',
  //             href: 'tieng-nhat-du-hoc-xkld'
  //           },
  //           {
  //             label: 'Tiếng Nhật Luyện thi',
  //             href: 'tieng-nhat-luyen-thi'
  //           },
  //           {
  //             label: 'Tiếng Nhật theo yêu cầu',
  //             href: 'tieng-nhat-theo-yeu-cau'
  //           }
  //         ]
  //       },
  //       {
  //         label: 'Lịch khai giảng tháng 11',
  //         children: [
  //           {
  //             label: 'Tiếng Trung cơ bản',
  //             href: 'tieng-trung-co-ban'
  //           },
  //           {
  //             label: 'Tiếng Trung giao tiếp',
  //             href: 'tieng-trung-giao-tiep'
  //           },
  //           {
  //             label: 'Tiếng Trung Ngữ pháp',
  //             href: 'tieng-trung-ngu-phap'
  //           },
  //           {
  //             label: 'Tiếng Trung Du học & XKLĐ',
  //             href: 'tieng-trung-du-hoc-xkld'
  //           },
  //           {
  //             label: 'Tiếng Trung Luyện thi',
  //             href: 'tieng-trung-luyen-thi'
  //           },
  //           {
  //             label: 'Tiếng Trung theo yêu cầu',
  //             href: 'tieng-trung-theo-yeu-cau'
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Trắc nhiệm',
  //     href: ''
  //   },
  //   {
  //     label: 'Tin tức',
  //     href: ''
  //   },

  //   {
  //     label: 'Hỏi đáp',
  //     href: ''
  //   }
  // ]

  const transformArray = (originalArray: CategoryState[]): TransformedItem[] => {
    return originalArray?.map((item) => ({
      _id: item._id,
      label: item.name,
      children: transformArray(item.children),
      href: '/' + item.slug
    }))
  }

  const categoriesData: TransformedItem[] = transformArray(
    categories ? (categories?.data.docs as unknown as CategoryState[]) : []
  )

  const items: any[] = [
    {
      key: 'profiles',
      label: <Link to='/profiles'>Trang cá nhân</Link>
    },

    {
      key: 'change-password',
      label: <Link to='/change-password'>Đổi mật khẩu</Link>
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      label: (
        <div
          onClick={() => {
            clearLS()
            window.location.href = '/'
          }}
        >
          Đăng xuất
        </div>
      )
    }
  ]

  return (
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
              <DropdownCustom items={items} placement='bottomRight'>
                <Space className='avtDrop'>
                  <h4 style={{ color: 'white' }}>{user?.fullName}</h4>
                  <Avatar avtUrl={user?.avatarUrl} userData={user}></Avatar>
                </Space>
              </DropdownCustom>
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
          maxHeight: '100vh'
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
        // headerStyle={{ background: 'var(--green)' }}
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
            items.map(
              (item) =>
                !item.type && (
                  <ButtonCustom type='text' key={item._id} size='small'>
                    {item.label}
                  </ButtonCustom>
                )
            )
          )}
        </Space>
      </Drawer>
    </div>
  )
}
