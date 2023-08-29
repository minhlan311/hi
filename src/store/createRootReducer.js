import { combineReducers } from 'redux'
import authenticationReducer, {
    ROOT_STATE_NAME as AUTHENTICATION,
} from '../slices/authentication'
import documentsReducer, {
    ROOT_STATE_NAME as DOCUMENTS,
} from '../slices/document'
import educationsReducer, {
    ROOT_STATE_NAME as EDUCATIONS,
} from '../slices/education'
import examsReducer, { ROOT_STATE_NAME as EXAM } from '../slices/exam'
import globalLoadingReducer, {
    ROOT_STATE_NAME as GLOBAL_LOADING,
} from '../slices/loading'
import categoriesReducer, {
    ROOT_STATE_NAME as CATEGORIES,
} from '../slices/category'
import courseReducer, { ROOT_STATE_NAME as COURSES } from '../slices/course'
import errorReducer, { ROOT_STATE_NAME as ERROR } from '../slices/error'
import fileReducer, { ROOT_STATE_NAME as FILE } from '../slices/file'
import userReducer, { ROOT_STATE_NAME as USER } from '../slices/user'
import progressionReducer, {
    ROOT_STATE_NAME as PROGRESSTIONS,
} from '../slices/progression'
import lessonsReducer, { ROOT_STATE_NAME as LESSONS } from '../slices/lessons'
import commentReducer, { ROOT_STATE_NAME as COMMENTS } from '../slices/comment'
import mentorIntroduceReducer, {
    ROOT_STATE_NAME as MENTORINTRODUCE,
} from '../slices/mentorIntroduce'
import questionsReducer, {
    ROOT_STATE_NAME as QUESTION,
} from '../slices/question'
import activationReducer, {
    ROOT_STATE_NAME as ACTIVATION,
} from '../slices/activationCode'
import enrollReducer, { ROOT_STATE_NAME as ENROLL } from '../slices/enroll'
import announcementReducer, {
    ROOT_STATE_NAME as ANNOUNCEMENT,
} from '../slices/announcement'
import majorReducer, { ROOT_STATE_NAME as MAJOR } from '../slices/major'
import paymentReducer, { ROOT_STATE_NAME as PAYMENT } from '../slices/payment'
import transactionReducer, {
    ROOT_STATE_NAME as TRANSACTION,
} from '../slices/transactions'
import notificationReducer, {
    ROOT_STATE_NAME as NOTIFIACTION,
} from '../slices/notifications'
import pedagogyReducer, {
    ROOT_STATE_NAME as PEDAGOGY,
} from '../slices/pedagogy'
import subjectsReducer, {
    ROOT_STATE_NAME as SUBJECTS,
} from '../slices/subjects'
import configsReducer, { ROOT_STATE_NAME as CONFIGS } from '../slices/configs'
import topicsReducer, { ROOT_STATE_NAME as TOPICS } from '../slices/topics'
import notesReducer, { ROOT_STATE_NAME as NOTES } from '../slices/notes'
import assessmentReducer, {
    ROOT_STATE_NAME as ASSESSMENT,
} from '../slices/assessment'

export default function createRootReducer() {
    const rootReducer = combineReducers({
        [AUTHENTICATION]: authenticationReducer,
        [DOCUMENTS]: documentsReducer,
        [EDUCATIONS]: educationsReducer,
        [CATEGORIES]: categoriesReducer,
        [EXAM]: examsReducer,
        [QUESTION]: questionsReducer,
        [GLOBAL_LOADING]: globalLoadingReducer,
        [ERROR]: errorReducer,
        [FILE]: fileReducer,
        [COURSES]: courseReducer,
        [USER]: userReducer,
        [PROGRESSTIONS]: progressionReducer,
        [LESSONS]: lessonsReducer,
        [MENTORINTRODUCE]: mentorIntroduceReducer,
        [COMMENTS]: commentReducer,
        [ACTIVATION]: activationReducer,
        [ENROLL]: enrollReducer,
        [ANNOUNCEMENT]: announcementReducer,
        [MAJOR]: majorReducer,
        [PAYMENT]: paymentReducer,
        [TRANSACTION]: transactionReducer,
        [NOTIFIACTION]: notificationReducer,
        [PEDAGOGY]: pedagogyReducer,
        [SUBJECTS]: subjectsReducer,
        [CONFIGS]: configsReducer,
        [TOPICS]: topicsReducer,
        [NOTES]: notesReducer,
        [ASSESSMENT]: assessmentReducer,
    })

    return rootReducer
}
