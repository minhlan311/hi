import Header from '@/components/layout/Header/Header'
import { UserState } from '@/interface/user'
type Props = { user: UserState }

const MentorVideo = ({ user }: Props) => {
  console.log(user)

  return (
    <Header padding={'15px 0 50px 0'}>
      <div style={{ textAlign: 'center' }}>
        <iframe
          width='951'
          height='535'
          src='https://www.youtube.com/embed/_SXBHjx5eAY'
          title='PHÁP SƯ VIỆT NAM REMIX 2023 - VIOLIN REMIX -TAM BÁI HỒNG TRẦN LƯƠNG - TINH VỆ x BIRTHDAY SEX'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          style={{ borderRadius: 15 }}
        ></iframe>
      </div>
    </Header>
  )
}

export default MentorVideo
