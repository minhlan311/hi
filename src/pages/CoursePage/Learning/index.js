/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Footer from '../../../components/layout/Footer'
import Navigation from '../../../components/layout/Navigation'

import ChapterMain from './ChapterMain'

export default function ChapterPage() {
    return (
        <div>
            <Navigation />
            <ChapterMain />
            <Footer />
        </div>
    )
}
