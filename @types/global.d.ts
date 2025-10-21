export {};

declare global {
  var uploadProgress: {
    [uploadId: string]: {
      currentFileIndex: number;
      totalFiles: number;
      files: {
        fileName: string;
        percent: number;
      }[];
    };
  };

  interface RequestInit {
    duplex?: "half";
  }
}
