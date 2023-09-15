import calenderSVG from '@/assets/icons/calendar.svg'
import { Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import { formatDate, formatDaysOfWeek, formatHour, formatPriceVND } from '@/helpers/common'
import { TCourse } from '@/types/course.type'
import { imageFallback } from '@/constants/utils'

type Props = {
  listData?: TCourse[]
}

export default function ListCourse({ listData }: Props) {
  const navigate = useNavigate()
  const handleClickCourse = (id: string) => {
    navigate({
      // eslint-disable-next-line react-hooks/rules-of-hooks
      pathname: `/courses/` + id
    })
  }

  return (
    <div className='listCourse'>
      {listData?.map((item) => (
        <div
          key={item._id}
          className='col'
          onClick={() => {
            handleClickCourse(item?._id)
          }}
        >
          <div className='imgCol'>
            <Image
              fallback={imageFallback}
              className='imgColin'
              src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.coverMedia}
            />
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
