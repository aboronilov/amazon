import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

const user_credential = []

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            //  check
            const user_token = token.token.account 
            return user_token;
        },
        async session({ session, token, user }) {
            user_credential = {
                "provider": token.token.account.provider,
            }
            if (token.token.account.access_token) {
                user_credential["auth_token"] = token.token.account.access_token
            }
            if (token.token.account.id_token) {
                user_credential["auth_token"] = token.token.account.id_token
            }
            return user_credential
        }
    },
});