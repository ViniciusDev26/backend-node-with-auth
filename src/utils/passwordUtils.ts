import bcrypt from 'bcrypt';

export const encriptPassword = (password: string) => {
    const hash = bcrypt.hash(password, 12);

    return hash;
}

export const verifyPassword = (password: string, hash: string) => {
    const correctPassword = bcrypt.compare(password, hash);

    return correctPassword;
}