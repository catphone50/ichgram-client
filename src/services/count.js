export const findUserById = (array, userId) => {
  return array?.some((item) => item.user?._id === userId);
};
