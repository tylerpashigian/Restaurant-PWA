import { CartItems } from "./cartItems";
import { MenuItem } from "./menuItem";

export interface Cart {
  cartItems: MenuItem[];
  cartTotal: number;
  orderedItems: MenuItem[];
}

export interface CartObject {
  cartItems: CartItems;
  cartTotal: number;
  orderedItems: CartItems;
}