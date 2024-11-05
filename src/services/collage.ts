import type { Photo } from "@prisma/client";
import { CatService } from "./cat";
import { StoreService } from "./store";
import type {
  CollageCreateDTO,
  CollageInfoDTO,
  CollagePhotosDTO,
} from "../types/collage/dto";

export abstract class CollageService {
  /**
   * Updates a collage name and description
   * @param {number} id id of collage to update
   */
  static async updateCollage(id: number, name: string, description: string) {
    await StoreService.updateCollage(id, name, description);
  }

  /**
   * Fetches a single collage from the store
   * @param {number} id id to query for
   * @returns {Promise<Collage>}
   */
  static async getCollage(id: number): Promise<CollageInfoDTO> {
    return StoreService.getSingleCollage(id);
  }

  /**
   * Fetches all photos in a collage and the order they should be in
   * @param {number} id id of the collage
   * @returns {Promise<CollagePhotosDTO>}
   */
  static async getCollagePhotos(id: number): Promise<CollagePhotosDTO> {
    return StoreService.fetchCollagePhotos(id);
  }

  /**
   * Fetches all collages from the store and returns them
   * @returns {Promise<Collage[]>}
   */
  static async listCollages(): Promise<CollageInfoDTO[]> {
    return StoreService.fetchCollageList();
  }

  /**
   * Fetches cat images based on parameters, creates a collage and stores
   * @param {CatQuery} query Query to use to fetch cat photos
   * @returns {Promise<number>}
   */
  static async createCatCollage(query: CollageCreateDTO): Promise<number> {
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
