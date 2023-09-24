/* eslint-disable @typescript-eslint/no-explicit-any */

import topicApi from '@/apis/topic.api'
import { TopicList } from '@/interface/topic'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Col, Collapse, Drawer, Form, Input, Modal, Row, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import './CretaeSteps2.scss'
import DrawerCreateExam from './components/DrawerCreateExam'
import DrawerCreateLession from './components/DrawerCreateLession'

// type TargetKey = React.MouseEvent | React.KeyboardEvent | string
export type MyPageTableOptions<S> = ColumnsType<S>

const CreateSteps2 = ({ dataId }: any) => {
  const [idLess, setIdLess] = useState('')

  const [onOpenExam, setOnOpenExam] = useState(false)
  const [onOpenLession, setOnOpenLession] = useState(false)

  const [dataColl, setDataColl] = useState<TopicList[]>([])
  const [dataCollLession, setDataCollLession] = useState<TopicList[] | []>([])
  console.log(dataCollLession, 'dataCollLession')
  console.log(dataColl, 'dataColl')

  const [testForm] = Form.useForm()
  const [openTestDrawer, setOpenTestDrawer] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [openDeleteExam, setOpenDeleteExam] = useState(false)

  const query = useQuery({
    queryKey: ['topicAll'],
    queryFn: () =>
      topicApi.getAllTopic({
        filterQuery: {},
        options: { limit: 10, createAt: 1 },
      }),
  })

  useEffect(() => {
    setDataColl(query?.data?.data?.docs as any)
  }, [query])

  useEffect(() => {
    dataColl?.forEach((itemA) => {
      const itemB = dataCollLession.filter((item) => item?._id === itemA.id)

      if (itemB) {
        itemA.lessons = itemB
      }
    })

    setDataColl([...dataColl])
  }, [dataCollLession])

  const { Panel } = Collapse

  const setLessionId = (id: string) => {
    console.log(id, 'id')
    setOnOpenLession(true)
    setIdLess(id)
  }

  return (
    <>
      <div className='text-end'>
        <Button onClick={() => setOnOpenExam(true)} type='dashed' className='dashed'>
          <PlusCircleOutlined />
          Thêm chuyên đề mới
        </Button>
      </div>
      <div className='collsape'>
        <Collapse>
          {dataColl && dataColl?.length > 0
            ? dataColl?.map((item, index) => (
                <>
                  <Panel
                    key={index}
                    header={item?.name}
                    extra={
                      <Button onClick={() => setLessionId(item?.id)} type='primary'>
                        <PlusCircleOutlined />
                        Thêm bài viết mới
                      </Button>
                    }
                  >
                    {item?.lessons?.map((lession: any) => <div className='div-coll'>{lession?.name}</div>)}{' '}
                  </Panel>
                </>
              ))
            : ''}
        </Collapse>
      </div>

      <DrawerCreateExam userId={dataId} onOpen={onOpenExam} onClose={setOnOpenExam} dataCollap={setDataColl} />
      <DrawerCreateLession
        idLessCheck={idLess}
        userId={dataId}
        onOpen={onOpenLession}
        onClose={setOnOpenLession}
        dataCollapLession={setDataCollLession}
      />

      <Drawer
        title={'Thêm bài thi thử '}
        width={'70%'}
        onClose={() => setOpenTestDrawer(false)}
        open={openTestDrawer}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setOpenTestDrawer(false)}>Huỷ</Button>
            <Button
              // onClick={createExam}
              type='primary'
            >
              Cập nhật
            </Button>
          </Space>
        }
      >
        <Form layout='vertical' form={testForm}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={'Tên bài thi'} name='name' required>
                <Input placeholder='Nhập tên bài thi' allowClear />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        // onOk={uploadQuestions}
        title={'Xác nhận import câu hỏi'}
        okText={'Xác nhận'}
        cancelText={'Huỷ'}
      ></Modal>
      <Modal
        open={openDeleteExam}
        onCancel={() => setOpenDeleteExam(false)}
        // onOk={remove}
        title={'Bạn có muốn xoá bài kiểm tra?'}
        okText={'Xác nhận'}
        cancelText={'Huỷ'}
      ></Modal>
    </>
  )
}

export default CreateSteps2
