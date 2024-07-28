'use client';

import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { checkUserJWT } from '@/lib/utils.ts';

const initialState = {
	username: 'Aaron Fabian',
	email: 'aaronfabian78@gmail.com',
	pictureUrl: null,
};
const UserContext = createContext(null) as any;

function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	async function checkAuth() {
	// 		try {
	// 			const token = Cookies.get('token');
	// 			if (!token) return setLoading(false);

	// 			console.log('write');
	// 			const decode = await fetch('http://localhost:3000/api/auth/verify-jwt').then(res => res.json());
	// 			console.log('decode: ', decode);
	// 		} catch (error) {
	// 			console.error(error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	}

	// 	checkAuth();
	// }, [user]);

	function handleSetUser(changes: any) {
		setUser({...user, ...changes,}); // prettier-ignore
	}

	return <UserContext.Provider value={{ user, isLoading: loading, handleSetUser }}>{children}</UserContext.Provider>;
}

function useUser(): any {
	const context = useContext(UserContext);
	if (context === undefined) throw new Error('Context was used outside the provider !');

	return context;
}

export { UserProvider, useUser };
