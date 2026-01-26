// pages/api/careers/c2c-jobs.js
import mysql from "mysql2/promise";
import fs from 'fs/promises';
import path from 'path';


export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    const { method, query } = req;

    try {
        switch (method) {
            case 'GET':
                // Get all C2C jobs
                const connection = await mysql.createConnection({
                    host: "localhost",
                    user: "ventley",
                    password: "Govind@123",
                    database: "ventleytechschema",
                    port: 3306
                });

                const [jobs] = await connection.execute(`SELECT id, title, location, experience, skills, industry, jdPath, description, isActive, createdAt, updatedAt  FROM c2c_jobs WHERE isActive = TRUE ORDER BY createdAt DESC`);

                return res.status(200).json({
                    success: true,
                    jobs,
                    count: jobs.length
                });

            case 'POST':
                // Create new C2C job with file upload
                const form = formidable({
                    uploadDir: path.join(process.cwd(), 'public', 'job-descriptions'),
                    keepExtensions: true,
                    maxFileSize: 5 * 1024 * 1024, // 5MB
                });

                // Ensure directory exists
                await fs.mkdir(path.join(process.cwd(), 'public', 'job-descriptions'), { recursive: true });

                const [fields, files] = await new Promise((resolve, reject) => {
                    form.parse(req, (err, fields, files) => {
                        if (err) reject(err);
                        resolve([fields, files]);
                    });
                });

                let jdPath = null;
                if (files.jdFile) {
                    const file = Array.isArray(files.jdFile) ? files.jdFile[0] : files.jdFile;
                    const timestamp = Date.now();
                    const filename = `${timestamp}-${file.originalFilename}`;
                    const newPath = path.join(process.cwd(), 'public', 'job-descriptions', filename);

                    await fs.rename(file.filepath, newPath);
                    jdPath = `/job-descriptions/${filename}`;
                }

                const jobData = {
                    title: Array.isArray(fields.title) ? fields.title[0] : fields.title,
                    location: Array.isArray(fields.location) ? fields.location[0] : fields.location,
                    experience: Array.isArray(fields.experience) ? fields.experience[0] : fields.experience,
                    skills: Array.isArray(fields.skills) ? fields.skills[0] : fields.skills,
                    industry: Array.isArray(fields.industry) ? fields.industry[0] : fields.industry,
                    description: Array.isArray(fields.description) ? fields.description[0] : fields.description || '',
                    jdPath: jdPath
                };

                const job = await prisma.c2CJob.create({
                    data: jobData
                });

                return res.status(201).json({
                    success: true,
                    job
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