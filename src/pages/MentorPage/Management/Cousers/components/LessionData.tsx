/* eslint-disable @typescript-eslint/no-explicit-any */
import lessionApi from '@/apis/lession.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import { LessionState } from '@/interface/lession'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Card, Col, Popconfirm, Row, Space } from 'antd'
import { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdDeleteOutline } from 'react-icons/md'
import LessionForm from './LessionForm'

type Props = { topicId: string }

const LessionDetail = ({ item }: { item: LessionState }) => {
  const queryClient = useQueryClient()
  const [openLession, setOpenLession] = useState<boolean>(false)
  const { mutate } = useMutation({
    mutationFn: (id: string) => lessionApi.deleteLession(id),
    onSuccess: (value: any) => {
      queryClient.invalidateQueries({ queryKey: ['lessionList', value?.data?.parentId] })
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: `Xóa bài học ${value?.data?.name} thành công!`,
      })
    },
    onError() {
      openNotification({
        status: 'error',
        message: 'Thông báo',
        description: `Có lỗi xảy ra, vui lòng thử lại sau!`,
      })
    },
  })

  return (
    <Card hoverable size='small' key=''>
      <Row justify='space-between' align='middle' gutter={24}>
        <Col span={24} md={22}>
          <Card.Meta title={item.name}></Card.Meta>
        </Col>
        <Col span={24} md={2}>
          <Space>
            <ButtonCustom icon={<BiEdit size={20} />} onClick={() => setOpenLession(true)}></ButtonCustom>
            <Popconfirm
              placement='right'
              title='Bạn có chắc chắn muốn xóa chuyên đề này?'
              okText='Xóa'
              cancelText='Không'
              onConfirm={() => mutate(item._id)}
            >
              <ButtonCustom icon={<MdDeleteOutline size={18} />} danger></ButtonCustom>
            </Popconfirm>
          </Space>
        </Col>
      </Row>
      <LessionForm
        topicId={item.parentId as string}
        lessionId={item._id}
        lessionData={item}
        openLession={openLession}
        setOpenLession={setOpenLession}
      />
    </Card>
  )
}

const LessionData = ({ topicId }: Props) => {
  const { data: lessionList, isLoading } = useQuery({
    queryKey: ['lessionList', topicId],
    queryFn: () =>
      lessionApi.findLession({
        filterQuery: { parentId: topicId },
      }),
    enabled: Boolean(topicId),
  })

  return (
    <LoadingCustom loading={isLoading} tip='Vui lòng chờ...'>
      <Space direction='vertical' className='sp100'>
        {lessionList && lessionList?.data?.totalDocs > 0 ? (
          lessionList?.data?.docs?.map((item) => <LessionDetail item={item} key={item._id} />)
        ) : (
          <EmptyCustom description='Không có bài học nào' />
        )}
      </Space>
    </LoadingCustom>
  )
}

export default LessionData
