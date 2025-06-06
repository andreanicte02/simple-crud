import {createContext, type ReactNode, useContext, useState} from "react";
import Alert from "../components/Alert/Alert.tsx";

type SuccessMessageContextType = {
    showSuccess: (msg: string) => void;
};

const SuccessMessageContext = createContext<SuccessMessageContextType | undefined>(undefined);

export const useSuccessMessage = () => {
    const ctx = useContext(SuccessMessageContext);
    if (!ctx) throw new Error("useSuccessMessage debe estar dentro de SuccessMessageProvider");
    return ctx;
};

export const SuccessMessageProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState<string | null>(null);

    const showSuccess = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000); // autocierre a los 3 segundos
    };

    return (
        <SuccessMessageContext.Provider value={{ showSuccess }}>
            {message && (
                <Alert message={message}/>
            )}
            {children}
        </SuccessMessageContext.Provider>
    );
};