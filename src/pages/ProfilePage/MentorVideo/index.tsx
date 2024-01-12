import Header from '@/components/layout/Header/Header'
import useResponsives from '@/hooks/useResponsives'

const MentorVideo = ({ videoUrl }: { videoUrl: string }) => {
  const { sm, md } = useResponsives()

  return (
    <Header padding={'15px 0 50px 0'} size='sm' title='Video giới thiệu' titleSize={35}>
      <video
        width='100%'
        height={(md && '420') || (sm && '350') || '523'}
        src={import.meta.env.VITE_FILE_ENDPOINT + '/' + videoUrl}
        title='Video info'
        controls
        style={{ borderRadius: 4 }}
      ></video>
    </Header>
  )
}

export default MentorVideo
