import type { IPhoto } from "../types";

export abstract class CatService {
  static async fetchCats(amount: number, breed: string): Promise<IPhoto[]> {
    return [];
  }
}
