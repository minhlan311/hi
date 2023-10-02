import { getIdFromUrl } from '@/helpers/common'
import React from 'react'
import { useLocation } from 'react-router-dom'

export default function CategogyDetail() {
  const location = useLocation()
  const currentPath = location.pathname

  console.log(currentPath, 'currentPath')

  return <div></div>
}
