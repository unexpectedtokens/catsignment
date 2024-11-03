export interface ICollage {
  id?: number;
  name: string;
  description: string;
  photos: IPhoto[];
}

export interface IPhoto {
  id?: number;
  url: string;
}
