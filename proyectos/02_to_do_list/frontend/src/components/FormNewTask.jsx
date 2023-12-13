'use client'

import { useContext, useState } from "react"
import Alert from "./Alert"
import { taskValidation } from '../validations/task.validation'
import tasksAPI from '../api/tasks.api'
import { AuthContext } from "@/contexts/AuthContext"

function FormNewTask({ handleSwitchModal }) {
  const { getToken } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })
  const [alert, setAlert] = useState({
    type: '',
    msg: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const validated = taskValidation(formData)
      if (validated) {
        setAlert({
          msg: validated,
          type: 'error'
        })
        return setLoading(false)
      }
      const jwt = getToken()
     await tasksAPI.createTask(formData, jwt)
      setFormData({
        title: '',
        content: ''
      })
      handleSwitchModal()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleClick = () => {
    handleSwitchModal()
  }

  return (
    <div className="fixed bg-black bg-opacity-50 w-full h-full top-0 left-0 grid place-items-center">
      <div className="w-[90%] mx-auto container max-w-md">
        <form onSubmit={handleSubmit} className="w-full bg-slate-200 p-8 rounded-lg">
          <fieldset>
            <legend className="text-center text-2xl font-bold">New Task</legend>
            <label className='font-medium' htmlFor="title">Title</label>
            <input
              className='block p-2 outline-none w-full border rounded-md mb-2'
              type="text"
              name='title'
              id='title'
              placeholder='Task Title'
              onChange={handleChange}
              value={formData.title}
            />
            <label className='font-medium' htmlFor="content">Content</label>
            <textarea
              className='block p-2 outline-none w-full border rounded-md'
              type='text'
              name='content'
              id='content'
              placeholder='Task Title'
              onChange={handleChange}
              value={formData.content}
            />
          </fieldset>
          <button
            type="submit"
            className="block mt-2 w-full font-medium text-white bg-sky-500 rounded-md py-1 px-4 text-center"

          >
            Create Task
          </button>
          <button
            onClick={handleClick}
            type="button"
            disabled={loading}
            className="block mt-2 w-full font-medium text-white bg-red-500 rounded-md py-1 px-4 text-center"
          >
            Cancel
          </button>
        </form>
        {loading && <p className='my-2 text-center font-medium text-black border-l-2 py-1 w-full border-gray-500 bg-gray-200'>Loading...</p>}
        {alert.msg !== '' && <Alert msg={alert.msg} type={alert.type} />}
      </div>

    </div>
  )
}

export default FormNewTask