/* eslint-disable @typescript-eslint/no-explicit-any */
import courseApi from '@/apis/course.api'
import topicApi from '@/apis/topic.api'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import VideoComponent from '@/components/VideoComponent/VideoComponent'
import WrapMore from '@/components/WrapMore/WrapMore'
import { AppContext } from '@/contexts/app.context'
import { DownloadOutlined, FolderOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Collapse, Popover } from 'antd'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import WrapMoreDetail from '../CoursesPage/components/WrapMore/WrapMoreDetail'
import './MycoursesLearning.module.scss'
import style from './MycoursesLearning.module.scss'

export default function MycoursesLearning() {
  const { id } = useParams()
  const [video, setVideo] = useState('')
  const [nameVideo, setNameVideo] = useState('')

  console.log(id, 'ididid')

  const [active, setActive] = useState<string>('')
  const { scaleScreen } = useContext(AppContext)

  const { data } = useQuery({
    queryKey: ['oneCourseslearn', id],
    queryFn: () => {
      return courseApi.getOneCourse(id!)
    },
    enabled: id ? true : false,
  })

  const { data: topics } = useQuery({
    queryKey: ['topicLearning', id],
    queryFn: () => {
      return topicApi.getAllTopic({
        filterQuery: {
          parentId: id!,
        },
      })
    },
    enabled: id ? true : false,
  })

  console.log(data, 'datadata')

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
  }

  return (
    <div className={`  ${!scaleScreen ? style.boxContainerFalse : style.boxContainerTrue} `}>
      <div className={style.col1}>
        <div className={style.boxVideoContent}>
          <VideoComponent video={video} names={nameVideo} />
        </div>

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
          <WrapMoreDetail>
            <div className={style.scroll}>
              {
                <Collapse>
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
                            {' '}
                            {item?.lessons?.map((lession: any) => (
                              <>
                                <div
                                  className={active === lession?.name ? 'div-flex-active' : 'div-flex'}
                                  onClick={() => {
                                    handleVideo(lession?.name, lession?.media)
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
                                  <div>
                                    <p>Thời lượng : {lession?.length} phút</p>
                                  </div>

                                  <div>
                                    <Popover
                                      placement='bottomLeft'
                                      style={{
                                        width: '100px',
                                      }}
                                      title={
                                        <>
                                          <div>
                                            <Button
                                              style={{
                                                width: '150px',
                                              }}
                                            >
                                              {' '}
                                              <DownloadOutlined />
                                              Tài liệu 1
                                            </Button>
                                          </div>
                                          <div
                                            style={{
                                              marginTop: '10px',
                                            }}
                                          >
                                            <Button
                                              style={{
                                                width: '150px',
                                              }}
                                            >
                                              {' '}
                                              <DownloadOutlined />
                                              Tài liệu 2
                                            </Button>
                                          </div>
                                        </>
                                      }
                                      trigger={'click'}
                                    >
                                      <Button>
                                        <FolderOutlined />
                                        Tài liệu
                                      </Button>
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
          </WrapMoreDetail>
        </div>
      </div>
    </div>
  )
}
