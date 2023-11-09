export const PATH = {
  HOME: '/',
  VNPAY_CALLBACK: '/payment-callback',
  LOGIN: '/login',
  FORGOT_PASS: '/forgot-password',
  REGISTER: '/register',
  DOCUMENTS: '/documents',
  DOCUMENTS_DETAIL: '/documents/:id',
  QUIZZES: '/quizzes',
  TESTS: '/tests',
  CHANGE_PASSWORD: '/change-password',
  QUIZZES_DETAIL: '/quizzes/:id',
  TESTS_DETAIL: '/tests/:id',
  ERROR_PAGE: '/error-page',
  SUBJECTS_PAGE: '/subjects',
  PROFILES: '/profiles',
  SCHEDULE: '/schedule',
  NEWS: '/tin-tuc/:id',
  NEWS_PAGE: '/tin-tuc-4pa1v/',
  PROFILES_DETAIL: '/profiles/:id',
  SUBMENU_3: ':menuSlug/:categorySlug/:categoryDetailSlug',
  SUBMENU_2: ':menuSlug/:categorySlug/',
  SUBMENU_1: ':menuSlug/',
  INTRODUCE: '/gioi-thieu-1cimn',
  COURSE_SUB: '/khoa-hoc',
  CHOICE_PAGE: '/trac-nghiem',
  QA_PAGE: '/hoi-dap',
  QA_PAGE_DETAIL: '/hoi-dap/:id',
  TEST_PAGE: '/lam-bai-thi-online',
  TEST_TEST_PAGE: '/test-drag-drop',
  TEST_TEST_CREATE: '/create-drag-drop',

  // COURSE_PAGE: '/courses',
  COURSE_DETAIL: '/courses/:id',
  COURSE_DETAIL_LEARNING: '/learning/:subjectSlug/:courseSlug/:topicSlug',
  MENTOR_PAGE: '/mentor',
  MY_COURSE_LEARNING: '/myCourseLearning/:id',
  MY_COURSE: '/myCourse/',
  MENTOR_COURSES: '/mentor/courses',
  MENTOR_CLASS: '/mentor/class',
  MENTOR_COURSES_CREATE: '/mentor/courses/create',
  MENTOR_COURSES_UPDATE: '/mentor/courses/update/:id',
  MENTOR_CALENDAR: '/mentor/calendar',
  MENTOR_EXAMS: '/mentor/exams',
  MENTOR_MY_STUDENT: '/mentor/student',
  MENTOR_EXAMS_DETAIL: '/mentor/exams/:slug',
  MENTOR_EXAMS_QUESTION: '/mentor/exams/:slug/questions',
  REGIS_MENTOR: '/regis-is-mentor',
  POINT_MANAGEMENT: '/point-management',
  CHANGE_PASS: '/change-password',
  PAYMENT_CALLBACK: '/payment-callback',
  ROOM_LIVE: '/room/:roomId',
  PEDAGOGYS: '/pedagogys/:id',
  CART: '/cart-page'
} as const

export default PATH
