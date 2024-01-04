import Header from '@/components/layout/Header/Header'
import useResponsives from '@/hooks/useResponsives'

const MentorVideo = () => {
  const { sm, md } = useResponsives()

  return (
    <Header padding={'15px 0 50px 0'} type='fullsize'>
      <div style={{ textAlign: 'center' }}>
        <iframe
          width='100%'
          height={(md && '420') || (sm && '350') || '620'}
          src='https://www.youtube.com/embed/_SXBHjx5eAY'
          title='PHÁP SƯ VIỆT NAM REMIX 2023 - VIOLIN REMIX -TAM BÁI HỒNG TRẦN LƯƠNG - TINH VỆ x BIRTHDAY SEX'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          style={{ borderRadius: 2 }}
        ></iframe>
      </div>
    </Header>
  )
}

export default MentorVideo
