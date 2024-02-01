/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import classApi from '@/apis/class.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import TagCustom from '@/components/TagCustom/TagCustom'
import { ClassState } from '@/interface/class'
import { useQuery } from '@tanstack/react-query'
import { Collapse, Flex, Select, Space, Table, TableColumnsType } from 'antd'
import moment from 'moment-timezone'
import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import style from './styles.module.scss'
type Props = {
  type: 'Online' | 'Offline'
}

const columns: TableColumnsType<any> = [
  { title: 'Ngôn ngữ', key: 'category', width: '20%' },
  {
    title: 'Tên lớp',
    key: 'name',
    width: '25%',
    render: (record: ClassState) => (
      <div>
        <TagCustom content={record.courseData?.name} color='#019d44' colorText='white' />
        <div className={style.classType}>{record.title}</div>
        <Link to={'/profiles/' + record.owner?._id}>
          {record.owner?.gender === 'MALE' ? 'Thầy' : 'Cô'} {record.owner?.fullName}
        </Link>
      </div>
    ),
  },
  {
    title: 'Ngày bắt đầu',
    key: 'startDate',
    width: '15%',
    render: (record: ClassState) => (
      <div>
        <p>{moment(record.startDate).format('DD [tháng] MM, YYYY')}</p>
        <TagCustom
          content={
            (record.limitStudent - record.countStudents <= parseInt(((record.limitStudent * 15) / 100).toFixed(0)) &&
              'almost') ||
            (record.limitStudent === record.countStudents && 'full') ||
            'null'
          }
          intArrType={['full', 'almost', 'null']}
          intAlternativeType={['Full', 'Gần Full', '']}
          intColor={['#d72831', '#fcae1e', '']}
          colorText='white'
        />
      </div>
    ),
  },
  {
    title: 'Ca - Thời gian học',
    key: 'time',
    width: '20%',
    render: (record: ClassState) =>
      record?.event ? (
        <div>
          {record.event.schedules.length > 0 && (
            <p>
              Thứ{' '}
              {record.event.schedules.map((item, id) => (
                <>
                  {item === 0 ? 'CN' : item}
                  {record.event.schedules.length - 1 > id && '/'}
                </>
              ))}
            </p>
          )}
          <p>
            {moment(record.event.start).format('HH:mm')} - {moment(record.event.end).format('HH:mm')}
          </p>
        </div>
      ) : null,
  },
  {
    title: 'Đăng ký',
    key: 'action',
    width: '10%',
    render: (record: ClassState) => (
      <ButtonCustom size='small' href={'/courses/' + record.courseId} type='primary'>
        Đăng ký ngay
      </ButtonCustom>
    ),
  },
]

const ExpandedRowRender = ({
  categoryId,
  type,
  gender,
}: {
  categoryId: string
  type: 'Online' | 'Offline'
  gender: 'MALE' | 'FEMALE' | undefined
}) => {
  const { data: classList } = useQuery({
    queryKey: ['classList' + type, categoryId],
    queryFn: () => {
      return classApi.getClass({
        filterQuery: { categoryId, type: type.toUpperCase() },
        options: { pagination: false },
      })
    },
    enabled: Boolean(categoryId),
  })

  const data = classList?.data.docs
  const filterData = gender ? data?.filter((item) => item.owner.gender === gender) : data

  return (
    <Table
      columns={columns}
      dataSource={filterData}
      pagination={false}
      showHeader={false}
      size='small'
      scroll={{
        x: 720,
      }}
    ></Table>
  )
}

const ScheduleDetail = ({ type }: Props) => {
  const [cateSelect, setCateSelect] = useState<string>('')
  const [genderSelect, setGenderSelect] = useState<'MALE' | 'FEMALE'>()

  const { data: categoriesData } = useQuery({
    queryKey: ['categoriesList'],
    queryFn: () => {
      return categoryApi.getCategories({ parentId: null })
    },
  })
  const cateList = categoriesData?.data?.docs?.find((item) => item.name === 'Khóa học')
  const subjectList = [{ value: 'all', label: 'Tất cả' }]

  const collapseList = cateList?.children?.map((sj) => {
    return {
      value: sj._id,
      label: sj.name,
    }
  })

  const collapseItem = cateSelect ? collapseList?.filter((item) => item.value === cateSelect) : collapseList

  collapseList && subjectList.push(...collapseList)

  return (
    <Space direction='vertical' className={'sp100'} style={{ marginBottom: 48 }}>
      <Flex justify='space-between' align='center'>
        <Space>
          <Select
            placeholder='Ngôn ngữ'
            options={subjectList}
            size='small'
            style={{ width: 110 }}
            onChange={(e) => {
              e == 'all' ? setCateSelect('') : setCateSelect(e)
            }}
            allowClear
          />
          <Select
            placeholder='Thầy/Cô'
            options={[
              { value: 'all', label: 'Tất cả' },
              { value: 'MALE', label: 'Thầy' },
              { value: 'FEMALE', label: 'Cô' },
            ]}
            style={{ width: 90 }}
            onChange={(e) => {
              e == 'all' ? setGenderSelect(undefined) : setGenderSelect(e)
            }}
            size='small'
            allowClear
          />
        </Space>
        <div className={style.type}>{type}</div>
      </Flex>
      <div>
        <Table
          rowKey='key'
          components={{ body: { row: () => null } }}
          columns={columns}
          dataSource={[
            {
              key: '1',
            },
          ]}
          bordered
          pagination={false}
          scroll={{
            x: 720,
          }}
        />
        {collapseItem?.map((item) => (
          <Collapse
            key={item.value}
            items={[
              {
                key: item.value,
                label: item.label,
                children: <ExpandedRowRender categoryId={item.value} type={type} gender={genderSelect} />,
              },
            ]}
            className={style.collapse}
            expandIcon={({ isActive }) => (
              <FaAngleDown
                style={{ transform: `rotate(${isActive ? 180 : 0}deg)`, marginRight: 10, transition: '0.3s' }}
              />
            )}
          />
        ))}
      </div>
    </Space>
  )
}

export default ScheduleDetail
