import { lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import PageResult from './components/PageResult/index.tsx'
import AuthLayout from './components/layout/AuthLayout/index.tsx'
import Layout from './components/layout/Layout.tsx'
import MentorLayout from './components/layout/MentorLayout/index.tsx'
import PATH from './constants/path'
import { AppContext } from './contexts/app.context'
import ChangePassword from './pages/Auth/ChangePassword/ChangePassword.tsx'
import ForgotPassword from './pages/Auth/ForgotPassword/index.tsx'
import Login from './pages/Auth/Login/index.tsx'
import Register from './pages/Auth/Register/index.tsx'
import CartPage from './pages/CartPage/CartPage.tsx'
import CategogyDetail from './pages/CategoryPage/CategogyDetail.tsx'
import CategorySub from './pages/CategoryPage/CategorySub/CategorySub.tsx'
import ChoiceQuestionPage from './pages/ChoiceQuestionPage/ChoiceQuestionPage.tsx'
import HomePage from './pages/HomePage/index.tsx'
import MentorCalendar from './pages/MentorPage/Management/Calendar/index.tsx'
import CLassCourse from './pages/MentorPage/Management/ClassCourse/CLassCourse.tsx'
import StepCreate from './pages/MentorPage/Management/Cousers/CreateCourse/StepCreate.tsx'
import MentorCourses from './pages/MentorPage/Management/Cousers/index.tsx'

const MentorExamDetail = lazy(() => import('./pages/MentorPage/Management/Exams/ExamDetail/index.tsx'))
const Courses = lazy(() => import('./pages/CoursesPage/Courses.tsx'))
const MentorExamQuestions = lazy(() => import('./pages/MentorPage/Management/Exams/Questions/index.tsx'))
const MentorExams = lazy(() => import('./pages/MentorPage/Management/Exams/index.tsx'))
const MycoursesLearning = lazy(() => import('./pages/MyCoursesLearning/MycoursesLearning.tsx'))

import SuspenseWrapper from './components/SuspenseWrapper/SuspenseWrapper.tsx'
import MemuSlug from './pages/CategoryPage/MenuSlug/MenuSlug.tsx'
import MyStudent from './pages/MentorPage/Management/MyStudent/MyStudent.tsx'
import MyCourse from './pages/MyCourse/MyCourse.tsx'
import NewsPage from './pages/NewsPage/NewsPage.tsx'
import NewsPageDetail from './pages/NewsPage/NewsPageDetail.tsx'

import ExamLayout from './components/layout/ExamLayout/ExamLayout.tsx'
import ExamPage from './pages/ExamPage/ExamPage.tsx'
import ProfilePage from './pages/ProfilePage/index.tsx'
import QAPage from './pages/QAPage/QAPage.tsx'
import QADetail from './pages/QAPage/QAPageDetail.tsx'
import SchedulePage from './pages/SchedulePage/index.tsx'
import TestPage from './pages/TestPage/index.tsx'
import VnpayPage from './pages/VnpayPage/VnpayPage.tsx'

/* eslint-disable react-refresh/only-export-components */

function RejectedMentorRoute() {
  const { profile, isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? (
    <Navigate to='/login' />
  ) : profile?.isMentor && profile?.mentorStatus === 'APPROVED' ? (
    <Outlet />
  ) : (
    <Navigate to='/403' />
  )
}

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const { profile } = useContext(AppContext)

  const routeElements = useRoutes([
    {
      // auth
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: PATH.LOGIN,
          element: (
            <AuthLayout
              title='Đăng nhập'
              imgSize={14}
              titleForm='Đăng nhập ngay!'
              descForm='Học tập là công việc của cả cuộc đời, hãy để Ucam là người bạn đồng hành cùng bạn, trải nghiệm ngay!'
            >
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: PATH.REGISTER,
          element: (
            <AuthLayout
              title='Đăng ký'
              imgSize={14}
              titleForm='Đăng ký'
              descForm='Học tập là công việc của cả cuộc đời, hãy để Ucam là người bạn đồng hành cùng bạn, trải nghiệm ngay!'
            >
              <Register />
            </AuthLayout>
          ),
        },
        {
          path: PATH.FORGOT_PASS,
          element: (
            <AuthLayout
              title='Quên mật khẩu'
              imgSize={14}
              titleForm='Quên mật khẩu'
              descForm='Nhập email đã đăng ký của bạn bên dưới để nhận hướng dẫn lấy lại mật khẩu.'
            >
              <ForgotPassword />
            </AuthLayout>
          ),
        },
      ],
    },
    {
      // mentor
      path: '',
      element: <RejectedMentorRoute />,
      children: [
        {
          path: PATH.MENTOR_PAGE,
          element: <Navigate to={PATH.MENTOR_CALENDAR} />,
        },

        {
          path: PATH.MENTOR_COURSES,
          element: (
            <MentorLayout user={profile} title='Quản lý khóa học'>
              <MentorCourses />
            </MentorLayout>
          ),
        },
        {
          path: PATH.MENTOR_COURSES_CREATE,
          element: (
            <MentorLayout user={profile} title='Tạo khóa học'>
              <StepCreate />
            </MentorLayout>
          ),
        },
        {
          path: PATH.MENTOR_CLASS,
          element: (
            <MentorLayout user={profile} title='Quản lý lớp học'>
              <CLassCourse />
            </MentorLayout>
          ),
        },
        {
          path: PATH.MENTOR_COURSES_UPDATE,
          element: (
            <MentorLayout user={profile} title='Sửa khóa học'>
              <StepCreate />
            </MentorLayout>
          ),
        },
        {
          path: PATH.MENTOR_CALENDAR,
          element: (
            <MentorLayout user={profile} title='Lịch giảng dạy'>
              <MentorCalendar />
            </MentorLayout>
          ),
        },
        {
          path: PATH.MENTOR_EXAMS,
          element: (
            <MentorLayout user={profile} title='Quản lý đề thi thử'>
              <SuspenseWrapper>
                <MentorExams />
              </SuspenseWrapper>
            </MentorLayout>
          ),
        },
        {
          path: PATH.MENTOR_EXAMS_DETAIL,
          element: (
            <MentorLayout user={profile} title='Bộ đề'>
              <SuspenseWrapper>
                <MentorExamDetail />
              </SuspenseWrapper>
            </MentorLayout>
          ),
        },
        {
          path: PATH.MENTOR_EXAMS_QUESTION,
          element: (
            <MentorLayout user={profile} title='Danh sách câu hỏi'>
              <SuspenseWrapper>
                <MentorExamQuestions />
              </SuspenseWrapper>
            </MentorLayout>
          ),
        },
        {
          path: PATH.MENTOR_MY_STUDENT,
          element: (
            <MentorLayout user={profile} title='Quản lý học viên'>
              <MyStudent />
            </MentorLayout>
          ),
        },
      ],
    },
    {
      // private
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: PATH.VNPAY_CALLBACK,
          element: (
            // <Layout user={profile} title='Đang kiểm tra thanh toán'>
            <VnpayPage />
            // </Layout>
          ),
        },
        {
          path: PATH.CART,
          element: (
            <Layout user={profile} title='Giỏ hàng của bạn'>
              <CartPage />
            </Layout>
          ),
        },

        {
          path: PATH.MY_COURSE,
          element: (
            <Layout user={profile} title='khóa học của tôi'>
              <SuspenseWrapper>
                <MyCourse />
              </SuspenseWrapper>
            </Layout>
          ),
        },
        {
          path: PATH.MY_COURSE_LEARNING,
          element: (
            <Layout user={profile} title='Khóa học đã mua'>
              <SuspenseWrapper>
                <MycoursesLearning />
              </SuspenseWrapper>
            </Layout>
          ),
        },
        {
          path: PATH.CHANGE_PASSWORD,
          element: (
            <AuthLayout
              title='Thay đổi mật khẩu'
              imgSize={14}
              titleForm='Thay đổi mật khẩu'
              descForm='Thay đổi mật khẩu của bạn'
            >
              <ChangePassword />
            </AuthLayout>
          ),
        },

        {
          path: PATH.SCHEDULE,
          element: (
            <Layout user={profile} title='Lịch học của tôi'>
              <SchedulePage />
            </Layout>
          ),
        },
        {
          path: PATH.TEST_PAGE,
          element: (
            <Layout user={profile} title='Làm bài thi Online'>
              <TestPage />
            </Layout>
          ),
        },
        {
          path: PATH.TEST_EXAM_PAGE,
          element: (
            <ExamLayout>
              <ExamPage />
            </ExamLayout>
          ),
        },
      ],
    },
    {
      // public

      children: [
        {
          path: PATH.COURSE_DETAIL,
          element: (
            <Layout user={profile} title='Trang chủ'>
              <SuspenseWrapper>
                <Courses />
              </SuspenseWrapper>
            </Layout>
          ),
        },
        {
          path: PATH.HOME,
          index: true,
          element: (
            <Layout user={profile} title='Trang chủ'>
              <HomePage />
            </Layout>
          ),
        },
        {
          path: PATH.NEWS,
          index: true,
          element: (
            <Layout user={profile} title='Bài viết'>
              <NewsPageDetail />
            </Layout>
          ),
        },
        {
          path: PATH.NEWS_PAGE,
          index: true,
          element: (
            <Layout user={profile} title='Bài viết'>
              <NewsPage />
            </Layout>
          ),
        },
        {
          path: PATH.PROFILES_DETAIL,
          element: (
            <Layout user={profile} title=''>
              <ProfilePage profile={profile} />
            </Layout>
          ),
        },
        {
          path: PATH.SUBMENU_2,
          element: (
            <Layout user={profile} title=''>
              <CategorySub />
            </Layout>
          ),
        },
        {
          path: PATH.SUBMENU_1,
          element: (
            <Layout user={profile} title=''>
              <MemuSlug />
            </Layout>
          ),
        },
        {
          path: PATH.CHOICE_PAGE,
          element: (
            <Layout user={profile} title=''>
              <ChoiceQuestionPage />
            </Layout>
          ),
        },

        {
          path: PATH.SUBMENU_3,
          element: (
            <Layout user={profile}>
              <CategogyDetail />
            </Layout>
          ),
        },
        {
          path: PATH.QA_PAGE,
          element: (
            <Layout user={profile}>
              <QAPage />
            </Layout>
          ),
        },
        {
          path: PATH.QA_PAGE_DETAIL,
          element: (
            <Layout user={profile}>
              <QADetail />
            </Layout>
          ),
        },
        { path: '/404', element: <PageResult code={404} /> },
        { path: '/403', element: <PageResult code={403} desc='Bạn không thể truy cập vào trang này!' /> },
        { path: '*', element: <PageResult code={404} /> },
      ],
    },
  ])

  return routeElements
}
