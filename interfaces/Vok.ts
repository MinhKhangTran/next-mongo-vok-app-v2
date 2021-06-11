export interface IVok {
  _id: string;
  deutsch: string;
  koreanisch: string;
  updatedAt: string;
  createdAt: string;
  userId: string;
  favorite: boolean;
}

export interface IPaginateVok {
  voks: IVok[];
  vokCount: number;
  resPerPage: number;
}
