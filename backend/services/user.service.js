import prisma from '../db.js';
import { comparePassword, hashPassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';

const createUser = async ({ name, email, password, role }) => {
    const existingUser = await prisma.User.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.User.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: role || 'user',    // Add the role field here       
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    });

    return user;
};

const loginUser = async ({ email, password }) => {
    const user = await prisma.User.findUnique({ where: { email } });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const tokenPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    };

    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });


    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        },
        accessToken
    };
};

const logoutUser = async (userId) => {
    // Just a placeholder for session cleanup if needed
    await prisma.User.update({
        where: { id: userId },
        data: { refreshToken: null }
    });
};

export { createUser, loginUser, logoutUser };
