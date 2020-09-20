import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  ResponsiveContainer
} from 'recharts';

export const BarGraph = ({ displayMarkers }) => (
  <ResponsiveContainer
    width='100%'
    height={window.innerWidth < 767.98 ? '70%' : '50%'}
  >
    <BarChart
      data={displayMarkers().map((el) => ({
        name: el[0],
        amount: el[1]
      }))}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='amount' barSize={30} fill='#8884d8' />;
    </BarChart>
  </ResponsiveContainer>
);

export default BarGraph;
