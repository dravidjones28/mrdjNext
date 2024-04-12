import { sort } from "fast-sort";
import Link from "next/link";
import React from "react";
interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string;
}
const UserTable = async ({ sortOrder }: Props) => {
  const result = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 },
  });
  const users: User[] = await result.json();

  const sortedUsers = sortOrder
    ? sort(users).by([
        { asc: (u) => (sortOrder === "name" ? u.name : u.email) },
      ])
    : users;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>
            <Link href={`/users?sortOrder=name`}>Name</Link>
          </th>
          <th>
            <Link href={`/users?sortOrder=email`}>Email</Link>
          </th>
        </tr>
      </thead>

      <tbody>
        {sortedUsers?.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
