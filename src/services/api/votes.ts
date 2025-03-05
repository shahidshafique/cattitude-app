import { VoteOnImageResponse, GetVoteImageResponse } from "@/src/types";
import { api } from "@/src/utils";

export const voteOnImage = async (imageId: string, value: 1 | 0): Promise<VoteOnImageResponse> => {
  try {
    const response = await api.post("/votes", {
      image_id: imageId,
      value: value, // 1 for up, 0 for down
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVotesForImage = async (): Promise<GetVoteImageResponse[]> => {
  try {
    const response = await api.get(`/votes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
