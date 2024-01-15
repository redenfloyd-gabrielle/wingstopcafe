<template>
  <div class="wrapper" v-if="$route.path != '/login'">
    <LeftNavbar />
    <div class="main">
      <TopNavbar />
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>

  <RouterView v-else />
</template>

<script setup lang="ts">
import './assets/js/app'
import LeftNavbar from './components/common/LeftNavbar.vue'
import TopNavbar from './components/common/TopNavbar.vue'
</script>

<style scoped></style>
