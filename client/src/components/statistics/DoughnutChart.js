import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["gas", "food", "clothing", "hygiene", "other"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = (props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    data.labels = props.labels;
    data.datasets[0].data = props.data;
    console.log(data.datasets[0]);
    setLoaded(true);
  }, [props.data, props.labels, setLoaded]);
  return (
    loaded && (
      <>
        <div className="header">
          <h1 className="title">family expenses by category</h1>
        </div>
        <Doughnut data={data} />
      </>
    )
  );
};

export default DoughnutChart;
