/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import topicApi from '@/apis/topic.api'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import VideoComponent from '@/components/VideoComponent/VideoComponent'
import WrapMore from '@/components/WrapMore/WrapMore'
import { AppContext } from '@/contexts/app.context'
import FileSaver from 'file-saver'
import { DownloadOutlined, FolderOutlined, VideoCameraOutlined, FileOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Collapse, Popover } from 'antd'
import { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './MycoursesLearning.module.scss'
import style from './MycoursesLearning.module.scss'
import LoadingCustom from '@/components/LoadingCustom'
import enrollsApi from '@/apis/enrolls.api'
import openNotification from '@/components/Notification'
import { Promise } from 'bluebird'
import JSZip from 'jszip'

export default function MycoursesLearning() {
  const { id } = useParams()
  const [video, setVideo] = useState('')
  const [nameVideo, setNameVideo] = useState('')
  const [type, setType] = useState('')
  const [document, setDocuemnt] = useState<any>()
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
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

  // const dataCourse = data?.data?.topics
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

  const handleVideo = (name: string, video: string) => {
    setActive(name)
    setNameVideo(name)
    setVideo(video)
    setType('video')
  }

  const handleDocument = (name: string, desc: string) => {
    setType('document')
    setDocuemnt(desc)
    setActive(name)
  }

  const download = (url: any) => {
    return fetch(url).then((resp) => resp.blob())
  }

  const downloadByGroup = (urls: any, files_per_group = 10) => {
    return Promise?.map(
      urls,
      async (url: any) => {
        if (!url) return
        await download(url)
      },
      { concurrency: files_per_group },
    )
  }

  const exportZip = (blobs: any, files: any) => {
    const zip = JSZip()
    blobs.forEach((blob: any, i: any) => {
      zip.file(`${files[i].name}`, blob)
    })
    zip.generateAsync({ type: 'blob' }).then((zipFile) => {
      const currentDate = new Date().getTime()
      const fileName = `Tài liệu-${currentDate}.zip`

      return FileSaver.saveAs(zipFile, fileName)
    })
  }

  const handleDownload = (link: any) => {
    downloadByGroup(
      link.map((e: any) => {
        if (e.url) {
          return `${import.meta.env.VITE_SERVICE_ENDPOINT}/${e?.url}`
        } else {
          return null
        }
      }),
      10,
    ).then((blobs: any) => {
      exportZip(blobs, link)
    })
  }

  return (
    <div className={`  ${!scaleScreen ? style.boxContainerFalse : style.boxContainerTrue} `}>
      <div className={style.col1}>
        {type === 'video' ? (
          <div className={style.boxVideoContent}>
            <VideoComponent video={video} names={nameVideo} />
          </div>
        ) : (
          <div className={style.document}>
            <div dangerouslySetInnerHTML={{ __html: document }}></div>
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
                                  className={active === lession?.name ? 'div-flex-active' : 'div-flex'}
                                  onClick={() => {
                                    lession?.media !== 'null'
                                      ? handleVideo(lession?.name, lession?.media)
                                      : handleDocument(lession?.name, lession?.descriptions)
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
                                  {lession?.media !== 'null' ? (
                                    <div>
                                      <p>
                                        Thời lượng : {lession?.length} phút {''}
                                      </p>
                                      Thể loại : <VideoCameraOutlined /> : video
                                    </div>
                                  ) : (
                                    <>
                                      <p>
                                        Thể loại : <FileOutlined /> : Văn bản
                                      </p>
                                    </>
                                  )}

                                  <div>
                                    <Popover
                                      placement='bottomLeft'
                                      style={{
                                        width: '100px',
                                      }}
                                      title={
                                        <>
                                          {lession?.documents?.map((item: any) => (
                                            <>
                                              <Button
                                                style={{
                                                  width: '150px',
                                                }}
                                                onClick={() => handleDownload(item?.files)}
                                              >
                                                <DownloadOutlined />
                                                tài liệu
                                              </Button>
                                            </>
                                          ))}
                                        </>
                                      }
                                      trigger={'click'}
                                    >
                                      {lession?.documents?.map((item: any) => (
                                        <>
                                          {item?.files?.length && (
                                            <Button>
                                              <FolderOutlined />
                                              Tài liệu
                                            </Button>
                                          )}
                                        </>
                                      ))}
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
