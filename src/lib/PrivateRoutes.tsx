import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
    const { token, isInitialized } = useAuth();

    // Wait for authentication state to be initialized
    if (!isInitialized) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    if (!token) return <Navigate to="/login" replace />;
    return <>{children} </>;
}
