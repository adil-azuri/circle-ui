import type { AuthContextType } from "@/types/AuthContextType";
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const tokenFromCookie = Cookies.get("token");
        if (tokenFromCookie) {
            setToken(tokenFromCookie);
        }
    }, []);

    const auth = (newToken: string) => {
        setToken(newToken);
        Cookies.set("token", newToken, { expires: 7 });
    };

    const logout = () => {
        setToken(null);
        Cookies.remove("token");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, auth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
