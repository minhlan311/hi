/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import MentorLayout from '../../../../components/layout/MentorLayout'
import DocumentListing from '../../../StudyDocumentPage/DocumentListing'
import { Card } from 'antd'
import { getStorage } from '../../../../services/storage'
import { USER_INFO } from '../../../../constants/storageKeys'

export default function Documents() {
    const user = getStorage(USER_INFO)
    return (
        <MentorLayout>
            <Card>
                <DocumentListing screen="mentor" createdById={user._id} />
            </Card>
        </MentorLayout>
    )
}
