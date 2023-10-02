import { useEffect, useState } from 'react'
import css from './RenderIten.module.scss'

import questionApi from '@/apis/question.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import openNotification from '@/components/Notification'
import TagCustom from '@/components/TagCustom/TagCustom'
import { QuestionState } from '@/interface/question'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, Col, Popconfirm, Row, Space } from 'antd'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineQuestionCircle } from 'react-icons/ai'
import { MdOutlineDisabledVisible } from 'react-icons/md'
import { RiCloseCircleFill } from 'react-icons/ri'
type Props = {
  data: QuestionState
  setQuestionUpdate: React.Dispatch<React.SetStateAction<QuestionState | null>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleSave: (id: string, item: QuestionState) => void
  selectData: QuestionState[]
}

const RenderItem = (props: Props) => {
  const { data, setQuestionUpdate, setOpen, handleSave, selectData } = props

  const [isSaved, setIsSaved] = useState(false)
  const [isHover, setIsHover] = useState(false)
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

  useEffect(() => {
    if (selectData?.findIndex((val) => val._id === data._id)) {
      setIsSaved(!isSaved)
    }
  }, [selectData])

  if (data)
    return (
      <div className={css.qItem}>
        <div
          className={`${data.status === 'INACTIVE' && css.disable} ${isSaved ? css.unSave : css.save}`}
          onClick={() => {
            setIsSaved(!isSaved)
            handleSave(data._id, data)
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Space direction='vertical' align='center' className={'p-center'}>
            {data.status === 'INACTIVE' && <MdOutlineDisabledVisible className={css.iconDisable} />}
            <h3>
              {data.status === 'INACTIVE' ? 'Câu hỏi đang được ẩn' : isSaved ? 'Xóa khỏi bộ đề' : 'Thêm vào bộ đề'}
            </h3>
          </Space>
          <div className={css.iconCheck}>
            {isHover && isSaved ? (
              <RiCloseCircleFill className={css.unCheck} />
            ) : (
              isSaved && <b className={css.check}>{selectData?.findIndex((val) => val._id === data._id) + 1}</b>
            )}
          </div>
        </div>

        <Card size='small' hoverable>
          <Space direction='vertical' className={'sp100'}>
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
              <Col className={css.buttAction}>
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
