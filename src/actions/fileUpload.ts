"use server";
import mime from "mime-types";
import { Readable } from "stream";
import { google } from "googleapis";

export async function fileUpload(file: File | null) {
  //   const file = files[0]; // Get uploaded file
  //   const filePath = file.filepath;

  if (!file) {
    return { error: true, msg: "No file found", fileUrl: "" };
  }

  try {
    // Convert File to Buffer
    const fileStream = Readable.from(Buffer.from(await file.arrayBuffer()));

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_DRIVE_CREDENTIALS || "{}"),
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });

    const mimeType = file.type || mime.lookup(file.name) || "video/mp4";

    const fileMetadata = {
      name: file.name,
      parents: process.env.GOOGLE_DRIVE_FOLDER_ID
        ? [process.env.GOOGLE_DRIVE_FOLDER_ID]
        : [],
    };

    const media = {
      mimeType,
      body: fileStream,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id",
      uploadType: "resumable", // ✅ Enables large file upload
    });

    const fileId = response.data.id;

    // Ensure fileId is a string before using it
    if (!fileId)
      return {
        error: true,
        msg: "File ID is undefined. Upload may have failed.",
        fileUrl: "",
      };

    // 🔥Make the file public
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // ✅ Generate a public file URL
    const publicFileUrl = `https://drive.google.com/uc?id=${fileId}`;

    //return
    return { error: false, msg: "upload successful", fileUrl: publicFileUrl };

    //
  } catch (err) {
    return { error: true, msg: err, fileUrl: "" };
  }
}
