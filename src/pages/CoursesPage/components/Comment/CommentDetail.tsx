import { TCourse } from '@/types/course.type'
import style from './CommentDetail.module.scss'

type Props = {
  data: TCourse
}

export default function CommentDetail({ data }: Props) {
  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      <h2>Giới thiệu khóa học</h2>
      <div
        className={style.boxCommentDetail}
        dangerouslySetInnerHTML={{ __html: data?.descriptions || 'Không có mô tả' }}
      ></div>
    </div>
  )
}
