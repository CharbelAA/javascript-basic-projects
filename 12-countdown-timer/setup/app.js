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
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadLine = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4"); //get me all the H4s within the deadline-format parent.

let futureDate = new Date(2023, 08, 16, 8, 30, 00);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();

month = months[month];

let weekday = futureDate.getDay();
let day = futureDate.getDate();

weekday = weekdays[weekday];

giveaway.textContent = `giveaway ends on  ${weekday}  ${month} ${day}, ${year} @ ${hours}:${minutes}am`;
