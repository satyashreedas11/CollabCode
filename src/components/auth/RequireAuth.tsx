import { useAuth } from "@/context/AuthContext"
import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"

const RequireAuth = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
                <p className="text-sm text-gray-300">Checking session...</p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return <>{children}</>
}

export default RequireAuth
