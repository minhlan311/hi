import ImageCustom from '@/components/ImageCustom/ImageCustom'
import Header from '@/components/layout/Header/Header'
import { UserState } from '@/interface/user'
import { Divider } from 'antd'
import css from './styles.module.scss'
type Props = { user: UserState }

const Certificate = ({ user }: Props) => {
  const dataDiploma = user?.mentorInfo?.diploma

  const dataCertificates = user?.mentorInfo?.certificates

  const dilopma = dataDiploma?.filter((item) => item?.schoolName !== 'other' && item?.schoolName !== null)

  return (
    <Header title={'Bằng cấp của tôi'} titleSize={35} size='sm'>
      <div>
        <h3 className={css.h3}>Bằng cấp của tôi</h3>
      </div>

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
    </Header>
  )
}

export default Certificate
