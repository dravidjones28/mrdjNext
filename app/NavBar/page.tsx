"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="navbar bg-slate-500 p-5 space-x-3">
      <Link href="/" className="mr-4">
        Next JS
      </Link>
      <Link href="/users">Users</Link>
      {status === "loading" && <div>Loading....!</div>}
      {status === "authenticated" && (
        <>
          <span>{session.user?.name}</span>
          <Link href="api/auth/signout">SignOut</Link>
        </>
      )}
      {status === "unauthenticated" && <Link href="/auth">Login</Link>}
    </div>
  );
};

export default NavBar;
