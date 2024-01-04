/* eslint-disable @typescript-eslint/no-explicit-any */
import DrawerCustom from '@/components/DrawerCustom/DrawerCustom'
import { Space } from 'antd'
import { useEffect, useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'
import './styles.scss'
import useResponsives from '@/hooks/useResponsives'

interface TransformedItem {
  _id: string
  label: string
  children: TransformedItem[]
  href: string
}
type Props = {
  item: TransformedItem
  parentSlug?: string
}

const RenderSubMenu = ({ item, parentSlug }: Props) => {
  const [openSub, setOpenSub] = useState(false)
  const location = useLocation()
  useEffect(() => {
    setOpenSub(false)
  }, [location])
  const { sm } = useResponsives()
  const fullSlug = parentSlug ? `${parentSlug}${item.href}` : item.href
  if (item)
    return (
      <Space direction='vertical' className='sp100'>
        {item.children && item.children.length > 0 ? (
          <div className='nav-icon'>
            <div onClick={() => setOpenSub(true)}>
              {item.label}
              {item.children ? item.children.length > 0 && <AiOutlineRight size={14} /> : <></>}
            </div>
            <DrawerCustom
              open={openSub}
              onClose={setOpenSub}
              onFinish={() => setOpenSub(false)}
              placement='left'
              width={sm ? '80vw' : '30vw'}
            >
              <Space direction='vertical' size='large' className='sp100'>
                {item.children.map((childItem) => (
                  <RenderSubMenu key={childItem._id} item={childItem} parentSlug={fullSlug} />
                ))}
              </Space>
            </DrawerCustom>
          </div>
        ) : (
          <Link to={fullSlug ? `${fullSlug}` : ''}>{item.label}</Link>
        )}
      </Space>
    )
}

export default RenderSubMenu
