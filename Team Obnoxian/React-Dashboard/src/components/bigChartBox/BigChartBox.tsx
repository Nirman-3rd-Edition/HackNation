import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";

const data = [
  {
    name: "Sun",
    singlePlayer: 4000,
    multiplayer: 2400,
    coop: 2400,
  },
  {
    name: "Mon",
    singlePlayer: 3000,
    multiplayer: 1398,
    coop: 2210,
  },
  {
    name: "Tue",
    singlePlayer: 2000,
    multiplayer: 9800,
    coop: 2290,
  },
  {
    name: "Wed",
    singlePlayer: 2780,
    multiplayer: 3908,
    coop: 2000,
  },
  {
    name: "Thu",
    singlePlayer: 1890,
    multiplayer: 4800,
    coop: 2181,
  },
  {
    name: "Fri",
    singlePlayer: 2390,
    multiplayer: 3800,
    coop: 2500,
  },
  {
    name: "Sat",
    singlePlayer: 3490,
    multiplayer: 4300,
    coop: 2100,
  },
];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1>Simulation Analytics</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" tick={{ fill: "white" }} />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="coop"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="multiplayer"
              stackId="1"
              stroke="#2181C0"
              fill="#2181C0"
            />
            <Area
              type="monotone"
              dataKey="singlePlayer"
              stackId="1"
              stroke="#F2C501"
              fill="#F2C501"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
