import React from 'react';

const Layout = ({ children }) => {
    return (
        <div>
            {/* Admin Navbar - Mr. Decker (logged in through auth) */}
            {children}
        </div>
    );
};

export default Layout;