import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  ExternalLink,
  ChevronRight,
  User
} from 'lucide-react';
import LeaderDetails from '../components/LeadDetails';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    // console.log(lead)
  }, []);
  console.log(leads);

  // Demo Data - පසුව මෙය Backend එකෙන් ලබාගන්න
  // const [leads] = useState([
  //   { id: 1, name: 'Siri Perera', company: 'Siri Constr.', email: 'siri@cons.lk', status: 'Won', value: '$150,000', source: 'LinkedIn' },
  //   { id: 2, name: 'John Doe', company: 'Global Tech', email: 'john@tech.com', status: 'New', value: '$45,000', source: 'Website' },
  //   { id: 3, name: 'Amara Silva', company: 'Fashion Hub', email: 'amara@style.lk', status: 'Contacted', value: '$20,000', source: 'Referral' },
  //   { id: 4, name: 'Kamal Gun', company: 'Auto Mart', email: 'kamal@auto.lk', status: 'Lost', value: '$85,000', source: 'Cold Email' },
  //   { id: 5, name: 'Nimali Ratnayake', company: 'Green Garden', email: 'nimali@gg.lk', status: 'Qualified', value: '$12,000', source: 'Website' },
  // ]);

  // Search සහ Filter Logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status වලට අදාළ වර්ණ (Colors)
  const getStatusStyle = (status : string) => {
    switch (status) {
      case 'Won': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Lost': return 'bg-red-50 text-red-600 border-red-100';
      case 'New': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-amber-50 text-amber-600 border-amber-100';
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
          onClick={() => setIsModalOpen(true)}
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
