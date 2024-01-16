/* eslint-disable @typescript-eslint/no-explicit-any */
import userApi from '@/apis/user.api'
import openNotification from '@/components/Notification'
import TabsCustom from '@/components/TabsCustom/TabsCustom'
import { UserState } from '@/interface/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CentificateUpdate from '../Components/CentificateUpdate'
import InforUpdate from '../Components/InforUpdate'
import VideoUpdate from '../Components/VideoUpdate'
type Props = { user: UserState; activeKey?: string; setUpdate: React.Dispatch<React.SetStateAction<boolean>> }

const UpdateMentor = ({ user, activeKey, setUpdate }: Props) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (body: UserState) => userApi.updateUser(body),
    onSuccess: () => {
      openNotification({
        status: 'success',
        message: 'Thông báo',
        description: 'Cập nhật thông tin thành công!',
      })
      queryClient.invalidateQueries({ queryKey: ['userDetail'] })
      setUpdate(false)
    },
    onError: () => {
      openNotification({
        status: 'error',
        message: 'Thông báo',
        description: 'Có lỗi xảy ra,vui lòng thử lại sau!',
      })
    },
  })
  const initTabs = [
    {
      id: 'infor',
      name: 'Thông tin cơ bản',
      children: <InforUpdate user={user} setUpdate={setUpdate} mutation={mutation} />,
    },
  ]

  const tabs = user.isMentor
    ? [
        ...initTabs,
        {
          id: 'videoInfo',
          name: 'Video giới thiệu',
          children: <VideoUpdate user={user} setUpdate={setUpdate} mutation={mutation} />,
        },
        {
          id: 'centificate',
          name: 'Bằng cấp',
          children: <CentificateUpdate user={user} setUpdate={setUpdate} />,
        },
      ]
    : initTabs

  return (
    <div>
      <h2>Chỉnh sửa thông tin</h2>
      <TabsCustom defaultActiveKey={activeKey} data={tabs as any} />
    </div>
  )
}

export default UpdateMentor
