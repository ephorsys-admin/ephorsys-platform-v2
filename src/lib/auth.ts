import NextAuth, { type NextAuthOptions, type Session, type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";

/* ─────────────────────────────────────────────────────────────
   Hard-coded admin credentials — no seed script / DB user needed.

   To change the password:
     1. Run:  node scripts/gen-hash.cjs
     2. Replace ADMIN_PASSWORD_HASH below with the output hash.
     3. Restart the dev / production server.
───────────────────────────────────────────────────────────────*/
const ADMIN_EMAIL = "admin@ephorsys.com";
const ADMIN_PASSWORD_HASH =
  "$2b$12$r3Ssl7YelpOJ7HmY49Ykce3O/bPxM4FNQj/J4OeDdFawuaz4QxxR6";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Check email (case-insensitive)
        if (credentials.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase())
          return null;

        // Verify password against the pre-hashed value — no DB lookup needed
        const isValid = await bcrypt.compare(
          credentials.password as string,
          ADMIN_PASSWORD_HASH
        );
        if (!isValid) return null;

        return { id: "admin", email: ADMIN_EMAIL, role: "admin" };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler };

// Helper to get server-side session in API routes
export { getServerSession } from "next-auth/next";
