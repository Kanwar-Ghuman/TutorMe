import React from 'react';
import { TeacherNav } from '@/components/tutorme/home/nav/teacherNav';

const Layout = ({ children }) => {
    return (
        <div>
            {/* Teacher Navbar (logged in through auth) */}
            <TeacherNav />
            {children}
        </div>
    );
};

export default Layout;