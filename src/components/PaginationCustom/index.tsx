/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from 'antd'
import { useEffect, useState } from 'react'

type Props = {
  limit?: number
  totalData?: number
  dataArr?: any[]
  callbackDataArr?: React.Dispatch<React.SetStateAction<any>>
  callbackCurrent?: React.Dispatch<React.SetStateAction<number>>
}

const PaginationCustom = (props: Props) => {
  const { dataArr, totalData, limit = 5, callbackDataArr, callbackCurrent } = props

  const [current, setCurrent] = useState<number>(1)

  const onChange = (e: number) => {
    setCurrent(e)
  }

  const paginateData = (data: any[], limit: number, page: number) => {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = data.slice(startIndex, endIndex)

    const totalDocs = data.length
    const totalPages = Math.ceil(totalDocs / limit)

    return {
      docs: paginatedData,
      totalDocs,
      limit,
      totalPages,
      page,
    }
  }

  const newArr = dataArr && paginateData(dataArr, limit, current)

  useEffect(() => {
    callbackCurrent && callbackCurrent(current)
  }, [current])

  if (dataArr && !dataArr.length) {
    callbackDataArr && callbackDataArr(newArr?.docs as unknown as any[])

    return (
      dataArr.length > limit && (
        <Pagination
          pageSize={limit}
          showQuickJumper
          defaultCurrent={1}
          current={current}
          total={dataArr.length}
          onChange={onChange}
        />
      )
    )
  }

  if (totalData) {
    return (
      totalData > limit && (
        <Pagination
          pageSize={limit}
          showQuickJumper
          defaultCurrent={1}
          current={current}
          total={totalData}
          onChange={onChange}
        />
      )
    )
  }
}

export default PaginationCustom
