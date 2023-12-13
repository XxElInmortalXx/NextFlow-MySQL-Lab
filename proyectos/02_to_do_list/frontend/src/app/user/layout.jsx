'use client'

import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import usersAPI from '../../api/users.api'

function RootLayout({ children }) {
  const [user, setUser] = useState()

  const router = useRouter()

  const { logout, getToken } = useContext(AuthContext)

  const handleClick = () => {
    logout()
    router.push('/')
  }


  const getUser = async () => {
    const jwt = getToken()
    const result = await usersAPI.getUser(jwt)
    setUser(result.data.msg)
    return result
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <main>
      <h1 className="text-center mt-8 mb-4 text-4xl font-bold">Welcome!</h1>
      <p className="text-center text-gray-600">
        Code by <code className="block">Andres Eduardo Rosas Alpiri</code>
      </p>
      <section className="w-[90%] mx-auto container max-w-lg mt-4">
        <p className="text-center font-bold">
          Hi <code className="block font-medium capitalize">{ user ? user.first_name : 'Loading...' }</code>
        </p>
        <button
          className="bg-red-500 mt-2 block mx-auto hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleClick}
        >
          logout
        </button>
      </section>
      {children}
    </main>
  )
}

export default RootLayout