import type { Collage, Photo } from "@prisma/client";
import type { IPhoto } from "../types";
import { StoreService } from "./store";

/** Query object for fetching cat photos through */
type CatQuery = {
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
  private static async fetchCatImages(query: CatQuery): Promise<IPhoto[]> {
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

  /**
   * Fetches cat images based on parameters, creates a collage and stores
   * @param {CatQuery} query Query to use to fetch cat photos
   * @returns
   */
  static async createCatCollage(query: CatQuery): Promise<number> {
    const photos = await CatService.fetchCatImages(query);

    const savedPhotos: Photo[] = [];
    for (const photo of photos) {
      const savedPhoto = await StoreService.insertPhoto(photo);

      savedPhotos.push(savedPhoto);
    }

    const timestamp = new Date().getTime();
    const newCollage: Collage = {
      name: `${query.breed}-collage-${timestamp}`,
      description: "",
      photoOrder: savedPhotos.map((photo) => photo.id!),
      id: 0,
    };

    const collage = await StoreService.insertCollage(newCollage, savedPhotos);
    return collage.id;
  }
}
