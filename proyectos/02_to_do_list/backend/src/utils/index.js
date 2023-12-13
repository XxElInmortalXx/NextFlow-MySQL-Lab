const generateId = () => {
  const dateId = Date.now().toString();
  const mathId = Math.random().toString(36).substring(2);
  return `${dateId}${mathId}`;
};

export { generateId };
