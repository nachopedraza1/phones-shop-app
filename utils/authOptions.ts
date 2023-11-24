import { checkUserEmailPassword } from "@/database/dbUsers";

import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
    interface User {
        id: number
    }
};


export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com' },
                password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' }
            },
            async authorize(credentials) {
                return await checkUserEmailPassword(credentials!.email, credentials!.password);
            },
        }),
    ],

    session: {
        maxAge: 2592000, /// 30d
        strategy: 'jwt',
        updateAge: 86400, // cada día
    },

    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },


    //Callbacks
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;

                switch (account.type) {
                    case 'oauth':
                        /*  token.user = await dbUsers.oAUthToDbUser(user?.email || '', user?.name || ''); */
                        break;

                    case 'credentials':
                        token.user = user;
                        break;
                }

            }
            return token;
        },

        async session({ session, token, user }) {
            session.accessToken = token.accessToken as any;
            session.user = token.user as any;

            return session;
        }
    }
};