import examApi from '@/apis/exam.api'
import questionApi from '@/apis/question.api'
import { stateAction } from '@/common'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import PaginationCustom from '@/components/PaginationCustom'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import { AppContext } from '@/contexts/app.context'
import { ExamState } from '@/interface/exam'
import { QuestionState } from '@/interface/question'
import { SuccessResponse } from '@/types/utils.type'
import { setQuestionsListFromLS } from '@/utils/questons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Checkbox, Popconfirm, Space } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'
import { HiOutlineUpload } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import RenderQuestion from '../Components/RenderQuestion'
import DrawerQuestion from '../Drawer/DrawerQuestion'
import DrawerUpload from '../Drawer/DrawerUpload'
import css from './styles.module.scss'
/* eslint-disable @typescript-eslint/no-explicit-any */

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

  // question select
  const { setQuestionList, profile } = useContext(AppContext)
  const [load, setLoad] = useState<boolean>(false)

  const [questionsSelectCallback, setQuestionsSelectCallback] = useState<SuccessResponse<QuestionState[]>>()
  const [questionsSelect, setQuestionsSelect] = useState<string[]>([])
  useEffect(() => {
    setQuestionList([])
    setQuestionsSelect([])
    setQuestionsListFromLS([])
  }, [examSlug])

  useEffect(() => {
    if (examDetail) {
      setQuestionsListFromLS(examDetail.questions)
      setQuestionsSelect(examDetail.questions)
      setQuestionList(examDetail.questions)
      setLoad(true)
      setTimeout(() => {
        setLoad(false)
      }, 500)
    }
  }, [examDetail])

  // action question
  const [openUpload, setOpenUpload] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [remove, setRemove] = useState<boolean>(false)

  const [questionUpdate, setQuestionUpdate] = useState<QuestionState | null>(null)
  const [current, setCurrent] = useState<number>(1)
  const [currentSelected, setSelectedCurrent] = useState<number>(1)
  const examMutation = useMutation({ mutationFn: (data: ExamState) => examApi.putExam(data) })

  // bank questons
  const [questionsCallback, setQuestionsCallback] = useState<SuccessResponse<QuestionState[]>>()

  const [myQues, setMyQues] = useState<boolean>(false)

  const dataActive = questionsCallback?.docs?.filter((item) => item.status === 'ACTIVE')
  const quesId = dataActive?.map((it) => it._id)

  const checkAll = quesId?.length === questionsSelect.length

  const [indeterminate, setIndeterminate] = useState<boolean>(false)

  useEffect(() => {
    if (questionsSelect && questionsSelect.length > 0)
      setIndeterminate(questionsSelect.some((e) => questionsCallback?.docs?.some((it) => it._id === e)) && !checkAll)
  }, [questionsSelect, checkAll])

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    e.target.checked
      ? stateAction(setQuestionsSelect, null, quesId, 'add', setQuestionsListFromLS)
      : stateAction(setQuestionsSelect, null, quesId, 'remove', setQuestionsListFromLS)
  }

  const [tabChange, setTabChange] = useState<string>()

  const handleChangeTab = (e: string) => {
    setTabChange(e)
  }

  const handleSave = () => {
    if (examDetail) {
      const payload = {
        id: examDetail._id,
        questions: questionsSelect,
      }

      examMutation.mutate(payload as unknown as any)
    }
  }

  useEffect(() => {
    if (examMutation.status === 'success' && !examMutation.isLoading) {
      openNotification({
        status: examMutation.status,
        message: 'Thông báo',
        description: remove ? 'Xóa câu hỏi khỏi bộ đề thành công' : 'Cập nhật bộ đề thành công',
      })
      setRemove(false)
    }

    if (examMutation.status === 'error' && examMutation.error) {
      openNotification({
        status: examMutation.status,
        message: 'Thông báo',
        description: ' Có lỗi xảy ra',
      })
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    scrollToTop()
  }, [current, currentSelected])

  const questionTabs = [
    {
      id: 'questions',
      name: 'Câu hỏi đã chọn',
      children: (
        <div>
          {examDetail && (
            <FilterAction
              type='question'
              apiFind={questionApi.findQuestion}
              callBackData={setQuestionsSelectCallback}
              filterQuery={{
                _id: questionsSelect,
              }}
              limit={10}
              page={currentSelected}
              keyFilter='questionsSelect'
              setLoading={setLoading}
              checkQuery={tabChange === 'questions' || load === true}
            />
          )}
          <Space size='large' className={css.infor}>
            <Space>
              <p>Số câu hỏi:</p>
              <b>{questionsSelectCallback?.totalDocs}</b>
            </Space>

            <Space>
              <Popconfirm
                placement='right'
                title='Bạn có muốn xóa tất cả câu hỏi trong bộ đề này?'
                onConfirm={() => {
                  setRemove(true)
                  setTabChange('')
                  setQuestionsListFromLS([])
                  setQuestionsSelect([])

                  const payload = {
                    id: examDetail?._id,
                    questions: [],
                  }

                  examMutation.mutate(payload as unknown as any)
                }}
                okText='Xóa'
                cancelText='Hủy'
              >
                <ButtonCustom
                  disabled={!questionsSelect?.length}
                  icon={<AiOutlineDelete />}
                  tooltip='Xóa tất cả câu hỏi'
                  danger
                ></ButtonCustom>
              </Popconfirm>

              <ButtonCustom type='primary' disabled={!questionsSelect?.length} onClick={handleSave}>
                Lưu gói câu hỏi
              </ButtonCustom>
            </Space>
          </Space>
          {load ? (
            <LoadingCustom style={{ marginTop: 100 }} tip='Vui lòng chờ...' />
          ) : (
            <Space direction='vertical' size='large' className={'sp100'}>
              <RenderQuestion
                data={questionsSelectCallback?.docs}
                type='questionsSelected'
                setOpen={setOpen}
                setQuestionUpdate={setQuestionUpdate}
                questionsSelect={questionsSelect}
              />
              <PaginationCustom
                callbackCurrent={setSelectedCurrent}
                totalData={questionsSelectCallback?.totalDocs}
                limit={10}
              />
            </Space>
          )}
        </div>
      ),
    },
    {
      id: 'bankQuestion',
      name: 'Ngân hàng câu hỏi',
      children: (
        <div>
          {examDetail && (
            <FilterAction
              type='question'
              apiFind={questionApi.findQuestion}
              callBackData={setQuestionsCallback}
              filterQuery={{ categoryId: examDetail.categoryId, createdById: myQues ? profile._id : undefined }}
              limit={10}
              page={current}
              keyFilter='questionsBank'
              checkQuery={myQues}
            />
          )}
          <Space className={css.infor}>
            <Space size='small'>
              <p>Số câu hỏi:</p>
              <b>{questionsCallback?.totalDocs}</b>
            </Space>
            <Space size='small'>
              <p>Số câu đã chọn:</p>
              <b>{!questionsSelect ? 0 : questionsSelect?.length}</b>
            </Space>
            <Checkbox onChange={(e) => setMyQues(e.target.checked)}>Câu hỏi của tôi</Checkbox>

            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
              {!indeterminate ? 'Chọn' : 'Bỏ chọn'} tất cả
            </Checkbox>

            <ButtonCustom
              icon={<HiOutlineUpload />}
              tooltip='Thêm file câu hỏi'
              onClick={() => setOpenUpload(true)}
            ></ButtonCustom>

            <ButtonCustom
              onClick={() => setOpen(true)}
              icon={<AiOutlinePlus />}
              tooltip='Thêm câu hỏi'
              type='primary'
            ></ButtonCustom>
          </Space>
          {loading ? (
            <LoadingCustom style={{ marginTop: 100 }} tip='Vui lòng chờ...' />
          ) : (
            <Space direction='vertical' size='large' className={'sp100'}>
              {questionsCallback && (
                <RenderQuestion
                  data={questionsCallback.docs}
                  type='questionsBank'
                  setOpen={setOpen}
                  setQuestionUpdate={setQuestionUpdate}
                  setQuestionsSelect={setQuestionsSelect}
                  questionsSelect={questionsSelect}
                />
              )}
              <PaginationCustom callbackCurrent={setCurrent} totalData={questionsCallback?.totalDocs} limit={10} />
            </Space>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className={`${css.quesList}`}>
      {/* <DragAndDrop /> */}

      <TabsCustom data={questionTabs} setting={{ onChange: handleChangeTab }} />

      <DrawerQuestion
        open={open}
        questionData={questionUpdate ? questionUpdate : null}
        categoryId={examDetail ? examDetail.categoryId : ''}
        setOpen={setOpen}
        setQuestionData={setQuestionUpdate}
        setLoading={setLoading}
      />
      <DrawerUpload
        open={openUpload}
        setOpen={setOpenUpload}
        categoryId={examDetail ? examDetail.categoryId : ''}
        setLoading={setLoading}
      />
    </div>
  )
}

export default MentorQuestions
