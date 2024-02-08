import React from 'react';
import Navbar from '@/components/tutorme/home/nav/navbar';
import ProtectedRoute from '../../../components/tutorme/routes/ProtectedRoute';

const Layout = ({ children }) => {
    return (
        <div>
            <ProtectedRoute>
                <Navbar />
                {children}
            </ProtectedRoute>
        </div>
    );
};

export default Layout;
