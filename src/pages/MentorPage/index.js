import React from 'react'
import './styles.scss'
import Pedagogies from './Management/Pedagogies'
import MentorLayout from '../../components/layout/MentorLayout'
import { Card } from 'antd'

export default function MentorPage() {
    return (
        <MentorLayout>
            <Card>
                <Pedagogies />
            </Card>
        </MentorLayout>
    )
}
