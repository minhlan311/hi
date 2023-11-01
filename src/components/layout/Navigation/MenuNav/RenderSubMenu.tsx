/* eslint-disable @typescript-eslint/no-explicit-any */
import DrawerCustom from '@/components/DrawerCustom/DrawerCustom'
import { Space } from 'antd'
import { useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'

type Props = {
  item: any
}

const RenderSubMenu = ({ item }: Props) => {
  const [openSub, setOpenSub] = useState(false)
  const [openChild, setOpenChild] = useState(false)

  if (item)
    return (
      <>
        <div onClick={() => setOpenSub(true)}>
          {item?.href ? item.label : <div className='title'>{item.label}</div>}
          {item.children ? item.children.length > 0 && <AiOutlineRight /> : <></>}
        </div>

        <DrawerCustom open={openSub} onClose={() => setOpenSub(false)} placement='left' width='80vw'>
          <Space direction='vertical' size='large'>
            {item.children?.map((two: any) => (
              <>
                <div onClick={() => setOpenChild(true)}>
                  {two?.href ? two.label : <div className='title'>{two.label}</div>}
                  {two.children ? two.children.length > 0 && <AiOutlineRight /> : <></>}
                </div>
                <DrawerCustom open={openChild} onClose={() => setOpenChild(false)} placement='left' width='80vw'>
                  <Space direction='vertical' size='large'>
                    {two.children?.map((three: any) => (
                      <div>
                        {three?.href ? three.label : <div className='title'>{three.label}</div>}
                        {three.children ? three.children.length > 0 && <AiOutlineRight /> : <></>}
                      </div>
                    ))}
                  </Space>
                </DrawerCustom>
              </>
            ))}
          </Space>
        </DrawerCustom>
      </>
    )
}

export default RenderSubMenu
