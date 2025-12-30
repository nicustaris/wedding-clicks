export const generateRandomFileName = (extension: string) => {
  const random = Math.random().toString(36).substring(2);
  return `${random}.${extension}`;
};
