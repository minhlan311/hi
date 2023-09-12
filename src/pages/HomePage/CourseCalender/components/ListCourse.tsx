import calenderSVG from '@/assets/icons/calendar.svg'
import { Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import useConvertSlug from '@/hooks/useConvertSlug'
import { formatDate, formatDaysOfWeek, formatHour, formatPriceVND } from '@/helpers/common'
import { TCourse } from '@/types/course.type'

type Props = {
  listData?: TCourse[]
}

export default function ListCourse({ listData }: Props) {
  const navigate = useNavigate()
  const handleClickCourse = (id: string, subject: string, name: string) => {
    navigate({
      // eslint-disable-next-line react-hooks/rules-of-hooks
      pathname: `/courses/${useConvertSlug(subject)}/${useConvertSlug(name)}`
    })
  }

  console.log(listData, 'ArrayCouse')
  return (
    <div className='listCourse'>
      {listData?.map((item) => (
        <div
          className='col'
          onClick={() => {
            handleClickCourse(item._id, item.category.name, item?.name)
          }}
        >
          <div className='imgCol'>
            <Image className='imgColin' src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverMedia} />
          </div>
          <div className='contentList'>
            <h4 className='link-h4-config'>{item.name}</h4>

            <div className='flex'>
              <img src={calenderSVG} className='icons' alt='' />
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
    </div>
  )
}
