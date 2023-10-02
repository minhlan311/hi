export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASS: '/forgot-password',
  REGISTER: '/register',
  DOCUMENTS: '/documents',
  DOCUMENTS_DETAIL: '/documents/:id',
  QUIZZES: '/quizzes',
  TESTS: '/tests',
  QUIZZES_DETAIL: '/quizzes/:id',
  TESTS_DETAIL: '/tests/:id',
  ERROR_PAGE: '/error-page',
  SUBJECTS_PAGE: '/subjects',
  PROFILES: '/profiles',
  NEWS: '/news/:id',
  NEWS_PAGE: '/news/',
  PROFILES_DETAIL: '/profiles/:id',

  TEACHER_PAGE: '/giao-vien',
  TEACHER_DETAIL: '/giao-vien/:parentSlug',
  TEACHER_DETAIL_CHILD: '/giao-vien/:parentSlug/:childSlug',

  // COURSE_PAGE: '/courses',
  COURSE_DETAIL: '/courses/:id',
  COURSE_DETAIL_LEARNING: '/learning/:subjectSlug/:courseSlug/:topicSlug',
  MENTOR_PAGE: '/mentor',
  MENTOR_COURSES: '/mentor/courses',
  MENTOR_CLASS: '/mentor/class',
  MENTOR_COURSES_CREATE: '/mentor/courses/create',
  MENTOR_COURSES_UPDATE: '/mentor/courses/update/:id',
  MENTOR_CALENDAR: '/mentor/calendar',
  MENTOR_EXAMS: '/mentor/exams',
  MENTOR_EXAMS_DETAIL: '/mentor/exams/:slug',
  MENTOR_EXAMS_QUESTION: '/mentor/exams/:slug/questions',
  REGIS_MENTOR: '/regis-is-mentor',
  POINT_MANAGEMENT: '/point-management',
  CHANGE_PASS: '/change-password',
  PAYMENT_CALLBACK: '/payment-callback',
  ROOM_LIVE: '/room/:roomId',
  PEDAGOGYS: '/pedagogys/:id',
} as const

export default PATH
