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
import Courses from './pages/CoursesPage/Courses.tsx'
import HomePage from './pages/HomePage/index.tsx'
import MentorCalendar from './pages/MentorPage/Management/Calendar/index.tsx'
import CLassCourse from './pages/MentorPage/Management/ClassCourse/CLassCourse.tsx'
import StepCreate from './pages/MentorPage/Management/Cousers/CreateCourse/StepCreate.tsx'
import MentorCourses from './pages/MentorPage/Management/Cousers/index.tsx'
import MentorExamDetail from './pages/MentorPage/Management/Exams/ExamDetail/index.tsx'
import MentorExamQuestions from './pages/MentorPage/Management/Exams/Questions/index.tsx'
import MentorExams from './pages/MentorPage/Management/Exams/index.tsx'
import NewsPage from './pages/NewsPage/NewsPage.tsx'
import NewsPageDetail from './pages/NewsPage/NewsPageDetail.tsx'
import ProfilePage from './pages/ProfilePage/index.tsx'
import CategogyDetail from './pages/CategoryPage/CategogyDetail.tsx'
import CategorySub from './pages/CategoryPage/CategorySub/CategorySub.tsx'
import Introduce from './pages/IntroducePage/Introduce.tsx'
import ChangePassword from './pages/Auth/ChangePassword/ChangePassword.tsx'
/* eslint-disable react-refresh/only-export-components */

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
              <MentorExams />
            </MentorLayout>
          ),
        },
        {
          path: PATH.MENTOR_EXAMS_DETAIL,
          element: (
            <MentorLayout user={profile} title='Bộ đề'>
              <MentorExamDetail />
            </MentorLayout>
          ),
        },
        {
          path: PATH.MENTOR_EXAMS_QUESTION,
          element: (
            <MentorLayout user={profile} title='Danh sách câu hỏi'>
              <MentorExamQuestions />
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

        // {
        //   path: PATH.PEDAGOGYS,
        //   element: (
        //     <AuthLayout
        //       title='Cập nhật thông tin'
        //       imgSize={14}
        //       titleForm='Cập nhật thông tin'
        //       descForm='Hãy cập nhật đầy đủ thông tin của bạn , để trải nghiệm đầy đủ các tính năng !'
        //     >
        //       <FormUpdateProfile />
        //     </AuthLayout>
        //   ),
        // },
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
          path: PATH.INTRODUCE,
          element: (
            <Layout user={profile} title=''>
              <Introduce />
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
          path: PATH.SUBMENU_3,
          element: (
            <Layout user={profile}>
              <CategogyDetail />
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
