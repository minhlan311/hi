import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import { Skill } from '@/interface/exam'
import { Descriptions, Modal, Space } from 'antd'

type Props = {
  data: Skill | null
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ShowSkillDetail = ({ data, open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(!open)
  }
  console.log(data)

  if (data)
    return (
      <Modal open={open} onCancel={handleClose} footer={null} title={data?.title}>
        <Space direction='vertical' className='sp100'>
          <Space>
            <ButtonCustom size='small'>Sửa</ButtonCustom>
            <ButtonCustom size='small' danger>
              Xóa
            </ButtonCustom>
          </Space>
          <Descriptions column={2}>
            <Descriptions.Item label='Bài đọc'>
              <b>{data?.title}</b>
            </Descriptions.Item>
            <Descriptions.Item label='Số câu hỏi'>
              <b>{data?.countQuestions}</b>
            </Descriptions.Item>
          </Descriptions>
          <Descriptions column={1}>
            <Descriptions.Item label='Nội dung'>
              <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Modal>
    )
}

export default ShowSkillDetail
