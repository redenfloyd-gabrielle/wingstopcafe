<template>
  <div class="container-fluid p-0">
    <div class="row">
      <CartSidebar />
      <FoodMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from 'vue'
import FoodMenu from './FoodMenu.vue'
import CartSidebar from './CartSidebar.vue'
// Apply or reset overflow when component is mounted or unmounted
onBeforeMount(() => {
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  document.body.style.overflow = 'scroll'
})
</script>
