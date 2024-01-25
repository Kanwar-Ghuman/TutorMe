"use client"

import { useAuth } from "../../../lib/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user.uid || !user.email) {
            router.push('/login');
        }
    }, [router, user]);

    return <div>{user ? children : null}</div>;
}

export default ProtectedRoute;