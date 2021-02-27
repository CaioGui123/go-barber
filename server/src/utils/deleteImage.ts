import fs from 'fs';
import path from 'path';

export default function deleteImage(imageName: string) {
  const pathToImage = path.resolve(__dirname, '..', '..', 'uploads', imageName);

  fs.unlink(pathToImage, (error) => (error ? console.log(error) : null));
}
