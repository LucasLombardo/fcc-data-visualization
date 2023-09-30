const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const dateToQuarter = (dateString) => {
  const quarterMap = { 10: "CQ4", 7: "CQ3", 4: "CQ2", 1: "CQ1" };
  const [year, month] = dateString.split("-");
  return `${quarterMap[+month]} ${year}`;
};

const formatNumBillions = (n) => {
  const rounded = Math.round(n);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const chunkArray = (arr, chunkLength) => {
  return arr.reduce((a, c, i) => {
    if (i % chunkLength === 0) a.push([]);
    a[a.length - 1].push(c);
    return a;
  }, []);
};

export { sleep, dateToQuarter, formatNumBillions, chunkArray };
