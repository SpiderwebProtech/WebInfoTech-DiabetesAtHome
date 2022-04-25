const getMelbourneDate = () => {
  const date = new Date(Date.now()).toLocaleDateString({
    timeZone: "Australia/Melbourne",
  });
  return date;
};

const getMelbourneTime = () => {
  const time = new Date(Date.now()).toLocaleString("en-GB", {
    timeZone: "Australia/Melbourne",
  });
  return time;
};

// const getProperDate = (date) => {
//   //  Convert a "dd/MM/yyyy" string into a Date object
//   let d = dateString.split("/");
//   let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
//   return dat;
// }

// // Taken from https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
// Date.prototype.addDays = function(days) {
//   var date = new Date(this.valueOf());
//   date.setDate(date.getDate() + days);
//   return date;
// }

// function getDates(startDate, stopDate) {
//   var dateArray = new Array();
//   var currentDate = startDate;
//   while (currentDate <= stopDate) {
//       dateArray.push(new Date (currentDate));
//       currentDate = currentDate.addDays(1);
//   }
//   return dateArray;
// }
// /********************************************************************************* */

module.exports = {
  getMelbourneDate,
  getMelbourneTime,
  getDates,
  getProperDate,
};
