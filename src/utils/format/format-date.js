const formatDate = (inputDate) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const date = new Date(inputDate);
  const monthIndex = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDay = (day < 10) ? `0${day}` : `${day}`;

  return `${months[monthIndex]}, ${formattedDay}, ${year}`;
};

export {
  formatDate,
};
