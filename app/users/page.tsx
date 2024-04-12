import React, { Suspense } from "react";
import UserTable from "./UserTable";
import Link from "next/link";

interface Props {
  searchParams: { sortOrder: string };
}

const Users = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <div>
      <h1>Users</h1>
      <Link href="/users/new" className="btn btn-secondary">
        New User
      </Link>
      <UserTable sortOrder={sortOrder} />
    </div>
  );
};

export default Users;
