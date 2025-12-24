export const generateVideoPoster = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    video.src = URL.createObjectURL(file);
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.load;

    video.onloadeddata = () => {
      video.currentTime = 0.1;
    };

    video.onseeked = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx?.drawImage(video, 0, 0);
      resolve(canvas.toDataURL("image/jpeg"));
    };
  });
};
