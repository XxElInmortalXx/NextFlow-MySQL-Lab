import api from '../lib/axios'

export default {
    sendPost (formData, token) {
        return api.post('/post/new-post', formData, {
            headers: {
                Authorization: token
            }
        })
    }
}