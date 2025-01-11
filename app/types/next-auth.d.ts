import { DefaultSession } from 'next-auth';
import { User as PrismaUser } from '@prisma/client';

// Extending NextAuth types to include `role`
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: string;
    } & DefaultSession['user'];
  }

  interface User extends PrismaUser {
    role: string;
  }

  interface JWT {
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string; // Add the role field
  }
}
