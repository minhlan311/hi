/* eslint-disable @typescript-eslint/no-explicit-any */
import categoryApi from '@/apis/categories.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import TagCustom from '@/components/TagCustom/TagCustom'
import { useQuery } from '@tanstack/react-query'
import { Collapse, Flex, Select, Space, Table, TableColumnsType } from 'antd'
import moment from 'moment-timezone'
import { Link } from 'react-router-dom'
import style from './styles.module.scss'
type Props = {
  type: 'online' | 'offline'
}

const columns: TableColumnsType<any> = [
  { title: 'Ngôn ngữ', dataIndex: 'category', key: 'category', width: '20%' },
  {
    title: 'Tên lớp',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
    render: (record: any) => (
      <div>
        <TagCustom content='Luyện thi lớp 10   ' color='#019d44' colorText='white' />
        <div className={style.classType}>{record.name}</div>
        <Link to={'/profiles/id'}>Cô Lê Anh Thư</Link>
      </div>
    ),
  },

  {
    title: 'Ngày bắt đầu',
    dataIndex: 'startDate',
    key: 'startDate',
    width: '15%',
    render: () => (
      <div>
        <p>{moment().format('DD [tháng] MM, YYYY')}</p>
        <TagCustom
          content='almost'
          intArrType={['full', 'almost', 'null']}
          intAlternativeType={['Full', 'Gần Full', '']}
          intColor={['red', '#fcae1e', 'white']}
          colorText='white'
        />
      </div>
    ),
  },
  {
    title: 'Ca - Thời gian học',
    dataIndex: 'time',
    key: 'time',
    width: '20%',
    render: () => (
      <div>
        <p>Thứ 3/5/7</p>
        <p>
          {moment().format('HH:mm')} - {moment().format('HH:mm')}
        </p>
      </div>
    ),
  },
  {
    title: 'Đăng ký',
    key: 'action',
    width: '10%',
    render: () => (
      <ButtonCustom size='small' href='/' type='primary'>
        Đăng ký ngay
      </ButtonCustom>
    ),
  },
]

const ExpandedRowRender = () => {
  const data = []

  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
    })
  }

  return <Table columns={columns} dataSource={data} pagination={false} showHeader={false} size='small' />
}

const ScheduleDetail = ({ type }: Props) => {
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

  return (
    <Space direction='vertical' className={'sp100'} style={{ marginBottom: 48 }}>
      <Flex justify='space-between' align='center'>
        <Space>
          <Select placeholder='Ngôn ngữ' options={subjectList} size='small' />
          <Select
            placeholder='Thầy/Cô'
            options={[
              { value: 'MALE', label: 'Thầy' },
              { value: 'FAMALE', label: 'Cô' },
            ]}
            size='small'
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
        />
        {subjectList?.map((item) => (
          <Collapse
            key={item.value}
            items={[
              {
                key: item.value,
                label: item.label,
                children: <ExpandedRowRender />,
              },
            ]}
            className={style.collapse}
          />
        ))}
      </div>
    </Space>
  )
}

export default ScheduleDetail
