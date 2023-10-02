import { useEffect, useState } from 'react'
import css from '../Questions/styles.module.scss'

import { Card, Col, Popconfirm, Row, Space } from 'antd'
import { MdOutlineDisabledVisible } from 'react-icons/md'
import TagCustom from '@/components/TagCustom/TagCustom'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineQuestionCircle } from 'react-icons/ai'
import { QuestionState } from '@/interface/question'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import questionApi from '@/apis/question.api'
import openNotification from '@/components/Notification'
type Props = {
  data: QuestionState
  setQuestionUpdate: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleSave: () => void
}

const RenderItem = (props: Props) => {
  const { data, setQuestionUpdate, setOpen, handleSave } = props
  const [isSaved, setIsSaved] = useState(false)
  const queryClient = useQueryClient()

  const { status, mutate, error } = useMutation({
    mutationFn: (id: string) => questionApi.deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionFilter'] })
    },
  })

  useEffect(() => {
    if (status === 'success') {
      openNotification({ status: status, message: 'Xóa câu hỏi thành công' })
    }

    if (status === 'error' && error) {
      openNotification({
        status: status,
        message: 'Thông báo',
        description: ' Có lỗi xảy ra',
      })
    }
  }, [status, error])

  return (
    <div className={css.qItem}>
      {isSaved ? 'Hủy lưu trữ' : 'Thêm lưu trữ'}
      {data.status === 'INACTIVE' && (
        <div className={css.disable}>
          <Space direction='vertical' align='center' className={'p-center'}>
            <MdOutlineDisabledVisible className={css.iconDisable} />
            <div>Câu hỏi đang được ẩn</div>
          </Space>
        </div>
      )}
      <Card
        size='small'
        className={'sp100'}
        hoverable
        onClick={() => {
          setIsSaved(!isSaved)
          handleSave(data._id, data)
        }}
      >
        <Space direction='vertical' className={'sp100'} style={{ minWidth: '74vw' }}>
          <Row justify='space-between'>
            <Col span={24} md={19}>
              <Space>
                {/* <h3>Câu {id + 1}: </h3> */}
                <TagCustom content={data.type} />
                <TagCustom color='gold' content={`${data.point} Điểm`} />
                <TagCustom
                  intArrType={['EASY', 'MEDIUM', 'DIFFICULT']}
                  intColor={['green', 'blue', 'red']}
                  intAlternativeType={['Dễ', 'Vừa phải', 'Khó']}
                  content={data.difficulty}
                />
              </Space>
            </Col>
            <Col>
              <Space size='small'>
                <ButtonCustom
                  shape='circle'
                  type='text'
                  icon={<AiOutlineEdit />}
                  size='small'
                  onClick={() => {
                    setQuestionUpdate(data)
                    setOpen(true)
                  }}
                ></ButtonCustom>
                <Popconfirm
                  placement='right'
                  title='Bạn có muốn xóa câu hỏi này?'
                  onConfirm={() => mutate(data._id)}
                  okText='Xóa'
                  cancelText='Hủy'
                >
                  <ButtonCustom
                    shape='circle'
                    type='text'
                    icon={<AiOutlineDelete style={{ color: 'var(--red)' }} />}
                    size='small'
                  ></ButtonCustom>
                </Popconfirm>
              </Space>
            </Col>
          </Row>

          <h4>{data.question}</h4>
          <Card size='small' className={css.anws}>
            <Space className={'sp100'}>
              {data.choices.map((anw) => {
                if (anw.isCorrect) return <p className={css.isAnswer}>{anw.answer}</p>
              })}
              {data.choices.map((anw) => {
                if (!anw.isCorrect) return <p>{anw.answer}</p>
              })}
              {data.answer && data.answer}
            </Space>
          </Card>
          {data.hint && (
            <Space className={`${css.hint} sp100`} align='center'>
              <AiOutlineQuestionCircle />
              <p>{data.hint}</p>
            </Space>
          )}
        </Space>
      </Card>
    </div>
  )
}

export default RenderItem
