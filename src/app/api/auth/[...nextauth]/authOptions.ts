import { AuthOptions, ISODateString, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { LOGIN_URL } from '@/lib/ApiEndpoints'
import axios from 'axios'
import { JWT } from 'next-auth/jwt'

export interface CustomSession {
    user?: CustomUser
    expires: ISODateString
}

export interface CustomUser {
    id?:            number | null
    name?:          string | null
    email?:         string | null
    token?:         string | null
    image?:         string | null
    created_at?:    string | null
    updated_at?:    string | null
}

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }

            return token
        },
        async session({ session, token, user }: {
            session: CustomSession
            token: JWT
            user: User
        }) {
            session.user = token.user as CustomUser
            
            return session
        }
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {

                const res = await axios.post(LOGIN_URL, credentials)
                const response = res.data
                const user = response?.user

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ]
}