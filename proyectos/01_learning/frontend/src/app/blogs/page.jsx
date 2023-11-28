'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import postAPI from '../../api/post.api'


function BlogsPage() {
  const [posts, setPosts] = useState([])
  const getAllPosts = async () => {
    const result = await postAPI.getPosts()
    setPosts(result.data.result)
  }
  useEffect(() => {
    getAllPosts()
  }, [])
  return (
    <section className="max-w-4xl mx-auto py-8 w-[90%]">
      <h1 className="text-3xl font-bold mb-4">Blogs</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 text-base">{post.content}</p>
              <p>Write bt: {post.user.firstName} {post.user.lastName}</p>
              <Link
                className='block mt-4 px-4 py-1 bg-blue-500 w-full text-center font-medium rounded-md text-white hover:bg-blue-400 focus:bg-blue-600'
                href={`/blogs/${post.id}`}
              >
                Read More
              </Link>
            </div>
          ))
        ) : (
          <div className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 px-4 py-3 mt-4">
            <p className="text-center">No Blogs</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogsPage