import { DownOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Divider, Drawer, Dropdown, Row, Select, Space } from 'antd'
import { IoMenuSharp } from 'react-icons/io5'

import { Link } from 'react-router-dom'

import Header from '../../Header/Header'
import './styles.scss'
import useResponsives from '../../../../hooks/useResponsives'
export default function MenuPc({ open, setOpen }) {
  const user = false
  const { sm, md } = useResponsives()
  const menu = [
    {
      label: 'Giới thiệu',
      href: '/'
    },
    {
      label: 'Giáo viên',
      href: '/'
    },
    {
      label: 'Khóa học'
      // children: [
      //     {
      //         label: 'DU HỌC ANH',
      //         menuChild: [
      //             {
      //                 childLabel: 'Chương trình phổ thông',
      //                 href: 'chuong-trinh-pho-thong',
      //             },
      //             {
      //                 childLabel: 'Chương trình cao đẳng',
      //                 href: 'chuong-trinh-cao-dang',
      //             },
      //             {
      //                 childLabel: 'Chương trình đại học & sau đi',
      //                 href: 'chuong-trinh-dai-hoc-sau-di',
      //             },
      //             {
      //                 childLabel: 'Kinh nghiệm du học',
      //                 href: 'kinh-nghiem-du-hoc',
      //             },
      //         ],
      //     },
      //     {
      //         label: 'DU HỌC ĐỨC',
      //         menuChild: [
      //             {
      //                 childLabel: 'Chương trình phổ thông',
      //                 href: 'chuong-trinh-pho-thong',
      //             },
      //             {
      //                 childLabel: 'Chương trình cao đẳng',
      //                 href: 'chuong-trinh-cao-dang',
      //             },
      //             {
      //                 childLabel: 'Chương trình đại học & sau đại học',
      //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
      //             },
      //             {
      //                 childLabel: 'Kinh nghiệm du học',
      //                 href: 'kinh-nghiem-du-hoc',
      //             },
      //         ],
      //     },
      //     {
      //         label: 'DU HỌC NEW ZEALAND',
      //         menuChild: [
      //             {
      //                 childLabel: 'Chương trình phổ thông',
      //                 href: 'chuong-trinh-pho-thong',
      //             },
      //             {
      //                 childLabel: 'Chương trình cao đẳng',
      //                 href: 'chuong-trinh-cao-dang',
      //             },
      //             {
      //                 childLabel: 'Chương trình đại học & sau đại học',
      //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
      //             },
      //             {
      //                 childLabel: 'Kinh nghiệm du học',
      //                 href: 'kinh-nghiem-du-hoc',
      //             },
      //         ],
      //     },
      //     {
      //         label: 'DU HỌC HAN QUỐC',
      //         menuChild: [
      //             {
      //                 childLabel: 'Chương trình phổ thông',
      //                 href: 'chuong-trinh-pho-thong',
      //             },
      //             {
      //                 childLabel: 'Chương trình cao đẳng',
      //                 href: 'chuong-trinh-cao-dang',
      //             },
      //             {
      //                 childLabel: 'Chương trình đại học & sau đại học',
      //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
      //             },
      //             {
      //                 childLabel: 'Kinh nghiệm du học',
      //                 href: 'kinh-nghiem-du-hoc',
      //             },
      //         ],
      //     },
      //     {
      //         label: 'DU HỌC ÚC',
      //         menuChild: [
      //             {
      //                 childLabel: 'Chương trình phổ thông',
      //                 href: 'chuong-trinh-pho-thong',
      //             },
      //             {
      //                 childLabel: 'Chương trình cao đẳng',
      //                 href: 'chuong-trinh-cao-dang',
      //             },
      //             {
      //                 childLabel: 'Chương trình đại học & sau đại học',
      //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
      //             },
      //             {
      //                 childLabel: 'Kinh nghiệm du học',
      //                 href: 'kinh-nghiem-du-hoc',
      //             },
      //         ],
      //     },
      //     {
      //         label: 'DU HỌC NHẬT BẢN',
      //         menuChild: [
      //             {
      //                 childLabel: 'Chương trình phổ thông',
      //                 href: 'chuong-trinh-pho-thong',
      //             },
      //             {
      //                 childLabel: 'Chương trình cao đẳng',
      //                 href: 'chuong-trinh-cao-dang',
      //             },
      //             {
      //                 childLabel: 'Chương trình đại học & sau đại học',
      //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
      //             },
      //             {
      //                 childLabel: 'Kinh nghiệm du học',
      //                 href: 'kinh-nghiem-du-hoc',
      //             },
      //         ],
      //     },
      //     {
      //         label: 'DU HỌC SINGAPORE',
      //         menuChild: [
      //             {
      //                 childLabel: 'Chương trình phổ thông',
      //                 href: 'chuong-trinh-pho-thong',
      //             },
      //             {
      //                 childLabel: 'Chương trình cao đẳng',
      //                 href: 'chuong-trinh-cao-dang',
      //             },
      //             {
      //                 childLabel: 'Chương trình đại học & sau đại học',
      //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
      //             },
      //             {
      //                 childLabel: 'Kinh nghiệm du học',
      //                 href: 'kinh-nghiem-du-hoc',
      //             },
      //         ],
      //     },
      //     {
      //         label: 'DU HỌC TRUNG QUỐC',
      //         menuChild: [
      //             {
      //                 childLabel: 'Chương trình phổ thông',
      //                 href: 'chuong-trinh-pho-thong',
      //             },
      //             {
      //                 childLabel: 'Chương trình cao đẳng',
      //                 href: 'chuong-trinh-cao-dang',
      //             },
      //             {
      //                 childLabel: 'Chương trình đại học & sau đại học',
      //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
      //             },
      //             {
      //                 childLabel: 'Kinh nghiệm du học',
      //                 href: 'kinh-nghiem-du-hoc',
      //             },
      //         ],
      //     },
      //     {
      //         label: 'DU HỌC CANADA',
      //         menuChild: [
      //             {
      //                 childLabel: 'Chương trình phổ thông',
      //                 href: 'chuong-trinh-pho-thong',
      //             },
      //             {
      //                 childLabel: 'Chương trình cao đẳng',
      //                 href: 'chuong-trinh-cao-dang',
      //             },
      //             {
      //                 childLabel: 'Chương trình đại học & sau đại học',
      //                 href: 'chuong-trinh-dai-hoc-sau-dai-hoc',
      //             },
      //             {
      //                 childLabel: 'Kinh nghiệm du học',
      //                 href: 'kinh-nghiem-du-hoc',
      //             },
      //         ],
      //     },
      // ],
    },

    {
      label: 'Luyện thi',
      href: '/'
    },
    {
      label: 'Lịch khai giảng',
      href: '/'
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
      label: 'Tuyển dụng',
      href: '/'
    },
    {
      label: 'Hỏi đáp',
      href: '/'
    },
    {
      label: 'Thi đấu',
      href: '/'
    }
  ]

  const items = [
    {
      key: '1',
      label: (
        <Link to='/profiles'>
          <Button type='text' size='small'>
            Trang cá nhân
          </Button>
        </Link>
      )
    },

    {
      key: '2',
      label: (
        <Link to='/change-password'>
          <Button type='text' size='small'>
            Đổi mật khẩu
          </Button>
        </Link>
      )
    },
    {
      type: 'divider'
    },
    {
      key: '3',
      label: (
        <Button
          type='text'
          size='small'
          onClick={() => {
            // removeStorage(USER_INFO)
            window.location.reload()
          }}
        >
          Đăng xuất
        </Button>
      )
    }
  ]

  return (
    <div className='menu'>
      <Header type='fullsize'>
        {/* mobile */}
        <Row justify='space-between' align='middle' style={{ padding: '10px 12px' }}>
          <Col span={16} className='menuItem'>
            {/* <LogoLight /> */}
          </Col>
          <Col>
            <Button type='text' size='small' style={{ height: 40 }} onClick={() => setOpen(!open)}>
              <IoMenuSharp size={35} color='white' />
            </Button>
          </Col>
        </Row>
        pc
        <Row justify='space-between' align='middle' className='uc-container menuItem'>
          {menu.map((item) => (
            <div key={item.label} className='menuLabel'>
              <div className='labelItem'>
                <Space style={{ width: '100%' }} size='small'>
                  {item?.href ? (
                    <Link to={item.href} className='title'>
                      {item.label}
                    </Link>
                  ) : (
                    <div className='title'>{item.label}</div>
                  )}
                  {item?.children?.length > 0 && <DownOutlined />}
                </Space>
                {item?.children?.length > 0 && <div className='arr'></div>}
              </div>
              {item?.children?.length > 0 && (
                <div className='chilMenu'>
                  <Row justify='space-between' gutter={24}>
                    {item.children.map((chil) => (
                      <Col span={6} className='chil' key={chil.label}>
                        <h3>{chil.label}</h3>
                        {chil?.menuChild?.map((menuChil) => (
                          <Space
                            style={{
                              width: '100%'
                            }}
                            direction='vertical'
                            key={menuChil.childLabel}
                          >
                            <Link to={menuChil.href}>{menuChil.childLabel}</Link>
                          </Space>
                        ))}
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </div>
          ))}

          {!user ? (
            <div className='butt-auth'>
              <Link to='/login'>
                <Button type='text' className='butt-item'>
                  Đăng nhâp
                </Button>
              </Link>
              /
              <Link to='/register'>
                <Button type='text' className='butt-item'>
                  Đăng ký
                </Button>
              </Link>
            </div>
          ) : (
            <Dropdown
              menu={{
                items
              }}
              placement='bottomRight'
            >
              <Space>
                <h4 style={{ color: 'white' }}>{user?.fullName}</h4>
                <Avatar src={user.avatarUrl ? user.avatarUrl : undefined}>{user.fullName.charAt(0)}</Avatar>
              </Space>
            </Dropdown>
          )}
        </Row>
      </Header>
      <Drawer
        placement={md ? 'right' : 'top'}
        closable={!md}
        onClose={() => setOpen(!open)}
        open={open}
        style={{
          textAlign: 'center'
        }}
        className='nav-drawer'
        size={sm ? 'large' : 'default'}
        extra={
          user && (
            <Space>
              <h4 style={{ color: 'white' }}>{user?.fullName}</h4>
              <Avatar src={user.avatarUrl ? user.avatarUrl : undefined}>{user.fullName.charAt(0)}</Avatar>
            </Space>
          )
        }
        headerStyle={{ background: 'var(--bgColor2)' }}
      >
        <Space direction='vertical'>
          {menu.map((item) => (
            <Link to={item.href} key={item.label}>
              <Button type='text' size='small' style={{ width: '100%' }}>
                {item.label}
              </Button>
            </Link>
          ))}
        </Space>
        <Divider />
        <Space direction='vertical'>
          <Select
            defaultValue='VIE'
            options={[
              {
                value: 'ENG',
                label: (
                  <div className='d-space-c'>
                    {/* <EngSVG /> */}
                    <p className='ml-5'>ENG</p>
                  </div>
                )
              },
              {
                value: 'VIE',
                label: (
                  <div className='d-space-c'>
                    {/* <VieSVG /> */}
                    <p className='ml-10'>VIE</p>
                  </div>
                )
              },
              {
                value: 'CHN',
                label: (
                  <div className='d-space-c'>
                    {/* <ChinaSVG /> */}
                    <p className='ml-5'>CHN</p>
                  </div>
                )
              },
              {
                value: 'JPN',
                label: (
                  <div className='d-space-c'>
                    {/* <JapanSVG /> */}
                    <p className='ml-5'>JPN</p>
                  </div>
                )
              },
              {
                value: 'KOR',
                label: (
                  <div className='d-space-c'>
                    {/* <KoreaSVG /> */}
                    <p className='ml-5'>KOR</p>
                  </div>
                )
              },
              {
                value: 'GER',
                label: (
                  <div className='d-space-c'>
                    {/* <GermanySVG /> */}
                    <p className='ml-5'>GER</p>
                  </div>
                )
              }
            ]}
            suffixIcon={false}
          />
          {!user ? (
            <Space>
              <Link to='/login'>
                <Button type='text'>Đăng nhâp</Button>
              </Link>
              /
              <Link to='/register'>
                <Button type='text'>Đăng ký</Button>
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
