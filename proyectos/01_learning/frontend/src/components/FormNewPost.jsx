'use client'

import { useState } from 'react'
import { inputClass, submitClass } from '../utils/dinamicClass'
import postAPI from '../api/post.api'
import Alert from './Alert'
import { useRouter } from 'next/navigation'

function FormNewPost() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    msg: '',
    type: ''
  })
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })

  const handleFormDataChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    setFormData({
        ...formData,
        [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem('AUTH_TOKEN')
      const result = await postAPI.sendPost(formData, token)
      const id = result.data.result.id
      setAlert({
        msg: '',
        type: ''
      })
      setFormData({
        title: '',
        content: ''
      })
      router.push(`/blogs/${id}`)
    } catch (error) {
      console.log(error)
      setAlert({
        msg: error.response.data.msg,
        type: 'error'
      })
    }
    setLoading(false)
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 space-y-4"
    >
      <input
        type="text"
        placeholder='Enter the title block'
        name='title'
        className={inputClass}
        value={formData.title}
        onChange={handleFormDataChange}
        />
      <textarea
        name="content"
        placeholder='Enter the content'
        className={`${inputClass} resize-none h-40`}
        value={formData.content}
        onChange={handleFormDataChange}
      />
      <button
        className={submitClass}
        type='submit'
      >
        Submit
      </button>
      {loading && <p className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 px-4 py-3 mt-4">Loading...</p>}
      {alert.msg !== '' && <Alert msg={alert.msg} type={alert.type} />}
    </form>
  )
}

export default FormNewPost