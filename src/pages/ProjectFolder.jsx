import React, { useState } from 'react';
import FolderProject from './FolderProject';
import Projectlog from './Projectlog';
import Settings from './Settings';
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';

const ProjectFolder = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('folderproject');
  const [reportDropdownOpen, setReportDropdownOpen] = useState(false); // 👈 Reports dropdown control
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'folderproject':
        return <FolderProject />;
      case 'dashboard':
        return <Dashboard />;
      case 'logs':
        return <Projectlog />;
      case 'settings':
        return <Settings />;
      default:
        return <FolderProject />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col md:flex-row">

      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white text-gray-800 shadow-md">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-2xl font-extrabold text-[#701a75]">MASHMARI</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">

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
                {/* Aap yaha aur bhi reports future me add kar sakte ho */}
                {/* <button className="block text-left w-full px-4 py-2 text-sm hover:text-[#4a044e]">Another Report</button> */}
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

      {/* Mobile Navbar - unchanged (you can later add dropdown here too if needed) */}
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
              onClick={() => { setActiveTab('dashboard'); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:text-[#4a044e]"
            >
              Dashboard
            </button>

            {/* Reports Dropdown in Mobile */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-gradient-to-r from-[#4a044e] to-[#7b1fa2] p-6 text-white">
          <h1 className="text-2xl font-bold">Mashmari Doot Monitoring Dashboard</h1>
        </div>

        <div className="bg-[#f7f7f7] p-6 flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProjectFolder