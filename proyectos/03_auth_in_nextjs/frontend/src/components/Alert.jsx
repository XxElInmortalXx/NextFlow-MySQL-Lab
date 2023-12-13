function Alert({msg, type}) {
  return (
    <p className={`w-full my-2 rounded-md font-medium text-white text-center py-1 ${type === 'success' ? 'bg-green-300' : 'bg-red-300'}`}>
      {msg}
    </p>
  )
}

export default Alert