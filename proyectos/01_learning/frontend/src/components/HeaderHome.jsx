import Link from "next/link"

function HeaderHome() {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex justify-between items-center max-w-4xl mx-auto">
        <Link
          className='text-white text-2xl font-bold'
          href='/'
        >
          My Blog
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link
              className='text-white hover:underline'
              href='/blogs'
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              className='text-white hover:underline'
              href='/auth/login'
            >
              login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default HeaderHome