"use client"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data, status } = useSession();
  console.log("status", status);
  console.log(data);
  return (
    <>
      <h1>Home</h1>
    </>
  )
}
