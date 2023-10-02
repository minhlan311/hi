import categoryApi from '@/apis/categories.api'
import { getIdFromUrl } from '@/helpers/common'
import { useQuery } from '@tanstack/react-query'

import { useLocation } from 'react-router-dom'

export default function CategogyDetail() {
  const location = useLocation()
  const currentPath = location.pathname
  const id = getIdFromUrl(currentPath)

  const { data } = useQuery({
    queryKey: ['cateDetail', currentPath],
    queryFn: () => categoryApi.getCategorieDetail(id!),
    enabled: id ? true : false,
  })

  console.log(data, '-----------------')

  return <div></div>
}
