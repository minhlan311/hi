/* eslint-disable @typescript-eslint/no-explicit-any */

import lessionApi from '@/apis/lession.api'
import topicApi from '@/apis/topic.api'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import PopConfirmAntd from '@/components/PopConfirmAntd/PopConfirmAntd'
import { TopicState } from '@/interface/topic'
import { Topic } from '@/types/course.type'
import { Lession } from '@/types/lession.type'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Collapse } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './CretaeSteps2.scss'
import DrawerCreateExam from './components/DrawerCreateExam'
import DrawerCreateLession from './components/DrawerCreateLession'
import DrawerQuizz from './components/DrawerQuizz'
import DrawerUpdateLession from './components/DrawerUpdateLession'
import DrawerUpdateTopic from './components/DrawerUpdateTopic'

export type MyPageTableOptions<S> = ColumnsType<S>

const CreateSteps2 = ({ dataId }: any) => {
  const [idLess, setIdLess] = useState('')
  const { id } = useParams()
  const [onOpenExam, setOnOpenExam] = useState(false)
  const [onOpenUpdateExam, setOnOpenUpdateExam] = useState(false)
  const [dataUpdateTopic, setDataUpdateTopic] = useState<Topic>()
  const [dataUpdateLession, setDataUpdateLession] = useState<Lession>()
  const [onOpenLession, setOnOpenLession] = useState(false)
  const [onOpenUpdateLession, setOnOpenUpdateLession] = useState(false)
  const [onOpenQuizz, setOnOpenQuizz] = useState(false)
  const [reFetch, setRefetch] = useState<string>('')
  const [dataColl, setDataColl] = useState<TopicState[] | []>([])
  const [dataCollLession, setDataCollLession] = useState<TopicState[] | []>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const callApi = async () => {
      setLoading(true)

      if (id || dataId) {
        try {
          const data = await topicApi.findTopic({
            filterQuery: { parentId: id ? id : dataId },
            options: {
              sort: { createdAt: -1 },
            },
          })

          localStorage.setItem('apiData', JSON.stringify(data?.data?.docs))

          setLoading(false)
          setDataColl(data?.data?.docs as any)
        } catch (error) {
          console.error('Lỗi khi gọi API: ', error)
          setLoading(false)
        }
      }
    }

    callApi()
  }, [dataId, reFetch, dataCollLession, id])

  useEffect(() => {
    localStorage.setItem('apiData', JSON.stringify(dataColl))
  }, [dataColl])

  const mutation = useMutation({
    mutationFn: (id: string) => topicApi.deleteTopic(id!),
    onSuccess: () => {
      setRefetch(reFetch + 1)
      openNotification({
        message: 'Thông báo',
        description: 'Xóa chuyên đề thành công !',
        status: 'success',
      })
    },
  })
  const mutationDelete = useMutation({
    mutationFn: (id: string) => lessionApi.deleteLession(id!),
    onSuccess: () => {
      setRefetch(reFetch + 1)
      openNotification({
        message: 'Thông báo',
        description: 'Xóa bài học thành công !',
        status: 'success',
      })
    },
  })

  const { Panel } = Collapse

  const setLessionId = (id: string) => {
    setOnOpenLession(true)
    setIdLess(id)
  }

  const updateTopic = (item: Topic | undefined) => {
    setDataUpdateTopic(item)
    setOnOpenUpdateExam(true)
  }

  const updateLession = (item: Lession) => {
    setDataUpdateLession(item)
    setOnOpenUpdateLession(true)
  }

  return (
    <>
      <div className='text-end'>
        <div>
          <Button onClick={() => setOnOpenExam(true)} type='default' className='default'>
            <PlusCircleOutlined />
            Thêm chuyên đề mới
          </Button>
        </div>
      </div>
      {loading || mutation.isLoading ? (
        <LoadingCustom />
      ) : (
        <div>
          <div className='collsape'>
            <Collapse>
              {dataColl && dataColl?.length > 0
                ? dataColl?.map((item, index) => (
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
                          >
                            <Button onClick={() => setLessionId(item?.id)} type='primary'>
                              <PlusCircleOutlined />
                              Bài học
                            </Button>
                            <PopConfirmAntd
                              title='Bạn có muốn xóa chuyên đề này không ?'
                              onConfirm={() => mutation.mutate(item._id as string)}
                            >
                              <Button type='default' className='default'>
                                <DeleteOutlined />
                              </Button>
                            </PopConfirmAntd>
                            <Button type='default' className='default' onClick={() => updateTopic(item as any)}>
                              <EditOutlined />
                            </Button>
                          </div>
                        }
                      >
                        {item?.lessons?.map((lession: any) => (
                          <div className='div-flex'>
                            <div>{lession?.name}</div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '10px',
                              }}
                            >
                              <PopConfirmAntd
                                title='Bạn có muốn xóa bài học này không ?'
                                onConfirm={() => mutationDelete.mutate(lession._id as string)}
                              >
                                <Button type='default' className='default'>
                                  <DeleteOutlined />
                                </Button>
                              </PopConfirmAntd>
                              <Button type='default' className='default' onClick={() => updateLession(lession)}>
                                <EditOutlined />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </Panel>
                    </>
                  ))
                : ''}
            </Collapse>
          </div>
          <Button
            style={{
              marginTop: '30px',
            }}
            type='primary'
            onClick={() => {
              navigate('/mentor/courses')
            }}
          >
            Hoàn thành
          </Button>
        </div>
      )}

      <DrawerCreateExam
        userId={dataId || id}
        dataTopic={dataUpdateTopic}
        onOpen={onOpenExam}
        onClose={setOnOpenExam}
        dataCollap={setDataColl}
        reFetchData={setRefetch}
      />

      <DrawerUpdateLession
        userId={dataId}
        idLessCheck={idLess}
        dataUpdateLession={dataUpdateLession}
        onOpen={onOpenUpdateLession}
        onClose={setOnOpenUpdateLession}
        reFetchData={setRefetch}
      />

      <DrawerQuizz
        userId={dataId}
        idLessCheck={idLess}
        dataUpdateLession={dataUpdateLession}
        onOpen={onOpenQuizz}
        onClose={setOnOpenQuizz}
        reFetchData={setRefetch}
      />

      <DrawerUpdateTopic
        userId={dataId}
        dataTopic={dataUpdateTopic}
        onOpen={onOpenUpdateExam}
        onClose={setOnOpenUpdateExam}
        dataCollap={setDataColl}
        reFetchData={setRefetch}
        dataUpdateTopic={dataUpdateTopic}
      />

      <DrawerCreateLession
        idLessCheck={idLess}
        userId={dataId}
        onOpen={onOpenLession}
        onClose={setOnOpenLession}
        dataCollapLession={setDataCollLession}
      />
    </>
  )
}

export default CreateSteps2
