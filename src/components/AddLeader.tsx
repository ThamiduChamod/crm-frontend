import React from 'react'
import {  User, Building2, Mail, Phone, DollarSign, Send } from 'lucide-react';
import { useState } from 'react';
import { addLeader } from '../service/leader';


export default function AddLeader() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    source: 'Website',
    status: 'NEW',
    deal_value: '',
    assigned_salesperson: 'Admin User'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    if(!formData.name || !formData.company || !formData.email || !formData.phone || !formData.deal_value) {
      alert('Please fill in all required fields.');
      return;
    }
    const data = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        source: formData.source,
        status: formData.status,
        dealValue: formData.deal_value,
    }
    try {
      const res = await addLeader(data);
      console.log('Leader added successfully:', res);

      if (res.isAdded) {
        alert('Leader added successfully!');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          source: 'Website',
          status: 'NEW',
          deal_value: '',
          assigned_salesperson: 'Admin User'
        });
      }else{
        alert('Failed to add leader.');
      }


    }catch (error) {
      console.log('Error adding leader:', error);
      alert('Failed to add leader. Please try again.');
    }
  }
  

  return (
    <>
      {/* Modal Header */}
      <div className="bg-black p-6 text-white flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Add New Lead</h2>
          <p className="text-neutral-400 text-xs mt-1">Enter the details of the potential customer.</p>
        </div>
      </div>

      {/* Form Body */}
      <form className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Lead Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-500 uppercase">Lead Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-neutral-400" size={16} />
              <input 
                type="text" required
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black outline-none transition-all"
                placeholder="John Doe"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-500 uppercase">Company Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 text-neutral-400" size={16} />
              <input 
                type="text" required
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black outline-none transition-all"
                placeholder="Tech Solutions"
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-500 uppercase">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-neutral-400" size={16} />
              <input 
                type="email" required
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black outline-none transition-all"
                placeholder="john@example.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Phone Number - අලුතින් එකතු කළ කොටස */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-500 uppercase">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-neutral-400" size={16} />
              <input 
                type="tel" required
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black outline-none transition-all"
                placeholder="+94 7X XXX XXXX"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          {/* Deal Value */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-500 uppercase">Deal Value ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 text-neutral-400" size={16} />
              <input 
                type="number" required
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black outline-none transition-all"
                placeholder="5000"
                onChange={(e) => setFormData({...formData, deal_value: e.target.value})}
              />
            </div>
          </div>

          {/* Lead Source */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-500 uppercase">Lead Source</label>
            <select 
              className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black outline-none transition-all"
              onChange={(e) => setFormData({...formData, source: e.target.value})}
            >
              <option value="Website">Website</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Referral">Referral</option>
              <option value="Cold Email">Cold Email</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-500 uppercase">Status</label>
            <select 
              className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-black outline-none transition-all"
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="PROPOSAL_SENT">Proposal Sent</option>
              <option value="WON">Won</option>
              <option value="LOST">Lost</option>
            </select>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex space-x-3">
          <button 
            type="button"
            className="flex-1 px-6 py-3 border border-neutral-200 rounded-xl font-bold text-neutral-500 hover:bg-neutral-50 transition-all"
          >
            Cancel
          </button>
          <button 
            // type="submit"
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-neutral-800 transition-all flex items-center justify-center space-x-2"
          >
            <Send size={18} />
            <span>Create Lead</span>
          </button>
        </div>
      </form>
    </>
  );
}
