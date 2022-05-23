import { IAttributes } from "./attributes";

export interface ITable {
  data: IData[]
}

interface IData {
  attributes: IAttributes;
  id: string;
}
