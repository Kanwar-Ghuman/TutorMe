import React from 'react';
import Navbar from '@/components/tutorme/home/nav/navbar';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default Layout;
