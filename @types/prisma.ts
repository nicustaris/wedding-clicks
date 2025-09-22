import { Media, SessionRecord } from "@prisma/client";

export type SessionWithMedia = SessionRecord & { media: Media[] };
