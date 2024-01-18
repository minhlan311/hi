/* eslint-disable @typescript-eslint/no-explicit-any */
import documentApi from '@/apis/document.type'
import examApi from '@/apis/exam.api'
import lessionApi from '@/apis/lession.api'
import DrawerCustom from '@/components/DrawerCustom/DrawerCustom'
import openNotification from '@/components/Notification'
import TextAreaCustom from '@/components/TextAreaCustom/TextAreaCustom'
import UploadCustom from '@/components/UploadCustom/UploadCustom'
import { AppContext } from '@/contexts/app.context'
import useResponsives from '@/hooks/useResponsives'
import { LessionState } from '@/interface/lession'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Form, Input, InputNumber, Select } from 'antd'
import { useContext, useEffect, useState } from 'react'

type Props = {
  topicId: string
  lessionId?: string
  lessionData?: LessionState
  openLession: boolean
  setOpenLession: React.Dispatch<React.SetStateAction<any>>
}

const LessionForm = ({ topicId, lessionId, openLession, lessionData, setOpenLession }: Props) => {
  const { sm, md } = useResponsives()
  const [form] = Form.useForm()
  const { profile } = useContext(AppContext)

  const [type, setType] = useState<'VIDEO' | 'TEST' | 'LIVE' | 'DOCUMENT'>()
  const [fileList, setFileList] = useState<any[]>([])
  const queryClient = useQueryClient()
  const lessionMutation = useMutation({
    mutationFn: (body) => (lessionId ? lessionApi.updateLession(body) : lessionApi.createLession(body)),
    onSuccess: (value: any) => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: `${lessionId ? 'Cập nhật' : 'Tạo'} bài học thành công`,
      })
      form.resetFields()
      setOpenLession('')
      queryClient.invalidateQueries({ queryKey: ['lessionList', value?.data?.parentId] })
    },
  })
  const mutationDocument = useMutation({
    mutationFn: (body: any) => documentApi.createDocument(body),
  })

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      id: lessionId,
      parentId: topicId,
    }
    lessionMutation.mutate(payload)
    if (payload.length > 0)
      mutationDocument.mutate({
        isDownloadable: true,
        name: `Tài liệu`,
        description: values.description,
        type: 'CURRICULUM',
        files: payload[0],
        courseId: topicId,
        lessonId: lessionId,
      })
    setFileList([])
  }

  useEffect(() => {
    if (lessionData) {
      form.setFieldsValue({ ...lessionData })
      setType(lessionData.type)
    }
  }, [lessionData])

  const { data: dataExamLession } = useQuery({
    queryKey: ['queryExam'],
    queryFn: () =>
      examApi.findExam({
        filterQuery: {
          mentorId: profile._id,
        },
      }),
    enabled: type === 'TEST',
  })

  const optionsLession = dataExamLession?.data?.docs?.map((item) => ({
    label: item.name,
    value: item._id,
  }))
  console.log(lessionId)

  return (
    <DrawerCustom
      open={openLession}
      onFinish={() => {
        form.submit()
      }}
      onClose={setOpenLession}
      placement='right'
      title={`${lessionId ? 'Cập nhật' : 'Tạo'} bài học`}
      width={sm || md ? '100%' : '50vw'}
      okText={lessionId ? 'Cập nhật' : 'Tạo'}
    >
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item label='Tiêu đề bài học' name='name' rules={[{ required: true, message: 'Nhập tiêu đề bài học' }]}>
          <Input placeholder='Nhập tiêu đề bài học' />
        </Form.Item>
        <Form.Item label='Loại bài học' name='type' rules={[{ required: true, message: 'Chọn loại bài học' }]}>
          <Select
            placeholder='Chọn loại bài học'
            options={[
              { value: 'VIDEO', label: 'VIDEO' },
              { value: 'DOCUMENT', label: 'VĂN BẢN' },
              { value: 'LIVE', label: 'TRỰC TUYẾN' },
              { value: 'TEST', label: 'BÀI TEST' },
            ]}
            onChange={(e) => setType(e)}
          />
        </Form.Item>
        {(type && type === 'VIDEO' && (
          <div>
            <Form.Item label='Link video' name='media' rules={[{ required: true, message: 'Nhập link video bài học' }]}>
              <Input placeholder='Nhập link video bài học' />
            </Form.Item>
            <Form.Item
              label='Thời lượng'
              name='length'
              rules={[{ required: true, message: 'Nhập thời lượng bài học' }]}
            >
              <InputNumber min={1} placeholder='Nhập thời lượng bài học' className='sp100' />
            </Form.Item>
          </div>
        )) ||
          (type === 'TEST' && (
            <Form.Item
              label='Bộ câu hỏi'
              name='testId'
              rules={[{ required: true, message: 'Vui lòng chọn bộ câu hỏi' }]}
            >
              <Select options={optionsLession} placeholder='Chọn bộ câu hỏi' />
            </Form.Item>
          )) ||
          null}

        <TextAreaCustom name='descriptions' label='Mô tả' data={lessionData} required />
        {type !== 'LIVE' && (
          <UploadCustom
            form={form}
            name='files'
            label='Tài liệu'
            defaultFileList={fileList}
            callBackFileList={setFileList}
            dropArea
          />
        )}
      </Form>
    </DrawerCustom>
  )
}

export default LessionForm
