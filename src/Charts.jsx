import React from "react";
import Chart from "react-apexcharts";
import { globalScores } from "./data";

const Charts = () => {
  const userStats = JSON.parse(localStorage.getItem("userstats"));
  console.log([...userStats.map((user) => user.wordCount)]);

  const getFullDateTime = (datetime) => {
    let d = new Date(datetime);
    return d.getDate();
  };
  const options1 = {
    chart: {
      background: "#ffffff",
      // background: "#ffff00",
      foreColor: "#000000",
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "User stats",
      align: "center",
      style: {
        color: "black",
        // padding: "2em",
        fontWeight: "bold",
        fontSize: "20px",
        marginTop: "10px",
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [...userStats.map((user) => getFullDateTime(user.dateTime))],
      // labels: {
      //   show: false,
      // },
    },
    yaxis: {
      // labels: {
      //   show: false,
      // },
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#ffff00"],
  };
  const options2 = {
    chart: {
      background: "#ffffff",
      // background: "#ffff00",
      foreColor: "#000000",
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "Global Scores",
      align: "center",
      style: {
        color: "black",
        // padding: "2em",
        fontWeight: "bold",
        fontSize: "20px",
        marginTop: "10px",
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: Object.keys(globalScores),
      labels: {
        show: false,
      },
    },
    yaxis: {
      // labels: {
      //   show: false,
      // },
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#ffff00"],
  };
  const series1 = [
    {
      name: "WPM",
      data: [...userStats.map((user) => user.wordCount)],
    },
  ];
  const series2 = [
    {
      name: "Global Score",
      data: Object.values(globalScores),
    },
  ];
  return (
    <>
      <Chart options={options1} series={series1} type="line" />
      <Chart options={options2} series={series2} type="bar" />
    </>
  );
};

export default Charts;
