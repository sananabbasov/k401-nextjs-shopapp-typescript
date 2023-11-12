import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({

    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith", value: "ehmed@compar.edu.az" },
                password: { label: "Password", type: "password", value: "Ehmed@123" }
            },
            async authorize(credentials, req) {
                try {
                    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Ignore self-signed certificate error
                    const res = await fetch("https://localhost:7037/api/v1/User/Login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials?.username,
                            password: credentials?.password,
                        }),
                    });
                    if (res.ok) {
                        const user = await res.json();

                        // Return the user data and the JWT token
                        return user;
                    } else {
                        console.error("Fetch request failed with status:", res.status);

                        // Return null to indicate authentication failure
                        return null;
                    }
                } catch (error) {
                    console.error("An error occurred:", error);

                    // Return null to indicate authentication failure
                    return null;
                }
            },
        })

    ],

    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token = {
              id: user.id,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              token: user.token
            };
          }
          return token;
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
          }
          
      }
      
      
      
})