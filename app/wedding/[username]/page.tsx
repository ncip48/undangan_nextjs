"use client";

import { useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { username: string } }) {
  const searchParams = useSearchParams();

  const to = searchParams.get("to");
  return (
    <div>
      My Post: {params.username} to {to}
    </div>
  );
}
