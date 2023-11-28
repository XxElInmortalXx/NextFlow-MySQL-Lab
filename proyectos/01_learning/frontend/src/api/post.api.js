import api from '../lib/axios'

export default {
    getPosts () {
        return api.get('/post/get-posts')
    },
    getPost (id) {
        return api.get('/post/get-post/' + id)
    },
    sendPost (formData, token) {
        return api.post('/post/new-post', formData, {
            headers: {
                Authorization: token
            }
        })
    }
}