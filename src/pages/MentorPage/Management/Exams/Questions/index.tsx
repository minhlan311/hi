import examApi from '@/apis/exam.api'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

const MentorQuestions = () => {
  const location = useLocation()
  const examId = location.pathname.split('/')[3]
  const { data: examDetail } = useQuery({
    queryKey: ['examDetail'],
    queryFn: () => {
      return examApi.getExamDetail(examId)
    }
  })

  console.log(examDetail)

  return <div>{}</div>
}

export default MentorQuestions
