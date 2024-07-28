import { checkUserJWT } from '@/lib/utils.ts';
import LoginForm from '../_components/LoginForm.tsx';
import { useUser } from '../_providers/UserContext.tsx';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function page() {
	return <LoginForm />;
}
