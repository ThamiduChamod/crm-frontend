import { useState, useEffect } from 'react';
import { MoreVertical, Plus, DollarSign, Calendar } from 'lucide-react';
import {getAllLeaders} from '../service/leader';
interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  status: string;
  dealValue: string;
  source: string;
  createdAt: string;
}

const Pipeline = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalValue, setTotalValue] = useState(0);
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

    setTotalValue(total);

    console.log('Fetched:', leaders.length);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  }
  const stages = ['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST'];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Sales Pipeline</h1>
          <p className="text-gray-500 text-sm">Visualize your sales process and track deal progress.</p>
        </div>
        <div className="flex space-x-3">
          <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold flex items-center shadow-sm">
            Total Value: <span className="ml-2 text-blue-600">${totalValue.toLocaleString()}</span>
          </div>
          <button className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center hover:bg-neutral-800 transition-all">
            <Plus size={18} className="mr-2" /> Add Deal
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
        {stages.map((stage) => (
          <div key={stage} className="flex-shrink-0 w-80">
            {/* Stage Header */}
            <div className="flex justify-between items-center mb-4 px-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-neutral-800">{stage}</h3>
                <span className="bg-neutral-200 text-neutral-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {leads.filter(l => l.status === stage).length}
                </span>
              </div>
              <button className="text-neutral-400 hover:text-black transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>

            {/* Stage Column */}
            <div className="bg-neutral-100/50 p-3 rounded-2xl min-h-[70vh] border border-dashed border-neutral-200">
              {leads
                .filter((lead) => lead.status === stage)
                .map((lead) => (
                  <div 
                    key={lead.id} 
                    className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4 cursor-grab active:cursor-grabbing hover:border-black transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{lead.company}</p>
                      <button className="text-gray-300 group-hover:text-gray-600"><MoreVertical size={14} /></button>
                    </div>
                    
                    <h4 className="font-bold text-gray-900 mb-4">{lead.name}</h4>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center text-emerald-600 font-bold text-sm">
                        <DollarSign size={14} className="mr-0.5" />
                        {lead.dealValue}
                      </div>
                      <div className="flex items-center text-gray-400 text-[10px] font-medium">
                        <Calendar size={12} className="mr-1" />
                        {lead.createdAt}
                      </div>
                    </div>
                  </div>
                ))}
              
              {/* Add card placeholder */}
              <button className="w-full py-3 border-2 border-dashed border-neutral-200 rounded-2xl text-neutral-400 text-xs font-bold hover:bg-neutral-50 hover:border-neutral-300 transition-all">
                + Drop lead here
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pipeline;