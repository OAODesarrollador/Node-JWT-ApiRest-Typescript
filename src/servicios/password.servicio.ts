import bcript from "bcrypt";

const SALT_ROUNDS: number = 10;

export const hashPassword = async (password: string): Promise<string> => {
    return await bcript.hash(password, SALT_ROUNDS);
}

// Leer y comparar contraseñas
export const comparaPasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcript.compare(password, hashedPassword);
}