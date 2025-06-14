import React from 'react';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#4a044e', '#22c55e', '#ef4444']; // Theme

const SummaryChart = ({ data, timelineData }) => {
  const pieData = [
    { name: 'Reporting', value: data.reporting },
    { name: 'Not Reporting', value: data.notReporting }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-8">
      
      {/* Pie Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow w-full">
        <h3 className="font-semibold mb-4 text-center">Reporting vs Not Reporting</h3>
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow w-full">
        <h3 className="font-semibold mb-4 text-center">Video Log Timeline</h3>
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="logs" stroke="#701a75" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SummaryChart;
