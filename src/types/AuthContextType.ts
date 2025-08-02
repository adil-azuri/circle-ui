export type AuthContextType = {
    token: string | null;
    auth: (token: string) => void;
    logout: () => void;
    isInitialized: boolean;
};
