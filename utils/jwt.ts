import jwt from 'jsonwebtoken';


export const signToken = (id: number, email: string) => {

    if (!process.env.JWT_SECRET) {
        throw new Error('No hay variable de entorno para token.')
    }

    return jwt.sign(
        { id, email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
}

export const isValidToken = (token: string): Promise<string> => {
    if (!process.env.JWT_SECRET) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    return new Promise((resolve, reject) => {

        try {
            jwt.verify(token, process.env.JWT_SECRET || '', (err, payload) => {
                if (err) return reject('JWT no es válido');

                const { email } = payload as { email: string };

                resolve(email);

            })
        } catch (error) {
            reject('JWT no es válido');
        }


    })

}