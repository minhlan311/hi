/* eslint-disable @typescript-eslint/no-explicit-any */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Form, InputRef } from 'antd'
import { useEffect, useState } from 'react'
import './styles.scss'
import uploadPlugin from './upload.plugin'
type Props = {
  ref?: React.RefObject<HTMLDivElement> | React.RefObject<InputRef> | any
  config?: any
  onBlur?: () => void
  onReady?: (e: any) => void
  onChange?: (e: any) => void
  name: string
  data?: any | null
  label?: string
  required?: boolean
  dataArr?: boolean
}

const TextAreaCustom = (props: Props) => {
  const { ref, onBlur, onReady, onChange, config, name, data, label, required = false, dataArr = false } = props

  const [editorContent, setEditorContent] = useState<string>('<p></p>')

  const handleEditorChange = (_: any, editor: any) => {
    const newContent = editor.getData()
    setEditorContent(newContent)
    onChange && onChange(newContent)
  }

  useEffect(() => {
    if (!data) setEditorContent('<p></p>')
    if (data?.[name]) setEditorContent(data?.[name])
    if (data && dataArr) setEditorContent(data)
  }, [data, dataArr])

  return (
    <Form.Item
      name={name}
      label={label}
      initialValue={editorContent}
      rules={
        required
          ? [
              {
                required: required,
                validator: (_, value) => {
                  if (!value || value === '<p></p>') {
                    return Promise.reject(`Vui lòng nhập ${label ? label : 'nội dung!'}`)
                  }

                  return Promise.resolve()
                },
              },
            ]
          : []
      }
      getValueFromEvent={(_event, editor) => {
        const data = editor.getData()
        setEditorContent(data)

        return data
      }}
      className='ck-custom'
    >
      {/* {editorContent.length === 0 && <div className='ck-placeholder'>{placeholder}</div>} */}
      <CKEditor
        ref={ref}
        onBlur={onBlur}
        // name={name}
        editor={ClassicEditor}
        data={editorContent}
        config={{
          ...config,
          extraPlugins: [uploadPlugin],
          toolbar: {
            shouldNotGroupWhenFull: true,
          },
        }}
        onChange={handleEditorChange}
        onReady={onReady}
      ></CKEditor>
    </Form.Item>
  )
}

export default TextAreaCustom
