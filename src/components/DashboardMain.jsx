import React, { useState, useEffect } from 'react';
import AWCTable from './AWCTable';
import SummaryCards from './SummaryCards';
import SummaryChart from './SummaryChart';
import AWCFilter from './AWCFilter';
import AWCSearch from './AWCSearch';

const mockAWCData = [];
const Dashboardmain = () => {
    //filter
    const [filters, setFilters] = useState({
        status: '',
        cluster: '',
        code: '',
        awcCode: '',
    });


    const [awcList, setAwcList] = useState([]);
    const [summaryData, setSummaryData] = useState(null);
    const [codeOptions, setCodeOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);

    //api call for aganwadi center or  folder fetched successfully
    // useEffect(() => {
    //     const fetchAWCData = async () => {
    //         try {
    //             const response = await fetch('http://localhost:8000/api/v1/anganwadi/');
    //             const json = await response.json();
    //             const folders = json?.data?.folders || [];

    //             const mappedData = folders.map((folder, index) => {
    //                 const status = folder.hasLogFiles ? 'Active' : 'No Logs';
    //                 return {
    //                     name: `AWC-${index + 1}`,
    //                     code: folder.code,
    //                     status: status, // ✅ set status
    //                     lastLog: folder.lastModified,
    //                     state: '',
    //                     district: '',
    //                     cluster: '',
    //                     fileCount: folder.fileCount,
    //                     sampleFiles: folder.sampleFiles,
    //                 };
    //             });
    //             const uniqueStatuses = [...new Set(mappedData.map(awc => awc.status))];
    //             const codes = folders.map(folder => folder.code);
    //             setStatusOptions(uniqueStatuses);
    //             setCodeOptions(codes);
    //             setAwcList(mappedData);

    //         } catch (error) {
    //             console.error('Failed to fetch AWC data:', error);
    //         }
    //     };

    //     fetchAWCData();
    // }, []);

useEffect(() => {
    const fetchAWCData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/anganwadi/');
            const json = await response.json();
            const folders = json?.data?.folders || [];

            const mappedData = folders.map((folder, index) => {
                const status = folder.hasLogFiles ? 'Active' : 'No Logs';
                return {
                    name: `AWC-${index + 1}`,
                    code: folder.code,
                    status: status,
                    lastLog: folder.lastModified,
                    state: '',
                    district: '',
                    cluster: '',
                    fileCount: folder.fileCount,
                    sampleFiles: folder.sampleFiles,
                };
            });

            const uniqueStatuses = [...new Set(mappedData.map(awc => awc.status))];
            const codes = mappedData.map(awc => awc.code);
            setStatusOptions(uniqueStatuses);
            setCodeOptions(codes);
            setAwcList(mappedData);

            // ✅ Add this part to calculate summary data from API
            const total = mappedData.length;
            const reporting = mappedData.filter(awc => awc.status === 'Active').length;
            const notReporting = mappedData.filter(awc => awc.status === 'No Logs').length;
            setSummaryData({ total, reporting, notReporting });

        } catch (error) {
            console.error('Failed to fetch AWC data:', error);
        }
    };

    fetchAWCData();
}, []);

    const handleFilterChange = (type, value) => {
        setFilters((prev) => ({ ...prev, [type]: value }));
    };


    //Filter Logic
    const filteredAWCs = awcList.filter((awc) =>
        (!filters.status || awc.status === filters.status) &&
        (!filters.cluster || awc.cluster === filters.cluster) &&
        (!filters.code || awc.code === filters.code) &&
        (!filters.awcCode ||
            awc.name.toLowerCase().includes(filters.awcCode.toLowerCase()) ||
            awc.code.toLowerCase().includes(filters.awcCode.toLowerCase()))
    );



  

    //yeah charts ko show krne ke liye h ishko chnage kr deng eapi se ki data time ke according or logs show ho
    const timelineData = [
        { date: '2025-06-09', logs: 10 },
        { date: '2025-06-10', logs: 30 },
        { date: '2025-06-11', logs: 45 },
        { date: '2025-06-12', logs: 20 },
    ];

    return (
        <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-7xl">

                {/* Header */}
                {/* Header with Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-[#701a75]">Dashboard Overview</h2>
                    <AWCSearch value={filters.awcCode || ''} onChange={handleFilterChange} />
                </div>

                {/* Summary Cards */}
                {summaryData && <SummaryCards data={summaryData} />}
                {/* Filters */}
                <AWCFilter
                    filters={filters}
                    onChange={handleFilterChange}
                    codeOptions={codeOptions}
                    statusOptions={statusOptions}
                />

                {/* AWC Table */}
                <AWCTable data={filteredAWCs} />
                {/*Charts */}
                {summaryData && <SummaryChart data={summaryData} timelineData={timelineData} />}
                {/* Last updated info */}
                {/* <div className="text-sm text-right text-gray-500 mt-4">
                    Last updated: 12 June 2025, 10:15 AM
                </div> */}
            </div>
        </div>
    );
};

export default Dashboardmain;
