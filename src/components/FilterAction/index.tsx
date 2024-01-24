/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import { debounce } from '@/helpers/common'
import useResponsives from '@/hooks/useResponsives'
import { useQuery } from '@tanstack/react-query'
import { Col, DatePicker, Form, Input, Radio, Row, Select, Space } from 'antd'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { LuFilterX } from 'react-icons/lu'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
import DrawerCustom from '../DrawerCustom/DrawerCustom'

type Props = {
  apiFind: any
  keyFilter: string
  callBackData: React.Dispatch<React.SetStateAction<any>>
  type: 'course' | 'test' | 'question' | 'class' | 'event' | 'user'
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  addOnButton?: React.ReactNode
  limit?: number
  page?: number
  className?: string
  filterQuery?: any
  checkQuery?: boolean | any
  sort?: object
}

const FilterAction = (props: Props) => {
  const {
    type: typeFilter = 'course',
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
    sort = {
      createdAt: '-1',
    },
  } = props

  const [form] = Form.useForm()
  const [open, setOpen] = useState<boolean>(false)
  const [forcus, setForcus] = useState<boolean>(false)
  const location = useLocation().pathname
  const navitgate = useNavigate()
  const { data: categoriesData } = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => {
      return categoryApi.getCategories({ parentId: null })
    },
  })

  const coursesList = categoriesData?.data?.docs?.find((item) => item.name === 'Khóa học')

  const subjectList = coursesList?.children?.map((sj) => {
    return {
      value: sj._id,
      label: sj.name,
    }
  })
  const [categoryId, setCategoryId] = useState('')

  const mentorCate = categoriesData?.data?.docs?.find((item) => item.name === 'Giáo viên')

  const mentorPath = mentorCate?.children?.map((item) => {
    return { label: item.name, value: item._id, slug: item.slug, children: item.children }
  })

  const mentorSub = mentorPath?.find((item) => location.includes(item.slug))

  const cateSelect = coursesList?.children.find((item) => item._id === categoryId)

  const subCateList = cateSelect?.children.map((sj) => {
    return {
      value: sj._id,
      label: sj.name,
    }
  })
  const [filterData, setFilterData] = useState<{ filterQuery: any; options: any } | null>({
    filterQuery: { ...filterQuery, mentorType: mentorSub?.label },
    options: { sort, limit, page },
  })

  const onChangeFilter = () => {
    const {
      categoryId,
      categoryName,
      mentorType,
      subCategoryId,
      plan,
      viewCountDownCount,
      type,
      keyword,
      skill,
      skillName,
      difficulty,
      point,
      status,
      createdAt,
      dates,
    } = form.getFieldsValue()

    const body = {
      type,
      skill,
      skillName,
      mentorType: mentorType || mentorSub?.label,
      difficulty,
      categoryId,
      subCategoryId,
      plan,
      status,
      categoryName: categoryName?.label ? categoryName?.label : categoryName,
      start: typeFilter === 'event' && dates ? moment(dates.$d).startOf('day') : undefined,
      end: typeFilter === 'event' && dates ? moment(dates.$d).endOf('day') : undefined,
      startDate: typeFilter !== 'event' && dates ? dates[0] : undefined,
      endDate: typeFilter !== 'event' && dates ? dates[1] : undefined,
      search: keyword || undefined,
    }

    if (!categoryId) {
      form.setFieldValue('subCategoryId', null)
      delete body.subCategoryId
    }

    setFilterData((prev) => {
      return {
        filterQuery: { ...prev?.filterQuery, ...body },
        options: {
          limit,
          page: 1,
          sort: {
            ...sort,
            point,
            createdAt,
            totalAssessmentsAverages: viewCountDownCount === 'highestRating' ? -1 : undefined,
            countAssessment: viewCountDownCount === 'highestParticipant' ? -1 : undefined,
          },
        },
      }
    })

    setCategoryId(categoryId)

    if (keyword) setForcus(true)
  }

  const handleReset = () => {
    form.resetFields()
    setFilterData({
      filterQuery: { mentorType: mentorSub?.label } || {},
      options: {
        limit,
        page: 1,
        sort,
      },
    })
  }

  const check = subjectList?.find(
    (sj) =>
      mentorSub?.children
        ?.find((item) => location.includes(item.slug))
        ?.name.toLowerCase()
        .includes(sj.label.toLowerCase()),
  )

  useEffect(() => {
    if (mentorSub || check || page)
      setFilterData((prev) => {
        return {
          filterQuery: { mentorType: mentorSub?.label, categoryName: check?.label, ...prev?.filterQuery },
          options: {
            limit,
            page,
            sort: { ...prev?.options.sort },
          },
        }
      })

    form.setFieldsValue({
      categoryName: check?.label || filterQuery?.categoryName,
    })
    form.setFieldsValue({ skillName: filterQuery?.skillName })
    form.setFieldsValue({ mentorType: mentorSub?.label })
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [page, checkQuery, location])

  const { data: filterCallbackData, isLoading } = useQuery({
    queryKey: [keyFilter, filterData, filterQuery],
    queryFn: () => {
      return apiFind(filterData)
    },
    enabled: Boolean(filterQuery) || checkQuery,
  })

  useEffect(() => {
    if (setLoading) {
      setLoading(isLoading)
    }
  }, [isLoading])

  useEffect(() => {
    callBackData(filterCallbackData?.data)
  }, [filterCallbackData])

  const { lg } = useResponsives()

  const FormFilter = () => {
    return (
      <Form form={form} autoComplete='off'>
        <Row justify='space-between' className={className}>
          <Space direction={lg ? 'vertical' : 'horizontal'} className={`${lg && 'sp100'}`}>
            {typeFilter !== 'question' ? (
              <>
                {typeFilter !== 'event' && (
                  <Form.Item
                    name={location.includes('giao-vien') ? 'categoryName' : 'categoryId'}
                    style={{ width: lg ? '100%' : 120 }}
                  >
                    <Select
                      placeholder='Môn học'
                      options={subjectList}
                      onChange={onChangeFilter}
                      allowClear
                      labelInValue={location.includes('giao-vien')}
                    />
                  </Form.Item>
                )}

                {typeFilter === 'course' && (
                  <Form.Item name='subCategoryId' style={{ width: lg ? '100%' : 180 }}>
                    <Select
                      placeholder='Danh mục'
                      options={subCateList}
                      disabled={!categoryId}
                      allowClear
                      onChange={onChangeFilter}
                    />
                  </Form.Item>
                )}

                {(typeFilter === 'class' && (
                  <Form.Item name='dates' style={{ width: lg ? '100%' : 250 }}>
                    <DatePicker.RangePicker format='DD/MM/YYYY' allowClear onChange={onChangeFilter} />
                  </Form.Item>
                )) ||
                  (typeFilter === 'event' && (
                    <Form.Item name='dates' style={{ width: '100%' }}>
                      <DatePicker format='DD/MM/YYYY' allowClear onChange={onChangeFilter} />
                    </Form.Item>
                  )) ||
                  (typeFilter === 'test' ? (
                    <>
                      <Form.Item name='type' style={{ width: lg ? '100%' : 100 }}>
                        <Select
                          placeholder='Loại bài'
                          allowClear
                          onChange={onChangeFilter}
                          options={[
                            {
                              value: 'QUIZ',
                              label: 'Bài quiz',
                            },
                            {
                              value: 'TEST',
                              label: 'Bài test',
                            },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item name='skillName' style={{ width: lg ? '100%' : 120 }}>
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
                    </>
                  ) : (
                    <>
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
                      {typeFilter !== 'user' && (
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
                      )}
                      {typeFilter === 'user' && (
                        <Form.Item name='mentorType'>
                          <Radio.Group
                            value={'Giáo viên Việt Nam'}
                            defaultValue={mentorSub?.label}
                            buttonStyle='solid'
                            className='radio-custom'
                            onChange={onChangeFilter}
                          >
                            {mentorPath?.map((item) => (
                              <Radio.Button
                                value={item.label}
                                onClick={() => navitgate(`/${mentorCate?.slug}/${item.slug}`)}
                              >
                                {item.label}
                              </Radio.Button>
                            ))}
                          </Radio.Group>
                        </Form.Item>
                      )}
                    </>
                  ))}
                {location.includes('mentor') && (
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
                )}
                {typeFilter !== 'event' && typeFilter !== 'user' && (
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
                )}
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
                <Form.Item name='point' style={{ width: lg ? '100%' : 140 }}>
                  <Select
                    placeholder='Điểm số'
                    allowClear
                    onChange={onChangeFilter}
                    options={[
                      {
                        value: '1',
                        label: 'Từ thấp đến cao',
                      },
                      {
                        value: '-1',
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
        <DrawerCustom
          open={open}
          onFinish={() => setOpen(false || !lg)}
          onClose={setOpen}
          placement='right'
          title='Lọc'
        >
          <FormFilter />
        </DrawerCustom>
      </Row>
    )
}

export default FilterAction
