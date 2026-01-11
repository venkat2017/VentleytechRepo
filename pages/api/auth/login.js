// pages/api/auth/login.js - Backend API Route
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Govind@123",
    database: "ventleytechschema",
    port: 3306
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password, rememberMe } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const connection = await pool.getConnection();

        // Query user from database
        const [users] = await connection.execute(
            'SELECT id, email, password, firstName, lastName FROM users WHERE email = ? and password =?',
            [email,password]
        );

        connection.release();

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = users[0];



        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: rememberMe ? '30d' : '24h' }
        );

        // Set cookie
        res.setHeader('Set-Cookie', `token=${token}; Path=/; ${
            rememberMe ? 'Max-Age=2592000; ' : ''
        }HttpOnly; Secure; SameSite=Strict`);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}