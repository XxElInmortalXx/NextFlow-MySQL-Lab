export const getCurrentUser = () => {
    const token = localStorage.getItem('AUTH_TOKEN')
    return token
}