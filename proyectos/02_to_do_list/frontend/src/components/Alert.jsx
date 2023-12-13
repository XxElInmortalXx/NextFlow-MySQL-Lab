function Alert({ msg, type }) {
  return (
    <div
      className={`my-2 text-center font-medium text-black border-l-2 py-1 w-full ${type === 'success' ? 'border-green-500 bg-green-200' : 'border-red-500 bg-red-200'}`}
    >
      {msg}
    </div>
  )
}

export default Alert