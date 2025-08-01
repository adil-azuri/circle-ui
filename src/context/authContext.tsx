import type { AuthContextType } from "@/types/AuthContextType";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const auth = () => {
    };

    const logout = () => {
    };

    return (
        <AuthContext.Provider value={{ token: null, auth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
