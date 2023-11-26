'use client'

import { inputClass, submitClass, submitClassTwo } from '@/utils/dinamicClass'
import React, { useState } from 'react'
import authApi from '../../api/auth.api'
import Alert from '@/components/Alert'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function loginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    msg: '',
    type: ''
  })
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await authApi.login(formData)
      if (result.data.msg === 'Is login') {
        const token = result.data.token
        localStorage.setItem('AUTH_TOKEN', token)
        setAlert({
          msg: '',
          type: ''
        })
        setLoading(true)
        // redireccionar a otra página
        return router.push('/')
      }
      setAlert({
        msg: result.response.data.msg,
        type: 'error'
      })
      setFormData({
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
        {loading && <p className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 px-4 py-3 mt-4">Loading...</p>}
        {alert.msg !== '' && <Alert msg={alert.msg} type={alert.type} />}
      </form>
      <footer className="flex gap-5 mt-4">
        <Link
          href='/auth/register'
          className={`${submitClassTwo} text-center`}
        >
          Register
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

export default loginPage