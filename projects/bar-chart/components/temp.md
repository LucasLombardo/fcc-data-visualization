    // const setTooltipOpacity = (n) => {
    //   tooltipLine.attr("opacity", n);
    //   tooltip.attr("opacity", n);

    //   n ? tooltip.attr("display", "block") : tooltip.attr("display", "none");
    // };

    // mask.on("mousemove", (event) => {
    //   const [xHover, yHover] = d3.pointer(event);

    //   const nearestCenterPoint = centerPoints.sort(
    //     (a, b) => Math.abs(xHover - a.point) - Math.abs(xHover - b.point)
    //   )[0];
    //   const yBarLoc = y(nearestCenterPoint.d[1]);
    //   if (yBarLoc > yHover) {
    //     setTooltipOpacity(0);
    //     return;
    //   } else {
    //     setTooltipOpacity(1);
    //   }
    //   console.log(nearestCenterPoint, yBarLoc);
    //   const centerX = margin.left + nearestCenterPoint.point;

    //   tooltipLine.attr("x1", centerX).attr("x2", centerX);

    //   const tooltipX = Math.max(
    //     Math.min(centerX, width + margin.left - 30),
    //     margin.left + 30
    //   );
    //   tooltip
    //     .attr("transform", `translate(${tooltipX - 50}, 20)`)
    //     .attr("data-date", nearestCenterPoint.d[0]);
    //   console.log(nearestCenterPoint.d[0]);
    //   tooltipText
    //     .text(nearestCenterPoint.d[0])
    //     .attr("transform", `translate(40, 20)`);
    // });

    // mask.on("mouseout", () => {
    //   tooltipLine.attr("opacity", 0);
    //   tooltip.attr("opacity", 0);
    // });

    // mask.on("mouseover", () => {
    //   tooltipLine.attr("opacity", 1);
    //   tooltip.attr("opacity", 1);
    // });