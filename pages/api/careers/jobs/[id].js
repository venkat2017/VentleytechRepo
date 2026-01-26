// pages/api/careers/jobs/[id].js

import mysql from "mysql2/promise";

export default async function handler(req, res) {
    const { method, query, body } = req;
    const { id } = query;

    // Create MySQL connection
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "ventley",
        password: "Govind@123",
        database: "ventleytechschema",
        port: 3306,
    });

    try {
        switch (method) {
            /**
             * --------------------------------------------------------
             * GET /api/careers/jobs/[id]
             * --------------------------------------------------------
             * Fetch single job with application count
             */
            case "GET": {
                // Fetch job details
                const [jobRows] = await connection.execute(
                    "SELECT * FROM w2_jobs WHERE id = ?",
                    [id]
                );

                if (jobRows.length === 0) {
                    return res
                        .status(404)
                        .json({ success: false, error: "Job not found" });
                }

                const job = jobRows[0];

                // Count number of applications
                const [countRows] = await connection.execute(
                    "SELECT COUNT(*) AS applicationsCount FROM applications WHERE jobId = ?",
                    [id]
                );

                job._count = { applications: countRows[0].applicationsCount };

                return res.status(200).json({ success: true, job });
            }

            /**
             * --------------------------------------------------------
             * PATCH /api/careers/jobs/[id]
             * --------------------------------------------------------
             * Update job details
             */
            case "PATCH": {
                const fields = Object.keys(body);
                if (fields.length === 0) {
                    return res
                        .status(400)
                        .json({ success: false, error: "No data to update" });
                }

                // Build dynamic SQL
                const setClause = fields.map((f) => `${f} = ?`).join(", ");
                const values = [...fields.map((f) => body[f]), id];

                await connection.execute(
                    `UPDATE w2_jobs SET ${setClause} WHERE id = ?`,
                    values
                );

                // Return updated record
                const [updatedJobRows] = await connection.execute(
                    "SELECT * FROM w2_jobs WHERE id = ?",
                    [id]
                );

                return res.status(200).json({
                    success: true,
                    job: updatedJobRows[0],
                });
            }

            /**
             * --------------------------------------------------------
             * DELETE /api/careers/jobs/[id]
             * --------------------------------------------------------
             * Delete job (only if no applications exist)
             */
            case "DELETE": {
                const [countRows] = await connection.execute(
                    "SELECT COUNT(*) AS count FROM applications WHERE jobId = ?",
                    [id]
                );
                const applicationsCount = countRows[0].count;

                if (applicationsCount > 0) {
                    return res.status(400).json({
                        success: false,
                        error: `Cannot delete job with ${applicationsCount} existing applications. Please archive it instead.`,
                        applicationsCount,
                    });
                }

                await connection.execute("DELETE FROM w2_jobs WHERE id = ?", [id]);

                return res.status(200).json({
                    success: true,
                    message: "Job deleted successfully",
                });
            }

            default:
                res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
                return res.status(405).json({
                    success: false,
                    error: `Method ${method} Not Allowed`,
                });
        }
    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
            message: error.message,
        });
    } finally {
        if (connection) await connection.end();
    }
}
