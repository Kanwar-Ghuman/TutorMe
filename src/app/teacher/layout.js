"use server"

import React from 'react';
import { TeacherNav } from '@/components/tutorme/home/nav/teacherNav';

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
            <TeacherNav />
            {children}
        </div>
    );
};

export default Layout;