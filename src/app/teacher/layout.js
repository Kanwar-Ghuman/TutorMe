"use server"

import React from 'react';
import { TeacherNavbar } from '@/components/tutorme/home/nav/teacherNavbar';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';

async function Layout({ children }) {
    const session = await auth();

    if (!session) {
        return redirect("/auth/login");
    }

    return (
        <div>
            {/* Teacher Navbar (logged in through auth) */}
            <TeacherNavbar session={session} />
            {children}
        </div>
    );
};

export default Layout;