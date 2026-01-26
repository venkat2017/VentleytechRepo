// pages/api/careers/applications.js

import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';
import mysql from "mysql2/promise";



export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    const { method, query } = req;
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "ventley",
        password: "Govind@123",
        database: "ventleytechschema",
        port: 3306
    });
    try {
        switch (method) {
            case 'GET': {
                // Apply optional filters
                let sql = `SELECT a.*, j.title, j.location, j.mode
                            FROM applications a
                            LEFT JOIN w2_jobs j ON a.jobId = j.id
                            WHERE 1=1`;
                const params = [];

                if (query.jobId) {
                    sql += ' AND a.jobId = ?';
                    params.push(query.jobId);
                }
                if (query.status) {
                    sql += ' AND a.status = ?';
                    params.push(query.status);
                }

                sql += ' ORDER BY a.createdAt DESC';

                const [applications] = await connection.execute(sql, params);

                await connection.end();

                return res.status(200).json({
                    success: true,
                    applications,
                    count: applications.length,
                });
            }

            case 'POST':
                // Submit application with file upload
                const form = formidable({
                    uploadDir: path.join(process.cwd(), 'public', 'resumes'),
                    keepExtensions: true,
                    maxFileSize: 5 * 1024 * 1024, // 5MB
                });

                // Ensure directory exists
                await fs.mkdir(path.join(process.cwd(), 'public', 'resumes'), { recursive: true });

                const [fields, files] = await new Promise((resolve, reject) => {
                    form.parse(req, (err, fields, files) => {
                        if (err) reject(err);
                        resolve([fields, files]);
                    });
                });

                let resumePath = null;
                if (files.resume) {
                    const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;
                    const timestamp = Date.now();
                    const filename = `${timestamp}-${file.originalFilename}`;
                    const newPath = path.join(process.cwd(), 'public', 'resumes', filename);

                    await fs.rename(file.filepath, newPath);
                    resumePath = `/resumes/${filename}`;
                }

                const getFieldValue = (field) => {
                    return Array.isArray(field) ? field[0] : field;
                };

                const applicationData = {
                    id:'App-'+getFieldValue(fields.jobId),
                    jobId: getFieldValue(fields.jobId),
                    jobTitle: getFieldValue(fields.jobTitle),
                    fullName: getFieldValue(fields.fullName),
                    contactNumber: getFieldValue(fields.contactNumber),
                    email: getFieldValue(fields.email),
                    location: getFieldValue(fields.location),
                    visaStatus: getFieldValue(fields.visaStatus),
                    totalExperience: getFieldValue(fields.totalExperience),
                    relevantExperience: getFieldValue(fields.relevantExperience),
                    skills: getFieldValue(fields.skills),
                    certifications: getFieldValue(fields.certifications) || '',
                    education: getFieldValue(fields.education),
                    linkedinProfile: getFieldValue(fields.linkedinProfile) || '',
                    joiningAvailability: getFieldValue(fields.joiningAvailability),
                    day1Onsite: getFieldValue(fields.day1Onsite),
                    interviewAvailability: getFieldValue(fields.interviewAvailability),
                    resumePath: resumePath
                };

                const sql = `INSERT INTO applications (id,jobId, jobTitle, fullName, contactNumber, email, location, visaStatus, totalExperience,
                          relevantExperience, skills, certifications, education, linkedinProfile, joiningAvailability, day1Onsite, interviewAvailability, resumePath)
                            VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


                const values = Object.values(applicationData);

                await connection.execute(sql, values);
                await connection.end();

                return res.status(201).json({
                    success: true,
                    application: applicationData,
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
        await connection.end();
    }
}