/* eslint-disable @typescript-eslint/no-explicit-any */
import { stateAction } from '@/common'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import useResponsives from '@/hooks/useResponsives'
import { Choice } from '@/interface/tests'

import { Card, Col, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import { AiOutlineArrowDown, AiOutlineArrowRight, AiOutlinePlus } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'

type Props = {
  callBackCorrects: React.Dispatch<React.SetStateAction<any>>
  callBackChoices: React.Dispatch<React.SetStateAction<any>>
  data: Choice[]
  selectionType:
    | 'SINGLE CHOICE'
    | 'MULTIPLE CHOICE'
    | 'TRUE FALSE'
    | 'SORT'
    | 'DRAG DROP'
    | 'LIKERT SCALE'
    | 'FILL BLANK'
    | 'MATCHING'
    | 'NUMERICAL'
    | 'WRITING'
}

const RenderAddonLinkertScale = (props: Props) => {
  const { callBackCorrects, callBackChoices, data, selectionType } = props
  const id = crypto.randomUUID()
  const initData = {
    answer: '',
    isCorrect: false,
    isChosen: false,
  }
  const [addRow, setAddRow] = useState<Choice[]>([{ ...initData, id }])
  const [addCol, setAddCol] = useState<Choice[]>([{ ...initData, id }])

  const handleAdd = (type: 'row' | 'col') => {
    if (type === 'row') {
      setAddRow([...addRow, { ...initData, id }])
    } else {
      setAddCol([...addCol, { ...initData, id }])
    }
  }

  const handleInputChange = (type: 'row' | 'col', id: string, value: string) => {
    const updatedData = (type === 'row' ? addRow : addCol).map((item) => {
      if (item.id === id) {
        return {
          ...item,
          answer: value,
          isCorrect: selectionType === 'MATCHING' ? true : false,
        }
      }

      return item
    })

    if (type === 'row') {
      setAddRow(updatedData)
    } else {
      setAddCol(updatedData)
    }
  }

  useEffect(() => {
    callBackChoices([{ rows: addRow, cols: addCol, id }])

    const anws = []

    const maxIdLength = Math.max(addRow.length, addCol.length)

    for (let i = 0; i < maxIdLength; i++) {
      if (i < addCol.length) {
        anws.push(addCol[i].id)
      }

      if (i < addRow.length) {
        anws.push(addRow[i].id)
      }
    }

    callBackCorrects(anws)
  }, [addRow, addCol])

  useEffect(() => {
    if (data?.length > 0) {
      data.forEach((item) => {
        setAddRow(item.rows as unknown as Choice[])
        setAddCol(item.cols as unknown as Choice[])
      })
    }
  }, [data])

  const { md } = useResponsives()

  return selectionType === 'MATCHING' ? (
    <Space direction='vertical' className='sp100'>
      {addRow.map((item, id) => (
        <Space className='sp100' direction='vertical' key={item.id}>
          <Card
            size='small'
            title={id + 1}
            extra={
              addRow.length > 1 && (
                <ButtonCustom
                  icon={<IoClose />}
                  type='text'
                  onClick={() => {
                    stateAction(setAddRow, String(item.id), null, 'remove', undefined, 'id')
                    stateAction(setAddCol, String(addCol[id].id), null, 'remove', undefined, 'id')
                  }}
                ></ButtonCustom>
              )
            }
          >
            <Row align='middle' gutter={[12, 12]} justify='space-between'>
              <Col span={24} lg={11}>
                <TextAreaCustom
                  name='answer'
                  data={item}
                  onChange={(e: any) => handleInputChange('row', String(item.id), e)}
                ></TextAreaCustom>
              </Col>

              <Col span={24} lg={1} style={{ textAlign: 'center' }}>
                {md ? <AiOutlineArrowDown size={22} /> : <AiOutlineArrowRight size={22} />}
              </Col>

              <Col span={24} lg={11}>
                <TextAreaCustom
                  name='answer'
                  data={addCol[id]}
                  onChange={(e: any) => handleInputChange('col', String(addCol[id].id), e)}
                ></TextAreaCustom>
              </Col>
            </Row>
          </Card>
        </Space>
      ))}
      <ButtonCustom
        size='small'
        onClick={() => {
          handleAdd('row')
          handleAdd('col')
        }}
        className='sp100'
        icon={<AiOutlinePlus />}
      >
        Thêm giá trị
      </ButtonCustom>
    </Space>
  ) : (
    <Space className='sp100' direction='vertical'>
      <Card size='small' title='Hàng'>
        <Space direction='vertical' className='sp100'>
          {addRow.map((item, id) => (
            <Space key={item.id} className='sp100'>
              <b>{id + 1}</b>

              <TextAreaCustom
                name='answer'
                data={item}
                onChange={(e: any) => handleInputChange('row', String(item.id), e)}
              ></TextAreaCustom>
              {addRow.length > 1 && (
                <ButtonCustom
                  icon={<IoClose />}
                  type='text'
                  onClick={() => stateAction(setAddRow, String(item.id), null, 'remove', undefined, 'id')}
                ></ButtonCustom>
              )}
            </Space>
          ))}

          <ButtonCustom size='small' onClick={() => handleAdd('row')} icon={<AiOutlinePlus />}>
            Thêm hàng
          </ButtonCustom>
        </Space>
      </Card>

      <Card size='small' title='Cột'>
        <Space direction='vertical' className='sp100'>
          {addCol.map((item, id) => (
            <Space key={item._id} className='sp100'>
              <b>{id + 1}</b>
              <TextAreaCustom
                name='answer'
                data={item}
                onChange={(e: any) => handleInputChange('col', String(item.id), e)}
              ></TextAreaCustom>
              {addCol.length > 1 && (
                <ButtonCustom
                  icon={<IoClose />}
                  type='text'
                  onClick={() => stateAction(setAddCol, String(item.id), null, 'remove', undefined, 'id')}
                ></ButtonCustom>
              )}
            </Space>
          ))}
          <ButtonCustom size='small' onClick={() => handleAdd('col')} icon={<AiOutlinePlus />}>
            Thêm cột
          </ButtonCustom>
        </Space>
      </Card>
    </Space>
  )
}

export default RenderAddonLinkertScale
