export const isAuthenticated = () => {
  const authToken = localStorage.getItem("token");

  if (!authToken) {
    return false;
  }

  try {
    const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Неверный токен", error);
    return false;
  }
};
