import React from 'react';
import { PlainNavbar } from '@/components/tutorme/home/nav/plainNavbar';
import { auth } from '@/auth';

async function Layout({ children }) {
    const session = await auth();

    if (!session) {
        return redirect("/auth/login");
    }

    console.log(session.user)

    return (
        <div>
            {/* Student Navbar (logged in with magic link to email) */}
            <PlainNavbar session={session} />
            {children}
        </div>
    );
};

export default Layout;