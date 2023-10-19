/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col } from 'antd'
import DroppableItem from './DroppableItem'
import css from './styles.module.scss'

type Props = {
  id: string | number
  columnData: any[]
  dataLength: number
  tasks: any[]
  labelKey?: any
  dndType: 'sort' | 'dnd' | 'sort-dnd' | 'matching'
  renderType?: 'text' | 'card'
  columnLabelKey?: any
  direction?: 'vertical'
}

const ColumnDnd = (props: Props) => {
  const { id, columnData, dataLength, dndType, tasks, renderType = 'card', columnLabelKey, labelKey, direction } = props

  return (
    <Col span={24} md={24 / dataLength} key={id}>
      <div className={css.droppabel}>
        {dndType === 'sort-dnd' ? (
          <DroppableItem
            direction={direction}
            data={tasks.filter((task) => task.columnId === id)}
            type='sort'
            renderType={`${renderType}`}
            columnLabelKey={`${columnLabelKey}`}
          />
        ) : (
          <DroppableItem
            direction={direction}
            data={tasks.filter((task) => task.columnId === id)}
            type='dnd'
            renderType={`${renderType}`}
            columnLabelKey={`${columnLabelKey}`}
          />
        )}

        {labelKey ? columnData?.[labelKey] : columnData}
      </div>
    </Col>
  )
}

export default ColumnDnd
