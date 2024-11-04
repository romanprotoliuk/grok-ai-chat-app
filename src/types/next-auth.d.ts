import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
      verified?: boolean | null;
    };
    accessToken?: string;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}