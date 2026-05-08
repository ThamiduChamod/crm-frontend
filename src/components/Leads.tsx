import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  ChevronRight,
  User
} from 'lucide-react';
// import LeaderDetails from '../components/LeadDetails';
import { useState } from 'react';
import { getAllLeaders } from '../service/leader';

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  status: string;
  dealValue: string;
  source: string;
}

export default function Leads() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {

    const fetchLeads = async () => {
      try {
        const response = await getAllLeaders();

        // API data set to state
        setLeads(response.data.leaders);

      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
    
  }, []);
  console.log(leads);
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  
  const getStatusStyle = (status : string) => {
    switch (status) {
      case 'NEW':
      return 'bg-sky-100 text-sky-700 border-sky-200';

    case 'CONTACTED':
      return 'bg-cyan-100 text-cyan-700 border-cyan-200';

    case 'QUALIFIED':
      return 'bg-violet-100 text-violet-700 border-violet-200';

    case 'PROPOSAL_SENT':
      return 'bg-orange-100 text-orange-700 border-orange-200';

    case 'WON':
      return 'bg-green-100 text-green-700 border-green-200';

    case 'LOST':
      return 'bg-rose-100 text-rose-700 border-rose-200';

    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Leads Management</h1>
          <p className="text-gray-500 text-sm mt-1">Total {filteredLeads.length} leads found in the system.</p>
        </div>
        <button 
          onClick={() => navigate("/dashboard/addLeader")}
          className="bg-black text-white px-6 py-3 rounded-xl flex items-center font-bold hover:bg-neutral-800 transition-all shadow-lg active:scale-95"
        >
          <Plus size={18} className="mr-2" /> Add New Lead
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or company..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400" />
          <select 
            className="bg-gray-50 border border-gray-200 py-2 px-4 rounded-xl text-sm focus:border-black outline-none font-medium"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="WON">Won</option>
            <option value="LOST">Lost</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lead / Company</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deal Value</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Source</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLeads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-neutral-50/50 transition-colors cursor-pointer group"
                  onClick={() => navigate(`/dashboard/leads/${lead.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-inner">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{lead.name}</p>
                        <p className="text-xs text-gray-400">{lead.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-700">
                    {lead.dealValue}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-md">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-black hover:text-white rounded-lg transition-all text-gray-400">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredLeads.length === 0 && (
          <div className="p-20 text-center">
            <User size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500 font-medium">No leads match your search criteria.</p>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {/* <LeaderDetails /> */}
    </div>
  );
}
