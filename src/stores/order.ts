import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import { type IOrder_Item, type IOrder } from './types';
import { useProductStore } from "@/stores/product";




let apiURL = import.meta.env.VITE_API_URL;

const currentBaseUrl: string = `${window.location.protocol}//${window.location.host}`;
if(import.meta.env.VITE_DOMAIN != currentBaseUrl){
  apiURL = currentBaseUrl + '/api';
} 
console.log("apiURL...", apiURL);



const api = axios.create({
  baseURL: apiURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});



console.log(currentBaseUrl);


export const useOrderStore = defineStore('order', () => {
  const productStore = useProductStore();
  const orders = ref<Array<IOrder>>([]);
  const cash = ref<number>(0);
  const change = ref<number>(0);
  const orderItems = ref<Array<IOrder_Item>>([]);
  const currentOrder = ref({ is_discounted:false, items : [], total_amount : 0, discount_amount: 0} as IOrder);
  // currentOrder.value.items = [] as IOrder_Item;


  const addOrderItems = async (payload : IOrder_Item) => {
    const idx = orderItems.value.findIndex((oi) => oi.product_uuid === payload.product_uuid);
    currentOrder.value.total_amount  = 0;
    if(idx === -1){
      orderItems.value.push(payload);
      currentOrder.value.items.push(payload);
    } else {
      orderItems.value[idx].quantity++;
      orderItems.value[idx].subtotal_amount = orderItems.value[idx].quantity * productStore.getProductPrice(payload.product_uuid)
    }

    orderItems.value.forEach(element => {
      currentOrder.value.total_amount += element.subtotal_amount
      
    });
    if(currentOrder.value.is_discounted){
      currentOrder.value.discount_amount = currentOrder.value.total_amount * .20;
      currentOrder.value.total_amount -= currentOrder.value.discount_amount  
    }

    if(cash.value > 0){
      change.value = cash.value - currentOrder.value.total_amount
    }
    console.log('orderItems::',orderItems);
    console.log('currentOrder::',currentOrder);
  }

  const addQuantity = async (payload : IOrder_Item) => {
    const idx = orderItems.value.findIndex((oi) => oi.product_uuid === payload.product_uuid);
    currentOrder.value.total_amount  = 0;
    if(idx !== -1){
      orderItems.value[idx].quantity++;
      orderItems.value[idx].subtotal_amount = orderItems.value[idx].quantity * productStore.getProductPrice(payload.product_uuid)
      orderItems.value.forEach(element => {
        currentOrder.value.total_amount += element.subtotal_amount
        
      });
      if(currentOrder.value.is_discounted){
        currentOrder.value.discount_amount = currentOrder.value.total_amount * .20;
        currentOrder.value.total_amount -= currentOrder.value.discount_amount  
      }

      if(cash.value > 0){
        change.value = cash.value - currentOrder.value.total_amount
      }
      
    }
    console.log('orderItems::',orderItems);
    console.log('currentOrder::',currentOrder);
  }

  const deductQuantity = async (payload : IOrder_Item) => {
    let idx = orderItems.value.findIndex((oi) => oi.product_uuid === payload.product_uuid);
    currentOrder.value.total_amount  = 0;
    if(idx !== -1){
      if(orderItems.value[idx].quantity === 1){
        orderItems.value.splice(idx, 1)[0];
        idx = currentOrder.value.items.findIndex((oi) => oi.product_uuid === payload.product_uuid);
        currentOrder.value.items.splice(idx, 1)[0];
      } else {
        orderItems.value[idx].quantity--;
        orderItems.value[idx].subtotal_amount = orderItems.value[idx].quantity * productStore.getProductPrice(payload.product_uuid)

      }
      
      orderItems.value.forEach(element => {
        currentOrder.value.total_amount += element.subtotal_amount
        
      });
      if(currentOrder.value.is_discounted){
        currentOrder.value.discount_amount = currentOrder.value.total_amount * .20;
        currentOrder.value.total_amount -= currentOrder.value.discount_amount  
      }

      if(cash.value > 0){
        change.value = cash.value - currentOrder.value.total_amount
      }
      
    }
    console.log('orderItems::',orderItems);
    console.log('currentOrder::',currentOrder);
  }

  const applyDiscount = async () => {
    
    if(currentOrder.value.is_discounted){
      console.log('currentOrder::',currentOrder.value.is_discounted);
      currentOrder.value.discount_amount = currentOrder.value.total_amount * .20;
      currentOrder.value.total_amount -= currentOrder.value.discount_amount  
    } else {
      currentOrder.value.total_amount = currentOrder.value.discount_amount = 0

      orderItems.value.forEach(element => {
        currentOrder.value.total_amount += element.subtotal_amount
      });
    }
  }


  const addCash = async (amount : number) => {
    cash.value += amount;
    change.value = cash.value - currentOrder.value.total_amount
  }

  const calculateCash = async () => {
    cash.value += 0;
    change.value = cash.value - currentOrder.value.total_amount
  }

  



  return {
    //state
    orders,
    orderItems,
    currentOrder,
    cash,
    change,
    
    //computed

    //methods
    addOrderItems,
    addQuantity,
    deductQuantity,
    applyDiscount,
    addCash,
    calculateCash
 


  }
})
