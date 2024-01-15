/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { UserState } from '@/interface/user'
import { Flex, Form, Space } from 'antd'
import { useEffect, useState } from 'react'

type Props = {
  user: UserState
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>
  mutation: any
}

const VideoUpdate = (props: Props) => {
  const { user, setUpdate, mutation } = props
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<any[]>([])
  useEffect(() => {
    if (user.videoInfoUrl) {
      setFileList([{ uid: user.videoInfoUrl, name: user.videoInfoUrl, status: 'done', url: user.videoInfoUrl }])
    }
  }, [user])

  const onFinish = (values: any) => {
    mutation.mutate({ videoInfoUrl: values.videoInfoUrl[0], _id: user._id })
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <Space direction='vertical' className='sp100' size='large'>
        <UploadCustom
          uploadKey='attachment'
          defaultFileList={fileList}
          dropArea
          showUploadList
          name='videoInfoUrl'
          maxFileSize={10}
          form={form}
          accessType='video/*'
        />

        <Flex justify='end' gap={12}>
          <ButtonCustom onClick={() => setUpdate(false)}>Hủy</ButtonCustom>
          <ButtonCustom onClick={() => form.submit()} type='primary'>
            Lưu
          </ButtonCustom>
        </Flex>
      </Space>
    </Form>
  )
}

export default VideoUpdate
