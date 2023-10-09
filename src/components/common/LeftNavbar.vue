<template>
  <nav
    id="sidebar"
    class="sidebar js-sidebar"
    :class="{ collapsed: $route.path == '/cashregister' }"
  >
    <div class="sidebar-content js-simplebar">
      <a class="sidebar-brand" href="#">
        <span class="align-middle">WINGS·TOP CAFE</span>
      </a>

      <ul class="sidebar-nav">
        <!-- <li class="sidebar-header">
          Admin
        </li> -->

        <li class="sidebar-item active">
          <a class="sidebar-link" href="/dashboard">
            <i class="align-middle" data-feather="bar-chart-2"></i>
            <span class="align-middle">Dashboard</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link" href="/cashregister">
            <i class="align-middle" data-feather="monitor"></i>
            <span class="align-middle">Cash Register</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link" href="#">
            <i class="align-middle" data-feather="shopping-bag"></i>
            <span class="align-middle">Orders</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link" href="#">
            <i class="align-middle" data-feather="list"></i>
            <span class="align-middle">Inventory</span>
          </a>
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link" href="#">
            <i class="align-middle" data-feather="book"></i>
            <span class="align-middle">Reports</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>
