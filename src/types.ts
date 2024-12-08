export interface IUser {
  id: string;
  created_at: string;
  name: string;
  email: string;
  status: string;
  is_verified: boolean;
}
export interface MapPayload {
  row: number;
  column: number;
  tile_size: number;
  layers: number[][];
  solid_tile: number[];
  tile_set: string;
  thumbnail: string;
}

export interface IMap {
  id: string;
  created_at: string;
  name: string;
  row: number;
  column: number;
  tile_size: number;
  thumbnail: {
    id: string;
    created_at: string;
    base_url: string;
    root: string;
    folder: string;
    name: string;
    status: string;
  };
}
export interface IMapDetails {
  id: string;
  created_at: string;
  name: string;
  row: number;
  column: number;
  tile_size: number;
  layers: number[][];
  solid_tile: number[];
  thumbnail: IAsset;
  tile_set: IAsset;
}
export interface IAsset {
  id: string;
  created_at: string;
  base_url: string;
  root: string;
  folder: string;
  name: string;
  status: string;
}

export interface IAvatar {
  id: string;
  tile_size: number;
  image: string;
  users: number;
}

export interface IAvatarPayload {
  image: string;
  tile_size: number;
}
