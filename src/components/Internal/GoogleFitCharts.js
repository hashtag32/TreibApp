import { firebase, firestore, auth } from "components/Internal/Firebase.js";

var Chartist = require("chartist");


var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;



const getMaxValueofArray= (array)=>{
  return 1.2*Math.max.apply(null, array);
}

export const getChart = (pointList) => {
  const completedTasksChart = {
    data: {
      // Transform to Mo, Di, Mi
      labels: [0,1,2,3,4,5,6],
      series: [pointList],
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: getMaxValueofArray(pointList), // we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    animation: {
      draw: function (data) {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease",
            },
          });
        }
      },
    },
  };

  return completedTasksChart;
};
