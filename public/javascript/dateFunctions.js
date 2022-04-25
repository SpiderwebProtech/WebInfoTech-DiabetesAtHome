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

module.exports = { getMelbourneDate, getMelbourneTime };
