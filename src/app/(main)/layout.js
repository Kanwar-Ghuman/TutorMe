import React from 'react';

const Layout = ({ children }) => {
    return (
        <div>
            {/* Main Navbar (not logged in) */}
            {children}
        </div>
    );
};

export default Layout;