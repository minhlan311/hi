import React from 'react'
import MentorLayout from '../../../../components/layout/MentorLayout'
import CourseListing from '../../../CoursePage/CourseListing'
import { Card } from 'antd'
import { getStorage } from '../../../../services/storage'
import { USER_INFO } from '../../../../constants/storageKeys'
import { useMediaQuery } from 'react-responsive'

export default function Cousers() {
    const user = getStorage(USER_INFO)
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })

    return (
        <MentorLayout>
            <Card>
                {isMobile ? <h3>Quản lý khóa học</h3> : null}
                <CourseListing screen="mentor" mentorId={user._id} />
            </Card>
        </MentorLayout>
    )
}
