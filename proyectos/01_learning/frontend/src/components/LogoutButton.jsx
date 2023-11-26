function LogoutButton() {
  const handleClick = () => {
    localStorage.removeItem('AUTH_TOKEN')
  }
  return (
    <button
      className="text-white hover:underline"
      onClick={handleClick}
    >
      Logout
    </button>
  )
}

export default LogoutButton