const taskValidation = (data) => {
  const { title, content } = data;

  if (title.length === 0) {
    return "title is empty";
  }
  if (title.length <= 3) {
    return "title is too short";
  }
  if (title.length >= 32) {
    return "title is too big";
  }
  if (content.length === 0) {
    return "content is empty";
  }
  if (content.length <= 3) {
    return "content is too short";
  }
  if (content.length >= 200) {
    return "content is too big";
  }
  return null
};

export {
  taskValidation
}
