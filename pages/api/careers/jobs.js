

import mysql from "mysql2/promise";
import fs from 'fs/promises';
import path from 'path';


export default async function handler(req, res) {
    const { method, query } = req;
    const connection = await mysql.createConnection({
            host: "localhost",
            user: "ventleytechschema",
            password: "Govind@123",
            database: "ventley",
            port: 3306
    });
    try {
        switch (method) {
            case 'GET':
                // Get all W2 jobs

                const [jobs] = await connection.execute(`SELECT * FROM w2_jobs WHERE isActive = TRUE ORDER BY createdAt DESC`);

                return res.status(200).json({
                    success: true,
                    jobs,
                    count: jobs.length
                });

            case 'POST':
                // Create new W2 job
                const {
                    title,
                    location,
                    mode,
                    experience,
                    description,
                    requirements,
                    responsibilities,
                    skills,
                    salary,
                    isActive,
                } = req.body;

                const randomNumber= 'job_'+ Math.floor(100000 + Math.random() * 900000);
                const [result] = await connection.execute(
                    `INSERT INTO w2_jobs 
        (id,title, location, mode, experience, description, requirements, responsibilities, skills, salary, isActive) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
                    [
                        randomNumber,
                        title,
                        location,
                        mode,
                        experience,
                        description,
                        requirements,
                        responsibilities,
                        skills,
                        salary,
                        isActive ?? true,
                    ]
                );

                return res.status(201).json({
                    success: true,
                    job: {
                        id: result.insertId,
                        title,
                        location,
                        mode,
                        experience,
                        description,
                        requirements,
                        responsibilities,
                        skills,
                        salary,
                        isActive: isActive ?? true,
                    },
                });

            default:
                res.setHeader('Allow', ['GET', 'POST']);
                return res.status(405).json({
                    success: false,
                    error: `Method ${method} Not Allowed`
                });
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: error.message
        });
    } finally {
        //await prisma.$disconnect();
    }
}