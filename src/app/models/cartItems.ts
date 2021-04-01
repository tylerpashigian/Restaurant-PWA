import { MenuItem } from "./menuItem";

export type CartItems = { [key:string] : { items: MenuItem[], userAdded: string, quantity: number } };