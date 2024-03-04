/* eslint-disable @typescript-eslint/no-explicit-any */
import { stateAction } from '@/common'
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom'
import { AppContext } from '@/contexts/app.context'
import { debounce } from '@/helpers/common'
import { SkillType } from '@/interface/exam'
import { QuestionState, TypeQuestion } from '@/interface/question'
import { Card, Divider, Flex, Input, InputNumber, Radio, Space } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { LiveAudioVisualizer } from 'react-audio-visualize'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder'
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi'
import { GrPowerReset } from 'react-icons/gr'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import style from './styles.module.scss'

const SpeakingRender = ({
  handleChange,
  data,
  start,
  index,
}: {
  handleChange: (item: any, index: number, anwser: any, correctAnswers: any | any[]) => void
  data: QuestionState
  start: number
  index: number
}) => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [blobUrl, setBlobUrl] = useState<any>()

  const addAudioElement = (blob: any) => {
    setBlobUrl(URL.createObjectURL(blob))
    console.log(blob)
  }

  const [reset, setReset] = useState<boolean>(false)
  const [startRec, setStartRec] = useState<boolean>(false)
  const recorder = useAudioRecorder()

  useEffect(() => {
    debounce(handleChange(data, start + index, transcript, [transcript]), 500)
  }, [transcript])

  useEffect(() => {
    if (reset) {
      setBlobUrl(undefined)
      setReset(false)
    }
  }, [reset])

  const handleRecord = () => {
    const rec = !startRec
    setStartRec(rec)

    if (rec) {
      recorder.startRecording()
      SpeechRecognition.startListening()
    } else {
      recorder.stopRecording()
      SpeechRecognition.stopListening()
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <div>
      <b
        dangerouslySetInnerHTML={{
          __html: `<span>${start + index}. </span><span>${
            data?.question ? data?.question : 'Fill in the missing words in the blanks'
          }</span>`,
        }}
        style={{ display: 'block', marginBottom: 6 }}
      ></b>
      <Flex justify='center' align='center' vertical className={style.audioMic} gap={24}>
        <AudioRecorder
          onRecordingComplete={addAudioElement}
          recorderControls={recorder}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          classes={{
            AudioRecorderClass: style.audioClass,
          }}
        />
        <div className={style.audioButt}>
          <ButtonCustom
            icon={startRec ? <BiMicrophoneOff size={28} /> : <BiMicrophone size={28} />}
            shape='circle'
            width={45}
            onClick={handleRecord}
            type={startRec ? 'primary' : 'default'}
          ></ButtonCustom>
          {blobUrl && (
            <ButtonCustom
              className={style.buttReset}
              icon={<GrPowerReset />}
              onClick={() => {
                resetTranscript()

                setReset(true)
              }}
              size='small'
              type='link'
            ></ButtonCustom>
          )}
        </div>

        {recorder.mediaRecorder ? (
          <LiveAudioVisualizer mediaRecorder={recorder.mediaRecorder} width={200} height={75} barColor='#019d44' />
        ) : !reset && blobUrl ? (
          <audio src={blobUrl} controls />
        ) : null}
      </Flex>
    </div>
  )
}

const FillBlank = ({
  handleChange,
  data,
  start,
  index,
}: {
  handleChange: (item: any, index: number, anwser: any, correctAnswers: any | any[]) => void
  data: QuestionState
  start: number
  index: number
}) => {
  const [anwsFB, setAnwsFB] = useState<{ _id: string; anwser: string }[]>([])
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

  useEffect(() => {
    if (FBData) {
      const anwserArray = anwsFB.map((item) => item.anwser)
      const combinedAnwser = anwserArray.join(', ')
      let content = FBData.anwText
      anwsFB.forEach((item) => {
        content = content.replace('______', ` ${item.anwser} `)
      })

      if (FBData) debounce(handleChange(FBData, start + index, combinedAnwser, content), 500)
    }
  }, [anwsFB, FBData])

  const load = () => {
    setFBData({
      _id: data._id,
      index: index,
      anwText: data?.questionText ? data?.questionText : '',
    })
  }

  if (!FBData) load()

  return (
    <div>
      <b
        dangerouslySetInnerHTML={{
          __html: `<span>${start + index}. </span><span>${
            data?.question ? data?.question : 'Fill in the missing words in the blanks'
          }</span>`,
        }}
        style={{ display: 'block', marginBottom: 6 }}
      ></b>
      <span>
        {replaceArr(data?.questionText as string).map((i, id) => (
          <p key={id}>
            {i === '______' ? (
              <Input
                onChange={(e) => stateAction(setAnwsFB, `${id}`, { _id: `${id}`, anwser: e.target.value }, 'update')}
                style={{ width: 'auto', margin: '0 8px' }}
              ></Input>
            ) : (
              i
            )}
          </p>
        ))}
      </span>
    </div>
  )
}

const SingleChoice = ({
  handleChange,
  data,
  start,
  index,
  options,
}: {
  handleChange: (item: any, index: number, anwser: any, correctAnswers: any | any[]) => void
  data: QuestionState
  start: number
  index: number
  options: string[]
}) => {
  return (
    <div onLoad={() => handleChange(data, start + index, options[index], '')} className={style.typePack}>
      <b
        dangerouslySetInnerHTML={{
          __html: `<span>${start + index}. </span><span>${data?.question}</span>`,
        }}
        style={{ display: 'block', marginBottom: 6 }}
      ></b>

      <Radio.Group className={`sp100`}>
        <Space direction='vertical' className={`sp100`}>
          {data?.choices.map((choice, i) => (
            <Radio
              key={i}
              value={choice}
              className={style.radio}
              onChange={(e) => {
                handleChange(data, start + index, options[index], [e.target.value.id])
              }}
            >
              <Flex align='center' className={`sp100`}>
                <span className={style.answer}>{options[i]}</span>
                <Radio
                  value={choice}
                  onChange={(e) => handleChange(data, start + index, options[index], [e.target.value.id])}
                >
                  <div dangerouslySetInnerHTML={{ __html: choice.answer }}></div>
                </Radio>
              </Flex>
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  )
}

const TrueFalse = ({
  handleChange,
  data,
  start,
  index,
  options,
}: {
  handleChange: (item: any, index: number, anwser: any, correctAnswers: any | any[]) => void
  data: QuestionState
  start: number
  index: number
  options: string[]
}) => {
  return (
    <Flex justify='space-between' gap={24}>
      <p
        dangerouslySetInnerHTML={{
          __html: `<span>${start + index}. </span><span>${data?.question}</span>`,
        }}
        style={{ marginTop: 5 }}
      ></p>
      <Radio.Group optionType='button' buttonStyle='outline' size='small'>
        <Space>
          {data?.choices.map((choice, i) => (
            <Radio
              key={i}
              value={choice}
              onChange={(e) => handleChange(data, start + index, options[i], [e.target.value._id])}
            >
              <div dangerouslySetInnerHTML={{ __html: choice.answer }}></div>
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Flex>
  )
}

const Writing = ({
  handleChange,
  data,
  start,
  index,
  type,
}: {
  handleChange: (item: any, index: number, anwser: any, correctAnswers: any | any[]) => void
  data: QuestionState
  start: number
  index: number
  type: TypeQuestion
}) => {
  return (
    <Space direction='vertical' className={'sp100'} onLoad={() => handleChange(data, start + index, '', '')}>
      <p
        className={'dangerHTML'}
        dangerouslySetInnerHTML={{
          __html: `<div><span>${start + index}. </span><span>${data?.question}</span></div>`,
        }}
      ></p>
      {type === 'NUMERICAL' ? (
        <InputNumber min={0} />
      ) : (
        <Input.TextArea
          rows={5}
          onChange={(e) => handleChange(data, start + index, e.target.value, [e.target.value])}
        />
      )}
    </Space>
  )
}

const QuestionsRender = ({ data, prev, skill }: { data: QuestionState[]; prev: number; skill: SkillType }) => {
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

  const handleChange = (item: any, key: number, anwser: any, correctAnswers: any | any[]) => {
    stateAction(
      setOverView,
      item._id,
      {
        index: key,
        _id: item._id,
        anwser,
        correctAnswers,
      },
      'update',
    )
  }

  const nonEmptyQuestions = questionsByType.filter((item) => item.data.length > 0)

  // Render danh sách câu hỏi
  const renderQuestions = () => {
    let currentQuestionNumber = prev
    let currentType: any = null

    return nonEmptyQuestions.map((item) => {
      if (item.data.length > 0) {
        if (item.type !== currentType) {
          currentType = item.type

          const startQuestionNumber = currentQuestionNumber
          currentQuestionNumber += item.data.length

          return (
            <div style={{ marginTop: 20 }}>
              <h2 style={{ marginBottom: 10 }}>{`Questions ${startQuestionNumber} - ${currentQuestionNumber - 1}`}</h2>
              {renderQuestionNumbers(startQuestionNumber, currentQuestionNumber, item, skill)}
            </div>
          )
        }
      }

      return null
    })
  }

  // Hàm render số thứ tự của câu hỏi
  const renderQuestionNumbers = (
    start: number,
    end: number,
    question: { type: TypeQuestion; data: QuestionState[] },
    skill: SkillType,
  ) => {
    const questionNumbers: any[] = []

    const options = ['A', 'B', 'C', 'D']

    if (question) {
      question.data.forEach((data, i) => {
        questionNumbers.push(
          (question?.type === 'SINGLE CHOICE' && (
            <SingleChoice handleChange={handleChange} data={data} start={start} index={i} options={options} />
          )) ||
            (question?.type === 'TRUE FALSE' && (
              <TrueFalse handleChange={handleChange} data={data} start={start} index={i} options={options} />
            )) ||
            (skill !== 'SPEAKING' && (question.type === 'WRITING' || question.type === 'NUMERICAL') && (
              <Writing handleChange={handleChange} data={data} start={start} index={i} type={question.type} />
            )) ||
            (question.type === 'FILL BLANK' && (
              <FillBlank handleChange={handleChange} data={data} start={start} index={i} />
            )) ||
            (skill === 'SPEAKING' && question.data.length > 0 && (
              <SpeakingRender handleChange={handleChange} data={data} start={start} index={i} />
            )) || (
              <div>
                <Divider />
                <i style={{ color: 'var(--red) ' }}>
                  Question type "<b>{question.type}</b>" has not been updated, please contact the administrator
                </i>
              </div>
            ),
        )
      })
    }

    return (
      <Space direction='vertical' className={'sp100'}>
        {(question.type === 'SINGLE CHOICE' && (
          <i>
            Choose the correct letter, <b>A</b>, <b>B</b>, <b>С</b> or <b>D</b>
          </i>
        )) ||
          (question.type === 'TRUE FALSE' && (
            <p>
              <p>
                In boxes{' '}
                <p>
                  {start} - {end - 1}
                </p>{' '}
                on your answer sheet write:
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
            </p>
          ))}

        <Space direction='vertical' className={`${question.type === 'TRUE FALSE' ? style.trueFalseMain : ''} sp100`}>
          {questionNumbers}
        </Space>
      </Space>
    )
  }

  if (!loading)
    return (
      <Card size='small' className={style.main}>
        {renderQuestions()}
      </Card>
    )
}

export default QuestionsRender
