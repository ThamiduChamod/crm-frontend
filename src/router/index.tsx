import {lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';


const Login = lazy(() => import('../pages/Login'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const SalesOverview = lazy(() => import('../components/SalesOverview'))
const AddLeader = lazy(() => import('../components/AddLeader'))
const Pipeline = lazy(() => import('../components/Pipeline'))
const Activities = lazy(() => import('../components/Activities'))
const LeadDetails = lazy(() => import('../components/LeadDetails'))
const Leads = lazy(() => import('../components/Leads'))
// const Settings = lazy(() => import('../components/Settings'))    


type RequireAuthTypes = {children: ReactNode; roles?: string[]}

const RequireAuth = ({ children, roles }: RequireAuthTypes) => {

    const { user, loading } = useAuth();
    console.log("USER IN REQUIRE AUTH", user)
    console.log("USER ROLES",user?.role)

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                Loading...
            </div>
        );
    }

    if (!user) {
        return<Navigate to="/" replace />
    }

    if (roles && !roles.some((role) => user?.role.includes(role))) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <h1 className="text-2xl font-bold text-red-500">Unauthorized</h1>
            </div>
        );
    }

    return <>{children}</>;
}

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            Loading...
        </div>
        }>
            <Routes>
                <Route path = "/" element={<Login />} />

                {/* <Route path = "/dashboard" 
                    element={
                        <RequireAuth roles={["Admin","USER"]}>
                            <Dashboard />
                            <Route path="/salesOverview" element={<SalesOverview />} />
                            <Route path="/addAuthor" element={<AddAuthor />} />
                        </RequireAuth>
                    } /> */}
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth roles={["ADMIN", "USER"]}>
                                <Dashboard />
                            </RequireAuth>
                        }
                    >

                        <Route index element={<SalesOverview />} />

                        <Route path="salesOverview" element={<SalesOverview />} />

                        <Route path="addLeader" element={<AddLeader />} />

                        <Route path = 'leads' element={<Leads />} />

                        <Route path='pipeline' element={<Pipeline />} />

                        <Route path='activities' element={<Activities />} />

                        <Route path='leads/:id' element={<LeadDetails />} />

                        {/* <Route path='settings' element={<Settings />} /> */}

                    </Route>
            </Routes>
        
      </Suspense>
    </BrowserRouter>
  )
}
