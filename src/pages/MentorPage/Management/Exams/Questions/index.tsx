import examApi from '@/apis/exam.api'
import questionApi from '@/apis/question.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import FilterAction from '@/components/FilterAction'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import TagCustom from '@/components/TagCustom/TagCustom'
import { QuestionState } from '@/interface/question'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Card, Col, Popconfirm, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus, AiOutlineQuestionCircle } from 'react-icons/ai'
import { HiOutlineUpload } from 'react-icons/hi'
import { MdOutlineDisabledVisible } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import DrawerQuestion from '../Drawer/DrawerQuestion'
import css from './styles.module.scss'

const MentorQuestions = () => {
  const location = useLocation()
  const examSlug = location.pathname.split('/')[3]
  const { data: exam } = useQuery({
    queryKey: ['examDetail'],
    queryFn: () => {
      return examApi.getExamDetail(examSlug)
    },
  })

  const examDetail = exam?.data
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [resetFilter, setResetFilter] = useState<boolean>(false)

  const resetData = () => {
    setResetFilter(true)
    setTimeout(() => {
      setResetFilter(false)
    }, 200)
  }

  const { status, mutate, error } = useMutation({ mutationFn: (id: string) => questionApi.deleteQuestion(id) })
  useEffect(() => {
    if (status === 'success') {
      openNotification({ status: status, message: 'Xóa câu hỏi thành công' })
      resetData()
    }

    if (status === 'error' && error) {
      openNotification({
        status: status,
        message: 'Thông báo',
        description: ' Có lỗi xảy ra',
      })
    }
  }, [status, error])
  const [questions, setQuestions] = useState<{ docs: QuestionState[] }>()
  const [selectQuestions, setSelectQuestions] = useState<QuestionState | null>(null)

  return !loading && examDetail ? (
    <Space direction='vertical' className={`${css.quesList} sp100`}>
      {/* <DragAndDrop /> */}

      <FilterAction
        type='question'
        apiFind={questionApi.findQuestion}
        callBackData={setQuestions}
        addOnButton={
          <Space>
            <ButtonCustom
              type='primary'
              onClick={() => setOpen(true)}
              icon={<AiOutlinePlus />}
              tooltip='Thêm câu hỏi'
            ></ButtonCustom>

            <ButtonCustom icon={<HiOutlineUpload />} tooltip='Thêm file câu hỏi'></ButtonCustom>
          </Space>
        }
        filterQuery={{ testId: examDetail?._id }}
        resetFilter={resetFilter}
      />

      {!questions?.docs?.length ? (
        <EmptyCustom description='Không có câu hỏi nào'></EmptyCustom>
      ) : (
        questions?.docs?.map((item, id) => (
          <div className={css.qItem}>
            {item.status === 'INACTIVE' && (
              <div className={css.disable}>
                <Space direction='vertical' align='center' className={'p-center'}>
                  <MdOutlineDisabledVisible className={css.iconDisable} />
                  <div>Câu hỏi đang được ẩn</div>
                </Space>
              </div>
            )}
            <Card size='small' key={item._id}>
              <Space direction='vertical' className={'sp100'}>
                <Row justify='space-between'>
                  <Col span={24} md={19}>
                    <Space>
                      <h3>Câu {id + 1}: </h3>
                      <TagCustom content={item.type} />
                      <TagCustom color='gold' content={`${item.point} Điểm`} />
                      <TagCustom
                        intArrType={['EASY', 'MEDIUM', 'DIFFICULT']}
                        intColor={['green', 'blue', 'red']}
                        intAlternativeType={['Dễ', 'Vừa phải', 'Khó']}
                        content={item.difficulty}
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
                          setSelectQuestions(item)
                          setOpen(true)
                        }}
                      ></ButtonCustom>
                      <Popconfirm
                        placement='right'
                        title='Bạn có muốn xóa câu hỏi này?'
                        onConfirm={() => mutate(item._id)}
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

                <h4>{item.question}</h4>
                <Card size='small' className={css.anws}>
                  <Space className={'sp100'}>
                    {item.choices.map((anw) => {
                      if (anw.isCorrect) return <p className={css.isAnswer}>{anw.answer}</p>
                    })}
                    {item.choices.map((anw) => {
                      if (!anw.isCorrect) return <p>{anw.answer}</p>
                    })}
                    {item.answer && item.answer}
                  </Space>
                </Card>
                {item.hint && (
                  <Space className={`${css.hint} sp100`} align='center'>
                    <AiOutlineQuestionCircle />
                    <p>{item.hint}</p>
                  </Space>
                )}
              </Space>
            </Card>
          </div>
        ))
      )}
      <DrawerQuestion
        open={open}
        questionData={selectQuestions ? selectQuestions : null}
        testId={examDetail ? examDetail._id : ''}
        categoryId={examDetail ? examDetail.categoryId : ''}
        setOpen={setOpen}
        setQuestionData={setSelectQuestions}
        resetData={resetData}
        setLoading={setLoading}
      />
    </Space>
  ) : (
    <LoadingCustom style={{ marginTop: 200 }} tip='Vui lòng chờ...' />
  )
}

export default MentorQuestions
