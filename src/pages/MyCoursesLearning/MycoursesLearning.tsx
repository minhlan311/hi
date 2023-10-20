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
import {
  DownloadOutlined,
  ExpandOutlined,
  FileOutlined,
  FileTextOutlined,
  FolderOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Col, Collapse, Popover, Row, Tooltip } from 'antd'
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
  const { id } = useParams()
  const [video, setVideo] = useState('')
  const [nameVideo, setNameVideo] = useState('')
  const [type, setType] = useState('VIDEO')
  const [document, setDocuemnt] = useState<any>()
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const [exam, setExam] = useState([])
  const [active, setActive] = useState<string>('')
  const { scaleScreen } = useContext(AppContext)
  const examDivRef = useRef<HTMLDivElement | null>(null)

  const toggleFullScreenForExamDiv = () => {
    if (screenfull.isEnabled && examDivRef.current) {
      screenfull.toggle(examDivRef.current)
    } else {
      console.error('Screenfull không hỗ trợ trình duyệt này !')
    }
  }

  const { data: checkEnrolls, isSuccess } = useQuery({
    queryKey: ['enrollsss', id],
    queryFn: () => {
      return enrollsApi.getEnroll({
        filterQuery: {
          userId: profile._id,
          targetId: id,
          targetModel: 'COURSE',
        },
      })
    },
    enabled: profile._id && id ? true : false,
  })

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

  const { data: topics, isLoading } = useQuery({
    queryKey: ['topicLearning', id, checkEnrolls?.data?.docs?.length],
    queryFn: () => {
      return topicApi.getAllTopic({
        filterQuery: {
          parentId: id!,
        },
      })
    },
    enabled: checkEnrolls?.data?.docs?.length ? true : false,
  })

  const dataTopics = topics?.data?.docs

  const myTabs = [
    {
      id: '1',
      name: 'Tổng quan',
      children: (
        <>
          <h3>アプリ開発から業務効率化まで、仕事の幅が広がる「Python」</h3>
          <p>
            [May 2023 Update]: Over 20 videos have been refreshed/added to keep up with the AWS UI changes and exam
            changes [September 2022 Update - SAA-C03]: Over 80 videos have been updated to reflect the NEW SAA-C03 exam
            [April 2022 Update]: Over 30 videos have been refreshed/added to keep up with the AWS UI changes and exam
            changes [October 2021 Update]: Over 100 videos have been refreshed/added to keep up with the AWS UI changes
            and exam changes [April 2021 Update]: Over 100 videos have been refreshed/added to keep up with the AWS UI
            changes and exam changes [Dec 2020 Update]: The S3 section has been entirely re-recorded to accommodate for
            the AWS UI changes [May 2020 Update]: 20+ videos have been updated to keep up with AWS UI changes. [February
            2020 Update - SAA-C02]: The course has been updated for the NEW 2020 exam version. Overall, 80 videos have
            been added or updated, and the course is now 22 hours long. Happy learning! [July 2019 Update]: Few lectures
            refreshed, including AWS Budgets and EC2 placement groups.
          </p>
        </>
      ),
    },
    {
      id: '2',
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
          <h3>アプリ開発から業務効率化まで、仕事の幅が広がる「Python」</h3>
          <p>
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
          </p>
        </>
      ),
    },
  ]

  const { Panel } = Collapse

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

  const handleExam = (id: string, test: any) => {
    setType(TypeLessonEnum.EXAM)
    setActive(id)
    setDocuemnt('')
    setExam(test)
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

  return (
    <div className={style.containerDivQuest}>
      <Row gutter={16}>
        <Col span={scaleScreen ? 24 : 18} className={style.col1}>
          {type === TypeLessonEnum.VIDEO_LESSON ? (
            <div className={style.boxVideoContent}>
              <VideoComponent video={video} names={nameVideo} />
            </div>
          ) : type === TypeLessonEnum.DOCUMENT_LESSON ? (
            <>
              <div className={style.document}>
                {/* <h3>Bài TEXT</h3> */}
                <div
                  ref={examDivRef}
                  style={{
                    lineHeight: '1.4',
                    overflowY: 'auto',
                    height: '100%',
                    background: 'white',
                    padding: '50px',
                  }}
                  dangerouslySetInnerHTML={{ __html: document }}
                ></div>
              </div>
              <div className={style.divTool}>
                <Tooltip title='Cài đặt'>
                  <SettingOutlined className={style.iconScale} />
                </Tooltip>
                <Tooltip title='Toàn màn hình'>
                  <ExpandOutlined className={style.iconScale} onClick={toggleFullScreenForExamDiv} />
                </Tooltip>
              </div>
            </>
          ) : type === TypeLessonEnum.LIVE_LESSON ? (
            <div
              className={style.document}
              style={{
                marginTop: '50px',
              }}
            >
              {/* <h3>Bài LIVE</h3> */}
              <div
                style={{
                  lineHeight: '1.4',
                }}
                dangerouslySetInnerHTML={{ __html: document }}
              ></div>
            </div>
          ) : (
            <>
              <div className={style.document}>
                {/* <h3>Bài test</h3> */}
                <div
                  className='scroll-div'
                  ref={examDivRef}
                  style={{ overflowY: 'auto', height: '100%', background: 'white', padding: '30px 0' }}
                >
                  <ExamCourse data={exam} />
                </div>
              </div>
              <div className={style.divTool}>
                <Tooltip title='Cài đặt'>
                  <SettingOutlined className={style.iconScale} />
                </Tooltip>
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
        <Col span={!scaleScreen ? 6 : 0} className={style.col2}>
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
                      ? dataTopics?.map((item, index) => (
                          <>
                            <Panel
                              key={index}
                              header={<h4>{item?.name}</h4>}
                              extra={
                                <div
                                  style={{
                                    display: 'flex',
                                    gap: '10px',
                                  }}
                                ></div>
                              }
                            >
                              {item?.lessons?.map((lession: any) => (
                                <>
                                  <div
                                    style={{
                                      marginTop: '20px',
                                    }}
                                    className={active === lession?._id ? 'div-flex-active' : 'div-flex'}
                                    onClick={() => {
                                      lession?.type === TypeLessonEnum.VIDEO_LESSON
                                        ? handleVideo(
                                            lession?._id,
                                            lession?.name,
                                            lession?.media,
                                            lession?.descriptions,
                                          )
                                        : lession?.type === TypeLessonEnum.DOCUMENT_LESSON
                                        ? handleDocument(lession?._id, lession?.descriptions)
                                        : lession?.type === TypeLessonEnum.LIVE_LESSON
                                        ? handleLive(lession?._id, lession?.descriptions)
                                        : handleExam(lession?._id, lession?.test)
                                    }}
                                  >
                                    <div>{lession?.name}</div>
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
                                    {lession?.type === TypeLessonEnum.VIDEO_LESSON ? (
                                      <div>
                                        <p>
                                          Thời lượng : {lession?.length} phút {''}
                                        </p>
                                        Thể loại : <PlayCircleOutlined /> video
                                      </div>
                                    ) : lession?.type === TypeLessonEnum.DOCUMENT_LESSON ? (
                                      <p>
                                        Thể loại : <FileOutlined /> Văn bản
                                      </p>
                                    ) : lession?.type === TypeLessonEnum.LIVE_LESSON ? (
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
                                            {lession?.documents?.map((item: any, index: number) => (
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
                                          {lession?.documents?.length > 0 && (
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
      </Row>
    </div>
  )
}
