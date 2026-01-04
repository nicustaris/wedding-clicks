import { UTApi, UTFile } from "uploadthing/server";

export interface VariantUrls {
  optimized: string;
  thumbnail: string;
  [key: string]: string;
}

export async function uploadVariants(
  utapi: UTApi,
  key: string,
  variants: { name: keyof VariantUrls; buffer: Buffer }[]
): Promise<VariantUrls> {
  const utFiles = variants.map(
    (v) =>
      new UTFile([new Uint8Array(v.buffer)], `${v.name}-${key}.jpg`, {
        type: "image/jpeg",
      })
  );

  const uploaded = await utapi.uploadFiles(utFiles);

  const urls = {} as VariantUrls;
  uploaded.forEach((u, i) => {
    const name = variants[i].name;
    if (u.data?.ufsUrl) {
      urls[name] = u.data.ufsUrl;
    }
  });
  return urls;
}
