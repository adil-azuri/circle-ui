import type { AuthContextType } from "@/types/AuthContextType";
import { createContext, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token") || null);

    const auth = (token: string) => {
        localStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, auth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
