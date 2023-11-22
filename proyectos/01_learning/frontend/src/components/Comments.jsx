import React from 'react'

function Comments() {
  return (
    <section className='mt-8'>
      <h2 className='text-2xl font-bold'>Comments</h2>
      <ul className='space-y-4'>
        <li className='bg-slate-300 p-2'>
          <article className='flex gap-2 items-center mb-2'>
            <h3 className='text-blue-500 font-bold'>Jhon doe</h3>
            <p className='text-gray-500'>
              10-nov-2023
            </p>
          </article>
          <p>wow, awesome bro!!!</p>
        </li>
      </ul>
    </section>
  )
}

export default Comments