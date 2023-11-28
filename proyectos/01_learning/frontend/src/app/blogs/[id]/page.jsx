'use client'

import postApi from "@/api/post.api"
import commentAPI from "@/api/comment.api"
import Comments from "@/components/Comments"
import FormComment from "@/components/FormComment"
import { useEffect, useState } from "react"

function BlogDetailPage({ params }) {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])

  const getPost = async () => {
    const result = await postApi.getPost(params.id)
    setPost(result.data.result)
  }

  const getComments = async () => {
    const result = await commentAPI.getComments(params.id)
    setComments(result.data.result[0].comments)
  }

  useEffect(() => {
    getPost()
    getComments()
  }, [])
  return (
    <section className="max-w-4xl mx-auto py-8 w-[90%]">
      {Object.keys(post).length > 0 ? (
        <>
          <h1 className="text-3xl font-bold">{post[0].title}</h1>
          <p>Write by: {post[0].user.firstName} {post[0].user.lastName}</p>
          <p className="mt-4">{post[0].content}</p>
        </>
      ) : (
        <div className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 px-4 py-3 mt-4">
          <p className="text-center">No Post</p>
        </div>
      )}

      <Comments getComments={getComments} comments={comments} />
      <FormComment postId={params.id} getComments={getComments} />
    </section>
  )
}

export default BlogDetailPage