import { lazy } from 'react'
import { ROUTERS_URL } from './constants/routerUrl'

const routes = [
    {
        path: '/',
        component: lazy(() => import('./pages/HomePage')),
        exact: true,
        requiredAuthen: false,
    },
    {
        path: ROUTERS_URL.LOGIN,
        component: lazy(() => import('./pages/LoginPage')),
        requiredAuthen: false,
        exact: true,
    },
    {
        path: ROUTERS_URL.FORGOT_PASS,
        component: lazy(() => import('./pages/ForgotPasswordPage')),
        requiredAuthen: false,
        exact: true,
    },
    {
        path: ROUTERS_URL.REGISTER,
        component: lazy(() => import('./pages/RegisterPage')),
        requiredAuthen: false,
        exact: true,
    },

    {
        path: ROUTERS_URL.DOCUMENTS,
        component: lazy(() => import('./pages/StudyDocumentPage')),
        exact: true,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.DOCUMENTS_DETAIL,
        component: lazy(() =>
            import('./pages/StudyDocumentPage/DocumentDetail')
        ),
        exact: true,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.QUIZZES,
        component: lazy(() => import('./pages/ExamPage')),
        exact: true,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.TESTS,
        component: lazy(() => import('./pages/ExamPage')),
        exact: true,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.QUIZZES_DETAIL,
        component: lazy(() => import('./pages/ExamPage')),
        exact: true,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.TESTS_DETAIL,
        component: lazy(() => import('./pages/ExamPage')),
        exact: true,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.ERROR_PAGE,
        component: lazy(() => import('./pages/ErrorPage')),
        requiredAuthen: true,
        exact: false,
    },
    {
        path: ROUTERS_URL.SUBJECTS_PAGE,
        component: lazy(() => import('./pages/Subjects')),
        requiredAuthen: true,
        exact: false,
    },
    {
        path: ROUTERS_URL.COURSE_PAGE,
        component: lazy(() => import('./pages/CoursePage')),
        requiredAuthen: true,
        exact: false,
    },
    {
        path: ROUTERS_URL.COURSE_DETAIL,
        component: lazy(() => import('./pages/CoursePage/CourseDetail')),
        requiredAuthen: true,
        exact: true,
    },
    {
        path: ROUTERS_URL.COURSE_DETAIL_LEARNING,
        component: lazy(() => import('./pages/CoursePage/Learning')),
        requiredAuthen: true,
        exact: true,
    },
    {
        path: ROUTERS_URL.PROFILES,
        component: lazy(() => import('./pages/ProfilePage')),
        exact: true,
        requiredAuthen: true,
    },

    {
        path: ROUTERS_URL.MENTOR_PAGE,
        component: lazy(() => import('./pages/MentorPage')),
        exact: true,
        requiredAuthen: true,
    },

    {
        path: ROUTERS_URL.MENTOR_COURSES,
        component: lazy(() => import('./pages/MentorPage/Management/Cousers')),
        exact: true,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.MENTOR_DOCUMENTS,
        component: lazy(() =>
            import('./pages/MentorPage/Management/Documents')
        ),
        exact: true,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.MENTOR_EXAMS,
        component: lazy(() => import('./pages/MentorPage/Management/Exams')),
        exact: true,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.MENTOR_QUESTIONS,
        component: lazy(() =>
            import('./pages/MentorPage/Management/Exams/QuestionsList')
        ),
        exact: true,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.REGIS_MENTOR,
        component: lazy(() => import('./pages/RegisMentorPage')),
        exact: true,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.PAYMENT_CALLBACK,
        component: lazy(() => import('./pages/Payment')),
        exact: false,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.POINT_MANAGEMENT,
        component: lazy(() => import('./pages/PointManagement')),
        exact: false,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.CHANGE_PASS,
        component: lazy(() => import('./pages/ChangePassPage')),
        exact: false,
        requiredAuthen: true,
    },
    {
        path: ROUTERS_URL.PEDAGOGYS,
        component: lazy(() => import('./pages/PedagogysPage')),
        exact: false,
        requiredAuthen: true,
    },
    {
        path: '*',
        component: lazy(() => import('./pages/NotFoundPage')),
        requiredAuthen: true,
        exact: false,
    },
]

export default routes
