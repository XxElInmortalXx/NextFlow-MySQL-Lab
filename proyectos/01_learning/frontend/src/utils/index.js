export const getCurrentUser = () => {
    const token = window.localStorage.getItem('AUTH_TOKEN')
    return token
}