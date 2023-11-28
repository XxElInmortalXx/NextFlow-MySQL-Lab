const validateComment = (comment) => {
  // validarr que comment no esté vacío
  if (comment.length === 0) {
    return 'Comment is empty'
  }
  if (comment.length >= 200) {
    return 'Comment is too long'
  }

  return null
}

export { validateComment }
