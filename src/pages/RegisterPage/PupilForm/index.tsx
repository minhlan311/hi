// import React, { memo, useCallback, useState } from 'react'
// import { Form, Select } from 'antd'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//     getEducationDetailRequest,
//     educationDetailSelector,
//     educationsSelector,
// } from '../../../slices/education'

// const { Option } = Select
// const PupilForm = () => {
//     const dispatch = useDispatch()

//     const [majors, setMajors] = useState([])

//     const educations = useSelector(educationsSelector)

//     const educationDetail = useSelector(educationDetailSelector)
//     const { data } = educations

//     const handleSelectEducation = useCallback(
//         (value) => {
//             dispatch(getEducationDetailRequest, value)
//             setMajors(educationDetail.data.majors)
//         },
//         [data]
//     )

//     return (
//         <>
//             <Form.Item
//                 name="educationId"
//                 label="Chọn trường phổ thông"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Vui lòng chọn trường phổ thông!',
//                     },
//                 ]}
//             >
//                 <Select
//                     placeholder="Trường phổ thông"
//                     onChange={(value) => handleSelectEducation(value)}
//                     allowClear
//                 >
//                     {data.map((value) => (
//                         <Option key={value._id} value={value._id}>
//                             {value.name}
//                         </Option>
//                     ))}
//                 </Select>
//             </Form.Item>

//             <Form.Item
//                 name="majorId"
//                 label="Chọn khối"
//                 rules={[{ required: true, message: 'Vui lòng chọn khối học!' }]}
//             >
//                 <Select placeholder="Khối học" onChange={() => {}} allowClear>
//                     {majors &&
//                         majors.map((value) => (
//                             <Option key={value._id} value={value._id}>
//                                 {value.name}
//                             </Option>
//                         ))}
//                 </Select>
//             </Form.Item>
//         </>
//     )
// }

// PupilForm.propTypes = {}

// export default memo(PupilForm)
