'use client'

import { inputClass, submitClass } from '@/utils/dinamicClass'
import React, { useState } from 'react'

function loginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="space-y-4">
        <legend className="text-center font-bold text-xl">Login</legend>
        <input
          className={inputClass}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="alpiryk@gmail.com"
        />
        <input
          className={inputClass}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
        />
      </fieldset>
      <button type="submit" className={`${submitClass} mt-4`}>Login</button>
    </form>
  )
}

export default loginPage