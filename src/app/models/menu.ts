import { Category } from "./category";

export interface Menu {
  categories: { [id: string]: Category }
  id: string;
  restaurantName: string;
}