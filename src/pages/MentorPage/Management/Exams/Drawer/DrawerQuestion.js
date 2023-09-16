import React, { memo, useEffect, useState } from 'react'
import { Button, Drawer, Form, InputNumber, message, Select, Space } from 'antd'
import CreateQuestionForm from './Components/CreateQuestionForm'

import {
  createQuestionRequest,
  createQuestionDataSelector,
  updateQuestionRequest,
  updateQuestionDataSelector
} from '../../../../../slices/question'
import { useDispatch, useSelector } from 'react-redux'

const DrawerQuestion = (props) => {
  const { open, setOpenDrawer, type, testId, refreshPage, data } = props
  const [form] = Form.useForm()
  const [questionType, setQuestionType] = useState('SINGLE CHOICE')
  const [point, setPoint] = useState(10)
  const createResponse = useSelector(createQuestionDataSelector)
  const updateResponse = useSelector(updateQuestionDataSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      setPoint(data.point)
      setQuestionType(data.type)
    } else {
      setPoint(10)
      setQuestionType('SINGLE CHOICE')
    }
  }, [data])

  const handleRadioChange = (index) => {
    const currentValues = form.getFieldValue('choices')
    const choices = currentValues.map((choice, choiceIndex) => {
      if (choiceIndex === index) {
        return { ...choice, isCorrect: true }
      } else {
        return { ...choice, isCorrect: false }
      }
    })

    form.setFieldsValue({ choices })
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    const payload = {
      ...values,
      testId: testId,
      type: questionType,
      point: point
    }
    if (type === 'update') {
      dispatch(updateQuestionRequest({ id: data?._id, requestData: payload }))
    } else {
      dispatch(createQuestionRequest(payload))
    }
  }

  useEffect(() => {
    if (createResponse.status === 'success') {
      message.success('Thêm câu hỏi thành công')
      refreshPage()
      setOpenDrawer(false)
    }
    if (updateResponse.status === 'success') {
      message.success('Cập nhật câu hỏi thành công')
      refreshPage()
      setOpenDrawer(false)
    }
  }, [createResponse, updateResponse])

  const onClose = () => {
    form.resetFields()
    setOpenDrawer(false)
    refreshPage()
  }

  return (
    <>
      <Drawer
        title={type === 'update' ? 'Cập nhật câu hỏi' : 'Tạo câu hỏi'}
        width={'90%'}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80
        }}
        extra={
          <Space>
            Loại câu hỏi:{' '}
            <Select
              onChange={(e) => setQuestionType(e)}
              value={questionType}
              options={[
                {
                  value: 'SINGLE CHOICE',
                  label: 'Câu hỏi một đáp án'
                },
                {
                  value: 'MULTIPLE CHOICE',
                  label: 'Câu hỏi nhiều đáp án'
                }
              ]}
            />
            Điểm: <InputNumber min={1} max={100} value={point} onChange={(e) => setPoint(e)} />
            <Button
              style={{
                margin: '0 8px'
              }}
              type='primary'
              onClick={handleSubmit}
            >
              Xác nhận
            </Button>
            <Button onClick={onClose} danger>
              Hủy
            </Button>
          </Space>
        }
      >
        <CreateQuestionForm questionType={questionType} data={data} form={form} handleRadioChange={handleRadioChange} />
      </Drawer>
    </>
  )
}

export default memo(DrawerQuestion)
