import { createContext, useContext, useState, } from "react";
import type { ReactNode } from "react"
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

type SnackBarContextType = {
    showSnackbar: (msg: string) => void;
};

const SnackBarContext = createContext<SnackBarContextType>({ showSnackbar: () => { } });

type SnackBarProviderProps = {
    children: ReactNode;
};

export const SnackBarProvider = ({ children }: SnackBarProviderProps) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const showSnackbar = (msg: string) => {
        setMessage(msg);
        setOpen(true);
    };
    return (
        <SnackBarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MuiAlert onClose={() => setOpen(false)} severity="info" sx={{ width: "100%" }}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </SnackBarContext.Provider>
    );
};

export const useSnackBar = () => useContext(SnackBarContext);