import { ArrowRight, Mail } from 'lucide-react'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { register, login } from '../service/auth';
import { getMyDetails } from '../service/auth';
import { useAuth } from '../context/AuthContext';

export default function Login() {
   const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login Logic
      console.log('Logging in:', { email, password });
      if (!email || !password) {
        setError('Email and password are required for login.');
        return;
      }
      try {
        const res = await login(email, password);
        console.log('Login response:', res);

        if (res.login) {
          console.log('User data:', res.data);
          
          
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          localStorage.setItem("role", res.data.role);

          try {
            const details = await getMyDetails();
            setUser(details.data);
            alert("Login successful.");
          } catch (err) {
            console.error('Error setting user details:', err);
            alert("Login successful, but failed to retrieve user details.");
          }
          navigate('/dashboard/salesOverview');
        } else {
          setError(res.message || 'Login failed. Please check your credentials and try again.');
        }
      } catch (err) {
        setError('Login failed. Please try again.');
      }
    } else {
      // Sign Up Logic (Demo)
      console.log('Registering:', { name, email, password });

      if (!name || !email || !password) {
        setError('All fields are required for registration.');
        return;
      }
      try {
        const res = await register({ name, email, password });
        console.log('Registration response:', res);
        
        if (res.login) {
          console.log('User data:', res.data);
          
          
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          localStorage.setItem("role", res.data.role);

          try {
            const details = await getMyDetails();
            setUser(details.data);
            alert("Login successful.");
          } catch (err) {
            console.error('Error setting user details:', err);
            alert("Login successful, but failed to retrieve user details.");
          }
          navigate('/dashboard/salesOverview');
        } else {
          setError(res.message || 'Login failed. Please check your credentials and try again.');
        }


      } catch (err) {
        setError('Registration failed. Please try again.');
        alert('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full min-h-135 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Black Section */}
        <div className="md:w-1/2 z-10  p-12 flex flex-col justify-center items-center text-white relative rounded-tl-2xl rounded-br-2xl">

          <div className="text-center z-10">
            <h1 className="text-4xl font-bold tracking-tighter mb-4">
              {isLogin ? "Welcome Back." : "Join the Team."}
            </h1>

            <p className="text-neutral-400 max-w-xs">
              Manage your sales leads, track conversions, and grow your business with our minimalist CRM.
            </p>
          </div>

          {/* Decorative Circles */}
          <div className="absolute z-0 top-[-20%] left-[-30%] w-145 h-150 bg-black rounded-full"></div>
          <div className="absolute z-0 top-[-10%] left-[-10%] w-64 h-64 bg-neutral-900 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute z-0 bottom-[-20%] left-[-20%] w-68 h-68 bg-neutral-800 opacity-80 rounded-full"></div>
          <div className="absolute z-5 bottom-1 right-[-5%] w-48 h-48 bg-neutral-500 rounded-full"></div>

        </div>

        {/* Right Side - White Section (Form) */}
        <div className="md:w-1/2 p-12 bg-white">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-black">
              {isLogin ? "Sign In" : "Register"}
            </h2>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors b-20"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </div>

          {error && (
            <div className="mb-6 text-xs text-red-500 font-medium bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                {/* <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 text-neutral-400" /> */}
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full pl-7 py-3 border-b border-neutral-200 focus:border-black outline-none transition-colors text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 text-neutral-400" />
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full pl-7 py-3 border-b border-neutral-200 focus:border-black outline-none transition-colors text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              {/* <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 text-neutral-400" /> */}
              <input 
                type="password" 
                placeholder="Password"
                className="w-full pl-7 py-3 border-b border-neutral-200 focus:border-black outline-none transition-colors text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-[11px] text-neutral-400 hover:text-black uppercase tracking-tighter">Forgot Password?</a>
              </div>
            )}

            <button className="w-full bg-black hover:checked: text-white py-4 rounded-full flex items-center justify-center group hover:bg-neutral-800 transition-all font-bold text-sm cursor-pointer">
              {isLogin ? "LOG IN" : "CREATE ACCOUNT"}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          
          
          <p className="mt-8 text-center text-[11px] text-neutral-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-black font-bold underline cursor-pointer hover:text-neutral-800 transition-colors"
            >
              {isLogin ? "Sign up for free" : "Log in to your account"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
