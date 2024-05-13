import { auth } from '@/auth';

export async function isLoggedIn() {
    const session = await auth();
    if (!session) return {isValid: false, error: true};
    return {isValid: true, user: session.user};
};