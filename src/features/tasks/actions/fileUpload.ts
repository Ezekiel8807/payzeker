"use server";
import mime from "mime-types";
import { Readable } from "stream";

export async function fileUpload(file: File | null) {
  if (!file) return { error: true, msg: "No file found", fileUrl: "" };

  try {
    const { google } = await import("googleapis");
    const fileStream = Readable.from(Buffer.from(await file.arrayBuffer()));

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_DRIVE_CREDENTIALS || "{}"),
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });
    const mimeType = file.type || mime.lookup(file.name) || "video/mp4";

    const fileMetadata = {
      name: file.name,
      parents: process.env.GOOGLE_DRIVE_FOLDER_ID ? [process.env.GOOGLE_DRIVE_FOLDER_ID] : [],
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: { mimeType, body: fileStream },
      fields: "id",
      uploadType: "resumable",
    });

    const fileId = response.data.id;
    if (!fileId) return { error: true, msg: "File ID is undefined. Upload may have failed.", fileUrl: "" };

    await drive.permissions.create({ fileId, requestBody: { role: "reader", type: "anyone" } });

    const publicFileUrl = `https://drive.google.com/uc?id=${fileId}`;
    return { error: false, msg: "upload successful", fileUrl: publicFileUrl };
  } catch (err) {
    return { error: true, msg: err, fileUrl: "" };
  }
}
