'use client'

import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/auth.context'; // Reemplaza 'tuRuta' con la ruta correcta a tu AuthContext
import { getCurrentUser } from '@/utils';
import { useRouter } from 'next/navigation'

function HeaderHome() {
  const router = useRouter()
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const user = getCurrentUser()
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }else {
      setIsLoggedIn(false);
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('AUTH_TOKEN')
    setIsLoggedIn(false);
    router.push('/')
  };

  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex justify-between items-center max-w-4xl mx-auto">
        <Link className="text-white text-2xl font-bold" href="/">
          My Blog
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link className="text-white hover:underline" href="/blogs">
              Blogs
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                className="text-white hover:underline bg-transparent border-none cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link className="text-white hover:underline" href="/auth">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderHome;
