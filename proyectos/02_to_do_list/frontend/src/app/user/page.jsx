'use client'

import { useContext, useEffect, useState } from "react"
import tasksAPI from '../../api/tasks.api'
import { AuthContext } from "@/contexts/AuthContext"
import { taskValidation } from "@/validations/task.validation"
import Alert from "@/components/Alert"

function UserPage() {
  const [modal, setModal] = useState(false)
  const [tasks, setTasks] = useState([])

  const { getToken } = useContext(AuthContext)

  const handleSwitchModal = () => {
    setModal(!modal)
  }

  const getAllTasks = async () => {
    const jwt = getToken()
    const result = await tasksAPI.getTasks(jwt)
    setTasks(result.data.msg)

  }

  useEffect(() => {
    getAllTasks()
  }, [])

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

  const handleDeleteClick = async (id) => {
    console.log(id)
    const jwt = getToken()
    await tasksAPI.deleteTask(id, jwt)
    getAllTasks()
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
      getAllTasks()
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
    <main>
      <section className="w-[90%] max-w-6xl mx-auto container my-4 gap-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {
          tasks.length !== 0 && (
            tasks.map(task => (
              <div
                key={task.task_id}
                className='bg-slate-200 shadow-md border rounded-md p-4 space-y-2'
              >
                <h3 className='bg-slate-300 shadow-md py-1 px-4 text-left border rounded-md font-medium text-ellipsis overflow-hidden whitespace-nowrap'>{task.title}</h3>
                <p className='bg-slate-300 shadow-md py-1 px-4 text-left border rounded-md font-medium h-32 text-ellipsis overflow-hidden'>
                  {task.content}
                </p>
                <button
                  onClick={() => handleDeleteClick(task.task_id)}
                  type="button"
                  className='bg-red-500 w-full block hover:bg-red-700 text-white shadow-md font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                  Delete
                </button>
              </div>
            ))
          )
        }
        <button
          onClick={handleSwitchModal}
          className="bg-slate-200 hover:bg-slate-300 shadow-md border rounded-md grid place-items-center"
        >
          <h4 className="font-medium text-4xl text-slate-500">+</h4>
        </button>
      </section>
      {modal && (
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
      )}
    </main>
  )
}

export default UserPage