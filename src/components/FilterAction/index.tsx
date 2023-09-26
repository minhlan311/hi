import categoryApi from '@/apis/categories.api'
import { debounce } from '@/helpers/common'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Form, Input, Row, Select, Space, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { LuFilterX } from 'react-icons/lu'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  apiFind: any
  callBackData: React.Dispatch<React.SetStateAction<any>>
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  resetFilter?: boolean
  addOnButton?: React.ReactNode
  limit?: number
  page?: number
  className?: string
  type: 'course' | 'test' | 'question'
  filterQuery?: any
}

const FilterAction = (props: Props) => {
  const {
    type = 'course',
    apiFind,
    callBackData,
    setLoading,
    resetFilter = false,
    addOnButton,
    limit = 8,
    page = 1,
    className,
    filterQuery,
  } = props
  const [filterData, setFilterData] = useState<{ filterQuery?: any; options: any }>({
    filterQuery: { ...filterQuery },
    options: {
      limit: limit,
      page: page || 1,
      sort: {
        createdAt: '-1',
      },
    },
  })

  useEffect(() => {
    setFilterData({
      ...filterData,
      options: {
        limit: limit,
        page: page,
        sort: {
          createdAt: '-1',
        },
      },
    })
  }, [page])

  useEffect(() => {
    setFilterData({
      filterQuery: {
        ...filterQuery,
      },
      options: {
        limit: limit,
        page: page,
        sort: {
          createdAt: '-1',
        },
      },
    })
  }, [])

  const [form] = Form.useForm()

  const { data: categoriesData } = useQuery({
    queryKey: ['Categories'],
    queryFn: () => {
      return categoryApi.getCategories({
        parentId: '64ffde9c746fe5413cf8d1af',
      })
    },
  })
  const subjectList = categoriesData?.data?.docs?.map((sj) => {
    return {
      value: sj._id,
      label: sj.name,
    }
  })

  const onChangeFilter = () => {
    const { categoryId, plan, viewCountDownCount, status, createdAt, keyword } = form.getFieldsValue()

    const body = {
      ...filterQuery,
      categoryId: categoryId,
      plan: plan,
      status: status,
      search: keyword ? keyword : undefined,
    }

    setFilterData({
      filterQuery: body,
      options: {
        limit: limit,
        page: page,
        sort: {
          createdAt: createdAt,
          countAssessment: viewCountDownCount === 'highestRating' ? -1 : undefined,
          countStudents: viewCountDownCount === 'highestParticipant' ? -1 : undefined,
        },
      },
    })
  }

  const handleReset = () => {
    form.resetFields()
    setFilterData({
      filterQuery: {
        ...filterQuery,
      },
      options: {
        limit: limit,
        page: page,
        sort: {
          createdAt: -1,
        },
      },
    })
  }

  const { isLoading, mutate } = useMutation({ mutationFn: (body) => apiFind({ payload: body }) })

  useEffect(() => {
    if (resetFilter) handleReset()
  }, [resetFilter])

  useEffect(() => {
    mutate(filterData as unknown as any, {
      onSuccess: (data: any) => {
        const res = data?.data.docs
        callBackData(res)
      },
    })
  }, [filterData])

  useEffect(() => {
    setLoading && setLoading(isLoading)
  }, [isLoading])

  return (
    <Form form={form} autoComplete='off'>
      <Row justify='space-between' className={className}>
        <Space>
          {type === 'course' || type === 'test' ? (
            <>
              <Form.Item name='categoryId' style={{ width: 120 }}>
                <Select placeholder='Khóa học' onChange={onChangeFilter} options={subjectList}></Select>
              </Form.Item>
              <Form.Item name='plan'>
                <Select
                  placeholder='Loại phí'
                  allowClear
                  onChange={onChangeFilter}
                  options={[
                    {
                      value: 'FREE',
                      label: 'Miễn phí',
                    },
                    {
                      value: 'PREMIUM',
                      label: 'Có phí',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name='viewCountDownCount' style={{ width: 160 }}>
                <Select
                  placeholder='Đánh giá'
                  allowClear
                  onChange={onChangeFilter}
                  options={[
                    {
                      value: 'highestRating',
                      label: 'Đánh giá tốt nhất',
                    },
                    {
                      value: 'highestParticipant',
                      label: 'Đánh giá nhiều nhất',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name='status' style={{ width: 150 }}>
                <Select
                  placeholder='Trạng thái'
                  onChange={onChangeFilter}
                  allowClear
                  options={[
                    {
                      value: 'ACTIVE',
                      label: 'Hoạt động',
                    },
                    {
                      value: 'INACTIVE',
                      label: 'Không hoạt động',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name='createdAt'>
                <Select
                  placeholder='Ngày tải lên'
                  onChange={onChangeFilter}
                  allowClear
                  options={[
                    {
                      value: '-1',
                      label: 'Mới nhất',
                    },
                    {
                      value: '1',
                      label: 'Cũ nhất',
                    },
                  ]}
                />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item name='type'>
                <Select
                  style={{ width: 150 }}
                  placeholder='Loại câu hỏi'
                  allowClear
                  onChange={onChangeFilter}
                  options={[
                    {
                      value: 'SINGLE CHOICE',
                      label: 'SINGLE CHOICE',
                    },
                    {
                      value: 'MULTIPLE CHOICE',
                      label: 'MULTIPLE CHOICE',
                    },
                    {
                      value: 'TRUE FALSE',
                      label: 'TRUE FALSE',
                    },
                    {
                      value: 'SORT',
                      label: 'SORT',
                    },
                    {
                      value: 'DRAG DROP',
                      label: 'DRAG DROP',
                    },
                    {
                      value: 'LIKERT SCALE',
                      label: 'LIKERT SCALE',
                    },
                    {
                      value: 'FILL BLANK',
                      label: 'FILL BLANK',
                    },
                    {
                      value: 'MATCHING',
                      label: 'MATCHING',
                    },
                    {
                      value: 'NUMERICAL',
                      label: 'NUMERICAL',
                    },
                    {
                      value: 'WRITING',
                      label: 'WRITING',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name='sortNumber' style={{ width: 160 }}>
                <Select
                  placeholder='Điểm số'
                  allowClear
                  onChange={onChangeFilter}
                  options={[
                    {
                      value: '-1',
                      label: 'Từ thấp đến cao',
                    },
                    {
                      value: '1',
                      label: 'Từ cao đến thấp',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name='status' style={{ width: 150 }}>
                <Select
                  placeholder='Trạng thái'
                  onChange={onChangeFilter}
                  allowClear
                  options={[
                    {
                      value: 'ACTIVE',
                      label: 'Hoạt động',
                    },
                    {
                      value: 'INACTIVE',
                      label: 'Không hoạt động',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name='createdAt'>
                <Select
                  placeholder='Ngày tải lên'
                  onChange={onChangeFilter}
                  allowClear
                  options={[
                    {
                      value: '-1',
                      label: 'Mới nhất',
                    },
                    {
                      value: '1',
                      label: 'Cũ nhất',
                    },
                  ]}
                />
              </Form.Item>
            </>
          )}
          {/* <Form.Item name='subjectId' label='' style={{ width: 200 }}>
            <Select
              placeholder='Tìm kiếm và chọn môn học'
              allowClear
              showSearch
              labelInValue
              filterOption={false}
              // onChange={onChangeFilter}
              // notFoundContent={
              //   subjectsData.status === 'loading' ? (
              //     <div style={{ height: 120 }}>
              //       <Spin
              //         size='small'
              //         style={{
              //           marginTop: 50
              //         }}
              //         tip='Loading...'
              //       >
              //         <div className='content'></div>
              //       </Spin>
              //     </div>
              //   ) : (
              //     <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
              //   )
              // }
              // onSearch={debounce((text) => setSearchSj(text), 800)}
              // options={subjectOption}
              style={{
                width: 200
              }}
            />
          </Form.Item> */}
          <Form.Item>
            <Tooltip title='Xóa bộ lọc'>
              <ButtonCustom onClick={handleReset} icon={<LuFilterX size={22} />}></ButtonCustom>
            </Tooltip>
          </Form.Item>
          {addOnButton && <Form.Item>{addOnButton}</Form.Item>}
        </Space>
        <div>
          <Form.Item name='keyword' style={{ width: 200 }}>
            <Input
              placeholder='Tìm kiếm...'
              prefix={<BiSearch size={20} />}
              allowClear
              onChange={() => {
                debounce(onChangeFilter(), 500)
              }}
            />
          </Form.Item>
        </div>
      </Row>
    </Form>
  )
}

export default FilterAction
