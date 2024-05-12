"use server"

import React from 'react';
import { TeacherNavbar } from '@/components/tutorme/home/nav/teacherNavbar';

import { getFrontendPermission } from '@/lib/auth/roles';

async function Layout({ children }) {
    const response = await getFrontendPermission();
    if (!response.isValid) return response.error;
    const user = response.user;

    return (
        <div>
            {/* Teacher Navbar (logged in through auth) */}
            <TeacherNavbar user={user} />
            {children}
        </div>
    );
};

export default Layout;