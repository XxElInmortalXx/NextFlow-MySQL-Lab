'use client'

import { inputClass, submitClass } from "@/utils/dinamicClass"
import commentAPI from '../api/comment.api'
import { useState } from "react"
import Alert from "./Alert"

function FormComment({ postId, getComments }) {
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    msg: '',
    type: ''
  })
  const [formData, setformData] = useState({
    comment: ''
  })
  
  const handleCommentChange = (e) => {
    e.preventDefault()
    const { value } = e.target
    setformData({
      comment: value
    })
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem('AUTH_TOKEN')
      const result = await commentAPI.addComment(formData, postId, token)
      if (result.data.msg) {
        setAlert({
          msg: result.data.msg,
          type: 'success'
        })
        setformData({
          comment: ''
        }) 
      }
      await getComments()
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        type: 'error'
      })  
    }
    setLoading(false)
  }
  return (
    <form
      onSubmit={handleCommentSubmit}
      className="mt-4"
    >
      <fieldset className="space-y-2 mb-2">
        <legend className="text-2xl text-gray-500 font-bold">Add comment</legend>
        <input
          type="text"
          name="comment"
          className={inputClass}
          value={formData.comment}
          onChange={handleCommentChange}
        />
      </fieldset>
      <button type="submit" className={submitClass}>Submit Comment</button>
      {loading && <p>Loading...</p>}
      {alert.msg !== '' && <Alert msg={alert.msg} type={alert.type} />}
    </form>
  )
}

export default FormComment