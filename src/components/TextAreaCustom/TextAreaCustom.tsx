import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './styles.scss'
// type Props = {}

const TextAreaCustom = () => {
  const [editorHtml, setEditorHtml] = useState('')

  const modules = {
    toolbar: [['bold', 'italic']]
  }

  const formats = ['bold', 'italic']

  return (
    <ReactQuill
      className='text-area-custom'
      value={editorHtml}
      onChange={setEditorHtml}
      modules={modules}
      formats={formats}
    />
  )
}

export default TextAreaCustom
