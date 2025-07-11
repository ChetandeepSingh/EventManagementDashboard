// for hashing passwords and comparing them
import bcrypt from 'bcryptjs';


const saltRounds = 10;

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
}

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}