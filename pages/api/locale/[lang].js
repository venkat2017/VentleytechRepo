import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {

    console.log("req.query:", req.query);
    console.log("req:", req);
   const { lang } = req.query;

  const db = await mysql.createConnection({
        host: "localhost",
        user: "ventleytechschema",
        password: "Govind@123",
        database: "ventley",
        port: 3306
  });

  const [rows] = await db.query("SELECT file_name,json_file FROM localization WHERE locale = ?", [lang]);
  await db.end();

  if (rows.length > 0) {
    // Ensure directory exists
        const dirPath = path.join(process.cwd(), "public", "locales", lang);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }

        // Write each file dynamically
        for (const row of rows) {
          const filePath = path.join(dirPath, `${row.file_name}.json`);
          fs.writeFileSync(filePath, row.json_file, "utf8");
        }

        res.status(200).json({
          message: `✅ Locale '${lang}' files written successfully`,
          files: rows.map(r => `${r.file_name}.json`),
        });
  } else {
    res.status(200).json({ message: `Language received: ${lang}` });
  }
}
