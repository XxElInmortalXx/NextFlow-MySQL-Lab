'use client'

import Alert from '@/components/Alert'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { loginValidation } from '../../validations/auth.validation'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/contexts/AuthContext'
import usersAPI from '../../api/users.api'

function LoginPage() {
  const router = useRouter()

  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [alert, setAlert] = useState({
    msg: '',
    type: ''
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
      const validated = loginValidation(formData)
      if (validated) {
        setAlert({
          msg: validated,
          type: 'error'
        })
        return setLoading(false)
      }
      const result = await usersAPI.login(formData)
      const jwt = result.data.jwt
      login(jwt)
      router.push('/user')
    } catch (error) {
      setAlert({
        msg: error.response.data.error,
        type: 'error'
      })
    }
    setLoading(false)
  }
  return (
    <main>
      <header className='mt-8 mb-4 space-y-2'>
        <h1 className='text-center text-4xl font-black'>Welcome again</h1>
        <p className='text-center text-xl font-medium text-gray-500'>Your need login</p>
      </header>
      <form
        onSubmit={handleSubmit}
        className='w-[90%] mx-auto container max-w-md'
      >
        <fieldset>
          <legend className='text-center font-bold text-2xl'>Login</legend>
          <label className='font-medium' htmlFor="email">Email</label>
          <input
            className='block p-2 outline-none w-full border rounded-md mb-2'
            type="text"
            name="email"
            id="email"
            placeholder='correo@correo.com'
            onChange={handleChange}
            value={formData.email}
          />
          <label className='font-medium' htmlFor="password">Passwrod</label>
          <input
            className='block p-2 outline-none w-full border rounded-md'
            type="password"
            name='password'
            id='password'
            placeholder='******'
            onChange={handleChange}
            value={formData.password}
          />
        </fieldset>
        <button
          type='submit'
          className='block w-full mt-2 text-white font-medium py-1 px-4 rounded-md bg-sky-400 hover:bg-sky-500 text-center'
        >
          Login
        </button>
        {loading && <p className='my-2 text-center font-medium text-black border-l-2 py-1 w-full border-gray-500 bg-gray-200'>Loading...</p>}
        {alert.msg !== '' && <Alert msg={alert.msg} type={alert.type} />}
      </form>
      <section className='w-[90%] max-w-md mx-auto space-y-1 mt-2'>
        <Link
          className='inline-block text-white font-medium py-1 px-4 rounded-md bg-gray-400 hover:bg-gray-500 text-center'
          href='/register'
        >
          Register
        </Link>
      </section>
    </main>
  )
}

export default LoginPage