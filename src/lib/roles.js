
export function getPermission(app, session) {
    if (app === "admin") {
        return session?.user.role === "admin"
    } else if (app === "teacher") {
        return ["teacher", "admin"].includes(session?.user.role)
    } else if (app === "student") {
        return ["student", "admin"].includes(session?.user.role)
    } else {
        return false
    }
}

export function getApp(session) {
    if (session?.user.role === "admin") {
        return "/admin/dashboard"
    } else if (session?.user.role === "teacher") {
        return "/teacher/dashboard"
    } else if (session?.user.role === "student") {
        return "/student/dashboard"
    } else {
        return "/unauthorized"
    }
}