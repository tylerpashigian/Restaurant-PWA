import { MenuItem } from './menuItem';

export interface Category {
  id?: string,
  endTime?: string;
  menuItems?: MenuItem[];
  title: string;
  startTime?: string;
}
