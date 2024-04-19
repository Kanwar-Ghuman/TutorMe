import React from 'react';

const Layout = ({ children }) => {
    return (
        <div>
            {/* Student Navbar (logged in with magic link to email) */}
            {children}
        </div>
    );
};

export default Layout;