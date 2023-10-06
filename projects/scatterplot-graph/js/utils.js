export function getMargins(d3El) {
  const [top, right, bottom, left] = d3El
    .attr("data-margins")
    .toString()
    .split(" ")
    .map(Number);
  return { top, right, bottom, left };
}

export function getDimensions(d3El, margin) {
  const [fullWidth, fullHeight] = d3El
    .attr("viewBox")
    .toString()
    .split(" ")
    .slice(2)
    .map(Number);
  return {
    width: fullWidth - margin.left - margin.right,
    height: fullHeight - margin.top - margin.bottom,
    fullWidth,
    fullHeight,
  };
}
