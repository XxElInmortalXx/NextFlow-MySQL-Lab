import postAPI from '../api/post.api'

export async function getPosts() {
    const response = await postAPI.getPosts()
    return response.data
}
