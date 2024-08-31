import { isLoggedIn } from "./validate";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function getBackendPermission(app = "") {
  const response = await isLoggedIn();
  if (!response.isValid)
    return {
      isValid: false,
      error: NextResponse.json({ error: "Not logged in" }, { status: 401 }),
    };
  const user = response.user;

  if (app === "admin") {
    return user.role === "admin"
      ? { isValid: true, user: user }
      : {
          isValid: false,
          error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        };
  } else if (app === "teacher") {
    return ["teacher", "admin"].includes(user.role)
      ? { isValid: true, user: user }
      : {
          isValid: false,
          error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        };
  } else if (app === "student") {
    return ["student", "admin"].includes(user.role)
      ? { isValid: true, user: user }
      : {
          isValid: false,
          error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        };
  } else {
    return {
      isValid: true,
      user: user,
    };
  }
}

export async function getFrontendPermission(app = "") {
  const response = await isLoggedIn();
  if (!response.isValid)
    return {
      isValid: false,
      error: redirect("/auth/login"),
    };
  const user = response.user;

  if (app === "admin") {
    return user.role === "admin"
      ? { isValid: true, user: user }
      : {
          isValid: false,
          error: redirect("/auth/login"),
        };
  } else if (app === "teacher") {
    return ["teacher", "admin"].includes(user.role)
      ? { isValid: true, user: user }
      : {
          isValid: false,
          error: redirect("/auth/login"),
        };
  } else if (app === "student") {
    return ["student", "admin"].includes(user.role)
      ? { isValid: true, user: user }
      : {
          isValid: false,
          error: redirect("/auth/login"),
        };
  } else {
    return {
      isValid: true,
      user: user,
    };
  }
}

export function getApp(user) {
  console.log(user);
  if (user.role === "admin") {
    return "/admin/tutor-requests";
  } else if (user.role === "teacher") {
    return "/teacher/dashboard";
  } else if (user.role === "student") {
    return "/student/tutor-requests";
  } else {
    return "/unauthorized";
  }
}
