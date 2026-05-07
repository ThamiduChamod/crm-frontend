import React from 'react'
import { 
  MessageSquare, 
  UserPlus, 
  RefreshCw, 
  CheckCircle2, 
  Clock,
  Search,
  Filter
} from 'lucide-react';

export default function Activities() {
  // Demo Activity Data
  const activities = [
    {
      id: 1,
      type: 'note',
      user: 'Admin User',
      action: 'added a note to',
      target: 'Siri Perera',
      content: 'Customer is interested in the premium plan, follow up on Monday.',
      time: '2 hours ago',
      icon: MessageSquare,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'status',
      user: 'Admin User',
      action: 'changed status of',
      target: 'John Doe',
      content: 'New → Contacted',
      time: '4 hours ago',
      icon: RefreshCw,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      id: 3,
      type: 'lead',
      user: 'Admin User',
      action: 'created a new lead',
      target: 'Amara Silva',
      content: 'Source: LinkedIn | Value: $20,000',
      time: 'Yesterday',
      icon: UserPlus,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      id: 4,
      type: 'won',
      user: 'Admin User',
      action: 'marked as won',
      target: 'Kamal Gun',
      content: 'Deal closed for $85,000',
      time: '2 days ago',
      icon: CheckCircle2,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Recent Activities</h1>
          <p className="text-gray-500 text-sm">Keep track of every interaction and update.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search activity..."
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-black outline-none w-64 shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
            <Filter size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-4xl mx-auto">
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          
          {activities.map((item) => (
            <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              
              {/* Icon Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <item.icon className={`${item.color} w-5 h-5`} />
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-gray-900">{item.user}</div>
                  <time className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center">
                    <Clock size={10} className="mr-1" /> {item.time}
                  </time>
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  {item.action} <span className="font-bold text-black underline decoration-neutral-200">{item.target}</span>
                </div>

                <div className={`${item.bg} ${item.color} p-4 rounded-xl text-sm font-medium italic border-l-4 border-current`}>
                  "{item.content}"
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Empty State Hint */}
      <div className="mt-16 text-center">
        <p className="text-gray-400 text-xs italic">End of recent updates. Go close some deals!</p>
      </div>
    </div>
  );
}
