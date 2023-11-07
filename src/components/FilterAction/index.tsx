/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import useResponsives from '@/hooks/useResponsives'
import { useQuery } from '@tanstack/react-query'
import { Col, Form, Input, Row, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { LuFilterX } from 'react-icons/lu'
import ButtonCustom from '../ButtonCustom/ButtonCustom'

import { debounce } from '@/helpers/common'
import DrawerCustom from '../DrawerCustom/DrawerCustom'

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
  checkQuery?: boolean | any
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
    checkQuery,
  } = props

  const [form] = Form.useForm()
  const [open, setOpen] = useState<boolean>(false)
  const [forcus, setForcus] = useState<boolean>(false)

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
    const { categoryId, plan, viewCountDownCount, type, keyword, skill, difficulty, score, status, createdAt } =
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
          countAsseslgent: viewCountDownCount === 'highestRating' ? -1 : undefined,
          countStudents: viewCountDownCount === 'highestParticipant' ? -1 : undefined,
        },
      },
    })
    setForcus(true)
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
  }, [page, checkQuery])

  const { data: filterCallbackData, isLoading } = useQuery({
    queryKey: [keyFilter, filterData],
    queryFn: () => {
      return apiFind(filterData)
    },
    enabled: checkQuery ? checkQuery : true,
  })

  useEffect(() => {
    callBackData(filterCallbackData?.data)
  }, [filterCallbackData])

  useEffect(() => {
    if (setLoading) {
      setLoading(isLoading)
    }
  }, [isLoading])

  const { lg } = useResponsives()

  const FormFilter = () => {
    return (
      <Form form={form} autoComplete='off'>
        <Row justify='space-between' className={className}>
          <Space direction={lg ? 'vertical' : 'horizontal'} className={`${lg && 'sp100'}`}>
            {type === 'course' || type === 'test' ? (
              <>
                <Form.Item name='categoryId' style={{ width: lg ? '100%' : 120 }}>
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
                <Form.Item name='viewCountDownCount' style={{ width: lg ? '100%' : 160 }}>
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
                <Form.Item name='status' style={{ width: lg ? '100%' : 150 }}>
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
                    style={{ width: lg ? '100%' : 140 }}
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
                <Form.Item name='skill' style={{ width: lg ? '100%' : 120 }}>
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
                <Form.Item name='difficulty' style={{ width: lg ? '100%' : 87 }}>
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
                <Form.Item name='score' style={{ width: lg ? '100%' : 140 }}>
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
                <Form.Item name='status' style={{ width: lg ? '100%' : 150 }}>
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
                <Form.Item name='createdAt' style={{ width: lg ? '100%' : 116 }}>
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
              <ButtonCustom
                onClick={handleReset}
                icon={<LuFilterX size={22} />}
                tooltip={!lg ? 'Xóa bộ lọc' : undefined}
                className={`${lg && 'sp100'}`}
              >
                {lg && 'Xóa bộ lọc'}
              </ButtonCustom>
            </Form.Item>

            {addOnButton && !lg && <Form.Item>{addOnButton}</Form.Item>}
          </Space>
          {!lg && (
            <div>
              <Form.Item name='keyword' style={{ width: 200 }}>
                <Input
                  placeholder='Tìm kiếm...'
                  prefix={<BiSearch size={20} />}
                  onChange={debounce(() => onChangeFilter(), 800)}
                  autoFocus={forcus}
                  allowClear
                />
              </Form.Item>
            </div>
          )}
        </Row>
      </Form>
    )
  }

  if (!lg) return <FormFilter />
  else
    return (
      <Row justify='space-between' style={{ marginBottom: 20 }}>
        <Col span={9} lg={8} md={8}>
          <Form.Item name='keyword'>
            <Input
              placeholder='Tìm kiếm...'
              prefix={<BiSearch size={20} />}
              allowClear
              onChange={debounce(() => onChangeFilter(), 800)}
              autoFocus={forcus}
            />
          </Form.Item>
        </Col>

        <Col>
          <Space>
            {addOnButton && addOnButton}
            <ButtonCustom onClick={() => setOpen(true)}>Lọc</ButtonCustom>
          </Space>
        </Col>
        <DrawerCustom open={open} onClose={() => setOpen(false || !lg)} placement='right' title='Lọc'>
          <FormFilter />
        </DrawerCustom>
      </Row>
    )
}

export default FilterAction
