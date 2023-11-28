import api from '../lib/axios'

export default {
  addComment (formData, postId, token) {
    return api.post('/comment/add-comment/' + postId, formData, {
      headers: {
        Authorization: token
      }
    })
  },
  getComments (id) {
    return api.get('/comment/get-comments/' + id )
  }
}