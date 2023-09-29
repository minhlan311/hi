/* eslint-disable @typescript-eslint/no-explicit-any */

import lessionApi from '@/apis/lession.api'
import topicApi from '@/apis/topic.api'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import PopConfirmAntd from '@/components/PopConfirmAntd/PopConfirmAntd'
import { TopicList } from '@/interface/topic'
import { Topic } from '@/types/course.type'
import { Lession } from '@/types/lession.type'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Collapse } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import './CretaeSteps2.scss'
import DrawerCreateExam from './components/DrawerCreateExam'
import DrawerCreateLession from './components/DrawerCreateLession'
import DrawerUpdateLession from './components/DrawerUpdateLession'
import DrawerUpdateTopic from './components/DrawerUpdateTopic'
import { useNavigate, useParams } from 'react-router-dom'
import DrawerQuizz from './components/DrawerQuizz'

export type MyPageTableOptions<S> = ColumnsType<S>

const CreateSteps2 = ({ dataId, stepNext, stepPrev }: any) => {
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
  const [dataColl, setDataColl] = useState<TopicList[] | []>([])
  const [dataCollLession, setDataCollLession] = useState<TopicList[] | []>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const callApi = async () => {
      setLoading(true)
      const data = await topicApi.getAllTopic({
        filterQuery: { parentId: id ? id : dataId },
        options: { limit: 10, createAt: 1 },
      })
      setLoading(false)
      setDataColl(data?.data?.docs as any)
    }

    dataId ? callApi() : ''

    return
  }, [dataId, reFetch, dataCollLession, id])

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

  const updateQuizz = (item: Lession) => {
    setDataUpdateLession(item)
    setOnOpenQuizz(true)
  }

  return (
    <>
      <div className='text-end'>
        <div>
          <Button onClick={() => setOnOpenExam(true)} type='dashed' className='dashed'>
            <PlusCircleOutlined />
            Thêm chuyên đề mới
          </Button>
        </div>
        <div>
          <Button
            style={{
              marginTop: '30px',
            }}
            type='dashed'
            className='dashed'
            onClick={() => {
              stepPrev(0)
            }}
          >
            Quay lại
          </Button>
          <Button
            style={{
              marginTop: '30px',
              marginLeft: '20px',
            }}
            type='primary'
            onClick={() => {
              stepNext(2)
            }}
          >
            Tiếp theo
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
                              <Button type='dashed' className='dashed'>
                                <DeleteOutlined />
                              </Button>
                            </PopConfirmAntd>
                            <Button type='dashed' className='dashed' onClick={() => updateTopic(item as any)}>
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
                                <Button type='dashed' className='dashed'>
                                  <DeleteOutlined />
                                </Button>
                              </PopConfirmAntd>
                              <Button type='dashed' className='dashed' onClick={() => updateLession(lession)}>
                                <EditOutlined />
                              </Button>
                              <Button type='dashed' className='dashed' onClick={() => updateQuizz(lession)}>
                                <QuestionCircleOutlined />
                              </Button>
                            </div>
                          </div>
                        ))}{' '}
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
        userId={dataId}
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
