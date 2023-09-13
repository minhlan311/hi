/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useCallback, useEffect, useState } from 'react'
import './index.scss'
import newImage from '../../../assets/icons/new.png'
import { getAnonouncementRequest, anonouncementSelector } from '../../../slices/announcement'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage } from '../../../services/storage'
import moment from 'moment-timezone'
import 'moment/locale/vi'
import { useMediaQuery } from 'react-responsive'
import { Popover } from 'antd'
moment().locale('vi')
const Announcement = () => {
  const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
  const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
  const dispatch = useDispatch()
  const announcement = useSelector(anonouncementSelector)
  const educationId = getStorage('educationId')
  const [content, setContent] = useState([
    {
      title: 'Chào mừng bạn',
      content: 'Chào mừng bạn đến với hệ thống học trực tuyến của chúng tôi',
      createdAt: '2023-05-25T09:12:20'
    },
    {
      title: 'Chúc bạn học tập tốt',
      content:
        'Hãy luôn kiên trì và đam mê trong hành trình học tập của mình. Chúc bạn học tập thành công và đạt được những ước mơ!',
      createdAt: '2023-05-25T09:12:25'
    }
  ])
  useEffect(() => {
    const body = {
      filterQuery: {
        status: 'ACTIVE',
        educations: educationId
      },
      options: {
        sort: { createdAt: -1 },
        pagination: false
      }
    }
    dispatch(getAnonouncementRequest(body))
  }, [dispatch])

  useEffect(() => {
    if (announcement.status === 'success' && announcement?.data?.length > 0) {
      setContent(announcement?.data)
    }
  }, [announcement])

  const [isHovered, setisHovered] = useState(false)

  const Marquee = useCallback(() => {
    const NotificationItem = ({ data }) => {
      return (
        <div className='marquee-item'>
          <Popover
            content={
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.content
                }}
              ></div>
            }
            title={data?.title}
          >
            <span className='content'>{data.title}</span>
            {moment(data.createdAt).isAfter(moment().subtract(2, 'days')) && (
              <span className='ribbon'>
                <img src={newImage} alt='a'></img>
                <div className='new-content'>new</div>
              </span>
            )}
          </Popover>
        </div>
      )
    }

    const handleMouseLeave = () => {
      setisHovered(false)
    }
    const handleMouseOver = () => {
      setisHovered(true)
    }
    return (
      <div
        className={`${isMobile || isTablet ? 'uc-container-m' : 'uc-container'} announcement`}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <div className={isHovered ? '' : 'fade'}></div>
        {isHovered ? (
          <div className='marquee-list'>
            {content.map((notification, id) => (
              <NotificationItem key={id} data={notification} />
            ))}
          </div>
        ) : (
          <marquee direction='up' scrolldelay='200'>
            {content.map((notification, id) => (
              <NotificationItem key={id} data={notification} />
            ))}
          </marquee>
        )}
      </div>
    )
  }, [isHovered, setisHovered, content])

  return <Marquee />
}

export default Announcement
