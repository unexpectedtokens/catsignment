import type { IPhoto } from "../types";
import { PrismaClient, type Collage, type Photo } from "@prisma/client";

const db = new PrismaClient();

// For now this will function as the
export abstract class StoreService {
  /**
   * Stores a collage in pg and returns it with populated id
   * collage {ICollage} The collage to store
   * @returns {string} the id of the created collage
   */
  static async insertCollage(
    collage: Collage,
    photos: Photo[]
  ): Promise<Collage> {
    return db.collage.create({
      data: {
        name: collage.name,
        description: collage.description,
        photoOrder: [],

        photos: {
          connect: photos.map((photo) => ({ id: photo.id })),
        },
      },
    });
  }

  /**
   * Stores a photo in pg and returns the photo with populated id
   * @param {IPhoto} photo the photo to save
   * @returns
   */
  static async insertPhoto(photo: IPhoto): Promise<Photo> {
    return db.photo.create({
      data: {
        url: photo.url,
      },
    });
  }
}
