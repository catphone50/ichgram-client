export function formatDate(dateString) {
  const date = new Date(dateString); // Преобразуем строку в объект Date
  const now = new Date(); // Текущая дата и время
  const diffInSeconds = Math.floor((now - date) / 1000); // Разница в секундах

  // Разделение на интервалы времени
  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;

  if (diffInSeconds < secondsInDay) {
    // В пределах суток
    if (diffInSeconds < secondsInHour) {
      // Менее часа
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes}m ago`;
    } else {
      // Менее суток
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours}h ago`;
    }
  } else if (diffInSeconds < secondsInDay * 7) {
    // В пределах недели
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    // Ранее недели - выводим дату
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  }
}
