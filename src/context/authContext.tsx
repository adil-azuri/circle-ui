import type { AuthContextType } from "@/types/AuthContextType";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

import { useState } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

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