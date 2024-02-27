/* eslint-disable @typescript-eslint/no-explicit-any */
import { stateAction } from '@/common'
import { AppContext } from '@/contexts/app.context'
import { QuestionState, TypeQuestion } from '@/interface/question'
import { Card, Divider, Flex, Input, Radio, Space } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import style from './styles.module.scss'

const QuestionsRender = ({
  data,
}: {
  data: QuestionState[]
  callbackSubmit: React.Dispatch<React.SetStateAction<any[]>>
}) => {
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

  const replaceArr = (text: string) => {
    const parts = text.split('______')

    const newTextParts = []

    for (let i = 0; i < parts.length - 1; i++) {
      newTextParts.push(parts[i], '______')
    }

    newTextParts.push(parts[parts.length - 1])

    return newTextParts
  }

  const options = ['A', 'B', 'C', 'D']
  if (!loading)
    return (
      <Card size='small' className={style.main}>
        {questionsByType.map((item) => {
          if (item.data.length > 0)
            return (
              <Space direction='vertical' size='large' className={`sp100`} key={item.type}>
                <h2 style={{ marginTop: 24 }}>Questions 1 - {item.data.length}</h2>
                {(item.type === 'SINGLE CHOICE' && (
                  <>
                    <i>
                      Choose the correct letter, <b>A</b>, <b>B</b>, <b>С</b> or <b>D</b>.
                    </i>
                    {item.data.map((item, index) => (
                      <div key={item._id}>
                        <b
                          dangerouslySetInnerHTML={{
                            __html: `<div><span>${index + 1}. </span><span>${item?.question}</span></div>`,
                          }}
                        ></b>

                        <Radio.Group>
                          <Space direction='vertical' className={`sp100`}>
                            {item.choices.map((choice, index) => (
                              <Radio
                                key={index}
                                value={choice}
                                className={style.radio}
                                onChange={(e) =>
                                  stateAction(
                                    setOverView,
                                    item._id,
                                    {
                                      index: index,
                                      _id: item._id,
                                      anwser: options[index],
                                      anwserDetail: e.target.value,
                                    },
                                    'update',
                                  )
                                }
                              >
                                <Flex align='center'>
                                  <span className={style.answer}>{options[index]}</span>
                                  <Radio
                                    value={choice}
                                    onChange={(e) =>
                                      stateAction(
                                        setOverView,
                                        item._id,
                                        {
                                          index: index,
                                          _id: item._id,
                                          anwser: options[index],
                                          anwserDetail: e.target.value,
                                        },
                                        'update',
                                      )
                                    }
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
                  (item.type === 'TRUE FALSE' && (
                    <Space direction='vertical' className={'sp100'}>
                      <p>
                        In boxes <p>1-{item.data.length}</p> on your answer sheet write:
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
                        {item.data.map((item, index) => (
                          <Flex justify='space-between' gap={24}>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: `<div><span>${index + 1}. </span><span>${item?.question}</span></div>`,
                              }}
                            ></p>
                            <Radio.Group optionType='button' buttonStyle='outline' size='small'>
                              <Space>
                                {item.choices.map((choice, index) => (
                                  <Radio
                                    key={index}
                                    value={choice}
                                    onChange={(e) =>
                                      stateAction(
                                        setOverView,
                                        item._id,
                                        {
                                          index: index,
                                          _id: item._id,
                                          anwser: options[index],
                                          anwserDetail: e.target.value,
                                        },
                                        'update',
                                      )
                                    }
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
                  (item.type === 'WRITING' && (
                    <>
                      {item.data.map((item, index) => (
                        <Space direction='vertical' className={'sp100'}>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: `<div><span>${index + 1}. </span><span>${item?.question}</span></div>`,
                            }}
                          ></p>
                          <Input />
                        </Space>
                      ))}
                    </>
                  )) ||
                  (item.type === 'FILL BLANK' && (
                    <>
                      {item.data.map((item) => (
                        <span key={item._id}>
                          {replaceArr(item?.questionText as string).map((i) => (
                            <p>{i === '______' ? <Input style={{ width: 'auto', margin: '0 8px' }}></Input> : i}</p>
                          ))}
                        </span>
                      ))}
                    </>
                  )) || (
                    <div>
                      <Divider />
                      <i style={{ color: 'var(--red) ' }}>
                        Question type "<b>{item.type}</b>" has not been updated, please contact the administrator
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
