import React from 'react';
import { FaFolder } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ✅ Step 1: Import

const AWCTable = ({ data }) => {
  const navigate = useNavigate(); // ✅ Step 2: Hook

  const handleCardClick = (folder) => {
      navigate(`/project-log/${folder.code}`);

  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 py-6">
          No data found for selected filters.
        </div>
      ) : (
        data.map((folder, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-xl shadow-md border flex flex-col justify-between relative cursor-pointer hover:shadow-lg transition-all"
            onClick={() => handleCardClick(folder)} // ✅ Click handler
          >
            <div className="absolute top-3 right-4 text-right text-xs text-gray-500">
              <div className="font-semibold">{folder.code}</div>
              <div>
                {folder.lastLog
                  ? new Date(folder.lastLog).toLocaleDateString()
                  : '—'}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <FaFolder className="text-yellow-500 text-4xl" />
              <div>
                <div
                  className={`text-sm font-bold ${
                    folder.status === 'Active'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {folder.status}
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <div className="font-semibold mb-1">Sample Files:</div>
              {folder.sampleFiles?.length > 0 ? (
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-1 max-h-24 overflow-y-auto">
                  {folder.sampleFiles.map((file, i) => (
                    <li key={i}>{file}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-400">No files available</p>
              )}
              <div className="mt-2 text-l font-semibold mb-1 text-gray-500">
                Total Files: {folder.fileCount}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AWCTable;
