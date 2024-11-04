import type { ICollage } from "../types";

export abstract class StoreService {
  /**
   * Stores a collage in pg and returns the id
   * collage {ICllage} The collage to store
   * @returns {string} the id of the created collage
   */
  static async insertCollage(collage: ICollage): Promise<string> {
    return "";
  }
}
