// context/UserContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { id, name, role }

    // Fetch current session info from backend
    const fetchCurrentUser = async () => {
        try {
            const response = await fetch("/LoginRoutes/current-user", {
                method: "GET",
                credentials: "include", // important to send cookies
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error("Failed to fetch user", err);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, fetchCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
