import { MenuItem } from './menuItem';

export interface Category {
  id?: string,
  endTime?: string;
  // TODO: Remove this and convert all menu items references to use a map (menuItemsMap)
  menuItems?: MenuItem[];
  menuItemMap?: { [id: string]: MenuItem }
  title: string;
  startTime?: string;
}
