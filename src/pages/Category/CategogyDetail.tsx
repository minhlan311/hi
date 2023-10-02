import categoryApi from '@/apis/categories.api'
import { getIdFromUrl } from '@/helpers/common'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function CategogyDetail() {
  const location = useLocation()
  const currentPath = location.pathname
  const id = getIdFromUrl(currentPath)
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['cateDetail'] })
  }, [location])

  const { data } = useQuery({
    queryKey: ['cateDetail', currentPath],
    queryFn: () => categoryApi.getCategorieDetail(id!),
  })

  console.log(data, '-----------------')

  return <div></div>
}
