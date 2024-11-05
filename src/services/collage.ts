import type { Collage, Photo } from "@prisma/client";
import { CatService, type CatQuery } from "./cat";
import { StoreService } from "./store";

export abstract class CollageService {
  /**
   * Updates a collage name and description
   * @param {number} id id of collage to update
   */
  static async updateCollage(id: number, name: string, description: string) {
    await StoreService.updateCollage(id, name, description);
  }

  /**
   * Fetches all collages from the store and returns them
   * @returns {Promise<Collage[]>}
   */
  static async listCollages(): Promise<Collage[]> {
    return StoreService.fetchCollageList();
  }

  /**
   * Fetches cat images based on parameters, creates a collage and stores
   * @param {CatQuery} query Query to use to fetch cat photos
   * @returns {Promise<number>}
   */
  static async createCatCollage(query: CatQuery): Promise<number> {
    const photos = await CatService.fetchCatImages(query);

    const savedPhotos: Photo[] = [];
    for (const photo of photos) {
      const savedPhoto = await StoreService.insertPhoto(photo);

      savedPhotos.push(savedPhoto);
    }

    const timestamp = new Date().getTime();

    const collage = await StoreService.insertCollage(
      {
        name: `${query.breed}-collage-${timestamp}`,
        description: "",
        photoOrder: savedPhotos.map((photo) => photo.id!),
        id: 0,
      },
      savedPhotos
    );

    return collage.id;
  }
}
