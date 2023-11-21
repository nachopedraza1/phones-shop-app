export interface IUser {
    id: number,
    name: string,
    email: string,
    password: string,
    role: Roles,
}

type Roles = 'admin' | 'client'