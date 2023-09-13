// /* eslint-disable jsx-a11y/img-redundant-alt */
// import { Card, Col, Row, Typography } from 'antd'
// import React, { memo } from 'react'

// import mtzRankingImg from '../../../assets/images/homepage/ranking-img.svg'
// // import mtzRankingCupImg from '../../../assets/images/homepage/ranking-cup.svg'
// import mtzTop1Img from '../../../assets/images/homepage/circle-top-1.svg'
// import mtzTop2Img from '../../../assets/images/homepage/circle-top-2.svg'
// import mtzTop3Img from '../../../assets/images/homepage/circle-top-3.svg'

// import './styles.scss'
// const { Text } = Typography
// const TopMockTest = () => {
//     return (
//         <div className="mtz-ranking">
//             <Text className="mtz-ranking-title">
//                 Top 10 đề thi thử được thi nhiều nhất
//             </Text>
//             <Row>
//                 <Col className="gutter-row ranking-cup" span={24}>
//                     {/* <img src={mtzRankingCupImg} alt="mtz ranking image" /> */}
//                 </Col>
//             </Row>
//             <Row gutter={32} className="mt-15 pt-15">
//                 <Col
//                     className="gutter-row"
//                     span={24}
//                     xl={12}
//                     md={12}
//                     lg={12}
//                     xxl={12}
//                 >
//                     <Card title="Bài test" bordered={false}>
//                         <Row className="group-box">
//                             <Col span={8} className="box1">
//                                 <img src={mtzTop2Img} alt="mtz ranking image" />
//                                 <div>Bài 9</div>
//                                 <div>200</div>
//                             </Col>
//                             <Col span={8} className="box2">
//                                 <img src={mtzTop1Img} alt="mtz ranking image" />
//                                 <div>Bài 9</div>
//                                 <div>200</div>
//                             </Col>
//                             <Col span={8} className="box3">
//                                 <img src={mtzTop3Img} alt="mtz ranking image" />
//                                 <div>Bài 9</div>
//                                 <div>200</div>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <img src={mtzRankingImg} alt="mtz ranking image" />
//                         </Row>
//                     </Card>

//                     <Row className="tag-ranking">
//                         <Col span={3}>
//                             <div className="circle-number">4</div>
//                         </Col>
//                         <Col span={17}>
//                             <Text className="tag-description">
//                                 Bài 10 - Thuyết tương đối
//                             </Text>
//                         </Col>
//                         <Col span={4}>
//                             <div className="tag-score">100</div>
//                         </Col>
//                     </Row>

//                     <Row className="tag-ranking">
//                         <Col span={3}>
//                             <div className="circle-number">4</div>
//                         </Col>
//                         <Col span={17}>
//                             <Text className="tag-description">
//                                 Bài 10 - Thuyết tương đối
//                             </Text>
//                         </Col>
//                         <Col span={4}>
//                             <div className="tag-score">100</div>
//                         </Col>
//                     </Row>

//                     <Row className="tag-ranking">
//                         <Col span={3}>
//                             <div className="circle-number">4</div>
//                         </Col>
//                         <Col span={17}>
//                             <Text className="tag-description">
//                                 Bài 10 - Thuyết tương đối
//                             </Text>
//                         </Col>
//                         <Col span={4}>
//                             <div className="tag-score">100</div>
//                         </Col>
//                     </Row>

//                     <Row className="tag-ranking">
//                         <Col span={3}>
//                             <div className="circle-number">4</div>
//                         </Col>
//                         <Col span={17}>
//                             <Text className="tag-description">
//                                 Bài 10 - Thuyết tương đối
//                             </Text>
//                         </Col>
//                         <Col span={4}>
//                             <div className="tag-score">100</div>
//                         </Col>
//                     </Row>

//                     <Row className="tag-ranking">
//                         <Col span={3}>
//                             <div className="circle-number">4</div>
//                         </Col>
//                         <Col span={17}>
//                             <Text className="tag-description">
//                                 Bài 10 - Thuyết tương đối
//                             </Text>
//                         </Col>
//                         <Col span={4}>
//                             <div className="tag-score">100</div>
//                         </Col>
//                     </Row>
//                 </Col>
//                 <Col
//                     className="gutter-row"
//                     span={24}
//                     xl={12}
//                     md={12}
//                     lg={12}
//                     xxl={12}
//                 >
//                     <Card title="Bài Quiz" bordered={false}>
//                         <Row className="group-box">
//                             <Col span={8} className="box1">
//                                 <img src={mtzTop2Img} alt="mtz ranking image" />
//                                 <div>Bài 9</div>
//                                 <div>200</div>
//                             </Col>
//                             <Col span={8} className="box2">
//                                 <img src={mtzTop1Img} alt="mtz ranking image" />
//                                 <div>Bài 9</div>
//                                 <div>200</div>
//                             </Col>
//                             <Col span={8} className="box3">
//                                 <img src={mtzTop3Img} alt="mtz ranking image" />
//                                 <div>Bài 9</div>
//                                 <div>200</div>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <img src={mtzRankingImg} alt="mtz ranking image" />
//                         </Row>
//                     </Card>

//                     <Row className="tag-ranking">
//                         <Col span={3}>
//                             <div className="circle-number">4</div>
//                         </Col>
//                         <Col span={17}>
//                             <Text className="tag-description">
//                                 Bài 10 - Thuyết tương đối
//                             </Text>
//                         </Col>
//                         <Col span={4}>
//                             <div className="tag-score">100</div>
//                         </Col>
//                     </Row>

//                     <Row className="tag-ranking">
//                         <Col span={3}>
//                             <div className="circle-number">4</div>
//                         </Col>
//                         <Col span={17}>
//                             <Text className="tag-description">
//                                 Bài 10 - Thuyết tương đối
//                             </Text>
//                         </Col>
//                         <Col span={4}>
//                             <div className="tag-score">100</div>
//                         </Col>
//                     </Row>

//                     <Row className="tag-ranking">
//                         <Col span={3}>
//                             <div className="circle-number">4</div>
//                         </Col>
//                         <Col span={17}>
//                             <Text className="tag-description">
//                                 Bài 10 - Thuyết tương đối
//                             </Text>
//                         </Col>
//                         <Col span={4}>
//                             <div className="tag-score">100</div>
//                         </Col>
//                     </Row>

//                     <Row className="tag-ranking">
//                         <Col span={3}>
//                             <div className="circle-number">4</div>
//                         </Col>
//                         <Col span={17}>
//                             <Text className="tag-description">
//                                 Bài 10 - Thuyết tương đối
//                             </Text>
//                         </Col>
//                         <Col span={4}>
//                             <div className="tag-score">100</div>
//                         </Col>
//                     </Row>

//                     <Row className="tag-ranking">
//                         <Col span={3}>
//                             <div className="circle-number">4</div>
//                         </Col>
//                         <Col span={17}>
//                             <Text className="tag-description">
//                                 Bài 10 - Thuyết tương đối
//                             </Text>
//                         </Col>
//                         <Col span={4}>
//                             <div className="tag-score">100</div>
//                         </Col>
//                     </Row>
//                 </Col>
//             </Row>
//         </div>
//     )
// }

// export default memo(TopMockTest)
