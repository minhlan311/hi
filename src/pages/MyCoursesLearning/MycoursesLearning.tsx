/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import enrollsApi from '@/apis/enrolls.api'
import topicApi from '@/apis/topic.api'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import VideoComponent from '@/components/VideoComponent/VideoComponent'
import WrapMore from '@/components/WrapMore/WrapMore'
import { AppContext } from '@/contexts/app.context'
import {
  DownloadOutlined,
  FileOutlined,
  FileTextOutlined,
  FolderOutlined,
  PlayCircleOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Collapse, Popover } from 'antd'
import FileSaver from 'file-saver'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './MycoursesLearning.module.scss'
import style from './MycoursesLearning.module.scss'

import { TypeLessonEnum } from '@/constants'
import JSZip from 'jszip'
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
        <div>
          <h3>デッサンを学んでクリエイティブスキルを高める</h3>
          <p>
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
          </p>
          <hr className={style.hr} />
          <h3>デッサンを学んでクリエイティブスキルを高める</h3>
          <p>
            {' '}
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
          </p>
        </div>
      ),
    },
    {
      id: '2',
      name: 'Tài liệu',
      children: (
        <>
          <h3>アプリ開発から業務効率化まで、仕事の幅が広がる「Python」</h3>
          <p>
            {' '}
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
            絵を描くことはあらゆる芸術の基礎ですが、ストレス解消や創造性の発展にとっても効果を発揮します。絵を描くことで、対象を観察して、細部に注意を向け、自分自身を表現する方法を習得できます。
          </p>
          <hr className={style.hr} />
          <h3>アプリ開発から業務効率化まで、仕事の幅が広がる「Python」</h3>{' '}
          <p>
            {' '}
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

  const handleVideo = (id: string, name: string, video: string) => {
    setActive(id)
    setNameVideo(name)
    setVideo(video)
    setType(TypeLessonEnum.VIDEO_LESSON)
  }

  const handleDocument = (id: string, desc: string) => {
    setType(TypeLessonEnum.DOCUMENT_LESSON)
    setDocuemnt(desc)
    setActive(id)
  }

  const handleExam = (id: string, test: any) => {
    setType(TypeLessonEnum.EXAM)
    setActive(id)
    setExam(test)
  }

  const handleLive = (id: string) => {
    setType(TypeLessonEnum.LIVE_LESSON)
    setActive(id)
  }

  // const extractQuestions = (data: any) => {
  //   let questionsArray: any[] = []

  //   data?.forEach((course: any) => {
  //     course.lessons.forEach((lesson: any) => {
  //       lesson.test.forEach((test: any) => {
  //         questionsArray = questionsArray?.concat(test.questions)
  //       })
  //     })
  //   })

  //   return questionsArray
  // }

  // const questions = extractQuestions(topics?.data?.docs)

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
    <div className={`  ${!scaleScreen ? style.boxContainerFalse : style.boxContainerTrue} `}>
      <div className={style.col1}>
        {type === TypeLessonEnum.VIDEO_LESSON ? (
          <div className={style.boxVideoContent}>
            <VideoComponent video={video} names={nameVideo} />
          </div>
        ) : type === TypeLessonEnum.DOCUMENT_LESSON ? (
          <div className={style.document}>
            {/* <h3>Bài TEXT</h3> */}
            <div
              style={{
                lineHeight: '1.4',
              }}
              dangerouslySetInnerHTML={{ __html: document }}
            ></div>
          </div>
        ) : type === TypeLessonEnum.LIVE_LESSON ? (
          <div className={style.document}>
            {/* <h3>Bài LIVE</h3> */}
            <div
              style={{
                lineHeight: '1.4',
              }}
              dangerouslySetInnerHTML={{ __html: document }}
            ></div>
          </div>
        ) : (
          <div className={style.document}>
            {/* <h3>Bài test</h3> */}
            <div>
              <ExamCourse data={exam} />
            </div>
          </div>
        )}

        <div className={style.boxTabs}>
          <WrapMore maxWidth='100%' wrapper={'nonBorder'} title=''>
            <TabsCustom data={myTabs} />
          </WrapMore>
        </div>
      </div>
      <div hidden={scaleScreen} className={style.col2}>
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
                                      ? handleVideo(lession?._id, lession?.name, lession?.media)
                                      : lession?.type === TypeLessonEnum.DOCUMENT_LESSON
                                      ? handleDocument(lession?._id, lession?.descriptions)
                                      : lession?.type === TypeLessonEnum.LIVE_LESSON
                                      ? handleLive(lession?._id)
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
                                      {' '}
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
                            ))}{' '}
                          </Panel>
                        </>
                      ))
                    : ''}
                </Collapse>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
