const getMelbourneDate = () => {
  const date = toMelbourneDate(new Date(Date.now()));
  return date;
};

const toMelbourneDate = (date) => {
  const newDate = date.toLocaleDateString("en-ZA", {
    timeZone: "Australia/Melbourne",
  });
  return newDate;
};

const getMelbourneTime = () => {
  const time = toMelbourneTime(new Date(Date.now()));
  return time;
};

const toMelbourneTime = (time) => {
  const newTime = time.toLocaleString("en-ZA", {
    timeZone: "Australia/Melbourne",
  });
  return newTime;
};

const fromMelbourneTime = (time) => {
  return new Date(time);
};

// Taken from https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(toMelbourneDate(new Date(currentDate)));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}
/********************************************************************************* */

module.exports = {
  getMelbourneDate,
  getMelbourneTime,
  getDates,
  fromMelbourneTime,
};
