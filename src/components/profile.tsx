"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();

  if (session?.data?.user) {
    return <div>client signed in</div>;
  }
  return <div>client signed out</div>;
}
