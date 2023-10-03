/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import './styles.scss'
import { Form, Input } from 'antd'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { debounce } from '@/helpers/common'
type Props = {
  type: 'default' | 'ckeditor'
  name: string
  data: any | null
  label?: string
  placeholder?: string
  required?: boolean
  uploadCkUrl?: string
  onPressEnter?: any
  onBlur?: any
  ref?: any
}

const TextAreaCustom = (props: Props) => {
  const { type, placeholder, name, data, uploadCkUrl, onPressEnter, onBlur, ref, label, required = false } = props
  const Textarea = Input
  const [editorContent, setEditorContent] = useState('')

  const handleEditorChange = (_: any, editor: any) => {
    const newContent = editor.getData()
    setEditorContent(newContent)
  }

  useEffect(() => {
    if (!data) setEditorContent(``)
    if (data?.[name]) setEditorContent(data?.[name] as string)
  }, [data])

  if (type === 'ckeditor')
    return (
      <Form.Item
        name={name}
        label={label}
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
        getValueFromEvent={(event, editor) => {
          const data = editor.getData()
          setEditorContent(data)

          return data
        }}
        className='ck-custom'
      >
        {/* {editorContent.length === 0 && <div className='ck-placeholder'>{placeholder}</div>} */}
        <CKEditor
          name={name}
          editor={ClassicEditor}
          config={{
            ckfinder: {
              uploadCkUrl: uploadCkUrl,
            },
          }}
          data={editorContent}
          onChange={debounce(handleEditorChange, 500)}
          placeholder={placeholder}
        ></CKEditor>
      </Form.Item>
    )

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required,
          message: `Vui lòng nhập ${label ? label : 'nội dung!'}`,
        },
      ]}
    >
      <Textarea placeholder={placeholder} onPressEnter={onPressEnter} onBlur={onBlur} ref={ref}></Textarea>
    </Form.Item>
  )
}

export default TextAreaCustom
