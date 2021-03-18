import { MenuItem } from './menuItem';

export interface Category {
  id?: string,
  endTime?: string;
  menuItems?: MenuItem[];
  menuItemMap?: { [id: string]: MenuItem }
  title: string;
  startTime?: string;
}
