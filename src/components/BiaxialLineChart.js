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

function BiaxialLineChart({ width, height, data }) {
  return (
    <ResponsiveContainer>
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
        <XAxis dataKey='time' interval={3} />
        <YAxis yAxisId='left' domain={[0, 1400]} />
        <YAxis yAxisId='right' domain={[0, 40]} orientation='right' />
        <Tooltip />
        <Legend />
        <Line
          name='GHI'
          yAxisId='left'
          type='monotone'
          dataKey='ghi'
          stroke='#8884d8'
          activeDot={{ r: 6 }}
        />
        <Line
          name='GTI'
          yAxisId='left'
          type='monotone'
          dataKey='gti'
          stroke='#ffc107'
          activeDot={{ r: 6 }}
        />
        <Line
          name='PG'
          yAxisId='right'
          type='monotone'
          dataKey='pg'
          stroke='#82ca9d'
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default BiaxialLineChart;
