import type { Collage, Photo } from "@prisma/client";
import type { IPhoto } from "../types";
import { StoreService } from "./store";

/** Query object for fetching cat photos through */
export type CatQuery = {
  /** amount of photos to request */
  amount: number;
  /** Type of cat to create a collage of */
  breed: string;
};

/** Response body from the cat api */
type CatAPIPhoto = {
  breeds: string[];
  id: string;
  url: string;
  width: number;
  height: number;
};

export abstract class CatService {
  /**
   * Fetches cat images from the Cat API based on provided query. Fails if none were found
   * @param {CatQuery} query
   * @returns
   */
  static async fetchCatImages(query: CatQuery): Promise<IPhoto[]> {
    console.log(`fetching ${query.amount} photos of ${query.breed} cats`);
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${query.amount}&breed_ids=${query.breed}&api_key=${process.env.CAT_API_KEY}`,
      { method: "GET" }
    );

    const photos = (await response.json()) as CatAPIPhoto[];

    if (!photos.length) {
      throw new Error("No images found, check query");
    }

    console.log(`found ${photos.length} photos`);

    return photos.map<IPhoto>((photo) => ({
      url: photo.url,
    }));
  }
}
