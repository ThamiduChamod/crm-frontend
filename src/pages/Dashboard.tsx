import React from 'react'
import { Link, useLocation, useNavigate, Outlet} from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  LogOut, 
  Settings, 
  Bell,
  Menu,
  X,
  GitBranch,
  ClipboardList

} from 'lucide-react';
import { useAuth } from '../context/AuthContext';


export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    // { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Sales Overview', icon: LayoutDashboard, path: '/dashboard/salesOverview' },
    { name: 'Add Leader', icon: Users, path: '/dashboard/addLeader' },
    { name: 'Sales Pipeline', icon: GitBranch, path: '/dashboard/pipeline' }, // Bonus: කන්බන් බෝඩ් එක සඳහා
    { name: 'Activities', icon: ClipboardList, path: '/dashboard/activities' }, // Notes සහ updates බැලීමට
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-black text-white rounded-lg shadow-lg"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-full bg-white border-r border-neutral-100 w-64 z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3 mb-12 px-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
            </div>
            <span className="text-xl font-bold tracking-tighter">CORE CRM</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2 mb-4">Main Menu</p>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${isActive 
                      ? 'bg-black text-white shadow-lg shadow-neutral-200' 
                      : 'text-neutral-500 hover:bg-neutral-50 hover:text-black'}
                  `}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section (User & Logout) */}
          <div className="border-t border-neutral-100 pt-6">
            <div className="flex items-center space-x-3 px-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white font-bold text-xs">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">{user?.name || 'Admin User'}</p>
                <p className="text-[10px] text-neutral-400 truncate">{user?.email}</p>
              </div>
              <button className="text-neutral-400 hover:text-black">
                <Bell size={16} />
              </button>
            </div>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <main className="lg:ml-64 min-h-screen bg-neutral-50 p-6">
        <Outlet />
      </main>
    </>
  );
}
