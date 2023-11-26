import api from '../lib/axios'

export default {
    login (formData) {
        return api.post('/auth/login', formData)
    },
    register (formData) {
        return api.post('/auth/register', formData)
    },
    verifyAccount (token) {
        return api.get(`/auth/verify/${token}`)
    }
}