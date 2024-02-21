import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
    name: "June",
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

export default function Revenue() {
  return (
    <div>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="no" fill="red" />
      </BarChart>
      <Box>
        <Text align="center">Revenue</Text>
      </Box>
    </div>
  );
}
