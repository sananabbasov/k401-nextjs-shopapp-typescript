// next-auth.d.ts

import { Session } from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    token: string;
  }

  interface Session {
    user: User;
  }
}
