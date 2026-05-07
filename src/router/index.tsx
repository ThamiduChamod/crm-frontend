import {lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Login = lazy(() => import('../pages/Login'))
const Dashboard = lazy(() => import('../pages/Dashboard'))


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

    if (roles && !roles.some(role => user.roles.includes(role))) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
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

                <Route path = "/dashboard" 
                    element={
                        <RequireAuth roles={["Admin","User"]}>
                            <Dashboard />
                        </RequireAuth>
                    } />
            </Routes>
        
      </Suspense>
    </BrowserRouter>
  )
}
