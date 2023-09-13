import Avatar from '@/components/Avatar/Avatar'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import DropdownCustom from '@/components/DropdownCustom/DropdownCustom'
import LanguageChange from '@/components/LanguageChange'
import Logo from '@/components/Logo/Logo'
import { MenuItemData } from '@/interface/menuItemData'
import { UserState } from '@/interface/user'
import { DownOutlined } from '@ant-design/icons'
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

export interface MenuChild {
  childLabel: string | React.ReactNode
  href: string
}

export interface Children {
  label: string | React.ReactNode
  menuChild: MenuChild[]
}

export interface Menu {
  label: string | React.ReactNode
  children?: Children[]
  href?: string
}
export default function MenuPc({ open, setOpen, user = null }: Props) {
  const { sm, md } = useResponsives()
  const menu: Menu[] = [
    {
      label: 'Giới thiệu',
      href: '/'
    },
    {
      label: 'Giáo viên',
      children: [
        {
          label: 'Giáo viên Việt Nam',
          menuChild: [
            {
              childLabel: 'Giáo viên tiếng Anh',
              href: '/giao-vien-tieng-anh'
            },
            {
              childLabel: 'Giáo viên tiếng Trung',
              href: '/giao-vien-tieng-trung'
            },
            {
              childLabel: 'Giáo viên tiếng Nhật',
              href: '/giao-vien-tieng-nhat'
            },
            {
              childLabel: 'Giáo viên tiếng Hàn',
              href: '/giao-vien-tieng-han'
            },
            {
              childLabel: 'Giáo viên tiếng Đức',
              href: '/giao-vien-tieng-duc'
            }
          ]
        },
        {
          label: 'Giáo viên Bản địa',
          menuChild: [
            {
              childLabel: 'Giáo viên tiếng Anh',
              href: '/giao-vien-tieng-anh'
            },
            {
              childLabel: 'Giáo viên tiếng Trung',
              href: '/giao-vien-tieng-trung'
            },
            {
              childLabel: 'Giáo viên tiếng Nhật',
              href: '/giao-vien-tieng-nhat'
            },
            {
              childLabel: 'Giáo viên tiếng Hàn',
              href: '/giao-vien-tieng-han'
            },
            {
              childLabel: 'Giáo viên tiếng Đức',
              href: '/giao-vien-tieng-duc'
            }
          ]
        }
      ]
    },
    {
      label: 'Khóa học',
      children: [
        {
          label: 'Tiếng Anh',
          menuChild: [
            {
              childLabel: 'Trung học cơ sở',
              href: '/trung-hoc-co-so'
            },
            {
              childLabel: 'Trung học phổ thông',
              href: '/trung-hoc-pho-thong'
            },
            {
              childLabel: 'Tiếng Anh mất gốc',
              href: '/tieng-anh-mat-goc'
            },
            {
              childLabel: 'Tiếng Anh giao tiếp',
              href: '/tieng-anh-giao-tiep'
            },
            {
              childLabel: 'Tiếng Anh Doanh nghiệp',
              href: '/tieng-anh-doanh-nghiep'
            },
            {
              childLabel: 'Tiếng Anh theo yêu cầu',
              href: '/tieng-anh-theo-yeu-cau'
            }
          ]
        },
        {
          label: 'Tiếng Đức',
          menuChild: [
            {
              childLabel: 'Tiếng Đức cơ bản',
              href: '/tieng-duc-co-ban'
            },
            {
              childLabel: 'Tiếng Đức giao tiếp',
              href: '/tieng-duc-giao-tiep'
            },
            {
              childLabel: 'Tiếng Đức ngữ pháp',
              href: '/tieng-duc-ngu-phap'
            },
            {
              childLabel: 'Tiếng Đức du học & XKLĐ',
              href: '/tieng-duc-du-hoc-xkld'
            },
            {
              childLabel: 'Tiếng Đức luyện thi',
              href: '/tieng-duc-luyen-thi'
            },
            {
              childLabel: 'Tiếng Đức theo yêu cầu',
              href: '/tieng-duc-theo-yeu-cau'
            }
          ]
        },
        {
          label: 'Tiếng Hàn',
          menuChild: [
            {
              childLabel: 'Tiếng Hàn cơ bản',
              href: '/tieng-han-co-ban'
            },
            {
              childLabel: 'Tiếng Hàn giao tiếp',
              href: '/tieng-han-giao-tiep'
            },
            {
              childLabel: 'Tiếng Hàn Ngữ pháp',
              href: '/tieng-han-ngu-phap'
            },
            {
              childLabel: 'Tiếng Hàn Du học & XKLĐ',
              href: '/tieng-han-du-hoc-xkld'
            },
            {
              childLabel: 'Tiếng Hàn Luyện thi',
              href: '/tieng-han-luyen-thi'
            },
            {
              childLabel: 'Tiếng Hàn theo yêu cầu',
              href: '/tieng-han-theo-yeu-cau'
            }
          ]
        },
        {
          label: 'Tiếng Nhật',
          menuChild: [
            {
              childLabel: 'Tiếng Nhật cơ bản',
              href: '/tieng-nhat-co-ban'
            },
            {
              childLabel: 'Tiếng Nhật giao tiếp',
              href: '/tieng-nhat-giao-tiep'
            },
            {
              childLabel: 'Tiếng Nhật Ngữ pháp',
              href: '/tieng-nhat-ngu-phap'
            },
            {
              childLabel: 'Tiếng Nhật Du học & XKLĐ',
              href: '/tieng-nhat-du-hoc-xkld'
            },
            {
              childLabel: 'Tiếng Nhật Luyện thi',
              href: '/tieng-nhat-luyen-thi'
            },
            {
              childLabel: 'Tiếng Nhật theo yêu cầu',
              href: '/tieng-nhat-theo-yeu-cau'
            }
          ]
        },
        {
          label: 'Tiếng Trung',
          menuChild: [
            {
              childLabel: 'Tiếng Trung cơ bản',
              href: '/tieng-trung-co-ban'
            },
            {
              childLabel: 'Tiếng Trung giao tiếp',
              href: '/tieng-trung-giao-tiep'
            },
            {
              childLabel: 'Tiếng Trung Ngữ pháp',
              href: '/tieng-trung-ngu-phap'
            },
            {
              childLabel: 'Tiếng Trung Du học & XKLĐ',
              href: '/tieng-trung-du-hoc-xkld'
            },
            {
              childLabel: 'Tiếng Trung Luyện thi',
              href: '/tieng-trung-luyen-thi'
            },
            {
              childLabel: 'Tiếng Trung theo yêu cầu',
              href: '/tieng-trung-theo-yeu-cau'
            }
          ]
        }
      ]
    },

    {
      label: 'Luyện thi',
      children: [
        {
          label: 'Tiếng Anh',
          menuChild: [
            {
              childLabel: 'Chứng chỉ IELTS',
              href: '/chung-chi-ielts'
            },
            {
              childLabel: 'Chứng chỉ TOEIC',
              href: '/chung-chi-toeic'
            },
            {
              childLabel: 'Chứng chỉ TOEFL',
              href: '/chung-chi-toefl'
            },
            {
              childLabel: 'Chứng chỉ Cambridge',
              href: '/chung-chi-cambridge'
            },
            {
              childLabel: 'Chứng chỉ 6 bậc Vstep',
              href: '/chung-chi-6-bac-vstep'
            }
          ]
        },
        {
          label: 'Tiếng Đức',
          menuChild: [
            {
              childLabel: 'Chứng chỉ TestAS',
              href: '/chung-chi-testas'
            },
            {
              childLabel: 'Chứng chỉ DSD',
              href: '/chung-chi-dsd'
            },
            {
              childLabel: 'Chứng chỉ TELC',
              href: '/chung-chi-telc'
            },
            {
              childLabel: 'Chứng chỉ DSHV',
              href: '/chung-chi-dshv'
            }
          ]
        },
        {
          label: 'Tiếng Hàn',
          menuChild: [
            {
              childLabel: 'Chứng chỉ Topik I',
              href: '/chung-chi-topik-i'
            },
            {
              childLabel: 'Chứng chỉ Topik II',
              href: '/chung-chi-topik-ii'
            },
            {
              childLabel: 'Chứng chỉ KLPT',
              href: '/chung-chi-klpt'
            }
          ]
        },
        {
          label: 'Tiếng Nhật',
          menuChild: [
            {
              childLabel: 'Chứng chỉ JIPT N5',
              href: '/chung-chi-jipt-n5'
            },
            {
              childLabel: 'Chứng chỉ JIPT N4',
              href: '/chung-chi-jipt-n4'
            },
            {
              childLabel: 'Chứng chỉ JIPT N3',
              href: '/chung-chi-jipt-n3'
            },
            {
              childLabel: 'Chứng chỉ JIPT N2',
              href: '/chung-chi-jipt-n2'
            },
            {
              childLabel: 'Chứng chỉ JIPT N1',
              href: '/chung-chi-jipt-n1'
            }
          ]
        },
        {
          label: 'Tiếng Trung',
          menuChild: [
            {
              childLabel: 'Chứng chỉ HSK 1',
              href: '/chung-chi-hsk-1'
            },
            {
              childLabel: 'Chứng chỉ HSK 2',
              href: '/chung-chi-hsk-2'
            },
            {
              childLabel: 'Chứng chỉ HSK 3',
              href: '/chung-chi-hsk-3'
            },
            {
              childLabel: 'Chứng chỉ HSK 4',
              href: '/chung-chi-hsk-4'
            },
            {
              childLabel: 'Chứng chỉ HSK 5',
              href: '/chung-chi-hsk-5'
            },
            {
              childLabel: 'Chứng chỉ HSK 6',
              href: '/chung-chi-hsk-6'
            }
          ]
        }
      ]
    },
    {
      label: 'Lịch khai giảng',
      children: [
        {
          label: 'Lịch khai giảng tháng 9',
          menuChild: [
            {
              childLabel: 'Trung học cơ sở',
              href: '/trung-hoc-co-so'
            },
            {
              childLabel: 'Trung học phổ thông',
              href: '/trung-hoc-pho-thong'
            },
            {
              childLabel: 'Tiếng Anh mất gốc',
              href: '/tieng-anh-mat-goc'
            },
            {
              childLabel: 'Tiếng Anh giao tiếp',
              href: '/tieng-anh-giao-tiep'
            },
            {
              childLabel: 'Tiếng Anh Doanh nghiệp',
              href: '/tieng-anh-doanh-nghiep'
            },
            {
              childLabel: 'Tiếng Anh theo yêu cầu',
              href: '/tieng-anh-theo-yeu-cau'
            },
            {
              childLabel: 'Tiếng Đức cơ bản',
              href: '/tieng-duc-co-ban'
            },
            {
              childLabel: 'Tiếng Đức giao tiếp',
              href: '/tieng-duc-giao-tiep'
            },
            {
              childLabel: 'Tiếng Đức ngữ pháp',
              href: '/tieng-duc-ngu-phap'
            },
            {
              childLabel: 'Tiếng Đức du học & XKLĐ',
              href: '/tieng-duc-du-hoc-xkld'
            },
            {
              childLabel: 'Tiếng Đức luyện thi',
              href: '/tieng-duc-luyen-thi'
            },
            {
              childLabel: 'Tiếng Đức theo yêu cầu',
              href: '/tieng-duc-theo-yeu-cau'
            }
          ]
        },
        {
          label: 'Lịch khai giảng tháng 10',
          menuChild: [
            {
              childLabel: 'Tiếng Hàn cơ bản',
              href: '/tieng-han-co-ban'
            },
            {
              childLabel: 'Tiếng Hàn giao tiếp',
              href: '/tieng-han-giao-tiep'
            },
            {
              childLabel: 'Tiếng Hàn Ngữ pháp',
              href: '/tieng-han-ngu-phap'
            },
            {
              childLabel: 'Tiếng Hàn Du học & XKLĐ',
              href: '/tieng-han-du-hoc-xkld'
            },
            {
              childLabel: 'Tiếng Hàn Luyện thi',
              href: '/tieng-han-luyen-thi'
            },
            {
              childLabel: 'Tiếng Hàn theo yêu cầu',
              href: '/tieng-han-theo-yeu-cau'
            },
            {
              childLabel: 'Tiếng Nhật cơ bản',
              href: '/tieng-nhat-co-ban'
            },
            {
              childLabel: 'Tiếng Nhật giao tiếp',
              href: '/tieng-nhat-giao-tiep'
            },
            {
              childLabel: 'Tiếng Nhật Ngữ pháp',
              href: '/tieng-nhat-ngu-phap'
            },
            {
              childLabel: 'Tiếng Nhật Du học & XKLĐ',
              href: '/tieng-nhat-du-hoc-xkld'
            },
            {
              childLabel: 'Tiếng Nhật Luyện thi',
              href: '/tieng-nhat-luyen-thi'
            },
            {
              childLabel: 'Tiếng Nhật theo yêu cầu',
              href: '/tieng-nhat-theo-yeu-cau'
            }
          ]
        },
        {
          label: 'Lịch khai giảng tháng 11',
          menuChild: [
            {
              childLabel: 'Tiếng Trung cơ bản',
              href: '/tieng-trung-co-ban'
            },
            {
              childLabel: 'Tiếng Trung giao tiếp',
              href: '/tieng-trung-giao-tiep'
            },
            {
              childLabel: 'Tiếng Trung Ngữ pháp',
              href: '/tieng-trung-ngu-phap'
            },
            {
              childLabel: 'Tiếng Trung Du học & XKLĐ',
              href: '/tieng-trung-du-hoc-xkld'
            },
            {
              childLabel: 'Tiếng Trung Luyện thi',
              href: '/tieng-trung-luyen-thi'
            },
            {
              childLabel: 'Tiếng Trung theo yêu cầu',
              href: '/tieng-trung-theo-yeu-cau'
            }
          ]
        }
      ]
    },
    {
      label: 'Trắc nhiệm',
      href: '/'
    },
    {
      label: 'Tin tức',
      href: '/'
    },

    {
      label: 'Hỏi đáp',
      href: '/'
    }
  ]

  const items: MenuItemData[] = [
    {
      key: '1',
      label: (
        <Link to='/profiles'>
          <ButtonCustom type='text' size='small'>
            Trang cá nhân
          </ButtonCustom>
        </Link>
      )
    },

    {
      key: '2',
      label: (
        <Link to='/change-password'>
          <ButtonCustom type='text' size='small'>
            Đổi mật khẩu
          </ButtonCustom>
        </Link>
      )
    },
    {
      type: 'divider'
    },
    {
      key: '3',
      label: (
        <ButtonCustom
          type='text'
          size='small'
          onClick={() => {
            // removeStorage(USER_INFO)
            window.location.reload()
          }}
        >
          Đăng xuất
        </ButtonCustom>
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
            {menu.map((item) => (
              <div key={`${item.label}`} className='menuLabel'>
                <div className='labelItem'>
                  <Space style={{ width: '100%' }} size='small'>
                    {item?.href ? (
                      <Link to={item.href} className='title'>
                        {item.label}
                      </Link>
                    ) : (
                      <div className='title'>{item.label}</div>
                    )}
                    {item.children ? item.children.length > 0 && <DownOutlined /> : <></>}
                  </Space>
                  {item.children ? item.children.length > 0 && <div className='arr'></div> : null}
                </div>
                {item.children ? (
                  item.children.length > 0 && (
                    <div className='chilMenu uc-container'>
                      <div className='sub-menu'>
                        {item.children.map((chil) => (
                          <div className='chil' key={`${chil.label}`}>
                            <Space direction='vertical'>
                              <h3 className='chilTitle'>{chil.label}</h3>
                              {chil?.menuChild?.map((menuChil) => (
                                <Space className='sp100' direction='vertical' key={`${menuChil.childLabel}`}>
                                  <Link to={menuChil.href}>{menuChil.childLabel}</Link>
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
              <DropdownCustom
                menu={{
                  items
                }}
                placement='bottomRight'
              >
                <Space>
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
          user && (
            <Space>
              <h4 style={{ color: 'white' }}>{user?.fullName}</h4>
              <Avatar avtUrl={user.avatarUrl} userData={user}></Avatar>
            </Space>
          )
        }
        headerStyle={{ background: 'var(--bgColor2)' }}
      >
        <Space direction='vertical'>
          {menu.map((item) => (
            <Link to={`${item.href}`} key={`${item.label}`}>
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
            items.map((item) => item.label)
          )}
        </Space>
      </Drawer>
    </div>
  )
}
