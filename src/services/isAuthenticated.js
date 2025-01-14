export const isAuthenticated = () => {
  const authToken = localStorage.getItem("token");

  if (!authToken) {
    return false;
  }

  try {
    // Декодируем токен из Base64URL
    const base64Url = authToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => {
          return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const decodedToken = JSON.parse(jsonPayload);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Неверный токен", error);
    return false;
  }
};

export function checkUserId(providedUserId) {
  const storedUserId = JSON.parse(localStorage.getItem("user"));

  return storedUserId.id === providedUserId;
}
