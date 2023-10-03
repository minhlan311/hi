/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import { debounce } from '@/helpers/common'
import { useQuery } from '@tanstack/react-query'
import { Form, Input, Row, Select, Space, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { LuFilterX } from 'react-icons/lu'
import ButtonCustom from '../ButtonCustom/ButtonCustom'

type Props = {
  apiFind: any
  keyFilter: string
  callBackData: React.Dispatch<React.SetStateAction<any>>
  type: 'course' | 'test' | 'question'
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  addOnButton?: React.ReactNode
  limit?: number
  page?: number
  className?: string
  filterQuery?: object
}

const FilterAction = (props: Props) => {
  const {
    type = 'course',
    apiFind,
    keyFilter,
    callBackData,
    setLoading,
    addOnButton,
    limit = 8,
    page = 1,
    className,
    filterQuery,
  } = props

  const [form] = Form.useForm()

  const [filterData, setFilterData] = useState<{ filterQuery: object; options: object } | null>({
    filterQuery: filterQuery || {},
    options: {
      limit,
      page: page || 1,
      sort: {
        createdAt: '-1',
      },
    },
  })
  const { data: categoriesData } = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => {
      return categoryApi.getCategories({
        parentId: '64ffde9c746fe5413cf8d1af',
      })
    },
  })

  const subjectList = categoriesData?.data?.docs?.map((sj) => ({
    value: sj._id,
    label: sj.name,
  }))

  const onChangeFilter = () => {
    const { categoryId, plan, viewCountDownCount, keyword, type, skill, difficulty, score, status, createdAt } =
      form.getFieldsValue()

    const body = {
      type,
      skill,
      difficulty,
      score,
      categoryId,
      plan,
      status,
      search: keyword || undefined,
    }

    setFilterData({
      filterQuery: { ...filterQuery, ...body },
      options: {
        limit,
        page,
        sort: {
          createdAt,
          countAssessment: viewCountDownCount === 'highestRating' ? -1 : undefined,
          countStudents: viewCountDownCount === 'highestParticipant' ? -1 : undefined,
        },
      },
    })
  }

  const handleReset = () => {
    form.resetFields()
    setFilterData((prev) => {
      return {
        filterQuery: filterQuery || {},
        options: {
          page,
          ...prev?.options,
        },
      }
    })
  }

  useEffect(() => {
    setFilterData({
      filterQuery: filterQuery || {},
      options: {
        limit,
        page,
        sort: {
          createdAt: '-1',
        },
      },
    })
  }, [page, filterQuery])

  const { data: filterCallbackData, isLoading } = useQuery({
    queryKey: [keyFilter, filterData],
    queryFn: () => {
      return apiFind(filterData)
    },
  })

  useEffect(() => {
    callBackData(filterCallbackData?.data)
  }, [filterCallbackData])

  useEffect(() => {
    if (setLoading) {
      setLoading(isLoading)
    }
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
                  style={{ width: 140 }}
                  placeholder='Loại câu hỏi'
                  allowClear
                  onChange={onChangeFilter}
                  options={[
                    {
                      value: 'SINGLE CHOICE',
                      label: 'Một đáp án',
                    },
                    {
                      value: 'MULTIPLE CHOICE',
                      label: 'Nhiều đáp án',
                    },
                    {
                      value: 'TRUE FALSE',
                      label: 'Đúng / Sai',
                    },
                    {
                      value: 'SORT',
                      label: 'Sắp xếp',
                    },
                    {
                      value: 'DRAG DROP',
                      label: 'Kéo thả',
                    },
                    {
                      value: 'LIKERT SCALE',
                      label: 'Đánh giá',
                    },
                    {
                      value: 'FILL BLANK',
                      label: 'Điền vào ô trống',
                    },
                    {
                      value: 'MATCHING',
                      label: 'Nối',
                    },
                    {
                      value: 'NUMERICAL',
                      label: 'Điền số',
                    },
                    {
                      value: 'WRITING',
                      label: 'Nhập câu trả lời',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name='skill' style={{ width: 120 }}>
                <Select
                  placeholder='Loại kỹ năng'
                  allowClear
                  onChange={onChangeFilter}
                  options={[
                    {
                      value: 'READING',
                      label: 'Đọc',
                    },
                    {
                      value: 'LISTENING',
                      label: 'Nghe',
                    },
                    {
                      value: 'WRITING',
                      label: 'Viết',
                    },
                    {
                      value: 'SPEAKING',
                      label: 'Nói',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name='difficulty' style={{ width: 87 }}>
                <Select
                  placeholder='Độ khó'
                  allowClear
                  onChange={onChangeFilter}
                  options={[
                    {
                      value: 'EASY',
                      label: 'Dễ',
                    },
                    {
                      value: 'MEDIUM',
                      label: 'Vừa phải',
                    },
                    {
                      value: 'DIFFICULT',
                      label: 'Khó',
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name='score' style={{ width: 140 }}>
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
              <Form.Item name='createdAt' style={{ width: 116 }}>
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
