import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import css from './styles.module.scss'
import DrawerQuestion from '../Drawer/DrawerQuestion'
import DrawerUpload from '../Drawer/DrawerUpload'
import examApi from '@/apis/exam.api'
import FilterAction from '@/components/FilterAction'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import PaginationCustom from '@/components/PaginationCustom'
import questionApi from '@/apis/question.api'
import RenderQuestion from '../Components/RenderQuestion'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'
import { AppContext } from '@/contexts/app.context'
import { Checkbox, Popconfirm, Space } from 'antd'
import { ExamState } from '@/interface/exam'
import { HiOutlineUpload } from 'react-icons/hi'
import { QuestionState } from '@/interface/question'
import { SuccessResponse } from '@/types/utils.type'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()

  const examDetail = exam?.data
  const [open, setOpen] = useState<boolean>(false)
  const { questionList, setQuestionList } = useContext(AppContext)

  const [openUpload, setOpenUpload] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [remove, setRemove] = useState<boolean>(false)
  const [myQues, setMyQues] = useState<boolean>(false)
  const [checkAll, setCheckAll] = useState<boolean>(false)
  console.log(myQues)

  const [questions, setQuestions] = useState<SuccessResponse<QuestionState[]>>()
  const [questionsSelected, setQuestionsSelected] = useState<SuccessResponse<QuestionState[]>>()
  const [questionUpdate, setQuestionUpdate] = useState<QuestionState | null>(null)
  const [current, setCurrent] = useState<number>(1)
  const [currentSelected, setSelectedCurrent] = useState<number>(1)

  const { mutate, status, error } = useMutation({ mutationFn: (data: ExamState) => examApi.putExam(data) })

  const dataActive = questions?.docs?.filter((item) => item.status === 'ACTIVE')

  const quesId = dataActive?.map((it) => it._id)

  const indeterminate = quesId?.every((e) => questionList?.includes(e))
  const [tabChange, setTabChange] = useState<string>()

  const handleChangeTab = (e: string) => {
    setTabChange(e)
  }

  const handleSave = () => {
    if (examDetail) {
      const payload = {
        id: examDetail._id,
        questions: questionList,
      }

      mutate(payload as unknown as any)
    }
  }

  useEffect(() => {
    if (status === 'success') {
      openNotification({
        status: status,
        message: 'Thông báo',
        description: remove ? 'Xóa câu hỏi khỏi bộ đề thành công' : 'Cập nhật bộ đề thành công',
      })
      setRemove(false)
    }

    if (status === 'error' && error) {
      openNotification({
        status: status,
        message: 'Thông báo',
        description: ' Có lỗi xảy ra',
      })
    }
  }, [status, error])

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
              callBackData={setQuestionsSelected}
              filterQuery={{ testId: examDetail._id, _id: questionList }}
              limit={10}
              page={currentSelected}
              keyFilter='questionsSelected'
              setLoading={setLoading}
              checkQuery={tabChange}
            />
          )}
          <Space size='large' className={css.infor}>
            <Space>
              <p>Số câu hỏi:</p>
              <b>{questionsSelected?.totalDocs}</b>
            </Space>

            <Space>
              <Popconfirm
                placement='right'
                title='Bạn có muốn xóa tất cả câu hỏi trong bộ đề này?'
                onConfirm={() => {
                  handleSave()
                  setRemove(true)
                  setTabChange('')
                  setQuestionList(questionList)
                }}
                okText='Xóa'
                cancelText='Hủy'
              >
                <ButtonCustom
                  disabled={!questionList?.length}
                  icon={<AiOutlineDelete />}
                  tooltip='Xóa tất cả câu hỏi'
                  danger
                ></ButtonCustom>
              </Popconfirm>

              <ButtonCustom type='primary' disabled={!questionList?.length} onClick={handleSave}>
                Lưu gói câu hỏi
              </ButtonCustom>
            </Space>
          </Space>
          {loading ? (
            <LoadingCustom style={{ marginTop: 100 }} tip='Vui lòng chờ...' />
          ) : (
            <Space direction='vertical' size='large' className={'sp100'}>
              <RenderQuestion
                data={questionsSelected?.docs}
                type='questionsSelected'
                setOpen={setOpen}
                setQuestionUpdate={setQuestionUpdate}
              />
              <PaginationCustom
                callbackCurrent={setSelectedCurrent}
                totalData={questionsSelected?.totalDocs}
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
              callBackData={setQuestions}
              filterQuery={{ testId: examDetail._id }}
              limit={10}
              page={current}
              keyFilter='questionsBank'
              // setLoading={setLoading}
            />
          )}
          <Space className={css.infor}>
            <Space size='small'>
              <p>Số câu hỏi:</p>
              <b>{questions?.totalDocs}</b>
            </Space>
            <Space size='small'>
              <p>Số câu đã chọn:</p>
              <b>{!questionList ? 0 : questionList?.length}</b>
            </Space>
            <Checkbox onChange={(e) => setMyQues(e.target.checked)}>Câu hỏi của tôi</Checkbox>

            <Checkbox
              onClick={() => {
                setCheckAll(!checkAll)
                queryClient.invalidateQueries({ queryKey: ['questionsSelected'] })
              }}
              checked={!dataActive?.length ? Boolean(dataActive?.length) : indeterminate}
              disabled={!dataActive?.length}
            >
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
              {questions && (
                <RenderQuestion
                  data={questions.docs}
                  type='questionsBank'
                  setOpen={setOpen}
                  setQuestionUpdate={setQuestionUpdate}
                  checkAll={checkAll}
                />
              )}
              <PaginationCustom callbackCurrent={setCurrent} totalData={questions?.totalDocs} limit={10} />
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
