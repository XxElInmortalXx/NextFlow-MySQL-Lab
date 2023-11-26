const validatePost = (post) => {
  const { title, content } = post
  // validar que el titulo no esté vacío
  if (title === '') {
    return 'The title is empty'
  }
  // validar que el titulo no sea muy largo
  if (title.length > 20) {
    return 'The title is too long'
  }
  // validar que el contenido no esté vacío
  if (content === '') {
    return 'The content is empty'
  }
  // validar que el contenido no sea muy largo
  if (content.length > 500) {
    return 'The content is too long'
  }

  return null
}

export {
  validatePost
}
