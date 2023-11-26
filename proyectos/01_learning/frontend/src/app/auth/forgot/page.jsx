'use client'

import Alert from "@/components/Alert"
import { inputClass, submitClass, submitClassTwo } from "@/utils/dinamicClass"
import Link from "next/link"
import { useState } from "react"

function forgotPage() {
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    msg: '',
    type: ''
  })
  const [formData, setFormData] = useState({
    email: ''

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
        type: 'success'
      })
      setFormData({
        email: ''
      })
    } catch (error) {
      console.log(error)
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
          <legend className="text-center font-bold text-xl">Write your email</legend>
          <input
            className={inputClass}
            type="email"
            placeholder="alpiryk@gmail.com"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
        </fieldset>
        <button type="submit" disabled={loading} className={`${submitClass} mt-4`}>Send Email</button>
        {loading && <p className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 px-4 py-3 mt-4">Loading...</p>}
        {alert.msg !== '' && <Alert msg={alert.msg} type={alert.type} />}
      </form>
      <footer className="flex gap-5 mt-4">
        <Link
          href='/auth'
          className={`${submitClassTwo} text-center`}
        >
          Login
        </Link>
        <Link
          href='/auth/register'
          className={`${submitClassTwo} text-center`}
        >
          Register
        </Link>
      </footer>
    </>
  )
}

export default forgotPage