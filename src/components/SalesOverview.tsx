import React from 'react'
import { 
  Users, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  DollarSign,
  Plus
} from 'lucide-react';

export default function SalesOverview() {
  // මේවා දැනට Hardcoded data. පසුව Backend එකෙන් මේවා ගේන්න ඕනේ.
  const stats = [
    { label: 'Total Leads', value: '45', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Qualified Leads', value: '12', icon: Target, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Won Leads', value: '8', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Lost Leads', value: '5', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const financialStats = [
    { label: 'Total Estimated Value', value: '$125,000', icon: DollarSign, color: 'text-amber-600' },
    { label: 'Total Won Value', value: '$48,500', icon: TrendingUp, color: 'text-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Overview</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center font-bold hover:bg-neutral-800 transition-all shadow-lg">
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
            <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
          </div>
          
          {/* Simple Table Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Sample Lead {i}</p>
                    <p className="text-xs text-gray-500">Tech Solutions Inc.</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-full">
                  Contacted
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
