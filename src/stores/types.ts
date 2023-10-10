export interface IProduct {
  uuid: string;
  name: string;
  description?: string;
  category: PRODUCT_CATEGORY;
  company_name: string;
  product_size?: string;
  price: number;
  product_image?: string;
}

export interface IOrder {
  uuid: string;
  order_status: ORDER_STATUS;
  order_type: ORDER_TYPE;
  table_no?: number;
  total_amount: number;
  discount_amount: number;
  is_discounted?: boolean;
  remarks?: string;
  items: Array<IOrder_Item>
}

export interface IOrder_Item {
  uuid: string;
  order_uuid: string;
  product_uuid: string;
  quantity: number;
  subtotal_amount:number;
}

export const enum PRODUCT_CATEGORY {
  Chicken_Meals = 1,
  Drinks = 2,
  Meals = 3,
  Pastries = 4,
  Extras = 5
}

export const enum ORDER_STATUS {
  Done = 0,
  Pending = 1,
  Cancelled = 2,
}

export const enum ORDER_TYPE {
  DINE_IN = 0,
  TAKE_OUT = 1

}
