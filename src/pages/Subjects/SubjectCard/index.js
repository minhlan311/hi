import React from 'react'
import { splitText } from '../../../utils/helper'
const SubjectCard = ({ subs }) => {
    return (
        <>
            <div className="prf-data-item">
                <img
                    src="http://thaunguyen.com/blog/wp-content/uploads/2018/12/Evening_English_1-1150x647.jpg"
                    alt=" "
                    className="pic"
                />
                <div className="data">
                    <p className="subject-name">{subs?.name}</p>
                    <div className="desc">
                        <div className="desc-item d-flex">
                            <p className="description">
                                {splitText(subs?.description, 50)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubjectCard
