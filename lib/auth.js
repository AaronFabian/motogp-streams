// 01 in order to accepts logins we need you need to setup google dev console

// 01.5 go to google oAuth and create your credential

// 02 install library; npm install next-auth@beta

// 03
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createUserUsingGoogle, getUserByEmail } from './data-service.ts';

// 04
const authConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
		// if you want to load your own credential you need to use this below
		// CredentialProvider
	],
	callbacks: {
		authorized: function ({ auth, request }) {
			return !!auth?.user;
		},
		signIn: async function ({ user, account, profile }) {
			try {
				const existingGuest = await getUserByEmail(user.email);

				if (!existingGuest) await createUserUsingGoogle(user.email, user.name);

				return true;
			} catch (error) {
				console.error('INTERNAL_ERROR_WHILE_SIGN_IN', error);
				return false;
			}
		},
		session: async function ({ session, user }) {
			// we can not do session in the signIn callback
			const getUser = await getUserByEmail(session.user.email);
			session.user.id = getUser.id;
			session.user.lineUUID = getUser.line_uuid;

			return session;
		},
	},
	pages: {
		signIn: '/login',
		// signOut: '/logout',
	},
};

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(authConfig);
