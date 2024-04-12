import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: number;
  };
}

const UserDetailPage = ({ params }: Props) => {
  if (params.id > 10) notFound();

  return <div>User Detail page {params.id}</div>;
};

export default UserDetailPage;
