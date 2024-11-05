import type { IPhoto } from "../types";
import { PrismaClient, type Collage, type Photo } from "@prisma/client";
import { NotFoundError } from "./errors";
import type { CollageInfoDTO, CollagePhotosDTO } from "../types/collage/dto";

const db = new PrismaClient();

// For now this will function as the DAL, it would be better to move this to a seperate folder (dal/model etc.). Maybe even to seperate stores for different models
export abstract class StoreService {
  /**
   * Fetches photos and the order they are in
   * @returns {Promise<CollagePhotosDTO>}
   */
  static async fetchCollagePhotos(id: number): Promise<CollagePhotosDTO> {
    const collageData = await db.collage.findFirst({
      where: { id },
      select: {
        photos: true,
        photoOrder: true,
      },
    });

    if (collageData === null) {
      throw new NotFoundError();
    }
    return collageData;
  }

  /**
   * Fetches list of collages from pg
   * @returns {Promise<Collage[]>}
   */
  static async fetchCollageList(): Promise<CollageInfoDTO[]> {
    return db.collage.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }

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
        photoOrder: photos.map((photo) => photo.id),

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

  /**
   * Fetches single collage from pg, throws Not Found Error if none is found
   * @param {number} id id of collage to fetch
   * @returns
   */
  static async getSingleCollage(id: number): Promise<CollageInfoDTO> {
    const collage = await db.collage.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (collage === null) {
      throw new NotFoundError();
    }

    return collage;
  }

  /**
   * Fetches a collage by id, checks if an update is truly necessary (are the properties different) and if so performs the update
   * @param {number} id id of collage to update
   * @param {string} name new name value
   * @param {string} description new description value
   * @returns {Promise<void>}
   */
  static async updateCollage(
    id: number,
    name: string,
    description: string
  ): Promise<void> {
    console.log(`Updating collage with id ${id}`);
    const collage = await StoreService.getSingleCollage(id);

    if (name === collage.name && description === collage.description) {
      console.log("no update necessary");
      return;
    }

    await db.collage.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
  }
}
