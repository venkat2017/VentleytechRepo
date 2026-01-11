// app/api/upload-json/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// Import your database client - adjust based on your setup
// Example for Prisma:
// import { prisma } from '@/lib/prisma';

// Example for PostgreSQL with pg:
// import { Pool } from 'pg';
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file:File = formData.get('file');
        const jsonDataString:string = formData.get('jsonData');
        const fileType:string = formData.get('fileType');

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        if (!fileType || !['common', 'main', 'schema'].includes(fileType)) {
            return NextResponse.json(
                { error: 'Invalid file type. Must be common, main, or schema' },
                { status: 400 }
            );
        }

        // Parse JSON data
        const jsonData = JSON.parse(jsonDataString);

        // Optional: Save file to disk
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadDir = path.join(process.cwd(), 'uploads');
        const filePath = path.join(uploadDir, file.name);
        await writeFile(filePath, buffer);

        // ===== DATABASE INSERTION =====
        // Choose ONE of the following methods based on your database setup:

        // METHOD 1: Using Prisma ORM
        // const result = await prisma.jsonUploads.create({
        //   data: {
        //     fileName: file.name,
        //     fileSize: file.size,
        //     jsonContent: jsonData,
        //     uploadedAt: new Date(),
        //   },
        // });

        // METHOD 2: Using raw PostgreSQL with pg
        // const query = `
        //   INSERT INTO json_uploads (file_name, file_size, json_content, uploaded_at)
        //   VALUES ($1, $2, $3, $4)
        //   RETURNING id
        // `;
        // const result = await pool.query(query, [
        //   file.name,
        //   file.size,
        //   JSON.stringify(jsonData),
        //   new Date(),
        // ]);

       // METHOD 3: Using MySQL with mysql2
        const connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        });
        const [result] = await connection.execute(
          'INSERT INTO json_uploads (file_name, file_size, json_content, uploaded_at) VALUES (?, ?, ?, ?)',
          [file.name, file.size, JSON.stringify(jsonData), new Date()]
        );
        await connection.end();

        // For demonstration, we'll return success
        // Replace this with actual database insertion
        console.log('File uploaded:', file.name);
        console.log('JSON data:', jsonData);

        return NextResponse.json({
            success: true,
            message: 'JSON file uploaded and saved successfully',
            data: {
                fileName: file.name,
                fileSize: file.size,
                recordsCount: Array.isArray(jsonData) ? jsonData.length : 1,
            },
        });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to upload file' },
            { status: 500 }
        );
    }
}

// Optional: GET method to retrieve uploaded JSON files
export async function GET(request: NextRequest) {
    try {
        // Retrieve all uploaded JSON files from database
        // Example with Prisma:
        // const uploads = await prisma.jsonUploads.findMany({
        //   orderBy: { uploadedAt: 'desc' },
        //   take: 10,
        // });

        // Example with PostgreSQL:
        // const result = await pool.query(
        //   'SELECT * FROM json_uploads ORDER BY uploaded_at DESC LIMIT 10'
        // );
        // const uploads = result.rows;

        return NextResponse.json({
            success: true,
            uploads: [], // Replace with actual data
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch uploads' },
            { status: 500 }
        );
    }
}