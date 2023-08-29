import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { messageError } from '../../../config/errorConfig'
import { getTopicById } from '../../../services/courseServices/courseServices'

import styles from '../styles/index.module.scss'
import Prepare from './Prepare'
import Ready from './Ready'
import Swal from 'sweetalert2'

const cx = classNames.bind(styles)

function MainComponent(props) {
    const { id, testId } = useParams()

    const [step, setStep] = useState('PREPARE')
    const [listQuiz, setListQuiz] = useState(null)

    return (
        <div className="w-100">
            <div className="row">
                <div className="col-md-9">
                    <div className={cx('content-wrap')}>
                        <div className={cx('content-heading')}>
                            {lesson?.name}
                        </div>
                        {step === 'PREPARE' && (
                            <Prepare
                                testId={testId}
                                setStep={setStep}
                                setListQuiz={setListQuiz}
                            />
                        )}
                        {step === 'READY' && (
                            <Ready listQuiz={listQuiz} lesson={lesson} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainComponent
