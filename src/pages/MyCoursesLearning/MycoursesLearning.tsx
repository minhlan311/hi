/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import enrollsApi from '@/apis/enrolls.api'
import topicApi from '@/apis/topic.api'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import VideoComponent from '@/components/VideoComponent/VideoComponent'
import { TypeLessonEnum } from '@/constants'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'

import {
  DownloadOutlined,
  ExpandOutlined,
  FileOutlined,
  FileTextOutlined,
  FolderOutlined,
  LeftCircleOutlined,
  PlayCircleOutlined,
  RightCircleOutlined,
  SettingOutlined,
  VideoCameraOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Col, Collapse, Popover, Row, Switch, Tooltip } from 'antd'
import FileSaver from 'file-saver'
import JSZip from 'jszip'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import screenfull from 'screenfull'
import './MycoursesLearning.module.scss'
import style from './MycoursesLearning.module.scss'
import ExamCourse from './components/ExamCourse'
interface FileItem {
  name: string
  url?: string
  type?: string
}

export default function MycoursesLearning() {
  const queryClient = useQueryClient()
  const { id } = useParams()
  const [video, setVideo] = useState('')
  const [nameVideo, setNameVideo] = useState('')
  const [type, setType] = useState('DOCUMENT')
  const [nameExam, setNameExam] = useState('')
  const [document, setDocuemnt] = useState<any>()
  const [dark, setDark] = useState<boolean>()
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const [exam, setExam] = useState([])
  const [active, setActive] = useState<string>('')
  const { scaleScreen } = useContext(AppContext)
  const examDivRef = useRef<HTMLDivElement | null>(null)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const { Panel } = Collapse

  const onChange = (checked: boolean) => {
    setDark(checked)
  }

  const dataProfile = queryClient.getQueryData<any>(['userDetail'])

  const toggleFullScreenForExamDiv = () => {
    if (screenfull.isEnabled && examDivRef.current) {
      screenfull.toggle(examDivRef.current)
    } else {
      console.error('Screenfull không hỗ trợ trình duyệt này !')
    }
  }

  const { lg } = useResponsives()

  const joinClass = dataProfile?.data?.classData?.find((item: any) => item?.courseId === id)

  const { data: checkEnrolls, isSuccess } = useQuery({
    queryKey: ['enrollsss', id],
    queryFn: () => {
      return enrollsApi.findEnroll({
        filterQuery: {
          userId: profile._id,
          targetId: id,
          targetModel: 'COURSE',
        },
      })
    },
    enabled: profile._id && id ? true : false,
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Thêm dòng này để cuộn mượt mà
    })
  }

  useEffect(() => {
    if (isSuccess && !checkEnrolls?.data?.docs?.length) {
      openNotification({
        status: 'error',
        description: 'Bạn chưa mua khóa học này',
        message: 'Thông báo',
      })
      navigate('/')
    }
  }, [isSuccess, checkEnrolls?.data?.docs?.length])

  const { data: topicsData, isLoading } = useQuery({
    queryKey: ['topicLearning', id, checkEnrolls?.data?.docs?.length],
    queryFn: () => {
      return topicApi.findTopic({
        filterQuery: {
          parentId: id!,
        },
      })
    },
    enabled: checkEnrolls?.data?.docs?.length ? true : false,
  })

  const dataTopics = topicsData?.data?.docs
  const lessonsFlat =
    dataTopics && Array.isArray(dataTopics) && dataTopics?.map((course: any) => course.lessons)?.flat()

  useEffect(() => {
    if (lessonsFlat && lessonsFlat.length > 0) {
      handleLessonType(lessonsFlat[currentLessonIndex])
    }
  }, [lessonsFlat])

  const myTabs = [
    {
      id: '1',
      name: lg ? 'Nội dung' : '',
      children: (
        <>
          {lg ? (
            <Col xs={24} xl={!scaleScreen ? 6 : 0} className={style.col2}>
              <div className={style.onBoxCol2}>
                <div>
                  <h4 className={style.h4Col2}>Nội dung khóa học</h4>
                </div>
                {isLoading ? (
                  <LoadingCustom
                    style={{
                      marginTop: '30px',
                    }}
                  />
                ) : (
                  <div className={style.scroll}>
                    {
                      <Collapse accordion defaultActiveKey={['1']}>
                        {Array.isArray(dataTopics) && dataTopics?.length > 0
                          ? dataTopics?.map((course, courseIndex) => (
                              <>
                                <Panel
                                  key={courseIndex.toString()}
                                  header={<h4>{course?.name}</h4>}
                                  extra={
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                      {/* Bạn có thể thêm các phần tử nút điều khiển ở đây nếu cần */}
                                    </div>
                                  }
                                >
                                  {course?.lessons?.map((lesson: any, lessonIndex: number) => (
                                    <>
                                      <div
                                        key={lesson._id.toString()}
                                        onClick={() => handleLessonClick(courseIndex, lessonIndex, lesson)}
                                        style={{ marginTop: '20px' }}
                                        className={active === lesson?._id ? 'div-flex-active' : 'div-flex'}
                                      >
                                        <div>{lesson?.name}</div>
                                        <div
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: '10px',
                                          }}
                                        >
                                          {/* Bạn có thể thêm các phần tử điều khiển khác ở đây nếu cần */}
                                        </div>
                                      </div>
                                      <div className={style.flexBest}>
                                        {lesson?.type === TypeLessonEnum.VIDEO_LESSON ? (
                                          <div>
                                            <p>Thời lượng: {lesson?.length} phút</p>
                                            Thể loại: <PlayCircleOutlined /> video
                                          </div>
                                        ) : lesson?.type === TypeLessonEnum.DOCUMENT_LESSON ? (
                                          <p>
                                            Thể loại: <FileOutlined /> Văn bản
                                          </p>
                                        ) : lesson?.type === TypeLessonEnum.LIVE_LESSON ? (
                                          <p>
                                            Thể loại: <VideoCameraOutlined /> live
                                          </p>
                                        ) : (
                                          <p>
                                            Thể loại: <FileTextOutlined /> Bài kiểm tra
                                          </p>
                                        )}

                                        <div>
                                          <Popover
                                            placement='bottomLeft'
                                            style={{ maxWidth: '100px' }}
                                            title={
                                              <>
                                                {lesson?.documents?.map((item: any, index: number) => (
                                                  <Button
                                                    key={index}
                                                    style={{ width: '150px', margin: '0 5px' }}
                                                    onClick={() => handleDownload(item?.files)}
                                                  >
                                                    <DownloadOutlined />
                                                    Tài liệu {index + 1}
                                                  </Button>
                                                ))}
                                              </>
                                            }
                                            trigger={'click'}
                                          >
                                            {lesson?.documents?.length > 0 && (
                                              <Button>
                                                <FolderOutlined />
                                                Tài liệu
                                              </Button>
                                            )}
                                          </Popover>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </Panel>
                              </>
                            ))
                          : ''}
                      </Collapse>
                    }
                  </div>
                )}
              </div>
            </Col>
          ) : (
            ''
          )}
        </>
      ),
    },
    {
      id: '2',
      name: 'Tổng quan',
      children: (
        <>
          <h3>アプリ開発から業務効率化まで、仕事の幅が広がる「Python」</h3>
        </>
      ),
    },
    {
      id: '3',
      name: 'Tài liệu',
      children: (
        <>
          <h3>アプリ開発から業務効率化まで、仕事の幅が広がる「Python」</h3>
          <p>
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
          </p>
          <hr className={style.hr} />
          <h3>アプリ開発から業務効率化まで、仕事の幅が広がる「Python」</h3>{' '}
        </>
      ),
    },
  ]

  const handleVideo = (id: string, name: string, video: string, document: any) => {
    setActive(id)
    setNameVideo(name)
    setVideo(video)
    setType(TypeLessonEnum.VIDEO_LESSON)
    setDocuemnt(document)
  }

  const handleDocument = (id: string, desc: string) => {
    setType(TypeLessonEnum.DOCUMENT_LESSON)
    setDocuemnt(desc)
    setActive(id)
  }

  const handleExam = (id: string, test: any, name: string) => {
    setType(TypeLessonEnum.EXAM)
    setActive(id)
    setDocuemnt('')
    setExam(test)
    setNameExam(name)
  }

  const handleLive = (id: string, desc: string) => {
    setType(TypeLessonEnum.LIVE_LESSON)
    setActive(id)
    setDocuemnt(desc)
  }

  async function mapWithConcurrency<T, R>(
    items: T[],
    mapper: (item: T) => Promise<R>,
    concurrency: number,
  ): Promise<R[]> {
    const results: R[] = []
    let current = 0

    const executeNext = async (): Promise<void> => {
      if (current >= items?.length) return

      const item = items[current]
      current++

      results.push(await mapper(item))

      return executeNext()
    }

    const workers = Array.from({ length: concurrency }).map(() => executeNext())
    await Promise.all(workers)

    return results
  }

  const download = (url: string): Promise<Blob> => {
    return fetch(url).then((resp) => resp.blob())
  }

  const downloadByGroup = async (urls: (string | null)[], files_per_group = 10): Promise<(Blob | undefined)[]> => {
    return mapWithConcurrency(
      urls,
      async (url) => {
        if (!url) return

        return await download(url)
      },
      files_per_group,
    )
  }

  const exportZip = (blobs: (Blob | undefined)[], files: FileItem[]): void => {
    const zip = new JSZip()

    blobs.forEach((blob, i) => {
      if (blob) {
        zip.file(`${files[i].name}`, blob)
      }
    })

    zip.generateAsync({ type: 'blob' }).then((zipFile) => {
      const currentDate = new Date().getTime()
      const fileName = `Tài liệu-${currentDate}.zip`
      FileSaver.saveAs(zipFile, fileName)
    })
  }

  const handleDownload = (listFile: FileItem[]): void => {
    const validUrls = listFile.map((e) => {
      if (e.url) {
        return `${import.meta.env.VITE_FILE_ENDPOINT}/${e.url}`
      }

      return null
    })

    downloadByGroup(validUrls, 10).then((blobs) => {
      exportZip(blobs, listFile)
    })
  }

  const handleLessonType = (lesson: any) => {
    if (!lesson) {
      console.error('Bài học không tồn tại!')

      return
    }

    if (lesson.type === TypeLessonEnum.VIDEO_LESSON) {
      handleVideo(lesson._id, lesson.name, lesson.media, lesson.descriptions)
    } else if (lesson.type === TypeLessonEnum.DOCUMENT_LESSON) {
      handleDocument(lesson._id, lesson.descriptions)
    } else if (lesson.type === TypeLessonEnum.LIVE_LESSON) {
      handleLive(lesson._id, lesson.descriptions)
    } else {
      handleExam(lesson._id, lesson.test, lesson.name)
    }
  }

  const getNextLesson = () => {
    if (lessonsFlat && currentLessonIndex + 1 < lessonsFlat.length) {
      setCurrentLessonIndex((prevIndex) => prevIndex + 1)
      handleLessonType(lessonsFlat && lessonsFlat[currentLessonIndex + 1])
    } else {
      console.log('Hết khóa học')
    }
  }

  const getPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prevIndex) => prevIndex - 1)
      handleLessonType(lessonsFlat && lessonsFlat[currentLessonIndex - 1])
    } else {
      console.log('Đã ở bài học đầu tiên')
    }
  }

  const handleLessonClick = (courseIndex: number, lessonIndex: number, lesson: any) => {
    let flatIndex = 0
    scrollToTop()

    for (let i = 0; i < courseIndex; i++) {
      if (dataTopics && Array.isArray(dataTopics)) {
        flatIndex += dataTopics[i]?.lessons?.length || 0
      }
    }

    flatIndex += lessonIndex

    setCurrentLessonIndex(flatIndex)
    handleLessonType(lesson)
  }

  return (
    <div className={style.containerDivQuest}>
      <Row gutter={16}>
        <Col xs={24} xl={scaleScreen ? 24 : 18} className={style.col1}>
          {type === TypeLessonEnum.VIDEO_LESSON ? (
            <>
              <div className={style.boxVideoContent}>
                <VideoComponent video={video} names={nameVideo} />
              </div>
              <div className={style.divTool}>
                <Tooltip title='Bài học trước'>
                  <LeftCircleOutlined className={style.iconScale} onClick={getPreviousLesson} />
                </Tooltip>
                <Tooltip title='Bài học tiếp '>
                  <RightCircleOutlined className={style.iconScale} onClick={getNextLesson} />
                </Tooltip>

                {/* <Tooltip title='Cài đặt'>
                  <SettingOutlined className={style.iconScale} />
                </Tooltip> */}
                <Tooltip title='Báo cáo video không phù hợp'>
                  <WarningOutlined className={style.iconScale} />
                </Tooltip>
              </div>
            </>
          ) : type === TypeLessonEnum.DOCUMENT_LESSON ? (
            <>
              <div
                className={style.document}
                style={{
                  background: dark ? '#262626' : 'white',
                }}
              >
                {/* <h3>Bài TEXT</h3> */}
                <div
                  ref={examDivRef}
                  className={dark ? style.divInnerHtmlDark : style.divInnerHtml}
                  dangerouslySetInnerHTML={{ __html: document }}
                ></div>
              </div>
              <div className={style.divTool}>
                <Tooltip title='Bài học trước'>
                  <LeftCircleOutlined className={style.iconScale} onClick={getPreviousLesson} />
                </Tooltip>
                <Tooltip title='Bài học tiếp '>
                  <RightCircleOutlined className={style.iconScale} onClick={getNextLesson} />
                </Tooltip>
                <Tooltip
                  trigger={'click'}
                  title={
                    <div
                      style={{
                        padding: '10px',
                      }}
                      className={'flex'}
                    >
                      <div>Chế độ tối</div>
                      <div>
                        <Switch onChange={onChange} />
                      </div>
                    </div>
                  }
                >
                  <SettingOutlined className={style.iconScale} />
                </Tooltip>
                <Tooltip title='Toàn màn hình'>
                  <ExpandOutlined className={style.iconScale} onClick={toggleFullScreenForExamDiv} />
                </Tooltip>
              </div>
            </>
          ) : type === TypeLessonEnum.LIVE_LESSON ? (
            <>
              <div
                className={style.document}
                style={{
                  paddingTop: '50px',
                }}
              >
                <div
                  style={{
                    lineHeight: '1.4',
                  }}
                >
                  {joinClass && joinClass?._id ? (
                    <p>
                      Đây là bài học trực tuyến
                      <a
                        style={{
                          margin: '0 5px',
                          fontWeight: '700',
                        }}
                        href={`/schedule?classId=${joinClass?._id}`}
                        target='blank'
                      >
                        Bấm vào đây
                      </a>
                      để xem lịch học của bạn
                    </p>
                  ) : (
                    <h3>Bạn chưa được xếp lớp nào !</h3>
                  )}
                </div>
              </div>
              <div className={style.divTool}>
                <Tooltip title='Bài học trước'>
                  <LeftCircleOutlined className={style.iconScale} onClick={getPreviousLesson} />
                </Tooltip>
                <Tooltip title='Bài học tiếp '>
                  <RightCircleOutlined className={style.iconScale} onClick={getNextLesson} />
                </Tooltip>
              </div>
            </>
          ) : (
            <>
              <div className={style.document}>
                {/* <h3>Bài test</h3> */}
                <div
                  className={'scroll-div'}
                  ref={examDivRef}
                  style={{ overflowY: 'auto', height: '100%', background: 'white', padding: '30px 0' }}
                >
                  <ExamCourse data={exam} name={nameExam} />
                </div>
              </div>
              <div className={style.divTool}>
                <Tooltip title='Bài học trước'>
                  <LeftCircleOutlined className={style.iconScale} onClick={getPreviousLesson} />
                </Tooltip>
                <Tooltip title='Bài học tiếp '>
                  <RightCircleOutlined className={style.iconScale} onClick={getNextLesson} />
                </Tooltip>

                {/* <Tooltip title='Gợi ý'>
                  <QuestionCircleOutlined className={style.iconScale} />
                </Tooltip> */}
                <Tooltip title='Toàn màn hình'>
                  <ExpandOutlined className={style.iconScale} onClick={toggleFullScreenForExamDiv} />
                </Tooltip>
              </div>
            </>
          )}

          <div className={style.boxTabs}>
            <TabsCustom data={myTabs} />
          </div>
        </Col>
        {!lg ? (
          <Col xs={24} xl={!scaleScreen ? 6 : 0} className={style.col2}>
            <div className={style.onBoxCol2}>
              <div>
                <h4 className={style.h4Col2}>Nội dung khóa học</h4>
              </div>
              {isLoading ? (
                <LoadingCustom
                  style={{
                    marginTop: '30px',
                  }}
                />
              ) : (
                <div className={style.scroll}>
                  {
                    <Collapse destroyInactivePanel>
                      {Array.isArray(dataTopics) && dataTopics?.length > 0
                        ? dataTopics?.map((course, courseIndex) => (
                            <>
                              <Panel
                                key={courseIndex}
                                header={<h4>{course?.name}</h4>}
                                extra={
                                  <div
                                    style={{
                                      display: 'flex',
                                      gap: '10px',
                                    }}
                                  ></div>
                                }
                              >
                                {course?.lessons?.map((lesson: any, lessonIndex: number) => (
                                  <>
                                    <div
                                      key={lesson._id}
                                      onClick={() => handleLessonClick(courseIndex, lessonIndex, lesson)}
                                      style={{
                                        marginTop: '20px',
                                      }}
                                      className={active === lesson?._id ? 'div-flex-active' : 'div-flex'}
                                    >
                                      <div>{lesson?.name}</div>
                                      <div
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                          gap: '10px',
                                        }}
                                      ></div>
                                    </div>
                                    <div className={style.flexBest}>
                                      {lesson?.type === TypeLessonEnum.VIDEO_LESSON ? (
                                        <div>
                                          <p>
                                            Thời lượng : {lesson?.length} phút {''}
                                          </p>
                                          Thể loại : <PlayCircleOutlined /> video
                                        </div>
                                      ) : lesson?.type === TypeLessonEnum.DOCUMENT_LESSON ? (
                                        <p>
                                          Thể loại : <FileOutlined /> Văn bản
                                        </p>
                                      ) : lesson?.type === TypeLessonEnum.LIVE_LESSON ? (
                                        <p>
                                          Thể loại : <VideoCameraOutlined /> live
                                        </p>
                                      ) : (
                                        <p>
                                          Thể loại : <FileTextOutlined /> Bài kiểm tra
                                        </p>
                                      )}

                                      <div>
                                        <Popover
                                          placement='bottomLeft'
                                          style={{
                                            maxWidth: '100px',
                                          }}
                                          title={
                                            <>
                                              {lesson?.documents?.map((item: any, index: number) => (
                                                <>
                                                  <Button
                                                    style={{
                                                      width: '150px',
                                                      margin: '0 5px',
                                                    }}
                                                    onClick={() => handleDownload(item?.files)}
                                                  >
                                                    <DownloadOutlined />
                                                    Tài liệu {index + 1}
                                                  </Button>
                                                </>
                                              ))}
                                            </>
                                          }
                                          trigger={'click'}
                                        >
                                          <>
                                            {lesson?.documents?.length > 0 && (
                                              <Button>
                                                <FolderOutlined />
                                                Tài liệu
                                              </Button>
                                            )}
                                          </>
                                        </Popover>
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </Panel>
                            </>
                          ))
                        : ''}
                    </Collapse>
                  }
                </div>
              )}
            </div>
          </Col>
        ) : (
          ''
        )}
      </Row>
    </div>
  )
}
