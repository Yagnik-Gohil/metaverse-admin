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