/* eslint-disable @typescript-eslint/no-explicit-any */
import topicApi from '@/apis/topic.api'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import CollapseCustom from '@/components/CollapseCustom/CollapseCustom'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import LoadingCustom from '@/components/LoadingCustom'
import openNotification from '@/components/Notification'
import { TopicState } from '@/interface/topic'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Flex, Popconfirm, Space } from 'antd'
import { useState } from 'react'
import { BiEdit, BiPlus } from 'react-icons/bi'
import { MdDeleteOutline } from 'react-icons/md'
import LessionData from './LessionData'
import LessionForm from './LessionForm'
import TopicForm from './TopicForm'

type Props = {
  courseId: string
}

const ActionTopic = ({ courseId }: Props) => {
  const [openTopic, setOpenTopic] = useState<boolean>(false)
  const [topicId, setTopicId] = useState<string>()
  const [topicData, setTopicData] = useState<TopicState>()
  const queryClient = useQueryClient()
  const { data: topicList, isLoading } = useQuery({
    queryKey: ['topicList'],
    queryFn: () =>
      topicApi.findTopic({
        filterQuery: { parentId: courseId },
      }),
    enabled: Boolean(courseId),
  })

  const { mutate } = useMutation({
    mutationFn: (id: string) => topicApi.deleteTopic(id),
    onSuccess: (value: any) => {
      queryClient.invalidateQueries({ queryKey: ['topicList'] })
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: `Xóa chuyên đề ${value?.data?.name} thành công!`,
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

  const collapseList = topicList?.data?.docs?.map((item) => {
    return {
      key: item._id,
      label: item.name,
      children: <LessionData topicId={item._id} />,
      extra: (
        <Space>
          <ButtonCustom
            onClick={() => {
              setTopicId(item._id)
            }}
            icon={<BiPlus />}
          >
            Thêm bài học
          </ButtonCustom>
          <ButtonCustom
            onClick={(e) => {
              e.stopPropagation()
              setTopicData(item)
            }}
            icon={<BiEdit size={20} />}
          ></ButtonCustom>

          <Popconfirm
            placement='right'
            title='Bạn có chắc chắn muốn xóa chuyên đề này?'
            okText='Xóa'
            cancelText='Không'
            onConfirm={() => mutate(item._id)}
          >
            <ButtonCustom
              onClick={(e) => e.stopPropagation()}
              icon={<MdDeleteOutline size={18} />}
              danger
            ></ButtonCustom>
          </Popconfirm>
        </Space>
      ),
    }
  })

  return (
    <Space direction='vertical' className='sp100'>
      <Flex justify='space-between'>
        <ButtonCustom icon={<BiPlus />} onClick={() => setOpenTopic(true)}>
          Thêm chuyên đề
        </ButtonCustom>
        <ButtonCustom type='primary' href='/mentor/courses'>
          Hoàn thành
        </ButtonCustom>
      </Flex>
      {collapseList && collapseList?.length > 0 ? (
        <LoadingCustom loading={isLoading} tip='Vui lòng chờ...'>
          <CollapseCustom items={collapseList as any} size='large' />
        </LoadingCustom>
      ) : (
        <EmptyCustom description='Không có chuyên đề nào' />
      )}
      <TopicForm
        courseId={courseId}
        topicId={topicData?._id as string}
        topicData={topicData!}
        openTopic={openTopic || Boolean(topicData)}
        setOpenTopic={(e) => {
          setTopicData(undefined)
          setOpenTopic(e)
        }}
      />
      <LessionForm topicId={topicId as string} openLession={Boolean(topicId)} setOpenLession={() => setTopicId('')} />
    </Space>
  )
}

export default ActionTopic
