export const ENDPOINT = {
  QUESTIONS_DETAIL_PATH: '/exam/questions/detail/',

  // :::::::::::::::::::: AUTH PATH :::::::::::::::::::::
  LOGIN: '/auth/login',
  REGISTER: '/auth/signup',
  LOGOUT: '/auth/logout',
  CHANGE_PASSWORD: '/users/change-password/',
  FORGOT_PASSWORD: '/users/reset-password/',

  // :::::::::::::::::::: USER PATH :::::::::::::::::::::
  USER_DETAIL_PATH: '/users/',
  GET_ALL_MENTOR: '/users/find',
  MENTOR: '/mentorInfo/',
  MENTOR_DETAIL: '/mentorInfo/user/',

  // :::::::::::::::::::: DOCUMENT PATH :::::::::::::::::::::
  DOCUMENT_PATH: '/edu/documents',
  FIND_DOCUMENT_PATH: '/edu/documents/find',

  // :::::::::::::::::::: CONFIG PATH :::::::::::::::::::::
  CONFIG_PATH: '/configs',

  // :::::::::::::::::::: NEWS PATH :::::::::::::::::::::
  NEWS: '/news/find',
  GET_ONE_NEWS: '/news/',

  GET_USER_INFO: '/users/',
  FIND_USER_PATH: '/users/find',
  UPDATE_USER_INFO: '/users/',

  // :::::::::::::::::::: FILE PATH :::::::::::::::::::::
  GET_ATTACHMENT: '/upload/download/',
  UPLOAD_ATTACHMENT: '/upload/attachments/',
  UPLOAD_IMAGE: '/upload/image',
  UPLOAD_CERTIFICATES: '/upload/certificates',
  UPLOAD_LARGE_IMAGE: '/upload/large-image',

  // :::::::::::::::::::: CATEGORY PATH :::::::::::::::::::::
  CATEGORIES_PATH: '/category/',
  CATEGORIES_PATH_SLUG: '/category/detail/',
  FIND_CATEGORIES_PATH: '/category/find',

  // :::::::::::::::::::: BOOKMARK PATH :::::::::::::::::::::
  ADD_BOOKMARK_PATH: '/bookmark/add-bookmark',
  FIND_BOOKMARK_PATH: '/bookmark/find',
  DELETE_BOOKMARK_PATH: '/bookmark/delete-bookmark/',

  // :::::::::::::::::::: EXAM PATH :::::::::::::::::::::
  EXAM_PATH: '/exam/tests/',
  FIND_EXAM_PATH: '/exam/tests/find',
  FIND_EXAM_SUBMIT: '/exam/tests/submit/',
  FIND_EXAM_RESULTS: '/exam/results/find',

  // :::::::::::::::::::: SKILL PATH :::::::::::::::::::::
  SKILL_PATH: '/exam/skills/',
  FIND_SKILL_PATH: '/exam/skills/find',

  // :::::::::::::::::::: QUESTION PATH :::::::::::::::::::::
  QUESTION_PATH: '/exam/questions/',
  FIND_QUESTION_PATH: '/exam/questions/find',
  IMPORT_QUESTION_PATH: '/exam/questions/import',

  // :::::::::::::::::::: Course PATH :::::::::::::::::::::
  COURSES_PATH: '/courses/',
  ENROLL_PATH_USER: '/courses/findUser',
  FIND_COURSES_PATH: '/courses/find',
  COURSES_QUIZ_PATH: '/exam/questions/find',
  PROGRESSIONS_PATH: '/edu/progressions/',
  FIND_PROGRESSIONS_PATH: '/edu/progressions/find',

  // :::::::::::::::::::: NOTES PATH :::::::::::::::::::::
  FIND_NOTE_PATH: '/edu/notes/find',
  NOTE_PATH: '/edu/notes',

  // :::::::::::::::::::: CART PATH :::::::::::::::::::::
  CART_FIND: '/cart/find',
  CART_DELETE_COURSE: '/cart/delete-course/',
  CART_ADD: '/cart/add-to-cart',

  // :::::::::::::::::::: SUBJECT PATH :::::::::::::::::::::
  SUBJECT_PATH: '/subjects/find',

  // :::::::::::::::::::: LESSONS PATH :::::::::::::::::::::
  FIND_LESSONS_PATH: '/edu/lessons/find',
  LESSONS_PATH: '/edu/lessons/',

  // :::::::::::::::::::: ASSESSMENTS PATH :::::::::::::::::::::
  FIND_ASSESSMENTS_PATH: '/assessment/find',
  ASSESSMENTS_PATH: '/assessment/',

  // :::::::::::::::::::: CLASS PATH :::::::::::::::::::::
  FIND_CLASS_PATH: '/class/find',
  CLASS_PATH: '/class/',
  ARRANGE_PATH: '/class/arrange',
  ARRANGE_UPDATE_PATH: '/class/arrange-update',
  OPENING_PATH: '/class/find-opening',

  // :::::::::::::::::::: EVENT PATH :::::::::::::::::::::
  FIND_EVENT_PATH: '/event/find',
  EVENT_PATH: '/event/',
  EVENT_ATTENDANCE_PATH: '/event/attendance/',

  // :::::::::::::::::::: TOPIC PATH :::::::::::::::::::::
  FIND_TOPIC_PATH: '/edu/topics/find',
  TOPIC_PATH: '/edu/topics/',

  // :::::::::::::::::::: COMMENT PATH :::::::::::::::::::::
  COMMENT_PATH: '/comments/',
  FIND_COMMENTS_PATH: '/comments/find',
  COMMENTS_DETAIL_PATH: '/comments/',

  // :::::::::::::::::::: BANNER PATH :::::::::::::::::::::
  BANNERS_MENTOR_PATH: '/edu/mentorIntroduce/',
  FIND_BANNERS_MENTOR_PATH: '/edu/mentorIntroduce/find',

  // :::::::::::::::::::: ACTIVATION CODE PATH :::::::::::::::::::::
  FIND_ACTIVATION_CODE_PATH: '/edu/activations/find',
  ACTIVATION_CODE_PATH: '/edu/activations',

  // :::::::::::::::::::: Enroll PATH :::::::::::::::::::::
  FIND_ENROLL_PATH: '/enrolls/find',
  ENROLL_PATH: '/enrolls/',

  // :::::::::::::::::::: ANNOUNCEMENT PATH :::::::::::::::::::::
  ANNOUNCEMENT_PATH: '/announcements/find',

  // :::::::::::::::::::: PAYMENT PATH :::::::::::::::::::::
  PAYMENT_CHECKOUT_PATH: '/payment/checkout',
  PAYMENT_CHECKOUT_POINT: '/payment/checkpoint',
  PAYMENT_CALLBACK_PATH: '/vnpay/callback',
  FIND_TRANSACTION_PATH: '/transactions/find',
  TRANSACTION_PATH: '/transactions',

  // :::::::::::::::::::: NOTIFICATIONS PATH :::::::::::::::::::::
  NOTIFICATIONS: '/notifications',
  NOTIFICATIONS_PATH: '/notifications/find',

  // :::::::::::::::::::: PEDAGOGY PATH :::::::::::::::::::::
  FIND_PEDAGOGY_PATH: '/pedagogy/find',
  PEDAGOGY_PATH: '/pedagogy',
  FIND_ANSWER_PEDAGOGY_PATH: '/answer/find',
  ANSWER_PEDAGOGY_PATH: '/answer',

  // :::::::::::::::::::: EXAM PATH :::::::::::::::::::::
  EXAM_IMPORT_PATH: '/exam/questions/import',
  EXAM_FIND_PATH: '/exam/questions/find',

  // :::::::::::::::::::: CONFIGS PATH :::::::::::::::::::::
  CONFIGS_PATH: '/configs',

  // :::::::::::::::::::: VNPAY PATH :::::::::::::::::::::
  PAY_PATH: '/vnpay/checkout',
  CALLBACK_PATH: '/vnpay/callback',

  // :::::::::::::::::::: FAQ PATH :::::::::::::::::::::
  FAQ_PATH: '/qas/',
  FAQ_PATH_ANSWER: '/qas/answer/',
  FAQ_FIND_PATH: '/qas/find',

  // :::::::::::::::::::: FAQ PATH :::::::::::::::::::::
  LIKE_PATH: '/likes/',
}
