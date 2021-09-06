export type MenuItems = { [id: string]: MenuItem }

export interface MenuItem {
  id?: string
  description?: string;
  title: string;
  price: string;
  imageUrl?: string;
  ingredients?: [string];
  userAdded?: string;
  userEmail?: string;
  uuid?: string;
}
