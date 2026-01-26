// pages/api/careers/applications.js

import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';
import mysql from "mysql2/promise";




export default async function handler(req, res) {


    const { method, query, body } = req;
    const { id } = query;

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "ventley",
        password: "Govind@123",
        database: "ventleytechschema",
        port: 3306
    });
    try {
        switch (method) {


            // ✅ PATCH (update application status)
            case 'PATCH': {
                const { notes, status } = req.body;

                if (!id || !status) {
                    return res.status(400).json({
                        success: false,
                        error: "Both 'id' and 'status' are required",
                    });
                }

                const [result] = await connection.execute(
                    `UPDATE applications SET status = ? WHERE id = ?`,
                    [status, id]
                );

                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        success: false,
                        error: "Application not found",
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: "Application status updated successfully",
                    id,
                    status,
                });
            }

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