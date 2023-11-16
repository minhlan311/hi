import { Button, Col, Row } from 'antd'

import './Reading.scss'
import { useQuery } from '@tanstack/react-query'
import examApi from '@/apis/exam.api'

export default function Reading() {
  const { data: dataQuestion } = useQuery({
    queryKey: ['questionList'],
    queryFn: () => examApi.getExamDetail('6541e1106580b32bd7dd8f14'),
  })

  const dataListQuestion = dataQuestion?.data.questionsDetail

  console.log(dataListQuestion, 'dataQuestiondataQuestion')

  return (
    <div className='container-div-reading'>
      <Row gutter={16}>
        <Col span={12}>
          <div className='border-1-div'>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium
              aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo
              cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta
              laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet
              nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione
              dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel
              eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda
              ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates
              perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint
              voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum
              sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit?
              Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet
              suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit
              amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit
              amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et
              qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid
              cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est!
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium
              aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo
              cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta
              laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet
              nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione
              dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel
              eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda
              ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates
              perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint
              voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum
              dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et
              qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid
              cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est!
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium
              aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo
              cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta
              laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet
              nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione
              dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel
              eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda
              ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates
              perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint
              voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum
              dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et
              qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est! Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium aliquid
              cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo cumque est!
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta laudantium
              aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet nemo
              cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione dicta
              laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel eveniet
              nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda ratione
              dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates perspiciatis, vel
              eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem assumenda
              ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint voluptates
              perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum sint
              voluptates perspiciatis, vel eveniet nemo cumque est! Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Voluptatem assumenda ratione dicta laudantium aliquid cum et qui sit amet suscipit? Assumenda earum
              sint voluptates perspiciatis, vel eveniet nemo cumque est!
            </p>
          </div>
        </Col>
        <Col span={12}>
          <div className='border-2-div'>
            {dataListQuestion &&
              dataListQuestion?.length &&
              dataListQuestion?.map((item, index) => (
                <>
                  <p
                    style={{
                      marginTop: '20px',
                      fontWeight: '700',
                    }}
                  >
                    Câu số {index + 1}
                  </p>
                  <div className='html-ques-choice' dangerouslySetInnerHTML={{ __html: item?.question }}></div>
                  {item?.choices?.map((choice) => (
                    <>
                      <Button>{choice?.answer}</Button>
                    </>
                  ))}
                </>
              ))}
          </div>
        </Col>
      </Row>
    </div>
  )
}
