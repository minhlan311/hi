import questionApi from '@/apis/question.api'
import skillApi from '@/apis/skill.api'
import { stateAction } from '@/common'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import LoadingCustom from '@/components/LoadingCustom'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import TagCustom from '@/components/TagCustom/TagCustom'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { ENDPOINT } from '@/constants/endpoint'
import useResponsives from '@/hooks/useResponsives'
import { Skill, SkillType } from '@/interface/exam'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Card, Col, Form, Input, Modal, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import { FaRegCircleQuestion } from 'react-icons/fa6'
import { RiVoiceprintLine } from 'react-icons/ri'
import CreateQuestion from './CreateQuestion'
import RenderItem from './RenderItem'
import ShowSkillDetail from './ShowSkillDetail'
/* eslint-disable @typescript-eslint/no-explicit-any */

const RenderSkillItem = ({
  skillData,
  skillName,
  categoryId,
  testId,
  isLoading,
  choosePack,
  setChoosePack,
}: {
  skillData: Skill[]
  skillName: SkillType
  categoryId: string
  testId: string
  isLoading: boolean
  choosePack: string[]
  setChoosePack: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const queryClient = useQueryClient()
  const [form] = Form.useForm()
  const [idCreate, setIdCreate] = useState<string>('')
  const [questions, setQuestions] = useState<string[]>([])
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [openDetail, setOpenDetail] = useState<boolean>(false)
  const [openData, setOpenData] = useState<Skill | null>(null)
  const [skillCreatedData, setSkillCreatedData] = useState<Skill>()
  const [callbackUrl, setCallbackUrl] = useState<any>(null || skillCreatedData?.url)

  const { sm } = useResponsives()

  const skillUpdateMutation = useMutation({
    mutationFn: (body) => skillApi.putSkill(body),
  })

  const skillCreateMutation = useMutation({
    mutationFn: (body) => skillApi.createSkill(body),
    onSuccess(data) {
      setSkillCreatedData(data.data)
      stateAction(setChoosePack, data.data._id, data.data._id, 'switch')
      localStorage.removeItem('createTest')
    },
  })
  useEffect(() => {
    if (idCreate) {
      stateAction(setQuestions, idCreate, idCreate, 'add')
      setOpenForm(false)
    }
  }, [idCreate])

  const onFinish = (values: any) => {
    let payload = {
      ...values,
      questions: questions,
      testId: testId,
      categoryId: categoryId,
      skill: skillName,
    }

    if (skillCreatedData && skillCreatedData._id) {
      payload = {
        ...payload,
        id: skillCreatedData._id,
      }
      skillUpdateMutation.mutate(payload)
    } else skillCreateMutation.mutate(payload as unknown as any)
  }

  useEffect(() => {
    if (questions?.length > 0) {
      form.submit()
    }
  }, [questions])

  console.log(callbackUrl)

  const { data: questionsData } = useQuery({
    queryKey: ['questionsData', questions],
    queryFn: () => {
      return questionApi.findQuestion({
        filterQuery: {
          _id: questions,
        },
      })
    },

    enabled: questions?.length > 0,
  })

  const items = [
    {
      id: 'store',
      name: 'Gói câu từ ngân hàng',
      children: (
        <LoadingCustom loading={isLoading} tip='Vui lòng chờ...'>
          {skillData && skillData?.length > 0 ? (
            <Space direction='vertical' className='sp100'>
              {skillData?.map(
                (item) =>
                  choosePack.find((i) => i === item._id) && (
                    <Card key={item._id} hoverable>
                      <Row justify='space-between' align='middle' gutter={[12, 12]}>
                        <Col>
                          <Card.Meta
                            title={
                              <p>
                                Bài đọc: <b>{item.title}</b>
                              </p>
                            }
                            description={
                              <div
                                dangerouslySetInnerHTML={{ __html: item.description }}
                                className='dangerHTMLTwoLine'
                              ></div>
                            }
                          ></Card.Meta>
                        </Col>
                        <Col>
                          <Space>
                            <div className='custom-butt-icon'>
                              <FaRegCircleQuestion size={20} />
                              <b style={{ marginLeft: 5 }}>{item.countQuestions}</b>
                            </div>
                            <TagCustom content={item.skill}></TagCustom>
                            <ButtonCustom
                              size='small'
                              onClick={() => {
                                setOpenDetail(true)
                                setOpenData(item)
                              }}
                            >
                              Xem chi tiết
                            </ButtonCustom>
                            <ButtonCustom
                              type={choosePack.includes(item._id) ? 'default' : 'primary'}
                              size='small'
                              onClick={() => stateAction(setChoosePack, item._id, item._id, 'switch')}
                            >
                              {choosePack.includes(item._id) ? 'Hủy chọn gói câu' : 'Chọn gói câu'}
                            </ButtonCustom>
                          </Space>
                        </Col>
                        <ShowSkillDetail data={openData} setOpen={setOpenDetail} open={openDetail}></ShowSkillDetail>
                      </Row>
                    </Card>
                  ),
              )}
              {skillData?.map(
                (item) =>
                  !choosePack.find((i) => i === item._id) && (
                    <Card key={item._id} hoverable>
                      <Row justify='space-between' align='middle' gutter={[12, 12]}>
                        <Col>
                          <Card.Meta
                            title={
                              <p>
                                Bài đọc: <b>{item.title}</b>
                              </p>
                            }
                            description={
                              <div
                                dangerouslySetInnerHTML={{ __html: item.description }}
                                className='dangerHTMLTwoLine'
                              ></div>
                            }
                          ></Card.Meta>
                        </Col>
                        <Col>
                          <Space>
                            <div className='custom-butt-icon'>
                              <FaRegCircleQuestion size={20} />
                              <b style={{ marginLeft: 5 }}>{item.countQuestions}</b>
                            </div>
                            <TagCustom content={item.skill}></TagCustom>
                            <ButtonCustom
                              size='small'
                              onClick={() => {
                                setOpenDetail(true)
                                setOpenData(item)
                              }}
                            >
                              Xem chi tiết
                            </ButtonCustom>
                            <ButtonCustom
                              type={choosePack.includes(item._id) ? 'default' : 'primary'}
                              size='small'
                              onClick={() => stateAction(setChoosePack, item._id, item._id, 'switch')}
                            >
                              {choosePack.includes(item._id) ? 'Hủy chọn gói câu' : 'Chọn gói câu'}
                            </ButtonCustom>
                          </Space>
                        </Col>
                        <ShowSkillDetail data={openData} setOpen={setOpenDetail} open={openDetail}></ShowSkillDetail>
                      </Row>
                    </Card>
                  ),
              )}
            </Space>
          ) : (
            <EmptyCustom description='Không có gói câu hỏi nào, bạn có thể tạo gói câu cho kỹ năng'></EmptyCustom>
          )}
        </LoadingCustom>
      ),
    },
    {
      id: 'create',
      name: 'Tạo gói câu',
      children: (
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Row>
            <Col>
              <h3>
                1. Thêm nội dung kỹ năng{' '}
                {(skillName === 'READING' && 'đọc') ||
                  (skillName === 'LISTENING' && 'nghe') ||
                  (skillName === 'WRITING' && 'viết') ||
                  (skillName === 'SPEAKING' && 'nói')}
              </h3>
            </Col>
            {skillName === 'LISTENING' && (
              <>
                <Col span={24} md={5}>
                  <Form.Item label='Ghi âm'>
                    <UploadCustom
                      accessType='audio/*'
                      uploadKey='attachment'
                      action={import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_ATTACHMENT}
                      callBackFileList={setCallbackUrl}
                    >
                      <ButtonCustom icon={<RiVoiceprintLine />} className='sp100'>
                        Thêm file ghi âm
                      </ButtonCustom>
                    </UploadCustom>
                  </Form.Item>
                </Col>

                <Col span={24} md={11}>
                  <Form.Item label=' '>
                    <audio controls className='sp100' style={{ height: 40 }}>
                      <source src={callbackUrl} type='audio/mpeg' />
                    </audio>
                  </Form.Item>
                </Col>
              </>
            )}
            {skillName && (
              <>
                <Col span={24}>
                  <Form.Item
                    name='title'
                    label='Tiêu đề'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập tiêu đề bài đọc',
                      },
                    ]}
                  >
                    <Input placeholder='Tiêu đề bài đọc'></Input>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <TextAreaCustom
                    name='description'
                    label={skillName === 'READING' ? 'Nội dung bài đọc' : 'Chú thích'}
                    required={skillName === 'READING'}
                    data={skillCreatedData}
                  ></TextAreaCustom>
                </Col>
              </>
            )}
            <Col span={24}>
              <Row justify='space-between'>
                <h3>
                  2. Thêm câu hỏi kỹ năng{' '}
                  {(skillName === 'READING' && 'đọc') ||
                    (skillName === 'LISTENING' && 'nghe') ||
                    (skillName === 'WRITING' && 'viết') ||
                    (skillName === 'SPEAKING' && 'nói')}
                </h3>
                <ButtonCustom onClick={() => setOpenForm(true)} type='dashed' className='butt-link'>
                  Thêm câu hỏi
                </ButtonCustom>
              </Row>
            </Col>
            <Col span={24}>
              {questionsData?.data?.docs && questionsData?.data?.docs?.length > 0 ? (
                <Space direction='vertical' className='sp100'>
                  {questionsData?.data?.docs?.map((item) => (
                    <RenderItem
                      data={item}
                      type='questionsData'
                      typeQuestion='TEST'
                      key={item._id}
                      setQuestionsSelect={setQuestions}
                    ></RenderItem>
                  ))}
                </Space>
              ) : (
                <EmptyCustom description='Không có câu hỏi nào' />
              )}
            </Col>
          </Row>
        </Form>
      ),
    },
  ]

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <TabsCustom
          data={items}
          onChange={(e) => {
            e === 'store' && queryClient.resetQueries(['skillData'])
            form.resetFields()
            setIdCreate('')
            setQuestions([])
          }}
        ></TabsCustom>
      </Col>

      <Modal open={openForm} footer={<p></p>} width={sm ? undefined : '60vw'} onCancel={() => setOpenForm(false)}>
        <CreateQuestion
          okButton={
            <ButtonCustom type='primary' htmlType='submit'>
              Tạo câu hỏi
            </ButtonCustom>
          }
          categoryId={categoryId}
          typeQuestion={'TEST'}
          skill={skillName}
          callbackIdCreate={setIdCreate}
        />
      </Modal>
    </Row>
  )
}

export default RenderSkillItem
