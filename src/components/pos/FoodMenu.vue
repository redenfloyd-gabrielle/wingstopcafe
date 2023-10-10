<template>
  <div class="col-12 col-md-7 col-xxl-8 d-flex order-1 order-xxl-1">
    <div class="card flex-fill scrollable-container">
      <div class="card-header px-4 py-2">
        <span class="h2 d-flex justify-content-center" style="color: #8e191c; font-weight: 500">
          <!-- <i class="align-center feather-24" data-feather="list"></i> -->
          &nbsp;
          <strong>WINGS TOP CAFE MENU </strong>
        </span>

        <!-- <p class="card-text">Categories</p> -->

        <div class="container px-4 text-center">
          <div class="row gx-2">
            <div class="col">
              <div class="d-grid gap-2 p-1">
                <button class="btn btn-outline-primary" :class="{'active' : productStore.activeCategory == 1}" v-on:click="getProductsByCategory(1)">Chicken Meals</button>
              </div>
            </div>
            <div class="col">
              <div class="d-grid gap-2 p-1">
                <button class="btn btn-outline-primary" :class="{'active' : productStore.activeCategory == 2}" v-on:click="getProductsByCategory(2)">Drinks</button>
              </div>
            </div>
            <div class="col">
              <div class="d-grid gap-2 p-1">
                <button class="btn btn-outline-primary" :class="{'active' : productStore.activeCategory == 3}" v-on:click="getProductsByCategory(3)">Meals</button>
              </div>
            </div>
            <div class="col">
              <div class="d-grid gap-2 p-1">
                <button class="btn btn-outline-primary" :class="{'active' : productStore.activeCategory == 4}" v-on:click="getProductsByCategory(4)">Pasteries</button>
              </div>
            </div>
            <div class="col">
              <div class="d-grid gap-2 p-1">
                <button class="btn btn-outline-primary" :class="{'active' : productStore.activeCategory == 5}" v-on:click="getProductsByCategory(5)">Extras</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="dropdown-divider"></div> -->
      <div class="card-body px-4 py-2">
        <div class="row">
          <div class="col-12 col-md-4 col-xxl-3" v-for="(product, index) in productStore.filteredProducts" :key="index">
            <div class="card">
              <!-- <img
                    class="card-img-top"
                    src="/src/assets/img/photos/porksilog.jpg"
                    alt="Unsplash"
                  /> -->
              <div class="card-header">
                <div class="row">
                  <div class="col-12 col-md-12 col-xxl-12">
                    <h5 class="card-title mb-0">{{product.name}}</h5>
                    <p class="card-text">₱ {{ product.price }}</p>
                    <div class="d-grid">
                      <button class="btn btn-primary btn-sm" v-on:click="addToCart(product)">
                        <i class="align-middle" data-feather="plus-circle"></i>
                        &nbsp;
                        <span class="align-middle" >Add to cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore } from "@/stores/product";
import { useOrderStore } from "@/stores/order";
import { PRODUCT_CATEGORY, type IProduct, type IOrder_Item } from '@/stores/types';

const productStore = useProductStore();
const orderStore = useOrderStore();


onMounted(async () => {
  console.log('omMounted()');
  await productStore.getProducts();
  console.log('products:::', productStore.products);
  console.log('filteredProducts:::', productStore.filteredProducts);
})

const getProductsByCategory = async (param : PRODUCT_CATEGORY) => {
  if(param){
    productStore.setCategory(param);
    await productStore.filterProducts(productStore.activeCategory);
    console.log(productStore.activeCategory,'filteredProducts:::', productStore.filteredProducts);
  }
}

const addToCart = async (product : IProduct) => {
  const item = {} as IOrder_Item;
  item.order_uuid = 'parked'
  item.product_uuid = product.uuid
  item.quantity = 1;
  item.subtotal_amount = product.price * item.quantity

  orderStore.addOrderItems(item);
  
}


</script>
