'use client'

import { AuthContext } from "@/contexts/auth.context"
import { useContext, useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import userApi from '../../api/user.api'

function DashboardPage() {
  const router = useRouter()
  
  const [user, setUser] = useState({})
  const { logout, getToken } = useContext(AuthContext)

  const handleClick = () => {
    logout()
    router.push('/')
  }

  const getUserInLogin = async () => {
    const token = getToken()
    const result = await userApi.getUser(token)
    const newUser = result.data.msg
    setUser(newUser)
  }

  useEffect(() => {
    getUserInLogin()
  }, [])
  return (
    <main>
      <h1 className="text-center mt-8 mb-4 text-4xl font-bold">Hello Next.js!</h1>
      <p className="text-center text-gray-600">
        Code by <code className="block">Andres Eduardo Rosas Alpiri</code>
      </p>
      <section className="w-[90%] mx-auto container max-w-lg mt-4">
        <p className="text-center font-bold">
          Welcome <code className="block font-medium">{Object.keys(user).length !== 0 ? user.username : 'Loading...'}</code>
        </p>
        <button
          className="bg-blue-500 mt-2 block mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleClick}
        >
          logout
        </button>
      </section>
    </main>
  )
}

export default DashboardPage