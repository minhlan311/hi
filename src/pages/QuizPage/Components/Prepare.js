import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    hideLoading,
    showLoading,
} from '../../../redux/actions/uiActions/uiActions'
import {
    getListQuiz,
    getTestById,
} from '../../../services/testServices/testServices'
import styles from '../styles/index.module.scss'

const cx = classNames.bind(styles)

export default function Prepare(props) {
    const { setStep, testId, setListQuiz } = props

    const dispatch = useDispatch()

    const [test, setTest] = useState(null)

    useEffect(() => {
        if (testId) {
            getTestById(testId)
                .then((response) => {
                    dispatch(showLoading())
                    setTest(response)
                    dispatch(hideLoading())
                })
                .catch((error) => {
                    dispatch(hideLoading())
                    // messageError(error);;
                })
        }
    }, [testId, dispatch])

    const handleStart = () => {
        setStep('READY')

        getListQuiz(testId)
            .then((response) => {
                setListQuiz(response.docs)
            })
            .catch((error) => {
                // messageError(error);;
            })
    }

    return (
        <div className={cx('content-desc')}>
            <img
                src={require('../../../assets/images/home-login.png')}
                alt="avatar"
            />
            <div className={cx('content-title')}>{test?.name}</div>
            <div className={cx('content-sub-title')}>
                {test?.description}
                <br></br>
                {/*Tổng điểm: <b>{test?.totalPoints}</b>*/}
                Số câu hỏi: <b>{test?.totalQuizzes}</b>
            </div>
            <button onClick={handleStart}>BẮT ĐẦU</button>
        </div>
    )
}
