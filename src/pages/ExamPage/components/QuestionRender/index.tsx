/* eslint-disable @typescript-eslint/no-explicit-any */
import { stateAction } from '@/common'
import { AppContext } from '@/contexts/app.context'
import { QuestionState, TypeQuestion } from '@/interface/question'
import { Card, Divider, Flex, Input, Radio, Space } from 'antd'
import { useContext, useEffect, useState } from 'react'
import style from './styles.module.scss'

const QuestionsRender = ({ data }: { data: QuestionState[] }) => {
  const { setOverView } = useContext(AppContext)
  const [loading, setLoading] = useState<boolean>(true)

  const [questionsByType, setQestionsByType] = useState<{ type: TypeQuestion; data: QuestionState[] }[]>([
    { type: 'SINGLE CHOICE', data: [] },
    { type: 'MULTIPLE CHOICE', data: [] },
    { type: 'TRUE FALSE', data: [] },
    { type: 'SORT', data: [] },
    { type: 'DRAG DROP', data: [] },
    { type: 'LIKERT SCALE', data: [] },
    { type: 'FILL BLANK', data: [] },
    { type: 'MATCHING', data: [] },
    { type: 'NUMERICAL', data: [] },
    { type: 'WRITING', data: [] },
  ])

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((q) => {
        const typeIndex = questionsByType.findIndex((item) => item.type === q.type)

        if (typeIndex !== -1) {
          questionsByType[typeIndex].data.push(q)
          setQestionsByType(questionsByType)
        }
      })

      setLoading(false)
    }
  }, [data])
  const [anwsFB, setAnwsFB] = useState<{ _id: string; anwser: string }[]>([])

  // Todo undefined
  const [FBData, setFBData] = useState<{ _id: string; index: number; anwText: string }>()

  const replaceArr = (text: string) => {
    const parts = text.split('______')

    const newTextParts = []

    for (let i = 0; i < parts.length - 1; i++) {
      newTextParts.push(parts[i], '______')
    }

    newTextParts.push(parts[parts.length - 1])

    return newTextParts
  }

  const handleChange = (item: any, index: number, anwser: any, correctAnswers: any | any[]) => {
    stateAction(
      setOverView,
      item._id,
      {
        index: index,
        _id: item._id,
        anwser,
        correctAnswers,
      },
      'update',
    )
  }

  useEffect(() => {
    if (anwsFB && FBData) {
      const anwserArray = anwsFB.map((item) => item.anwser)
      const combinedAnwser = anwserArray.join(', ')
      const replacedText = FBData?.anwText.replace(/______/g, (match) => {
        const replacement = anwsFB.find((item) => item._id === match)

        return replacement ? replacement.anwser : match
      })
      console.log(replacedText, combinedAnwser, FBData)

      // if (FBData) debounce(handleChange(FBData, FBData?.index, combinedAnwser, replacedText), 500)
    }
  }, [anwsFB, FBData])
  console.log(FBData)
  const options = ['A', 'B', 'C', 'D']
  if (!loading)
    return (
      <Card size='small' className={style.main}>
        {questionsByType.map((pack, index) => {
          if (pack.data.length > 0)
            return (
              <Space direction='vertical' size='large' className={`sp100`} key={pack.type}>
                <h2 style={{ marginTop: 24 }}>Questions 1 - {pack.data.length}</h2>
                {(pack.type === 'SINGLE CHOICE' && (
                  <>
                    <i>
                      Choose the correct letter, <b>A</b>, <b>B</b>, <b>С</b> or <b>D</b>.
                    </i>
                    {pack.data.map((item, index) => (
                      <div key={item._id} onLoad={() => handleChange(pack, index, options[index], '')}>
                        <b
                          dangerouslySetInnerHTML={{
                            __html: `<span>${index + 1}. </span><span>${item?.question}</span>`,
                          }}
                          style={{ display: 'block', marginBottom: 12 }}
                        ></b>

                        <Radio.Group>
                          <Space direction='vertical' className={`sp100`}>
                            {item.choices.map((choice, index) => (
                              <Radio
                                key={index}
                                value={choice}
                                className={style.radio}
                                onChange={(e) => {
                                  handleChange(item, index, options[index], [e.target.value._id])
                                }}
                              >
                                <Flex align='center'>
                                  <span className={style.answer}>{options[index]}</span>
                                  <Radio
                                    value={choice}
                                    onChange={(e) => handleChange(item, index, options[index], [e.target.value._id])}
                                  >
                                    <div dangerouslySetInnerHTML={{ __html: choice.answer }}></div>
                                  </Radio>
                                </Flex>
                              </Radio>
                            ))}
                          </Space>
                        </Radio.Group>
                      </div>
                    ))}
                  </>
                )) ||
                  (pack.type === 'TRUE FALSE' && (
                    <Space
                      direction='vertical'
                      className={'sp100'}
                      onLoad={() => handleChange(pack, index, options[index], '')}
                    >
                      <p>
                        In boxes <p>1-{pack.data.length}</p> on your answer sheet write:
                      </p>
                      <p>
                        <Flex gap={25}>
                          <h3>
                            <i>TRUE</i>
                          </h3>
                          It agrees with the information in the text
                        </Flex>
                        <Flex gap={20}>
                          <h3>
                            <i>FALSE</i>
                          </h3>
                          It disagrees with it or contradicts it
                        </Flex>
                      </p>
                      <Space direction='vertical' size='large' className={style.trueFalseMain}>
                        {pack.data.map((item, index) => (
                          <Flex justify='space-between' gap={24}>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: `<span>${index + 1}. </span><span>${item?.question}</span>`,
                              }}
                            ></p>
                            <Radio.Group optionType='button' buttonStyle='outline' size='small'>
                              <Space>
                                {item.choices.map((choice, index) => (
                                  <Radio
                                    key={index}
                                    value={choice}
                                    onChange={(e) => handleChange(item, index, options[index], [e.target.value._id])}
                                  >
                                    <div dangerouslySetInnerHTML={{ __html: choice.answer }}></div>
                                  </Radio>
                                ))}
                              </Space>
                            </Radio.Group>
                          </Flex>
                        ))}
                      </Space>
                    </Space>
                  )) ||
                  (pack.type === 'WRITING' && (
                    <>
                      {pack.data.map((item, index) => (
                        <Space
                          direction='vertical'
                          className={'sp100'}
                          onLoad={() => handleChange(pack, index, options[index], '')}
                        >
                          <p
                            className={'dangerHTML'}
                            dangerouslySetInnerHTML={{
                              __html: `<div><span>${index + 1}. </span><span>${item?.question}</span></div>`,
                            }}
                          ></p>
                          <Input onChange={(e) => handleChange(item, index, options[index], e)} />
                        </Space>
                      ))}
                    </>
                  )) ||
                  (pack.type === 'FILL BLANK' && (
                    <>
                      {pack.data.map((item) => (
                        <span
                          key={item._id}
                          onLoad={() =>
                            setFBData({
                              _id: item._id,
                              index: index,
                              anwText: item?.questionText ? item?.questionText : '',
                            })
                          }
                        >
                          {replaceArr(item?.questionText as string).map((i, id) => (
                            <p>
                              {i === '______' ? (
                                <Input
                                  onChange={(e) =>
                                    stateAction(setAnwsFB, `${id}`, { _id: `${id}`, anwser: e.target.value }, 'update')
                                  }
                                  style={{ width: 'auto', margin: '0 8px' }}
                                ></Input>
                              ) : (
                                i
                              )}
                            </p>
                          ))}
                        </span>
                      ))}
                    </>
                  )) || (
                    <div>
                      <Divider />
                      <i style={{ color: 'var(--red) ' }}>
                        Question type "<b>{pack.type}</b>" has not been updated, please contact the administrator
                      </i>
                    </div>
                  )}
              </Space>
            )
        })}
      </Card>
    )
}

export default QuestionsRender
