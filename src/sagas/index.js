import { all } from 'redux-saga/effects'
import authenticationSaga from './authenticationSaga'
import documentSaga from './documentSaga'
import educationSaga from './educationSaga'
import examSaga from './examSaga'
import categorySaga from './categorySaga'
import fileSaga from './fileSaga'
import courseSaga from './courseSaga'
import userSaga from './userSaga'
import progressionSaga from './progressionSaga'
import lessonSaga from './lessonsSaga'
import commentSaga from './commentSaga'
import mentorIntroduceSaga from './bannerMentorSaga'
import activationSaga from './activationSaga'
import enrollSaga from './enrollSaga'
import announcement from './announcementSaga'
import questionSaga from './questionSaga'
import majorSaga from './majorSaga'
import paymentSaga from './paymentSaga'
import transactions from './transactionsSaga'
import notifications from './notificationsSaga'
import pedagogySaga from './pedagogySaga'
import subjectsSaga from './subjectsSaga'
import configsSaga from './configsSaga'
import topicsSaga from './topicsSaga'
import notesSaga from './notesSaga'
import assessmentSaga from './assessmentSaga'

export default function* rootSaga() {
    yield all([
        authenticationSaga(),
        documentSaga(),
        educationSaga(),
        examSaga(),
        questionSaga(),
        categorySaga(),
        fileSaga(),
        courseSaga(),
        userSaga(),
        progressionSaga(),
        lessonSaga(),
        mentorIntroduceSaga(),
        commentSaga(),
        activationSaga(),
        enrollSaga(),
        announcement(),
        majorSaga(),
        paymentSaga(),
        transactions(),
        notifications(),
        pedagogySaga(),
        subjectsSaga(),
        configsSaga(),
        topicsSaga(),
        notesSaga(),
        assessmentSaga(),
    ])
}
