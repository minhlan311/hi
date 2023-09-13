/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/app.context'
import PATH from './constants/path'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Layout from './components/layout/Layout.tsx'
import HomePage from './pages/HomePage/index.tsx'
import Register from './pages/Auth/Register/index.tsx'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return isAuthenticated ? <Outlet /> : <Navigate to='/join/login' />
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
          element: <Layout title='新規登録して学習を始める'>{/* <Login /> */}</Layout>
        },
        {
          path: PATH.REGISTER,
          element: (
            <Layout user={profile} title='新規登録して学習を始める'>
              <Register />
            </Layout>
          )
        }
      ]
    },
    {
      // private
      path: '',
      element: <ProtectedRoute />,
      children: [
        // {
        //   path: path.profileEdit,
        //   element: (
        //     <Layout user={profile} title=''>
        //       <EditProfile />
        //     </Layout>
        //   )
        // },
        // {
        //   path: path.editPhoto,
        //   element: (
        //     <Layout user={profile} title='name'>
        //       <EditPhoto />
        //     </Layout>
        //   )
        // },
        // {
        //   path: path.editAccount,
        //   element: (
        //     <Layout user={profile} title='name'>
        //       <EditAccount />
        //     </Layout>
        //   )
        // },
        // {
        //   path: path.editPayment,
        //   element: (
        //     <Layout user={profile} title='name'>
        //       <EditPayment />
        //     </Layout>
        //   )
        // },
        // {
        //   path: path.editNotifications,
        //   element: (
        //     <Layout user={profile} title='name'>
        //       <EditNotifications />
        //     </Layout>
        //   )
        // },
        // {
        //   path: path.closeAccount,
        //   element: (
        //     <Layout user={profile} title='name'>
        //       <CloseAccount />
        //     </Layout>
        //   )
        // },
        // {
        //   path: path.myCoursesLearning,
        //   element: (
        //     <Layout user={profile} title='name'>
        //       <MycoursesLearning />
        //     </Layout>
        //   )
        // },
        // {
        //   path: path.publicProfile,
        //   element: (
        //     <Layout user={profile} title='name'>
        //       <Profile user={profile} />
        //     </Layout>
        //   )
        // }
      ]
    },
    {
      // public
      // element: <Layout />,
      children: [
        {
          path: PATH.HOME,
          index: true,
          element: (
            <Layout user={profile} title='サイトマップ'>
              <HomePage />
            </Layout>
          )
        },
        // {
        //   path: path.coursePage,
        //   element: (
        //     <Layout user={profile} title='サイトマップ'>
        //       <Courses />
        //     </Layout>
        //   ),
        //   children: [
        //     // {
        //     //   path: path.coursesId,
        //     //   element: <Courses />
        //     // }
        //   ]
        // },
        // {
        //   path: path.siteMap,
        //   element: (
        //     <Layout user={profile} title='サイトマップ'>
        //       <SiteMap />
        //     </Layout>
        //   )
        // },
        // {
        //   path: path.cart,
        //   element: (
        //     <Layout user={profile} title='サイトマップ'>
        //       <Cart />
        //     </Layout>
        //   )
        // },
        // {
        //   path: path.checkout,
        //   element: (
        //     <Layout user={profile} title='サイトマップ'>
        //       <Checkout />
        //     </Layout>
        //   )
        // }
        { path: '*', element: <PageNotFound /> }

        //   )
        // }
      ]
    }
  ])
  return routeElements
}
