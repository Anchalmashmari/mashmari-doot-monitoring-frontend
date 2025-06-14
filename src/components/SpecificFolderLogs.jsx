import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AWCFilter from './AWCFilter';
import AWCSearch from './AWCSearch';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import Loader from './Loader';

const SpecificFolderLogs = () => {
  
  const { code } = useParams();
  const navigate = useNavigate();
  const [openFolderCode, setOpenFolderCode] = useState(null);

  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    awcCode: '',
    cluster: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchFolderData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/anganwadi?prefix=${code}/`);
        const json = await res.json();

        if (json.success) {
          const mappedFolders = json.data.folders.map((folder) => ({
            ...folder,
            status: folder.hasLogFiles ? 'Active' : 'No Logs',
            cluster: folder.cluster || 'Unassigned'
          }));
          setFolders(mappedFolders);
        } else {
          setError('Failed to fetch folders');
        }
      } catch (err) {
        setError('Something went wrong while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchFolderData();
  }, [code]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setCurrentPage(1); // reset to first page on filter change
  };

  const filteredFolders = folders.filter((folder) =>
    (!filters.status || folder.status === filters.status) &&
    (!filters.awcCode || folder.code.toLowerCase().includes(filters.awcCode.toLowerCase())) &&
    (!filters.cluster || folder.cluster === filters.cluster)
  );

  const totalPages = Math.ceil(filteredFolders.length / itemsPerPage);
  const paginatedFolders = filteredFolders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <Loader />;
 
  if (error) return <div className="p-6 text-red-600 text-lg">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-purple-700">
          Project Log for: {code}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-all"
        >
          ← Back
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <AWCSearch value={filters.awcCode || ''} onChange={handleFilterChange} />
        <AWCFilter
          filters={filters}
          onChange={handleFilterChange}
          codeOptions={[...new Set(folders.map(f => f.code))]}
          statusOptions={[...new Set(folders.map(f => f.status))]}
          clusterOptions={[...new Set(folders.map(f => f.cluster))]}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-purple-100 text-purple-800 text-left text-sm">
              <th className="py-3 px-4 border-b">Code</th>
              <th className="py-3 px-4 border-b">File Count</th>
              <th className="py-3 px-4 border-b">Total Size (MB)</th>
              <th className="py-3 px-4 border-b">Last Modified</th>
              <th className="py-3 px-4 border-b">Has Log Files</th>
              <th className="py-3 px-4 border-b">Cluster</th>
              <th className="py-3 px-4 border-b">Sample Files</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFolders.map((folder, idx) => {
              const isOpen = folder.code === openFolderCode;

              return (
                <React.Fragment key={idx}>
                  <tr
                    className="hover:bg-gray-50 text-sm cursor-pointer"
                    onClick={() =>
                      setOpenFolderCode(isOpen ? null : folder.code)
                    }
                  >
                    <td className="py-2 px-4 border-b flex items-center gap-2 text-purple-700 font-medium">
                      {isOpen ? <FaFolderOpen className="text-yellow-500" /> : <FaFolder className="text-yellow-500" />}
                      {folder.code}
                    </td>

                    <td className="py-2 px-4 border-b">{folder.fileCount}</td>
                    <td className="py-2 px-4 border-b">
                      {(folder.totalSize / 1024 / 1024).toFixed(2)} MB
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(folder.lastModified).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {folder.hasLogFiles ? 'Yes' : 'No'}
                    </td>
                    <td className="py-2 px-4 border-b">{folder.cluster}</td>
                    <td className="py-2 px-4 border-b text-gray-400 italic">
                      {isOpen ? 'Click to hide files' : 'Click to view files'}
                    </td>
                  </tr>

                  {isOpen && folder.sampleFiles.length > 0 && (
                    <tr className="bg-gray-50 text-sm">
                      <td colSpan="7" className="py-2 px-4 border-b">
                        <strong>Sample Files:</strong>
                        <table className="w-full text-sm text-left text-purple-800 border mt-2">
                          <thead className="bg-purple-100 text-purple-800">
                            <tr>
                              <th className="px-3 py-2 border">S.No.</th>
                              <th className="px-3 py-2 border">File Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {folder.sampleFiles.map((file, index) => (
                              <tr key={index} className="bg-white hover:bg-gray-50">
                                <td className="px-3 py-2 border">{index + 1}</td>
                                <td className="px-3 py-2 border">{file}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>

                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 border rounded text-sm bg-purple-100 hover:bg-purple-200"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 border rounded text-sm ${currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-white'
              }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 border rounded text-sm bg-purple-100 hover:bg-purple-200"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SpecificFolderLogs;
