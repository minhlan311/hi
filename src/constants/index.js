/* eslint-disable no-useless-escape */
import { v4 as uuidv4 } from 'uuid'
import mentorImg from '../assets/images/login/mentor.svg'
import studentImg from '../assets/images/login/student.svg'
import pupilImg from '../assets/images/login/pupil.svg'

export const RolesDataSelection = [
    {
        id: uuidv4(),
        prefix: 'mentor',
        title: 'Mentor',
        imgIcon: mentorImg,
    },
    {
        id: uuidv4(),
        prefix: 'student',
        title: 'Sinh Viên',
        imgIcon: studentImg,
    },
    {
        id: uuidv4(),
        prefix: 'pupil',
        title: 'Học Sinh',
        imgIcon: pupilImg,
    },
]

export const REGEX_PATTERN = {
    regexEmail: /^([a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$)/,
    regexPhoneNumber: /^(\+84|0)(2\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/,
    regexCombineEmailPhoneNumber:
        /^([a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$)|([0-9]{10})+$/,
    regexPassword:
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$/,
    regexUrl:
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.(com|org|net|edu|gov|biz|info|vn)(\/[^\s]*)?$/,
}

export const STATUS_REQUEST = {
    LOADING: 'loading',
    success: 'success',
    FAILED: 'failed',
}

export const ACCOUNT_TYPE = {
    student: 'Sinh Viên',
    pupil: 'Học Sinh',
    mentor: 'Mentor Đại Học',
}

export const EDUCATION_TYPE = {
    HIGH_SCHOOL: 'HIGH SCHOOL',
    UNIVERSITY: 'UNIVERSITY',
    MENTOR: 'MENTOR',
}

export const DOCUMENT_TYPE = {
    EXAM: 'EXAM',
    CURRICULUM: 'CURRICULUM',
    SLIDE: 'SLIDE',
    OTHER: 'OTHER',
}
export const COUNT_DOWN_EXAM = 180

export const COUNT_DOWN_OPEN_SUBMIT = 30
