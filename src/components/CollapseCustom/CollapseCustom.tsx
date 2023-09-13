import { Collapse } from 'antd'
import React from 'react'

interface ItemCollapse {
  key: string
  label: string | React.ReactNode
  children: React.ReactNode | any
  extra?: string | React.ReactNode
}
type Props = {
  items: ItemCollapse[]
  defaultActiveKey?: string | string[]
  onChange?: () => {}
  expandIconPosition?: 'start' | 'end'
  size?: 'large' | 'middle' | 'small'
  collapsible?: 'header' | 'icon' | 'disabled'
  ghost?: boolean
  iconCheck?: React.ReactNode
  iconUnCheck?: React.ReactNode
  iconSize?: string | number
  background?: string
  lableSize?: number
  styleLable?: React.CSSProperties
  sigleActive?: boolean
}

const CollapseCustom = (props: Props) => {
  const {
    items,
    defaultActiveKey,
    onChange,
    expandIconPosition,
    size,
    collapsible,
    ghost,
    iconCheck,
    iconUnCheck,
    iconSize,
    background,
    lableSize,
    styleLable,
    sigleActive = false
  } = props

  const renderNestedPanels = (children: ItemCollapse[]) => {
    if (!children) {
      return null
    }

    return (
      <Collapse ghost>
        {children.map((child) => (
          <Collapse.Panel key={child.key} header={child.label} extra={child.extra}>
            {child.children}
          </Collapse.Panel>
        ))}
      </Collapse>
    )
  }

  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      accordion={sigleActive}
      onChange={onChange}
      expandIconPosition={expandIconPosition}
      size={size}
      collapsible={collapsible}
      ghost={ghost}
      expandIcon={
        iconCheck || iconUnCheck
          ? ({ isActive }) =>
              isActive ? (
                <img src={`${iconCheck}`} alt='radio' style={{ width: iconSize }} />
              ) : (
                <img src={`${iconUnCheck}`} alt='radio' style={{ width: iconSize }} />
              )
          : undefined
      }
      style={{
        background: background
      }}
    >
      {items.map((item) => (
        <Collapse.Panel
          key={item.key}
          header={<div style={{ fontSize: lableSize, ...styleLable }}>{item.label}</div>}
          extra={item.extra}
        >
          {Array.isArray(item.children) ? renderNestedPanels(item.children) : item.children}
        </Collapse.Panel>
      ))}
    </Collapse>
  )
}

export default CollapseCustom
