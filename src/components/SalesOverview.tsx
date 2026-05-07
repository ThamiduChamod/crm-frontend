import { useEffect, useState } from 'react';
import { getAllLeaders } from '../service/leader';
import { 
  Users, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  DollarSign,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  status: string;
  dealValue: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export default function SalesOverview() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalWonValue, setTotalWonValue] = useState(0);
  const [totalLeadsValue, setTotalLeadsValue] = useState(0);
  useEffect(() => {
      fetchLeads();
    }, []);
  
  const fetchLeads = async () => {
      try {
        const response = await getAllLeaders();
        const leaders = response.data.leaders;
  
      setLeads(leaders);
      
      const total = leaders.reduce((acc: number, lead: Lead) => {
        const value = parseFloat(lead.dealValue?.toString().replace(/[$,]/g, '') || "0");
        return acc + value;
      }, 0);

      const totalWon = leaders.reduce((acc: number, lead: Lead) => {
        if (lead.status.toUpperCase() === 'WON') {
          const value = parseFloat(lead.dealValue?.toString().replace(/[$,]/g, '') || "0");
          return acc + value;
        }
        return acc;
      }, 0);

      setTotalValue(total);
      setTotalWonValue(totalWon);

      console.log('Fetched:', leaders.length);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
  }
  const qualifiedLeads = leads.filter(lead => lead.status.toUpperCase() === 'QUALIFIED');
  const wonLeads = leads.filter(lead => lead.status.toUpperCase() === 'WON');
  const lostLeads = leads.filter(lead => lead.status.toUpperCase() === 'LOST');
  
  const FOUR_DAYS = 4 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  const recentLeads = leads.filter(lead => {
    const lastActivity = Math.max(
      new Date(lead.createdAt).getTime(),
      new Date(lead.updatedAt).getTime()
    );

    return now - lastActivity <= FOUR_DAYS;
  });
  console.log('Recent Leads:', recentLeads);

  const stats = [
    { label: 'Total Leads', value: leads.length.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Qualified Leads', value: qualifiedLeads.length.toString(), icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Won Leads', value: wonLeads.length.toString(), icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Lost Leads', value: lostLeads.length.toString(), icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const financialStats = [
    { label: 'Total Estimated Value', value: totalValue.toLocaleString(), icon: DollarSign, color: 'text-amber-600' },
    { label: 'Total Won Value', value: totalWonValue.toLocaleString(), icon: TrendingUp, color: 'text-emerald-600' },
  ];
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
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Overview</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>
        <button onClick={() => navigate("/dashboard/addLeader")} className="bg-black text-white px-6 py-3 rounded-xl flex items-center font-bold hover:bg-neutral-800 transition-all shadow-lg">
          <Plus className="w-5 h-5 mr-2" /> Add New Lead
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`${stat.bg} p-4 rounded-xl`}>
              <stat.icon className={`${stat.color} w-6 h-6`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Overview & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Cards */}
        <div className="lg:col-span-1 space-y-6">
          {financialStats.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{stat.label}</p>
                <h2 className={`text-4xl font-black ${stat.color}`}>{stat.value}</h2>
              </div>
              <stat.icon className="absolute right-[-10px] bottom-[-10px] w-32 h-32 text-gray-50 opacity-50" />
            </div>
          ))}
        </div>

        {/* Placeholder for Lead List / Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Leads</h3>
            <button onClick={() => navigate("/dashboard/leads")} className="text-blue-600 text-sm font-bold hover:underline">View All</button>
          </div>
          
          {/* Simple Table Skeleton */}
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full text-2xl font-bold text-gray-700 align-middle flex items-center justify-center">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.company}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle(lead.status)}`}>
                      {lead.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
