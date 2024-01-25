"use client"

import { createContext, useContext, useEffect, useState   } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({email: null, uid: null});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    uid: user.uid
                });
            } else {
                setUser({ email: null, uid: null });
            }
        });

        setLoading(false);

        return () => unsubscribe();
    }, []);


    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = async () => {
        setUser({ email: null, uid: null });
        return await signOut(auth);
    }

    const value = {
        user,
        signUp,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {loading? null : children}
        </AuthContext.Provider>
    )
}