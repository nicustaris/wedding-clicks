import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useUploadProgress = (uploadId: string | null) => {
  const [progressMap, setProgressMap] = useState<{ [key: string]: number }>({});
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!uploadId) return;

    const newSocket = io(process.env.NEXT_PUBLIC_WS_URL!);
    setSocket(newSocket);

    newSocket.emit("join-upload", uploadId);

    newSocket.on(
      "upload-progress",
      (data: { fileName: string; progress: number }) => {
        setProgressMap((prev) => ({
          ...prev,
          [data.fileName]: data.progress,
        }));
      }
    );

    return () => {
      newSocket.close();
    };
  }, [uploadId]);

  return progressMap;
};
