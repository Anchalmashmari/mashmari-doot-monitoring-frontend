import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFolder, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const AWCLogsFileTable = () => {
  const [folders, setFolders] = useState([]);
  const [expandedFolder, setExpandedFolder] = useState(null);
  const [subfolders, setSubfolders] = useState({});
  const [expandedSubfolder, setExpandedSubfolder] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const foldersPerPage = 10;

  // Track subfolder page per parent folder
  const [subfolderPages, setSubfolderPages] = useState({}); // { folderCode: 1 }

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

  const handleFolderToggle = async (code) => {
    if (expandedFolder === code) {
      setExpandedFolder(null);
      return;
    }

    setExpandedFolder(code);
    setExpandedSubfolder(null);
    setSubfolderPages((prev) => ({ ...prev, [code]: 1 }));

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

  const handleSubfolderToggle = (code) => {
    setExpandedSubfolder((prev) => (prev === code ? null : code));
  };

  // Pagination logic for top folders
  const indexOfLastFolder = currentPage * foldersPerPage;
  const indexOfFirstFolder = indexOfLastFolder - foldersPerPage;
  const currentFolders = folders.slice(indexOfFirstFolder, indexOfLastFolder);
  const totalPages = Math.ceil(folders.length / foldersPerPage);

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
          {currentFolders.map((folder) => {
            const subs = subfolders[folder.code] || [];
            const subPage = subfolderPages[folder.code] || 1;
            const subsPerPage = 10;
            const subIndexLast = subPage * subsPerPage;
            const subIndexFirst = subIndexLast - subsPerPage;
            const currentSubfolders = subs.slice(subIndexFirst, subIndexLast);
            const totalSubPages = Math.ceil(subs.length / subsPerPage);

            return (
              <React.Fragment key={folder.code}>
                <tr
                  className="border-b cursor-pointer hover:bg-gray-50"
                  onClick={() => handleFolderToggle(folder.code)}
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

                {expandedFolder === folder.code &&
                  (subs.length > 0 ? (
                    <>
                      {currentSubfolders.map((sub) => (
                        <React.Fragment key={sub.code}>
                          <tr
                            className="bg-gray-50 border-b cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSubfolderToggle(sub.code)}
                          >
                            <td className="py-2 px-8 flex items-center gap-2 text-sm text-gray-700">
                              {expandedSubfolder === sub.code ? (
                                <FaChevronDown />
                              ) : (
                                <FaChevronRight />
                              )}
                              <FaFolder className="text-yellow-500" />
                              {sub.code}
                            </td>
                            <td className="py-2 px-4">{sub.fileCount}</td>
                            <td className="py-2 px-4">
                              {(sub.totalSize / (1024 * 1024)).toFixed(2)} MB
                            </td>
                            <td className="py-2 px-4">
                              {new Date(sub.lastModified).toLocaleString()}
                            </td>
                          </tr>

                          {expandedSubfolder === sub.code && sub.sampleFiles?.length > 0 && (
                            <tr className="bg-purple-50 border-b">
                              <td colSpan={4} className="px-12 py-2 text-sm text-gray-800">
                                <strong>Sample Files:</strong>
                                <ul className="list-disc list-inside mt-1">
                                  {sub.sampleFiles.map((file, idx) => (
                                    <li key={idx}>{file}</li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}

                      {/* Subfolder Pagination Controls */}
                      {totalSubPages > 1 && (
                        <tr className="bg-white">
                          <td colSpan={4} className="py-2 px-4 text-center">
                            <div className="flex justify-center items-center gap-4">
                              <button
                                onClick={() =>
                                  setSubfolderPages((prev) => ({
                                    ...prev,
                                    [folder.code]: Math.max(1, subPage - 1),
                                  }))
                                }
                                disabled={subPage === 1}
                                className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                              >
                                Previous
                              </button>
                              <span className="text-sm">
                                Subfolder Page {subPage} of {totalSubPages}
                              </span>
                              <button
                                onClick={() =>
                                  setSubfolderPages((prev) => ({
                                    ...prev,
                                    [folder.code]: Math.min(totalSubPages, subPage + 1),
                                  }))
                                }
                                disabled={subPage === totalSubPages}
                                className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                              >
                                Next
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ) : (
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-2 px-4 text-gray-500">
                        No subfolders found.
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {/* Top-Level Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AWCLogsFileTable;
