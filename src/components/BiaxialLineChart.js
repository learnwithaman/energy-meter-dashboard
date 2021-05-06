import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    ghi: 4000,
    gti: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    ghi: 3000,
    gti: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    ghi: 2000,
    gti: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    ghi: 2780,
    gti: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    ghi: 1890,
    gti: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    ghi: 2390,
    gti: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    ghi: 3490,
    gti: 4300,
    amt: 2100,
  },
];

function BiaxialLineChart({ width, height }) {
  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis yAxisId='left' />
      <YAxis yAxisId='right' orientation='right' />
      <Tooltip />
      <Legend />
      <Line
        name='GHI'
        yAxisId='left'
        type='monotone'
        dataKey='gti'
        stroke='#8884d8'
        activeDot={{ r: 8 }}
      />
      <Line
        name='GTI'
        yAxisId='left'
        type='monotone'
        dataKey='amt'
        stroke='#ffc107'
        activeDot={{ r: 8 }}
      />
      <Line
        name='PG'
        yAxisId='right'
        type='monotone'
        dataKey='ghi'
        stroke='#82ca9d'
      />
    </LineChart>
  );
}

export default BiaxialLineChart;
