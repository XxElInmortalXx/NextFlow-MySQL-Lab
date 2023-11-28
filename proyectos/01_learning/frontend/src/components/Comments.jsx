'use client'

function Comments({ getComments, comments }) {
  return (
    <section className='mt-8'>
      <h2 className='text-2xl font-bold'>Comments</h2>
      <ul className='space-y-4'>
        { comments.length > 0
          ? comments.map(comment => (
            <li key={comment.id} className='bg-slate-300 p-2'>
              <article className='flex gap-2 items-center mb-2'>
                <h3 className='text-blue-500 font-bold'>{comment.userId}</h3>
                <p className='text-gray-500'>
                  {comment.updatedAt}
                </p>
              </article>
              <p>{comment.text}</p>
            </li>
          ))
          : (
            <li>
              <p>There are not comments</p>
            </li>
          )
        }
      </ul>
    </section>
  )
}

export default Comments