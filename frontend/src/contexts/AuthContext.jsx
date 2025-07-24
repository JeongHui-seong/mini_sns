import { createContext, useEffect, useState } from "react";
import { getMe } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getMe()
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
    }, [])

    return (
        <AuthContext.Provider value = {{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}