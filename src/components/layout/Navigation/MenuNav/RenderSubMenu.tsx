/* eslint-disable @typescript-eslint/no-explicit-any */
import DrawerCustom from '@/components/DrawerCustom/DrawerCustom'
import { Space } from 'antd'
import { useEffect, useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'

type Props = {
  item: any
}

const RenderSubMenu = ({ item }: Props) => {
  const [openSub, setOpenSub] = useState(false)
  const [openChild, setOpenChild] = useState(false)
  const location = useLocation()
  useEffect(() => {
    setOpenSub(false)
    setOpenChild(false)
  }, [location])
  if (item)
    return (
      <>
        <div onClick={() => setOpenSub(true)}>
          {item.label}
          {item.children ? item.children.length > 0 && <AiOutlineRight size={14} /> : <></>}
        </div>

        <DrawerCustom open={openSub} onClose={() => setOpenSub(false)} placement='left' width='80vw'>
          <Space direction='vertical' size='large'>
            {item.children?.map((chil: any) => (
              <div key={chil._id}>
                <div onClick={() => setOpenChild(true)}>
                  {chil.label}
                  {chil.children ? chil.children.length > 0 && <AiOutlineRight size={14} /> : <></>}
                </div>
                <DrawerCustom open={openChild} onClose={() => setOpenChild(false)} placement='left' width='80vw'>
                  <Space direction='vertical' size='large'>
                    {chil.children?.map((menuChil: any) => (
                      <Link to={`${item.href + chil.href + menuChil.href}`} key={menuChil._id}>
                        {menuChil.label}
                        {menuChil.children ? menuChil.children.length > 0 && <AiOutlineRight size={14} /> : <></>}
                      </Link>
                    ))}
                  </Space>
                </DrawerCustom>
              </div>
            ))}
          </Space>
        </DrawerCustom>
      </>
    )
}

export default RenderSubMenu
