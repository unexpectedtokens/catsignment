import type { IPhoto } from "../types";
import { PrismaClient, type Collage, type Photo } from "@prisma/client";
import { NotFoundError } from "./errors";

const db = new PrismaClient();

// For now this will function as the DAL, it would be better to move this to a seperate folder (dal/model etc.). Maybe even to seperate stores for different models
export abstract class StoreService {
  /**
   * Fetches list of collages from pg
   * @returns {Promise<Collage[]>}
   */
  static async fetchCollageList(): Promise<Collage[]> {
    return db.collage.findMany({
      include: {
        photos: {},
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
  static async getSingleCollage(id: number): Promise<Collage> {
    const collage = await db.collage.findFirst({
      where: {
        id,
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
