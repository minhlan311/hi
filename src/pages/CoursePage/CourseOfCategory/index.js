import React from 'react'
import { useParams } from 'react-router-dom'
import MainPage from './MainPage'

export default function CoursePage() {
    const slug = useParams()
    const data = [
        {
            createdById: '6400281d41ff1063f0cb7471',
            descriptions: 'Khóa học năm 1',
            educations: [],
            id: '64005f595d73e19ea97c5f6d',
            name: 'Năm 1',
            plan: 'PREMIUM',
            status: 'ACTIVE',
            updatedById: '6400281d41ff1063f0cb7471',
            _id: '64005f595d73e19ea97c5f6d',
        },
    ]
    return (
        <div>
            <MainPage data={data} />
        </div>
    )
}
