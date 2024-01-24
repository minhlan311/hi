import { formatNumber } from '@/common'
import ImageCustom from '@/components/ImageCustom/ImageCustom'
import { MentorInfo } from '@/types/mentor.type'
import { Card, Col, Flex, Rate, Row, Space } from 'antd'
import moment from 'moment-timezone'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { LuGraduationCap } from 'react-icons/lu'
import { MdAccessTime } from 'react-icons/md'
import { PiMedalLight } from 'react-icons/pi'
import { RiGroupLine } from 'react-icons/ri'
import { TbCertificate } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import style from './styes.module.scss'

type Props = {
  data: MentorInfo
}

const UserCard = ({ data }: Props) => {
  const now = moment()
  const diffDuration = moment.duration(now.diff(data.userData.createdAt))

  return (
    <Card className={style.mentorCard} hoverable size='small'>
      <Row align='middle'>
        <Col span={24} md={10}>
          <Link to={'/profiles/' + data.userData._id}>
            <ImageCustom
              src={import.meta.env.VITE_FILE_ENDPOINT + '/' + data.userData.avatarUrl}
              height='200px'
              width='100%'
              preview={false}
            />
          </Link>
        </Col>
        <Col span={24} md={14} className={style.cardBody}>
          <Space direction='vertical' className={'sp100'}>
            <Link to={'/profiles/' + data.userData._id}>
              <h2>{data.userData.fullName}</h2>
            </Link>
            <Flex justify='space-between'>
              {data.categoryName && (
                <Space>
                  <PiMedalLight size={22} className={style.org} />
                  <b> {data.categoryName}</b>
                </Space>
              )}

              {data.educationType && (
                <Space>
                  <LuGraduationCap size={24} className={style.green} />
                  <b>{data.educationType}</b>
                </Space>
              )}

              {data.certificateType && (
                <Space>
                  <TbCertificate size={24} className={style.yellow} />
                  <b>
                    {data.certificateType} {data.score}
                  </b>
                </Space>
              )}
            </Flex>
            <Flex justify='space-between'>
              <Space>
                <HiOutlineClipboardDocumentList size={15} className={`${style.pdOrg} ${style.org}`} />
                <b>{formatNumber(data?.userData.countCourses as number)} Khóa học</b>
              </Space>

              <Flex gap={5} align='center'>
                <MdAccessTime size={15} className={`${style.pdGreen} ${style.green}`} />
                <b>
                  {(diffDuration.asDays() < 30 && diffDuration.asDays().toFixed(0) + ' Ngày') ||
                    (diffDuration.asDays() > 30 && diffDuration.asMonths().toFixed(0)) + ' Tháng' ||
                    (diffDuration.asDays() > 365 && diffDuration.asYears().toFixed(0)) + ' Năm'}
                </b>
              </Flex>

              <Space>
                <RiGroupLine className={`${style.pdYellow} ${style.yellow}`} />
                <b>{formatNumber(data?.userData.countStudents)}</b>
              </Space>
            </Flex>
            <Flex justify='end' align='center' gap={12}>
              <Rate
                value={data.userData.assessment?.totalAssessmentsAverages}
                style={{ fontSize: 18, marginTop: 4 }}
                disabled
              />
              ({formatNumber(data.userData.countAssessment as number)})
            </Flex>
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default UserCard
