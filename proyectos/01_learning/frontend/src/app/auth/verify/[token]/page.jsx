'use client'

import authApi from '@/api/auth.api'
import Alert from '@/components/Alert'
import { submitClass } from '@/utils/dinamicClass'
import { useState } from 'react'

function tokenPage({ params }) {
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    msg: '',
    type: ''
  })

  const handleVerifyAccountClick = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log('try')
      const result = await authApi.verifyAccount(params.token)
      const smg = await result.data.msg
      setAlert({
        msg: smg,
        type: 'success'
      })
    } catch (error) {
      console.log('catch')
      const msg = await error.response.data.msg
      setAlert({
        msg: msg,
        type: 'error'
      })
    }
    setLoading(false)
  }
  return (
    <>
      <button onClick={handleVerifyAccountClick} className={submitClass} disabled={loading} >Verificar cuenta</button>
      {alert.msg !== '' && <Alert msg={alert.msg} type={alert.type} />}
    </>
  )
}

export default tokenPage