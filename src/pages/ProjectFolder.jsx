import React, { useState } from 'react';
import FolderProject from './FolderProject';
import Projectlog from './Projectlog';
import Settings from './Settings';
import { useNavigate } from 'react-router-dom';

const ProjectFolder = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('folderproject');
  const [reportDropdownOpen, setReportDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'folderproject':
        return <FolderProject />;
      case 'logs':
        return <Projectlog />;
      case 'settings':
        return <Settings />;
      default:
        return <FolderProject />;
    }
  };

  return (
   <div className="min-h-screen flex flex-col md:flex-row">

      {/* Sidebar - Fixed */}
      <div className="hidden md:flex flex-col w-64 bg-white text-gray-800 shadow-md fixed h-screen">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-2xl font-extrabold text-[#701a75]">MASHMARI</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

          <button
            onClick={() => setActiveTab('folderproject')}
            className="block text-left font-medium w-full px-4 py-2 hover:text-[#4a044e]"
          >
            Project
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="block text-left font-medium w-full px-4 py-2 hover:text-[#4a044e]"
          >
            Dashboard
          </button>

          {/* Reports Dropdown */}
          <div>
            <button
              onClick={() => setReportDropdownOpen(!reportDropdownOpen)}
              className="block text-left w-full px-4 py-2 font-medium hover:text-[#4a044e] flex justify-between items-center"
            >
              Reports
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${reportDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {reportDropdownOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <button
                  onClick={() => setActiveTab('logs')}
                  className="block text-left w-full px-4 py-2 text-sm hover:text-[#4a044e]"
                >
                  Projector Logs
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            className="block font-medium text-left w-full px-4 py-2 hover:text-[#4a044e]"
          >
            Settings
          </button>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden bg-white text-gray-800 w-full shadow-md">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="text-xl font-bold text-[#701a75]">Mashmari</div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="bg-gray-100 border-t">
            <button
              onClick={() => { setActiveTab('folderproject'); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:text-[#4a044e]"
            >
              Project
            </button>

            <button
              onClick={() => { navigate('/dashboard'); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:text-[#4a044e]"
            >
              Dashboard
            </button>

            <div>
              <button
                onClick={() => setReportDropdownOpen(!reportDropdownOpen)}
                className="w-full text-left px-4 py-2 hover:text-[#4a044e] flex justify-between items-center"
              >
                Reports
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${reportDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {reportDropdownOpen && (
                <div className="ml-4">
                  <button
                    onClick={() => { setActiveTab('logs'); setMenuOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm hover:text-[#4a044e]"
                  >
                    Projector Logs
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => { setActiveTab('settings'); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:text-[#4a044e]"
            >
              Settings
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
     <div className="md:ml-64 flex-1 flex flex-col min-h-screen">
  {/* Topbar */}
  <div className="bg-gradient-to-r from-[#4a044e] to-[#7b1fa2] p-6 text-white sticky top-0 z-10">
    <h1 className="text-2xl font-bold">Mashmari Doot Monitoring Dashboard</h1>
  </div>

  {/* Scrollable Content */}
  <div className="flex-1 overflow-y-auto p-6 bg-[#f7f7f7]">
    {renderContent()}
  </div>
</div>

    </div>
  );
};

export default ProjectFolder;
