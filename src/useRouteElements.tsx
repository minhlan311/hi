/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import PageResult from './components/PageResult/index.tsx'
import AuthLayout from './components/layout/AuthLayout/index.tsx'
import Layout from './components/layout/Layout.tsx'
import MentorLayout from './components/layout/MentorLayout/index.tsx'
import PATH from './constants/path'
import { AppContext } from './contexts/app.context'
import ForgotPassword from './pages/Auth/ForgotPassword/index.tsx'
import Login from './pages/Auth/Login/index.tsx'
import Register from './pages/Auth/Register/index.tsx'
import HomePage from './pages/HomePage/index.tsx'
import MentorCourses from './pages/MentorPage/Management/Cousers/index.tsx'
import MentorDocuments from './pages/MentorPage/Management/Documents/index.tsx'
import MentorExams from './pages/MentorPage/Management/Exams/index.tsx'
import MentorPedagogies from './pages/MentorPage/Management/Pedagogies/index.tsx'
import Courses from './pages/Courses/Courses.tsx'
import MentorQuestions from './pages/MentorPage/Management/Exams/Questions/index.tsx'
import ProfilePage from './pages/ProfilePage/index.tsx'
import FormUpdateProfile from './pages/FomUpdateProfile/FormUpdateProfile.tsx'

function RejectedMentorRoute() {
  const { profile, isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? <Navigate to='/login' /> : profile?.isMentor ? <Outlet /> : <Navigate to='/403' />
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
          element: <Navigate to={PATH.MENTOR_COURSES} />,
        },
        {
          path: PATH.MENTOR_QUESTIONS,
          element: (
            <MentorLayout user={profile} title='Danh sách câu hỏi'>
              <MentorPedagogies user={profile} />
            </MentorLayout>
          ),
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
          path: PATH.MENTOR_DOCUMENTS,
          element: (
            <MentorLayout user={profile} title='Quản lý tài liệu'>
              <MentorDocuments />
            </MentorLayout>
          ),
        },
        {
          path: PATH.MENTOR_EXAMS,
          element: (
            <MentorLayout user={profile} title='Quản lý đề thi thử'>
              <MentorExams />
            </MentorLayout>
          ),
        },
        {
          path: PATH.MENTOR_EXAMS_DETAIL,
          element: (
            <MentorLayout user={profile} title='Danh sách câu hỏi'>
              <MentorQuestions />
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
          path: PATH.COURSE_DETAIL,
          element: (
            <Layout user={profile} title='Trang chủ'>
              <Courses />
            </Layout>
          ),
        },
        {
          path: PATH.PEDAGOGYS,
          element: (
            <AuthLayout
              title='Cập nhật thông tin'
              imgSize={14}
              titleForm='Cập nhật thông tin'
              descForm='Hãy cập nhật đầy đủ thông tin của bạn , để trải nghiệm đầy đủ các tính năng !'
            >
              <FormUpdateProfile />
            </AuthLayout>
          ),
        },
      ],
    },
    {
      // public

      children: [
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
          path: PATH.PROFILES_DETAIL,
          element: (
            <Layout user={profile} title=''>
              <ProfilePage profile={profile} />
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
