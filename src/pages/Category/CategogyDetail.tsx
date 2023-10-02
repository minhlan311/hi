import categoryApi from '@/apis/categories.api'
import { getIdFromUrl } from '@/helpers/common'
import { useQuery } from '@tanstack/react-query'
import './CategoryDetail.scss'
import { useLocation } from 'react-router-dom'
import LoadingCustom from '@/components/LoadingCustom'
import ImageCustom from '@/components/ImageCustom/ImageCustom'

export default function CategogyDetail() {
  const location = useLocation()
  const currentPath = location.pathname
  const id = getIdFromUrl(currentPath)

  const { data, isLoading } = useQuery({
    queryKey: ['cateDetail', currentPath],
    queryFn: () => categoryApi.getCategorieDetail(id!),
    enabled: id ? true : false,
  })

  console.log(data?.data, '-----------------')

  return (
    <div className='div-cate'>
      {isLoading ? (
        <LoadingCustom
          tip='Đang tải thông tin Khóa học'
          style={{
            marginTop: '300px',
          }}
        />
      ) : (
        <>
          <ImageCustom
            width='100%'
            height='500px'
            src={import.meta.env.VITE_FILE_ENDPOINT + '/' + data?.data?.coverUrl}
          />
          <div className='h2'>
            <h2>{data?.data?.name}</h2>
            <div className='box-desc' dangerouslySetInnerHTML={{ __html: data?.data?.description }}></div>
          </div>
        </>
      )}
    </div>
  )
}
