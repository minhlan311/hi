/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import CourseCard from '@/components/CourseCard'
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import LoadingCustom from '@/components/LoadingCustom'
import PaginationCustom from '@/components/PaginationCustom'
import Header from '@/components/layout/Header/Header'
import { CoursesState } from '@/interface/courses'
import { SuccessResponse } from '@/types/utils.type'
import { Col, Flex, Row, Space } from 'antd'
type Props = {
  coursesData: SuccessResponse<CoursesState[]>
  loading: boolean
  showPagination?: boolean
  fullSize?: boolean
  maxLength?: number
  setCurrent?: React.Dispatch<React.SetStateAction<number>>
}

const MyCourses = ({ coursesData, loading, showPagination = true, fullSize, maxLength, setCurrent }: Props) => {
  return (
    <div>
      <Header
        title={fullSize ? undefined : <h3>Khóa học nổi bật</h3>}
        titleSize={fullSize ? undefined : 30}
        padding={'25px 0 50px 0'}
        size={fullSize ? undefined : 'sm'}
      >
        <Space direction='vertical' className={'sp100'} size='large'>
          <LoadingCustom loading={loading} tip='Vui lòng chờ...'>
            {coursesData?.totalDocs === 0 ? (
              <EmptyCustom description='Hiện không có khóa học nào' />
            ) : (
              <Row gutter={[12, 12]}>
                {coursesData?.docs?.slice(0, maxLength).map((item) => (
                  <Col
                    span={24}
                    md={maxLength ? 24 / maxLength : 12}
                    xl={maxLength ? 24 / maxLength : 8}
                    key={item._id}
                  >
                    <CourseCard item={item} />
                  </Col>
                ))}
              </Row>
            )}
          </LoadingCustom>

          {showPagination ? (
            <PaginationCustom
              align='center'
              limit={6}
              dataArr={coursesData?.docs}
              totalData={coursesData?.totalDocs}
              callbackCurrent={setCurrent}
            ></PaginationCustom>
          ) : (
            <Flex justify='center' style={{ marginTop: 24 }}>
              <ButtonCustom href={'/profiles/' + coursesData?.docs?.[0]?.mentorId}>Xem thêm</ButtonCustom>
            </Flex>
          )}
        </Space>
      </Header>
    </div>
  )
}

export default MyCourses
