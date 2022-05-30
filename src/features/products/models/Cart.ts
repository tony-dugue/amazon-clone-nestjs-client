import {ProductDocument} from "./Products";

export interface CartItem extends ProductDocument {
  quantity: number;
}

export type Cart = CartItem[]
