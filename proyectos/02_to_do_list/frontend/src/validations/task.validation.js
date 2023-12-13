const taskValidation = (formData) => {
  const { title, content } = formData;

  if (title.length === 0) {
    return "Title is empty";
  }
  if (title.length <= 3) {
    return "Title is too short";
  }
  if (title.length >= 16) {
    return "Title is too big";
  }
  if (content.length === 0) {
    return "Content is empty";
  }
  if (content.length <= 20) {
    return "Content is too short";
  }
  if (content.length > 200) {
    return "Content is too big";
  }
  return null;
};

export { taskValidation };
