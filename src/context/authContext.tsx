import type { AuthContextType } from "@/types/AuthContextType";
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        let tokenFromStorage: string | null | undefined = Cookies.get("token");
        if (!tokenFromStorage) {
            tokenFromStorage = localStorage.getItem("token");
        }

        const tokenValue = tokenFromStorage ?? null;

        if (tokenValue) {
            setToken(tokenValue);
            if (!Cookies.get("token")) {
                Cookies.set("token", tokenValue, { expires: 7 });
            }
        }
    }, []);

    const auth = (newToken: string) => {
        setToken(newToken);
        Cookies.set("token", newToken, { expires: 7 });
        localStorage.setItem("token", newToken);
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
