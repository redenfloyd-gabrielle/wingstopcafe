<template>
  <div class="col-12 col-md-5 col-xxl-4 d-flex order-2 order-xxl-2">
    <div class="card flex-fill">
      <div class="card-header" style="border-bottom: 1px dotted #8e191c !important">
        <!-- <span class="h3" style="color: #8e191c; font-weight: 500">
          <i class="align-center" data-feather="shopping-cart"></i>
          &nbsp;
          <strong>Table No. 4 </strong> Current Order
        </span> -->
        <span class="h3" style="color: #8e191c; font-weight: 500">
          <i class="align-center" data-feather="shopping-cart"></i>
          &nbsp;
          <strong>Take Out </strong> Current Order
        </span>
      </div>
      <div class="card-body p-1 h-100 scrollable-container">
        <div class="card mb-1" v-for="(item, index) in orderStore.currentOrder.items" :key="index">
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-5 col-xxl-5">
                <h5 class="card-title mb-0">{{ productStore.getProductName(item.product_uuid) }}</h5>
                <p class="card-text">₱ {{ productStore.getProductPrice(item.product_uuid) }}.00</p>
              </div>
              <div class="col-12 col-md-4 col-xxl-3 text-end">
                <div class="grid input-group input-group-sm">
                  <span class="input-group-btn me-1">
                    <button type="button" class="btn btn-outline-primary btn-sm" v-on:click="orderStore.deductQuantity(item)">-</button>
                  </span>
                  <input
                    type="number"
                    id="quantity"
                    class="form-control text-center"
                    style="border-color: #8e191c"
                    :value="item.quantity"
                  />
                  <span class="input-group-btn">
                    <button type="button" class="btn btn-outline-primary btn-sm ms-1" v-on:click="orderStore.addQuantity(item)">+</button>
                  </span>
                </div>
              </div>
              <div class="col-12 col-md-3 col-xxl-3 text-end">
                <strong class="card-text">₱ {{ item.subtotal_amount.toLocaleString() }}.00</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="card-footer">Card footer</div> -->
      <div class="card-footer">
        <div class="row py-1">
          <div class="col-12 col-md-5 pt-1">
            <span class="h4" style="font-weight: 500">
              <strong>CASH :</strong>
            </span>
          </div>
          <div class="col-12 col-md-7 text-end">
            <div class="input-group">
              <span class="input-group-text">₱</span>
              <input
                type="number"
                class="form-control text-end"
                aria-label="Amount (to the nearest dollar)"
                v-model="orderStore.cash"
              />
              <!-- <span class="input-group-text">.00</span> -->
            </div>
          </div>
        </div>
        <div class="row py-1">
          <div class="col-12 col-md-12">
            <!-- <div class="container text-center"> -->
            <div class="row gx-1">
              <div class="col">
                <div class="d-grid gap-2 p-1">
                  <button class="btn btn-primary btn-sm" v-on:click="orderStore.addCash(20)">20</button>
                </div>
              </div>
              <div class="col">
                <div class="d-grid gap-2 p-1">
                  <button class="btn btn-primary btn-sm" v-on:click="orderStore.addCash(50)">50</button>
                </div>
              </div>
              <div class="col">
                <div class="d-grid gap-2 p-1">
                  <button class="btn btn-primary btn-sm" v-on:click="orderStore.addCash(100)">100</button>
                </div>
              </div>
              <div class="col">
                <div class="d-grid gap-2 p-1">
                  <button class="btn btn-primary btn-sm" v-on:click="orderStore.addCash(500)">500</button>
                </div>
              </div>
              <div class="col">
                <div class="d-grid gap-2 p-1">
                  <button class="btn btn-primary btn-sm" v-on:click="orderStore.addCash(1000)">1,000</button>
                </div>
              </div>
            </div>
            <!-- </div> -->
            <!-- <p class="card-text">₱ 200.00</p> -->
          </div>
        </div>
        <div class="row py-1">
          <div class="col-12 col-xxl-4 col-md-5 pt-1">
            <span class="h5" style="font-weight: 500">
              <strong>SC/PWD DISCOUNT </strong>
            </span>
          </div>
          <div class="col-12 col-xxl-3 col-md-2 text-end">
            <div class="form-check form-switch h4">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                v-model="orderStore.currentOrder.is_discounted"
                v-on:change="orderStore.applyDiscount"
              />
            </div>
          </div>
          <div class="col-12 col-xxl-1 col-md-1 text-end">
            <span class="h5" style="font-weight: 500">
              <strong> ₱ </strong>
            </span>
            <!-- <p class="card-text">₱ 200.00</p> -->
          </div>
          <div class="col-12 col-xxl-1 col-md-1 text-end">
            <span class="h4" style="font-weight: 500">
              <strong>-</strong>
            </span>
          </div>
          <div class="col-12 col-md-3 text-end">
            <span class="h5" style="font-weight: 500"> {{ orderStore.currentOrder.discount_amount.toFixed(2).toLocaleString() }} </span>
            <!-- <p class="card-text">₱ 200.00</p> -->
          </div>
        </div>
        <div class="row py-1">
          <div class="col-12 col-md-7">
            <span class="h4" style="font-weight: 500">
              <strong>TOTAL AMOUNT DUE :</strong>
            </span>
            <!-- <p class="card-text">₱ 200.00</p> -->
          </div>
          <div class="col-12 col-md-1 text-end">
            <span class="h4" style="font-weight: 500">
              <strong>₱</strong>
            </span>
          </div>
          <div class="col-12 col-md-4 text-end">
            <span class="h4" style="font-weight: 500">
              <strong>{{ orderStore.currentOrder.total_amount.toFixed(2).toLocaleString() }}</strong>
            </span>
          </div>
        </div>
        <div class="row py-1">
          <div class="col-12 col-md-7">
            <span class="h5" style="font-weight: 500">
              <strong>CHANGE :</strong>
            </span>
            <!-- <p class="card-text">₱ 200.00</p> -->
          </div>
          <div class="col-12 col-md-1 text-end">
            <span class="h5" style="font-weight: 500">
              <strong>₱</strong>
            </span>
          </div>
          <div class="col-12 col-md-4 text-end">
            <span class="h5" style="font-weight: 500" :style="numberStyle"> {{ orderStore.change.toFixed(2).toLocaleString() }} </span>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col-12 col-md-12">
            <!-- <div class="container text-center"> -->
            <div class="row gx-2">
              <div class="col">
                <div class="d-grid">
                  <button class="btn btn-danger">
                    <i class="align-center" data-feather="x"></i>
                  </button>
                </div>
              </div>
              <div class="col">
                <div class="d-grid">
                  <button class="btn btn-secondary">
                    <i class="align-center" data-feather="printer"></i>
                  </button>
                </div>
              </div>
              <div class="col">
                <div class="d-grid">
                  <button class="btn btn-info">
                    <i class="align-center" data-feather="save"></i>
                  </button>
                </div>
              </div>
              <div class="col">
                <div class="d-grid">
                  <button
                    class="btn btn-success"
                    data-bs-toggle="tooltip"
                    data-bs-title="Default tooltip"
                  >
                    <i class="align-center" data-feather="check"></i>
                  </button>
                </div>
              </div>
            </div>
            <!-- </div> -->
            <!-- <p class="card-text">₱ 200.00</p> -->
          </div>
        </div>
      </div>
      <!-- <div class="card-footer">Card footer</div> -->
      <!-- <div class="card-footer">Card footer</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">

import { useOrderStore } from "@/stores/order";
import { useProductStore } from "@/stores/product";
import { computed } from "vue";

const productStore = useProductStore();
const orderStore = useOrderStore();


const numberStyle = computed(() => {
  return orderStore.change < 0 ? {color : '#8e191c'} : {color : '#000'};
})

</script>
