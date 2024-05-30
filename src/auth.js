import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const adminEmailList = [
  "popguy1029@gmail.com",
  "keith.decker@franklin.k12.wi.us",
  "ghumankm@gmail.com",
];

const teachersEmailList = [
  "shamit.surana@gmail.com",
  "kanwarmehtab.ghuman@franklinsabers.org",
  ,
];
const studentsEmailList = [
  "shamit.surana@franklinsabers.org",
  "mcdabg1236@gmail.com",
];

function getUserRole(email) {
  // Implement your logic to check if the email belongs to a teacher
  if (adminEmailList.includes(email)) return "admin";
  if (teachersEmailList.includes(email)) return "teacher";
  if (studentsEmailList.includes(email)) return "student";

  return "unauthorized";
}

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [Google({})],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      // Only update the role if the user doesn't already have a role
      if (!isNewUser) return;
      user.role = getUserRole(user.email); // Implement this function based on your logic

      // Persist the role in the database
      await prisma.user.update({
        where: { email: user.email },
        data: { role: user.role },
      });

      if (user.role == "teacher" || user.role == "admin") {
        let teacher = await prisma.teacher.findUnique({
          where: { userId: user.id },
        });

        if (!teacher) {
          teacher = await prisma.teacher.create({ data: { userId: user.id } });
        }
      }
      return;
    },
  },
  pages: {
    signIn: "/auth/login/",
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
