import React from 'react';
import AWCLogsFileTable from './AWCLogsFileTable';

const ProjectorLogsMain = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-7xl">
        <h1 className="text-2xl font-bold mb-6">Projector Logs</h1>
        <AWCLogsFileTable />
      </div>
    </div>
  );
};

export default ProjectorLogsMain;
