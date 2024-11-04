// In theory, the types from prisma could be used.
//But the choice has been made to leave them decoupled so that:
//  - It'll be easier in the future to change to different orm/database because there will be only prisma references in the store layer
//  - Types won't be cluttered with prisma specific properties and will therefore be more versatile

export interface ICollage {
  id?: number;
  name: string;
  description: string;

  photoOrder: number[];
  photos: IPhoto[];
}

export interface IPhoto {
  id?: number;
  url: string;
}
