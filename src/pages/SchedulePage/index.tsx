import BreadCrumbsDynamic from '@/components/BreadCrumbsDynamic'
import CalendarCustom from '@/components/CalendarCustom'
import Header from '@/components/layout/Header/Header'
import { Space } from 'antd'
import { BiHomeAlt } from 'react-icons/bi'

const SchedulePage = () => {
  return (
    <Header padding={'25px 0 80px'} title='Lịch học của tôi' titleSize={35}>
      <Space direction='vertical' size='large' className='sp100'>
        <BreadCrumbsDynamic homeIcon={<BiHomeAlt />}></BreadCrumbsDynamic>
        <CalendarCustom calendarType='student' />
      </Space>
    </Header>
  )
}

export default SchedulePage
