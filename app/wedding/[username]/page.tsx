"use server";

import { Metadata } from "next";

// Define the type for the props
type PageProps = {
  params: { username: string };
  searchParams: { to?: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `Wedding Page for ${params.username}`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { username } = params;
  const { to } = searchParams;

  // You can use `username` and `to` in your component
  console.log("Username:", username);
  console.log("To parameter:", to);

  return (
    <div>
      <h1>Wedding Page</h1>
      <p>Username: {username}</p>
      {to && <p>To: {to}</p>}
    </div>
  );
}
