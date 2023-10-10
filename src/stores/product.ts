import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import { PRODUCT_CATEGORY, type IProduct } from './types';




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


export const useProductStore = defineStore('product', () => {
  const activeCategory = ref<PRODUCT_CATEGORY | null>(PRODUCT_CATEGORY['Chicken_Meals']);
  const products = ref<Array<IProduct>>([]);
  const filteredProducts  = ref<Array<IProduct>>([]);

  const getProducts = async () => {
    console.log("=== STORE: getProducts ===");

    try {
      const response = await api.get("/v1/products");
      products.value = response.data.data;
      filterProducts(activeCategory.value);
    } catch (error) {
      console.log("Error on fetching products" + JSON.stringify(error));
    }
  };

  const filterProducts =  async (category : PRODUCT_CATEGORY | null) => {
    if(category){
      filteredProducts.value = products.value.filter((product) => {
        return product.category === category;
      });
    } else {
      console.log("NO PRODUCT CATEGORY IS SELECTED!!!");
    }
    
  };

  const setCategory =  async (category : PRODUCT_CATEGORY) => {
    activeCategory.value = category
    
  };

  const getProductName = (uuid: string) => {
    const product = products.value.find((prod) => prod.uuid === uuid);
    if(product){
      return product.name;
    }
  };
  
  const getProductPrice = (uuid: string) => {
    const product = products.value.find((prod) => prod.uuid === uuid);
    if(product){
      return product.price;
    }
  };

  return {
    //state
    products,
    filteredProducts,
    activeCategory,
    
    //computed

    //methods
    getProducts,
    filterProducts,
    setCategory,
    getProductName,
    getProductPrice


  }
})
