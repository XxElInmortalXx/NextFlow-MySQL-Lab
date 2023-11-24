import { submitClassTwo } from "@/utils/dinamicClass"
import Link from "next/link"

function layout({children}) {
  return (
    <section className="max-w-2xl mx-auto container w-[90%] mt-8">
      {children}
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
        <Link
          href='/auth/register'
          className={`${submitClassTwo} text-center`}
        >
          Register
        </Link>
      </footer>
    </section>
  )
}

export default layout