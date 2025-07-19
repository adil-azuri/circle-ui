import type { AuthContextType } from "@/types/AuthContextType";
import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(() => Cookies.get("token") || null);

    const auth = (token: string) => {
        Cookies.set("token", token);
        setToken(token);
    };

    const logout = () => {
        Cookies.remove("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, auth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
