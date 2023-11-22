'use client'

import { inputClass, submitClass } from "@/utils/dinamicClass"
import { useState } from "react"

function FormComment() {
  const [comment, setComment] = useState('')
  
  const handleCommentChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setComment(value)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    console.log(comment)
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
          value={comment}
          onChange={handleCommentChange}
        />
      </fieldset>
      <button type="submit" className={submitClass}>Submit Comment</button>
    </form>
  )
}

export default FormComment