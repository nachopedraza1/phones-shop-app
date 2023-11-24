import db from './connection';
import { IUser } from '@/interfaces/User';
import { isValidEmail } from '@/utils/validations';
import { compareSync } from 'bcryptjs'
import { ResultSetHeader } from 'mysql2';
import { searchUserQuery } from '@/utils/querys';

export const checkUserEmailPassword = async (email: string, password: string) => {

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !isValidEmail(trimmedEmail) || trimmedEmail.length < 6 || trimmedEmail.length > 30) {
        return null;
    }

    if (!trimmedPassword || trimmedPassword.length < 3 || trimmedPassword.length > 25) {
        return null;
    }

    try {
        const [[user]] = await db.query<ResultSetHeader & IUser[]>(searchUserQuery, [email]);

        if (!user) return null;

        if (!compareSync(trimmedPassword, user.password)) {
            return null;
        }

        return {
            id: user.id,
            email: email.toLocaleLowerCase(),
            role: user.role,
            name: user.name
        }

    } catch (error) {
        return null
    }
}