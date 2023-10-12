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

const domLoaded = () => new Promise((resolve) =>
  document.addEventListener("DOMContentLoaded", resolve)
);

const getTextWidth = (text, font, fontSize)  => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font || getComputedStyle(document.body).font;
  context.fontSize = fontSize || getComputedStyle(document.body).fontSize;
  return context.measureText(text).width;
}

export { sleep, dateToQuarter, formatNumBillions, chunkArray, domLoaded, getTextWidth };
