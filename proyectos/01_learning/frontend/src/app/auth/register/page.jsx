'use client'

import { inputClass, submitClass, submitClassTwo } from "@/utils/dinamicClass"
import { useState } from "react"
import authApi from '../../../api/auth.api'
import Alert from "@/components/Alert"
import Link from "next/link"

function registerPage() {
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    msg: '',
    type: ''
  })
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await authApi.register(formData)
      setAlert({
        msg: result.data.msg,
        type:'success'
      })
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      })
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <fieldset className="space-y-4">
        <legend className="text-center font-bold text-xl">Register</legend>
        <input
          className={inputClass}
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          name="firstName"
          value={formData.firstName}
        />
        <input
          className={inputClass}
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
          name="lastName"
          value={formData.lastName}
        />
        <input
          className={inputClass}
          type="email"
          placeholder="Your Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />
        <input
          className={inputClass}
          type="password"
          placeholder="********"
          onChange={handleChange}
          name="password"
          value={formData.password}
        />
      </fieldset>
      <button type="submit" disabled={loading} className={`${submitClass} mt-4`}>Register</button>
      { loading && <p className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 px-4 py-3 mt-4">Loading...</p> }
      { alert.msg !== '' && <Alert msg={alert.msg} type={alert.type} />}
    </form>
    <footer className="flex gap-5 mt-4">
        <Link
          href='/auth'
          className={`${submitClassTwo} text-center`}
        >
          Login
        </Link>
        <Link
          href='/auth/forgot'
          className={`${submitClassTwo} text-center`}
        >
          Forgot
        </Link>
      </footer>
    </>
  )
}

export default registerPage