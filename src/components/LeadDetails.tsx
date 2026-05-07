import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Building2, Tag, Trash2, Save, MessageSquare, Clock } from 'lucide-react';

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // මෙතනදී Backend එකෙන් ID එකට අදාළ දත්ත ගේන්න ඕනේ. දැනට Demo data:
  const [lead, setLead] = useState({
    name: 'Siri Perera',
    email: 'siri@construction.lk',
    phone: '0712345678',
    company: 'Siri Construction',
    status: 'Contacted',
    deal_value: '150000',
    notes: [
      { id: 1, text: 'Interested in bulk orders.', date: '2024-05-20' },
      { id: 2, text: 'Follow up next Tuesday.', date: '2024-05-21' }
    ]
  });

  const [newNote, setNewNote] = useState('');

  const handleUpdate = () => {
    alert("Lead Updated Successfully!");
    // මෙතනදී Backend PUT/PATCH request එක යවන්න
  };

  const handleDelete = () => {
    if(window.confirm("Are you sure you want to delete this lead?")) {
      alert("Lead Deleted!");
      navigate('/leads'); // Delete කළාට පස්සේ ආපහු list එකට යනවා
    }
  };

  const addNote = () => {
    if(!newNote) return;
    const noteObj = { id: Date.now(), text: newNote, date: new Date().toLocaleDateString() };
    setLead({ ...lead, notes: [noteObj, ...lead.notes] });
    setNewNote('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header with Actions */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => navigate(-1)} className="text-sm font-bold text-neutral-400 hover:text-black">← Back to Leads</button>
        <div className="flex space-x-3">
          <button onClick={handleDelete} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl flex items-center text-sm font-bold hover:bg-red-100">
            <Trash2 size={16} className="mr-2" /> Delete Lead
          </button>
          <button onClick={handleUpdate} className="bg-black text-white px-6 py-2 rounded-xl flex items-center text-sm font-bold hover:bg-neutral-800 transition-all shadow-lg">
            <Save size={16} className="mr-2" /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Edit Details Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center">
             <User size={20} className="mr-2"/> Lead Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase">Full Name</label>
              <input type="text" className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none" 
              value={lead.name} onChange={(e) => setLead({...lead, name: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase">Status</label>
              <select className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none"
              value={lead.status} onChange={(e) => setLead({...lead, status: e.target.value})}>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase">Email Address</label>
              <input type="email" className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none" 
              value={lead.email} onChange={(e) => setLead({...lead, email: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase">Deal Value ($)</label>
              <input type="number" className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none" 
              value={lead.deal_value} onChange={(e) => setLead({...lead, deal_value: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Right Column: Lead Notes (CRUD for Notes) */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center">
             <MessageSquare size={20} className="mr-2"/> Notes
          </h2>
          
          <div className="mb-6">
            <textarea 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-black outline-none h-24"
              placeholder="Add a progress update..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            ></textarea>
            <button onClick={addNote} className="w-full mt-2 bg-neutral-100 text-black py-2 rounded-xl font-bold text-sm hover:bg-neutral-200 transition-all">
              Add Note
            </button>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {lead.notes.map((note) => (
              <div key={note.id} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                <p className="text-sm text-neutral-700 mb-2">{note.text}</p>
                <div className="flex items-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  <Clock size={10} className="mr-1" /> {note.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
