/* eslint-disable @typescript-eslint/no-explicit-any */
import questionApi from '@/apis/question.api'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import { Skill } from '@/interface/exam'
import { useQuery } from '@tanstack/react-query'
import { Descriptions, Modal, Space } from 'antd'
import RenderItem from './RenderItem'

type Props = {
  data: Skill | null
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ShowSkillDetail = ({ data, open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(!open)
  }

  const { data: questionsData } = useQuery({
    queryKey: ['questions'],
    queryFn: () => {
      return questionApi.findQuestion({
        filterQuery: {
          _id: data?.questions,
        },
      })
    },
    enabled: data?.questions ? data?.questions?.length > 0 : false,
  })

  const tabData = [
    {
      name: 'Nội dung',
      id: 'read',
      children: (
        <div
          dangerouslySetInnerHTML={{ __html: data && (data?.description as any) }}
          className='dangerHTMLImg dangerHTML'
        ></div>
      ),
    },
    {
      name: 'Câu hỏi',
      id: 'question',
      children:
        questionsData?.data?.docs && questionsData?.data?.docs?.length > 0 ? (
          <Space direction='vertical' className='sp100'>
            {questionsData?.data?.docs?.map((item) => (
              <RenderItem data={item} type='questionsData' typeQuestion='TEST' key={item._id}></RenderItem>
            ))}
          </Space>
        ) : (
          <EmptyCustom description='Không có câu hỏi nào' />
        ),
    },
  ]
  if (data)
    return (
      <Modal open={open} onCancel={handleClose} footer={null} title={data?.title} style={{ minWidth: '50vw' }}>
        <Space direction='vertical' className='sp100'>
          <Descriptions column={1}>
            <Descriptions.Item label='Số câu hỏi'>
              <b>{data?.countQuestions}</b>
            </Descriptions.Item>
          </Descriptions>
          {/* {data.createdById === profile._id && (
            <Space>
              <ButtonCustom size='small'>Sửa</ButtonCustom>
              <ButtonCustom size='small' danger>
                Xóa
              </ButtonCustom>
            </Space>
          )} */}
          <TabsCustom data={tabData}></TabsCustom>
        </Space>
      </Modal>
    )
}

export default ShowSkillDetail
