/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import LoadingCustom from '@/components/LoadingCustom'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import './MenuSlug.scss'
import ChoiceQuestionPage from '@/pages/ChoiceQuestionPage'

export default function MemuSlug() {
  const navigate = useNavigate()
  const { menuSlug } = useParams()

  const { data: detailData, isLoading } = useQuery({
    queryKey: ['cateDetail', menuSlug],
    queryFn: () => categoryApi.getCategorieDetailSlug(menuSlug!),
    enabled: menuSlug ? true : false,
    onError: (error: any) => {
      if (error?.response && error?.response?.status === 404) {
        navigate('/404')
      }
    },
  })
  document.title = detailData?.data.name + ' | Ucam'

  return (
    <div className='div-ucam-intro'>
      {isLoading ? (
        <LoadingCustom tip='Vui lòng chờ' />
      ) : !detailData?.data.content ? (
        detailData?.data.name === 'Trắc nghiệm' && <ChoiceQuestionPage />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: detailData?.data?.content }}></div>
      )}
    </div>
  )
}
