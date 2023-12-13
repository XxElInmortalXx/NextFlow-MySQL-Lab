'use client'

import Link from "next/link";
import { useState } from "react";
import userApi from '../../api/user.api'
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert";

function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [alert, setAlert] = useState({
    type: '',
    msg: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await userApi.register(formData)
      router.push('/')
    } catch (error) {
      setAlert({
        type: 'error',
        msg: error.response.data.error
      })
    }
    setLoading(false)
  }
  return (
    <main>
      <h1 className="text-center mt-8 mb-4 text-4xl font-bold">Hello Next.js!</h1>
      <p className="text-center text-gray-600">
        Code by <code className="block">Andres Eduardo Rosas Alpiri</code>
      </p>
      <form onSubmit={handleSubmit} className="w-[90%] mx-auto container max-w-lg">
        <fieldset>
          <legend
            className="text-center font-bold capitalize leading-10"
          >
            Register
          </legend>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <button className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sign up
        </button>
        {loading && <p className="w-[90%] mx-auto container max-w-lg block text-blue-500 hover:text-blue-700">Loading</p>}
        {alert.msg !== '' && <Alert msg={alert.msg} type={alert.type} />}
      </form>
      <Link
        className="w-[90%] mx-auto container max-w-lg block text-blue-500 hover:text-blue-700"
        href='/'
      >
        Login
      </Link>
    </main>
  )
}

export default RegisterPage