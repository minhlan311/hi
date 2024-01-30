import examApi from '@/apis/exam.api'
import questionApi from '@/apis/question.api'
import { localAction } from '@/common'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import PaginationCustom from '@/components/PaginationCustom'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { ExamState } from '@/interface/exam'
import { QuestionState } from '@/interface/question'
import { SuccessResponse } from '@/types/utils.type'
import { getQuestionsList, setQuestionsListFromLS } from '@/utils/questons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Checkbox, Popconfirm, Space } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineOrderedList, AiOutlinePlus } from 'react-icons/ai'
import { BsListCheck } from 'react-icons/bs'
import { FiSave } from 'react-icons/fi'
import { HiOutlineUpload } from 'react-icons/hi'
import { MdClear, MdDoneAll } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import RenderQuestion from '../Components/RenderQuestion'
import DrawerQuestion from '../Drawer/DrawerQuestion'
import DrawerUpload from '../Drawer/DrawerUpload'
import css from './styles.module.scss'
/* eslint-disable @typescript-eslint/no-explicit-any */

const QuestionsSelect = ({
  examData,
  tabChange,
  idSelect,
}: {
  examData: ExamState
  tabChange: string
  idSelect: { _id: string; data: string[] }[]
}) => {
  const { questionList, setQuestionList } = useContext(AppContext)
  const [remove, setRemove] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const examMutation = useMutation({
    mutationFn: (data: ExamState) => examApi.putExam(data),
    onSuccess: () => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: remove ? 'Xóa câu hỏi khỏi bộ đề thành công' : 'Cập nhật bộ đề thành công',
      })
      setRemove(false)
    },
    onError: () =>
      openNotification({
        status: 'error',
        message: 'Thông báo',
        description: ' Có lỗi xảy ra',
      }),
  })

  const [questions, setQuestions] = useState<SuccessResponse<QuestionState[]>>()
  const [loading, setLoading] = useState<boolean>(false)

  const questionDetail = idSelect?.find((item) => item._id === examData?._id)

  const questionContext = questionList?.find((item) => item._id === examData?._id)
  const questionLength = questionContext?.data.length || questions?.totalDocs

  const handleSave = () => {
    if (examData) {
      const payload = {
        id: examData?._id,
        questions: questionContext?.data,
        skillName: examData?.skillName,
      }

      examMutation.mutate(payload as unknown as any)
      queryClient.invalidateQueries({ queryKey: ['questionList'] })
      localAction('questionsList', examData._id, 'delete', '_id', setQuestionList)
    }
  }

  const [page, setPage] = useState<number>(1)

  const { sm, md } = useResponsives()

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <FilterAction
        type='question'
        keyFilter='questionList'
        listenerFilterQuery
        apiFind={questionApi.findQuestion}
        filterQuery={{
          _id: questionDetail ? questionDetail?.data : [],
        }}
        checkQuery={tabChange === 'questions' || Boolean(questionDetail)}
        limit={10}
        page={page}
        setLoading={setLoading}
        callBackData={setQuestions}
        addOnButton={
          sm &&
          md && (
            <Space>
              <Popconfirm
                placement='right'
                title='Bạn có muốn xóa tất cả câu hỏi trong bộ đề này?'
                onConfirm={() => {
                  setRemove(true)
                  setQuestionsListFromLS([])

                  const payload = {
                    id: examData?._id,
                    questions: [],
                  }

                  examMutation.mutate(payload as unknown as any)
                }}
                okText='Xóa'
                cancelText='Hủy'
              >
                <ButtonCustom
                  disabled={!questionLength}
                  icon={<AiOutlineDelete size={22} />}
                  tooltip='Xóa tất cả câu hỏi'
                  danger
                ></ButtonCustom>
              </Popconfirm>

              <ButtonCustom
                type='primary'
                disabled={!questionLength}
                onClick={handleSave}
                icon={<FiSave size={22} />}
                tooltip='Lưu gói câu hỏi'
              ></ButtonCustom>
            </Space>
          )
        }
      />
      <Space className={css.infor}>
        {!sm && !md ? (
          <>
            <Space size='small'>
              <p>Số câu hỏi:</p>
              <b>{questionLength}</b>
            </Space>
            <Space>
              <Popconfirm
                placement='right'
                title='Bạn có muốn xóa tất cả câu hỏi trong bộ đề này?'
                onConfirm={() => {
                  setRemove(true)
                  setQuestionsListFromLS([])

                  const payload = {
                    id: examData?._id,
                    questions: [],
                  }

                  examMutation.mutate(payload as unknown as any)
                  localAction(
                    'questionsList',
                    { _id: examData._id, data: [] },
                    'updateSwitch',
                    null,
                    'data',
                    setQuestionList,
                  )
                }}
                okText='Xóa'
                cancelText='Hủy'
              >
                <ButtonCustom
                  disabled={!questionLength}
                  icon={<AiOutlineDelete size={22} />}
                  tooltip='Xóa tất cả câu hỏi'
                  danger
                ></ButtonCustom>
              </Popconfirm>
              <ButtonCustom type='primary' disabled={!questionLength} onClick={handleSave}>
                Lưu gói câu hỏi
              </ButtonCustom>
            </Space>
          </>
        ) : (
          <Space size='small' className={css.cardInfor}>
            <BsListCheck size={22} />
            <b>{questionLength}</b>
          </Space>
        )}
      </Space>

      <LoadingCustom style={{ minHeight: '40vh' }} tip='Vui lòng chờ...' loading={loading}>
        <RenderQuestion data={questions?.docs} type='questionsSelected' />
      </LoadingCustom>
      <PaginationCustom
        callbackCurrent={setPage}
        totalData={questions?.totalDocs}
        limit={questions?.limit}
        page={questions?.page}
      />
    </Space>
  )
}

const QuestionsBank = ({ examDetail, tabChange }: { examDetail: ExamState; tabChange: string }) => {
  const { questionList, setQuestionList } = useContext(AppContext)
  const [current, setCurrent] = useState<number>(1)
  const [open, setOpen] = useState<boolean>(false)
  const [openUpload, setOpenUpload] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [questions, setQuestions] = useState<SuccessResponse<QuestionState[]>>()
  const dataActive = questions?.docs?.filter((item) => item.status === 'ACTIVE')
  const quesId = dataActive?.map((it) => it._id)

  const questionDetail = questionList?.find((item) => item._id === examDetail?._id)
  const questionLength = questionDetail?.data.length
  const checkAll = quesId?.length === questionLength

  const [indeterminate, setIndeterminate] = useState<boolean>(false)

  useEffect(() => {
    if (questionLength && questionLength > 0)
      setIndeterminate(questionDetail?.data.some((e) => questions?.docs?.some((it) => it._id === e)) && !checkAll)
  }, [questionDetail, checkAll])

  const [questionUpdate, setQuestionUpdate] = useState<QuestionState | null>(null)

  const onCheckAllChange = () => {
    localAction('questionsList', { _id: examDetail._id, data: quesId }, 'updateSwitch', '_id', 'data', setQuestionList)
  }

  const { sm, md } = useResponsives()

  const examMutation = useMutation({
    mutationFn: (data: ExamState) => examApi.putExam(data),
    onSuccess: () => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Cập nhật bộ đề thành công',
      })
    },
    onError: () =>
      openNotification({
        status: 'error',
        message: 'Thông báo',
        description: ' Có lỗi xảy ra',
      }),
  })

  const handleSave = () => {
    if (examDetail) {
      const payload = {
        id: examDetail?._id,
        questions: questionDetail?.data,
        skillName: examDetail?.skillName,
      }

      examMutation.mutate(payload as unknown as any)
    }
  }

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <FilterAction
        type='question'
        apiFind={questionApi.findQuestion}
        callBackData={setQuestions}
        filterQuery={{
          categoryId: examDetail.categoryId,
          typeQuestion: examDetail.type,
          skill: examDetail.skillName,
        }}
        setLoading={setLoading}
        limit={10}
        page={current}
        keyFilter='questionsBank'
        checkQuery={tabChange === 'bankQuestion'}
        addOnButton={
          sm &&
          md && (
            <Space>
              <ButtonCustom
                icon={<HiOutlineUpload size={22} />}
                tooltip='Thêm file câu hỏi'
                onClick={() => setOpenUpload(true)}
              ></ButtonCustom>

              <ButtonCustom
                onClick={() => setOpen(true)}
                icon={<AiOutlinePlus size={22} />}
                tooltip='Thêm câu hỏi'
                type='primary'
              ></ButtonCustom>

              <ButtonCustom
                type='primary'
                disabled={!questionLength}
                onClick={handleSave}
                icon={<FiSave size={22} />}
                tooltip='Lưu gói câu hỏi'
              ></ButtonCustom>
            </Space>
          )
        }
      />
      <Space className={css.infor}>
        {!sm && !md ? (
          <>
            <Space size='small'>
              <p>Số câu hỏi:</p>
              <b>{questions?.totalDocs}</b>
            </Space>
            <Space size='small'>
              <p>Số câu đã chọn:</p>
              <b>{questionLength}</b>
            </Space>

            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
              {!indeterminate ? 'Chọn' : 'Bỏ chọn'} tất cả
            </Checkbox>

            <Space>
              <ButtonCustom
                icon={<HiOutlineUpload size={22} />}
                tooltip='Thêm file câu hỏi'
                onClick={() => setOpenUpload(true)}
              ></ButtonCustom>
              <ButtonCustom
                onClick={() => setOpen(true)}
                icon={<AiOutlinePlus size={22} />}
                tooltip='Thêm câu hỏi'
                type='primary'
              ></ButtonCustom>
              <ButtonCustom
                type='primary'
                disabled={!questionLength}
                onClick={handleSave}
                icon={<FiSave size={22} />}
                tooltip='Lưu gói câu hỏi'
              ></ButtonCustom>
            </Space>
          </>
        ) : (
          <>
            <Space size='small' className={css.cardInfor}>
              <AiOutlineOrderedList size={22} />
              <b>{questions?.totalDocs}</b>
            </Space>
            <Space size='small' className={css.cardInfor}>
              <BsListCheck size={22} />
              <b>{questionList?.length}</b>
            </Space>

            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
              {questionDetail?.data?.some((e) => questions?.docs?.some((it) => it._id === e)) ? (
                <MdClear size={22} />
              ) : (
                <MdDoneAll size={22} />
              )}
            </Checkbox>
          </>
        )}
      </Space>

      <LoadingCustom loading={loading} style={{ minHeight: '40vh' }} tip='Vui lòng chờ...'>
        {questions && (
          <RenderQuestion
            data={questions.docs}
            type='questionsBank'
            setOpen={setOpen}
            setQuestionUpdate={setQuestionUpdate}
          />
        )}
      </LoadingCustom>
      <PaginationCustom
        callbackCurrent={setCurrent}
        totalData={questions?.totalDocs}
        limit={10}
        page={questions?.page}
      />

      <DrawerQuestion
        open={open}
        questionData={questionUpdate ? questionUpdate : null}
        categoryId={examDetail ? examDetail.categoryId : ''}
        typeQuestion={examDetail?.type as 'TEST' | 'QUIZ'}
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
    </Space>
  )
}

const MentorQuestions = () => {
  const { id } = useParams()
  const { data: exam } = useQuery({
    queryKey: ['examDetail'],
    queryFn: () => {
      return examApi.getExamDetail(id!)
    },
    enabled: Boolean(id),
  })
  const [idSelect, setIdSelect] = useState<{ _id: string; data: string[] }[]>()

  const examDetail = exam?.data
  const { setQuestionList } = useContext(AppContext)

  useEffect(() => {
    if (examDetail) {
      if (examDetail.questions.length > 0) {
        localAction(
          'questionsList',
          { _id: examDetail._id, data: examDetail.questions },
          'update',
          '_id',
          'data',
          setQuestionList,
        )
        setIdSelect([{ _id: examDetail._id, data: examDetail.questions }])
      }
    }
  }, [examDetail])

  const [tabChange, setTabChange] = useState<string>('questions')

  const handleChangeTab = (e: string) => {
    setTabChange(e)
  }

  useEffect(() => {
    if (tabChange === 'questions') {
      const newID = getQuestionsList()

      setIdSelect(newID)
    }
  }, [tabChange])

  const questionTabs = [
    {
      id: 'questions',
      name: 'Câu hỏi đã chọn',
      children: <QuestionsSelect examData={examDetail!} tabChange={tabChange} idSelect={idSelect ? idSelect : []} />,
    },
    {
      id: 'bankQuestion',
      name: 'Ngân hàng câu hỏi',
      children: <QuestionsBank examDetail={examDetail!} tabChange={tabChange} />,
    },
  ]

  return (
    <div className={`${css.quesList}`}>
      <TabsCustom data={questionTabs} setting={{ onChange: handleChangeTab }} />
    </div>
  )
}

export default MentorQuestions
