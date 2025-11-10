export interface Media {
  id: number;
  sessionId: number;
  imageUrl: string;
  mediaType: string;
}

export interface MediaWithParticipants {
  media: Media[];
  totalParticipants: number;
}
