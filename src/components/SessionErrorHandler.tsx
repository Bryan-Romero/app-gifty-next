import { ErrorEnum } from "@/types";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SessionErrorHandler() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === ErrorEnum.RefreshAccessTokenError) {
      signOut({ redirect: false });
    }
  }, [session?.error]);

  return null;
}
