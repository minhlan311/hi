import React from 'react'
import { ReactComponent as CalenderSVG } from '../../../../assets/icons/calendar.svg'
import { ROUTERS_URL } from '../../../../constants/routerUrl'
import { Image, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { coursesSelector } from '../../../../slices/course'
import { useConvertSlug } from '../../../../hooks'
import { useHistory } from 'react-router-dom'
import { formatDate, formatDaysOfWeek, formatHour, formatPriceVND } from '../../../../utils/helper'
import settings from '../../../../settings'
export default function ListCourse() {
  const dataCourse = useSelector(coursesSelector)
  const history = useHistory()
  const handleClickCourse = (id, subject, name) => {
    history.push(
      // eslint-disable-next-line react-hooks/rules-of-hooks
      `/courses/${useConvertSlug(subject)}/${useConvertSlug(name)}`,
      {
        courseId: id
      }
    )
  }

  const ArrayCouse = dataCourse?.data?.docs
  console.log(ArrayCouse, 'ArrayCouse')
  return (
    <div className='listCourse'>
      {dataCourse.status === 'loading' ? (
        <div>
          <Spin />
        </div>
      ) : dataCourse.status === 'success' ? (
        <>
          {ArrayCouse?.map((item) => (
            <div
              className='col'
              onClick={() => {
                handleClickCourse(item.id, item.subjectId.name, item.name)
              }}
            >
              <div className='imgCol'>
                <Image className='imgColin' src={settings.FILE_URL + '/' + item?.coverMedia} />
              </div>
              <div className='contentList'>
                <h4 className='link-h4-config'>{item.name}</h4>

                <div className='flex'>
                  <CalenderSVG className='icons' />
                  <p className='text-date'>
                    Khai giảng {''}
                    {formatDate(item?.startDate)}
                    {''} - Thứ {''}
                    {formatDaysOfWeek(item?.schedules).join('-')}
                    {''}
                    <br />
                    Từ {formatHour(item?.startAt)} -{formatHour(item?.endAt)}
                  </p>
                </div>
                <div className='flexPrice'>
                  <span className='name'>Chi phí: </span>
                  <span className='price'>{item?.cost ? formatPriceVND(item?.cost) : 'Free'}</span>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>Không có data</>
      )}
    </div>
  )
}
