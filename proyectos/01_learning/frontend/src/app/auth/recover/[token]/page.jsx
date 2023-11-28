'use client'

import authApi from "@/api/auth.api"
import Alert from "@/components/Alert"
import { inputClass, submitClass } from "@/utils/dinamicClass"
import { useState } from "react"
import { useRouter } from 'next/navigation'

function recoverPage({ params }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    msg: '',
    type: ''
  })
  const [formData, setFormData] = useState({
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
      const token = params.token
      const result = await authApi.recover(formData, token)
      if (result.data.msg) {
        setAlert({
          msg: result.data.msg,
          type:'success'
        })
        setFormData({
          password: ''
        })
        router.push('/auth')
      }
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
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="space-y-4">
          <legend className="text-center font-bold text-xl">Write your new password</legend>
          <input
            className={inputClass}
            type="password"
            placeholder="********"
            onChange={handleChange}
            name="password"
            value={formData.password}
          />
        </fieldset>
        <button type="submit" disabled={loading} className={`${submitClass} mt-4`}>Write your new password</button>
        {loading && <p className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 px-4 py-3 mt-4">Loading...</p>}
        {alert.msg !== '' && <Alert msg={alert.msg} type={alert.type} />}
      </form>
    </div>
  )
}

export default recoverPage