import ImageCustom from '@/components/ImageCustom/ImageCustom'
import Header from '@/components/layout/Header/Header'
import { UserState } from '@/interface/user'
import { Divider } from 'antd'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import css from './styles.module.scss'
import UpdateCertificate from './UpdateCertificate'
type Props = { user: UserState }

const Certificate = ({ user }: Props) => {
  const dataDiploma = user?.mentorInfo?.diploma
  const dataCertificates = user?.mentorInfo?.certificates

  const dilopma = dataDiploma?.filter((item) => item?.schoolName !== 'other' && item?.schoolName !== null)
  const dilopmaNull = dataDiploma?.filter((item) => item?.schoolName === 'other')

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

      {user?.mentorInfo === null ? (
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
            {' '}
            {dataCertificates &&
              dataCertificates.map((item) => (
                <>
                  <ImageCustom
                    styles={{
                      border: '1px solid',
                    }}
                    width='200px'
                    height='150px'
                    src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item}
                  />
                </>
              ))}
          </div>
          <Divider />
          <div>
            <div className={css.marginTop}>
              <h3 className={css.h3}>Bằng cấp khác</h3>
            </div>
            <div className={css.gridCertificate}>
              {' '}
              {dilopmaNull &&
                dilopmaNull?.map((item) => (
                  <>
                    <ImageCustom
                      styles={{
                        border: '1px solid',
                      }}
                      width='200px'
                      height='150px'
                      src={import.meta.env.VITE_FILE_ENDPOINT + '/' + item?.image}
                    />
                  </>
                ))}
            </div>
          </div>
        </>
      )}
    </Header>
  )
}

export default Certificate
