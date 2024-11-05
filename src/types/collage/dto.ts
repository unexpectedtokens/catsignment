import type { IPhoto } from "..";

/** DTO For creating a Collage */
export type CollageCreateDTO = {
  /** amount of photos to request */
  amount: number;
  /** Type of cat to create a collage of */
  breed: string;
};

/** DTO for creating a new collage */
export type CollageInsertDTO = {
  /** Name of the collage */
  name: string;
};

/** DTO for transporting basic info */
export type CollageInfoDTO = {
  /** ID of the collage */
  id: number;
  /** Description of the collage */
  description: string;
} & CollageInsertDTO;

/** DTO for transporting photos belonging to a collage */
export type CollagePhotosDTO = {
  /** List of photos */
  photos: IPhoto[];
  /** List of ids, so clients can determine photo order */
  photoOrder: number[];
};
