import { createReadStream, ReadStream } from 'fs';

export const fileToBuffer = (filename: string) => {
  const readStream = createReadStream(filename);
  const chuncks = [];

  return new Promise<{ buffer: Buffer; stream: ReadStream }>(
    (resolve, reject) => {
      readStream.on('data', (chuck) => chuncks.push(chuck));

      readStream.on('error', (err) => reject(err));

      readStream.on('close', () => {
        resolve({
          buffer: Buffer.concat(chuncks) as Buffer,
          stream: readStream,
        });
      });
    },
  );
};
