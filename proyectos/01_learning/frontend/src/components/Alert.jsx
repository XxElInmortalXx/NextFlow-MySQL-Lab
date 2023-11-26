function Alert({ msg, type }) {
  return (
    <div className={
      type === 'error'
        ? "bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 mt-4"
        : "bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-3 mt-4"
    }>
      {msg}
    </div>
  )
}

export default Alert