import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFolder, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const AWCLogsFileTable = () => {
  const [folders, setFolders] = useState([]);
  const [expandedFolder, setExpandedFolder] = useState(null);
  const [subfolders, setSubfolders] = useState({});

  // 🔸 Step 1: Get Top-Level Folders
  useEffect(() => {
    const fetchTopLevel = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/anganwadi/');
        setFolders(res.data.data.folders || []);
      } catch (err) {
        console.error('Error fetching top-level folders:', err);
      }
    };
    fetchTopLevel();
  }, []);

  // 🔸 Step 2: On clicking a folder, fetch its subfolders
  const handleToggle = async (code) => {
    if (expandedFolder === code) {
      setExpandedFolder(null);
      return;
    }

    setExpandedFolder(code);

    try {
      const res = await axios.get(`http://localhost:8000/api/v1/anganwadi?prefix=${code}/`);
      setSubfolders((prev) => ({
        ...prev,
        [code]: res.data.data.folders || [],
      }));
    } catch (err) {
      console.error(`Error fetching subfolders for ${code}:`, err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4">Folder Code</th>
            <th className="py-2 px-4">File Count</th>
            <th className="py-2 px-4">Total Size</th>
            <th className="py-2 px-4">Last Modified</th>
          </tr>
        </thead>
        <tbody>
          {folders.map((folder) => (
            <React.Fragment key={folder.code}>
              <tr
                className="border-b cursor-pointer hover:bg-gray-50"
                onClick={() => handleToggle(folder.code)}
              >
                <td className="py-2 px-4 flex items-center gap-2">
                  {expandedFolder === folder.code ? <FaChevronDown /> : <FaChevronRight />}
                  <FaFolder className="text-yellow-500" />
                  {folder.code}
                </td>
                <td className="py-2 px-4">{folder.fileCount}</td>
                <td className="py-2 px-4">{(folder.totalSize / (1024 * 1024)).toFixed(2)} MB</td>
                <td className="py-2 px-4">{new Date(folder.lastModified).toLocaleString()}</td>
              </tr>

              {/* 🔽 Show Subfolders */}
              {expandedFolder === folder.code &&
                (subfolders[folder.code]?.length > 0 ? (
                  subfolders[folder.code].map((sub) => (
                    <tr key={sub.code} className="bg-gray-50 border-b">
                      <td className="py-2 px-8 text-sm text-gray-700">↳ {sub.code}</td>
                      <td className="py-2 px-4">{sub.fileCount}</td>
                      <td className="py-2 px-4">{(sub.totalSize / (1024 * 1024)).toFixed(2)} MB</td>
                      <td className="py-2 px-4">{new Date(sub.lastModified).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="py-2 px-4 text-gray-500">
                      No subfolders found.
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AWCLogsFileTable;
