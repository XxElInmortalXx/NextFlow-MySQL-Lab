'use client'

import { useState } from 'react'
import { inputClass, submitClass } from '../utils/dinamicClass'

function FormNewPost() {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
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
    </form>
  )
}

export default FormNewPost