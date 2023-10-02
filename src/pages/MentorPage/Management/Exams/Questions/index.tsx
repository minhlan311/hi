import examApi from '@/apis/exam.api'
import questionApi from '@/apis/question.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import FilterAction from '@/components/FilterAction'
import LoadingCustom from '@/components/LoadingCustom'
import PaginationCustom from '@/components/PaginationCustom'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import { AppContext } from '@/contexts/app.context'
import { ExamState } from '@/interface/exam'
import { QuestionState } from '@/interface/question'
import { SuccessResponse } from '@/types/utils.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Checkbox, Space } from 'antd'
import { useContext, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
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
  const { questionList } = useContext(AppContext)

  const [openUpload, setOpenUpload] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [myQues, setMyQues] = useState<boolean>(false)
  const [checkAll, setCheckAll] = useState<boolean>(false)
  console.log(myQues)

  const [questions, setQuestions] = useState<SuccessResponse<QuestionState[]>>()
  const [questionUpdate, setQuestionUpdate] = useState<QuestionState | null>(null)
  const [current, setCurrent] = useState<number>(1)

  const questionsSelectId = questionList?.map((item) => item._id)

  const updateExam: any = useMutation({ mutationFn: (data: ExamState) => examApi.putExam(data) })

  const handleSave = () => {
    if (examDetail && questionsSelectId.length > 0) {
      const payload = {
        _id: examDetail._id,
        questions: questionsSelectId,
      }

      updateExam(payload)
    }
  }

  const questionTabs = [
    {
      id: 'questions',
      name: 'Câu hỏi đã chọn',
      children: (
        <div>
          <Space size='large' className={css.infor}>
            <Space>
              <p>Số câu hỏi:</p>
              <b>{!questionList ? 0 : questionList?.length}</b>
            </Space>

            <Space>
              <ButtonCustom
                onClick={() => setOpen(true)}
                icon={<AiOutlinePlus />}
                tooltip='Thêm câu hỏi'
              ></ButtonCustom>

              <ButtonCustom
                icon={<HiOutlineUpload />}
                tooltip='Thêm file câu hỏi'
                onClick={() => setOpenUpload(true)}
              ></ButtonCustom>

              <ButtonCustom type='primary' disabled={!questionList?.length} onClick={handleSave}>
                Lưu gói câu hỏi
              </ButtonCustom>
            </Space>
          </Space>

          <Space direction='vertical' size='large' className={'sp100'}>
            <RenderQuestion
              data={questionList}
              type='questionsSelect'
              setOpen={setOpen}
              setQuestionUpdate={setQuestionUpdate}
            />

            <PaginationCustom
              dataArr={questionList}
              limit={10}
              // callbackDataArr={setQuestionsData}
              callbackCurrent={setCurrent}
            />
          </Space>
        </div>
      ),
    },
    {
      id: 'bankQuestion',
      name: 'Ngân hàng câu hỏi',
      children: (
        <div>
          <Space size='large' className={css.infor}>
            <Space size='small'>
              <p>Số câu hỏi:</p>
              <b>{questions?.totalDocs}</b>
            </Space>
            <Space size='small'>
              <p>Số câu đã chọn:</p>
              <b>{!questionList ? 0 : questionList?.length}</b>
            </Space>
            <Checkbox onChange={(e) => setMyQues(e.target.checked)}>Câu hỏi của tôi</Checkbox>
            <Checkbox onChange={(e) => setCheckAll(e.target.checked)}>Chọn tất cả</Checkbox>
          </Space>
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
        </div>
      ),
    },
  ]

  return !loading && examDetail ? (
    <div className={`${css.quesList}`}>
      {/* <DragAndDrop /> */}

      <FilterAction
        type='question'
        apiFind={questionApi.findQuestion}
        callBackData={setQuestions}
        filterQuery={{ testId: examDetail._id }}
        limit={10}
        page={current}
        keyFilter='questionFilter'
      />
      <TabsCustom data={questionTabs}></TabsCustom>

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
  ) : (
    <LoadingCustom style={{ marginTop: 200 }} tip='Vui lòng chờ...' />
  )
}

export default MentorQuestions
