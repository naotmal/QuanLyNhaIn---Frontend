import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PieChartComponent = ({ data }) => {
  const COLORS = ['#dfb265', '#2B2F38', '#a4a4a4'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer height="80%">
        <PieChart width={400} height={400} >
          <Pie
          
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
        {data.map((entry, index) => (
          <span key={`legend-${index}`} style={{ display: 'inline-block', marginRight: '10px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: COLORS[index % COLORS.length],
                borderRadius: '50%',
                marginRight: '5px',
              }}
            ></span>
            {entry.name}: {entry.value}
          </span>
        ))}
      </div>
      </ResponsiveContainer>
      
    </div>
  );
};

export default PieChartComponent;
