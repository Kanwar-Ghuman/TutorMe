import React from 'react';

const Layout = ({ children }) => {
    return (
        <div>
            {/* Teacher Navbar (logged in through auth) */}
            {children}
        </div>
    );
};

export default Layout;