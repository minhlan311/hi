import ImageCustom from '@/components/ImageCustom/ImageCustom'
import Header from '@/components/layout/Header/Header'
import { UserState } from '@/interface/user'
import { Divider } from 'antd'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import css from './styles.module.scss'
import UpdateCertificate from './UpdateCertificate'
import { useContext } from 'react'
import { AppContext } from '@/contexts/app.context'
import { useParams } from 'react-router-dom'
type Props = { user: UserState }

const Certificate = ({ user }: Props) => {
  const dataDiploma = user?.mentorInfo?.diploma
  const { profile } = useContext(AppContext)
  const dataCertificates = user?.mentorInfo?.certificates
  const { id } = useParams()

  const dilopma = dataDiploma?.filter((item) => item?.schoolName !== 'other' && item?.schoolName !== null)

  return (
    <Header
      title={
        <Divider>
          <VscDebugBreakpointLog />
        </Divider>
      }
      desc={<h3>BẰNG CẤP CỦA TÔI</h3>}
      padding={'25px 0 50px 0'}
      size='sm'
    >
      <div>
        <h3 className={css.h3}>Bằng cấp của tôi</h3>
      </div>

      {user?.mentorInfo === null && profile?._id === id ? (
        <UpdateCertificate />
      ) : (
        <>
          <div>
            <div className={css.gridCertificate}>
              {dilopma &&
                dilopma.map((item) => (
                  <>
                    <ImageCustom
                      styles={{
                        border: '1px solid',
                        objectFit: 'contain',
                      }}
                      width='200px'
                      height='150px'
                      src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.image}
                    />
                  </>
                ))}
            </div>
          </div>
          <Divider />
          <div className={css.marginTop}>
            <h3 className={css.h3}>Chứng chỉ của tôi</h3>
          </div>
          <div className={css.gridCertificate}>
            {dataCertificates &&
              dataCertificates.map((item) => (
                <>
                  <ImageCustom
                    styles={{
                      border: '1px solid',
                      objectFit: 'contain',
                    }}
                    width='200px'
                    height='150px'
                    src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item}
                  />
                </>
              ))}
          </div>
        </>
      )}
    </Header>
  )
}

export default Certificate
