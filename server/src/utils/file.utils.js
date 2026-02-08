import fs from 'fs';
import path from 'path';

export const deleteFile = (fileUrl) => {
  const fileName = fileUrl?.split('/uploads/')[1];
  if (!fileName) return;

  const filePath = path.join(process.cwd(), 'uploads', fileName);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};
