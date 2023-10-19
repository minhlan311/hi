/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Card, Col, Row } from 'antd'
import DraggableItem from './DraggableItem'
import css from './styles.module.scss'
type Props = {
  data?: Record<string, any> | any
  type: 'sort' | 'dnd' | 'grab'
  renderType: 'text' | 'card'
  columnLabelKey: string
  disabled?: boolean
  direction?: 'vertical'
}

const DroppableItem = (props: Props) => {
  const { data, type = 'dnd', renderType, columnLabelKey, direction } = props

  if (data.length > 0)
    return type === 'dnd' ? (
      <Row gutter={[12, 12]} style={{ width: '100%' }}>
        {data.map((child: any) => (
          <Col span={direction === 'vertical' ? 24 : undefined}>
            <DraggableItem key={child.id} id={child.id}>
              {renderType === 'card' && child?.[columnLabelKey] ? (
                <Card className={css.graggable}>{columnLabelKey ? child?.[columnLabelKey] : child}</Card>
              ) : (
                <p className={css.graggable}>{columnLabelKey ? child?.[columnLabelKey] : child}</p>
              )}
            </DraggableItem>
          </Col>
        ))}
      </Row>
    ) : (
      <SortableContext items={data} strategy={verticalListSortingStrategy}>
        <Row gutter={[12, 12]}>
          {data.map((child: any) => (
            <Col span={direction === 'vertical' ? 24 : undefined} key={child.id}>
              <DraggableItem id={child.id}>
                {renderType === 'card' && child?.[columnLabelKey] ? (
                  <Card className={css.graggable}>{columnLabelKey ? child?.[columnLabelKey] : child}</Card>
                ) : (
                  <p className={css.graggable}>{columnLabelKey ? child?.[columnLabelKey] : child}</p>
                )}
              </DraggableItem>
            </Col>
          ))}
        </Row>
      </SortableContext>
    )
  else if (data.id && type === 'grab')
    return (
      <DraggableItem key={data.id} id={data.id}>
        {renderType === 'card' ? (
          <Card className={css.grabbing}>{columnLabelKey ? data?.[columnLabelKey] : data}</Card>
        ) : (
          <p className={css.grabbing}>{columnLabelKey ? data?.[columnLabelKey] : data}</p>
        )}
      </DraggableItem>
    )
}

export default DroppableItem
