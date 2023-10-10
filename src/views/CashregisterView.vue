<template>
  <CashregisterComponent />
</template>

<script setup lang="ts">
import CashregisterComponent from '../components/pos/CashregisterComponent.vue'
import feather from 'feather-icons'
import { onMounted } from 'vue';

onMounted(() => {
  console.log('omMounted()',feather);
  feather.replace()
})
</script>
