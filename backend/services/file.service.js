import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class FileService {
  save(file) {
    try {
      const fileName = uuidv4() + '.jpg';
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const staticDir = path.join(__dirname, '..', 'static');
      const filePath = path.join(staticDir, fileName);

      if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
      }

      file.mv(filePath, (err) => {
        if (err) {
          throw new Error(`Error moving file: ${err.message}`);
        }
      });

      return fileName;
    } catch (error) {
      throw new Error(`Error saving file: ${error.message}`);
    }
  }
}

const fileService = new FileService();
export default fileService;
