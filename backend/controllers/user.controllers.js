// for Handling HTTP request

import { validateEmail,validatePassword } from '../utils/validators.js'
import { createUser, loginUser, logoutUser } from "../services/user.service.js";
import prisma from '../db.js';


export const registerHandler = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;

        if (!name || !validateEmail(email) || !validatePassword(password)) {
            return res.status(400).json({ error: "Invalid name, email or password" });
        }

        const { user, accessToken } = await createUser({ name, email, password, role });
        res.status(201).json({ message: 'User created successfully', user, accessToken });

    } catch (error) {
        console.log("Error in user registration:", error);
        if (error.message === "Email already registered") {
            return res.status(409).json({ error: error.message });
        } else {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}


export const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { user, accessToken } = await loginUser({ email, password });
        res.json({ message: 'Login successful', user, accessToken });
    } catch (error) {
        console.log("Error in user login:", error);
        if (error.message === "Invalid email or password") {
            return res.status(401).json({ error: error.message });
        } else {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export const logoutHandler = async (req, res) => {
    try {
        const userId = req.user.id; 
        await logoutUser(userId);
        res.json({ message: "Logout successful" });
    } catch (error) {
        console.log("Error in user logout:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}