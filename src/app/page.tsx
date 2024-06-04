import { Button } from "@nextui-org/react";

import * as actions from "@/actions";
import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();
  if (session?.user) {
    return (
      <div>
        <form action={actions.signOut}>
          <Button type="submit">Sign out</Button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign in via Github</Button>
      </form>
    </div>
  );
}
