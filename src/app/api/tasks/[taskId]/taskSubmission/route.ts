import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Important for handling file uploads
  },
};

const uploadFileToDrive = async (filePath: string, fileName: string) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), "config/nextjs-drive-key.json"),
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  const drive = google.drive({ version: "v3", auth });

  const fileMetadata = {
    name: fileName,
    parents: ["YOUR_GOOGLE_DRIVE_FOLDER_ID"], // Change this!
  };

  const media = {
    mimeType: "image/png", // Change based on file type
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id",
  });

  return `https://drive.google.com/uc?id=${response.data.id}`;
};

export async function POST(req: NextRequest) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.parse(req, async (err: any, fields: any, files: { file: any[] }) => {
      if (err)
        return reject(
          NextResponse.json({ error: "Upload failed" }, { status: 500 })
        );

      const file = files.file[0]; // Get uploaded file
      const filePath = file.filepath;

      try {
        const fileUrl = await uploadFileToDrive(
          filePath,
          file.originalFilename
        );
        fs.unlinkSync(filePath); // Delete local temp file

        resolve(NextResponse.json({ fileUrl }));
      } catch (err) {
        reject(
          NextResponse.json(
            { error: `Google Drive upload failed: ${err}` },
            { status: 500 }
          )
        );
      }
    });
  });
}
