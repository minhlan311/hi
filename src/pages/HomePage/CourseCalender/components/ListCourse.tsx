import calenderSVG from '@/assets/icons/calendar.svg'
import { Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import { formatDate, formatDaysOfWeek, formatHour, formatPriceVND } from '@/helpers/common'
import { TCourse } from '@/types/course.type'
import { imageFallback } from '@/constants/utils'
import './ListCourse.scss'
import TextWithTooltip from '@/components/TextWithTooltip/TextWithTooltip'

type Props = {
  listData?: TCourse[]
}

export default function ListCourse({ listData }: Props) {
  const navigate = useNavigate()

  const handleClickCourse = (id: string) => {
    navigate({
      pathname: `/courses/` + id,
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
            <TextWithTooltip rows={1} children={item?.name} className='link-h4-config' />

            {item?.class?.map((item) => (
              <>
                <div className='flex'>
                  <img src={calenderSVG} className='icons' alt='' />
                  <TextWithTooltip
                    rows={1}
                    children={
                      <>
                        {' '}
                        Khai giảng {''}
                        {formatDate(item?.startDate)}
                        {''} - Thứ {''}
                        {formatDaysOfWeek(item?.schedules).join('-')}
                        {''} Từ {''} {formatHour(item?.startAt)} - {formatHour(item?.endAt)}
                      </>
                    }
                    className='text-date'
                  />
                </div>
              </>
            ))}
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
