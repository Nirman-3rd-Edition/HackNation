import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Box, Text } from "@chakra-ui/react";

const data = [
  {
    name: "Jan",
    no: 34,
  },
  {
    name: "Feb",
    no: 51,
  },
  {
    name: "Mar",
    no: 38,
  },
  {
    name: "Apr",
    no: 18,
  },
  {
    name: "May",
    no: 13,
  },
  {
    name: "Jun",
    no: 22,
  },
  {
    name: "July",
    no: 39,
  },
  {
    name: "Aug",
    no: 28,
  },
  {
    name: "Sept",
    no: 33,
  },
  {
    name: "Oct",
    no: 55,
  },
  {
    name: "Nov",
    no: 43,
  },
  {
    name: "Dec",
    no: 22,
  },
];

export default function UsersChart() {
  return (
    <div>
      <LineChart
        width={450}
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          connectNulls
          type="monotone"
          dataKey="no"
          stroke="red"
          fill="red"
        />
      </LineChart>
      <Box>
        <Text align="center">Users Number</Text>
      </Box>
    </div>
  );
}
