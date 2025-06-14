const AWCFilter = ({ filters, onChange, codeOptions = [], statusOptions = [], clusterOptions = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Status Dropdown */}
      <select className="border p-2 rounded-md" value={filters.status} onChange={(e) => onChange('status', e.target.value)}>
        <option value="">Select Status</option>
        {statusOptions.map((status, idx) => (
          <option key={idx} value={status}>{status}</option>
        ))}
      </select>

      {/* Code Dropdown */}
      <select className="border p-2 rounded-md" value={filters.awcCode} onChange={(e) => onChange('awcCode', e.target.value)}>
        <option value="">Select Code</option>
        {codeOptions.map((code, idx) => (
          <option key={idx} value={code}>{code}</option>
        ))}
      </select>

      {/* Cluster Dropdown */}
      <select className="border p-2 rounded-md" value={filters.cluster} onChange={(e) => onChange('cluster', e.target.value)}>
        <option value="">Select Cluster</option>
        {clusterOptions.map((cluster, idx) => (
          <option key={idx} value={cluster}>{cluster}</option>
        ))}
      </select>
    </div>
  );
};

export default AWCFilter;
