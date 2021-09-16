import { MenuItems } from './menuItem';

export type Categories = { [id: string]: Category }

export interface Category {
  id?: string,
  endTime?: string;
  menuItems?: MenuItems;
  title: string;
  startTime?: string;
}
