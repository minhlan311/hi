import React, { memo, useEffect, useState } from 'react'
import { Form, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
    getEducationDetailRequest,
    educationDetailSelector,
    educationsSelector,
} from '../../../slices/education'

const { Option } = Select
const StudentForm = () => {
    const dispatch = useDispatch()

    const educations = useSelector(educationsSelector)
    const educationDetail = useSelector(educationDetailSelector)
    const { data } = educations

    const handleSelectEducation = (value) => {
        if (value !== undefined) {
            dispatch(getEducationDetailRequest(value))
        } else {
            setMajors([])
        }
    }

    const [majors, setMajors] = useState([])
    useEffect(() => {
        setMajors(educationDetail?.data.majors)
    }, [educationDetail])

    return (
        <>
            <Form.Item
                name="educationId"
                label="Chọn trường đại học"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn trường đại học!',
                    },
                ]}
            >
                <Select
                    placeholder="Trường đại học"
                    onChange={(value) => handleSelectEducation(value)}
                >
                    {data.map((value) => (
                        <Option key={value._id} value={value._id}>
                            {value.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="majorId"
                label="Chọn ngành học"
                rules={[
                    { required: true, message: 'Vui lòng chọn ngành học!' },
                ]}
            >
                <Select placeholder="Ngành học" onChange={() => {}}>
                    {majors &&
                        majors.map((value) => (
                            <Option key={value._id} value={value._id}>
                                {value.name}
                            </Option>
                        ))}
                </Select>
            </Form.Item>
        </>
    )
}

StudentForm.propTypes = {}

export default memo(StudentForm)
