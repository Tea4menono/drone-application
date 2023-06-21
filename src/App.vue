<template>
  <div class="container">
    <div>
      <el-menu class="el-menu-vertical-demo">
        <RouterLink to="/">
          <el-menu-item index="1">
            <el-icon><Menu /></el-icon>
            <template #title>Dashboard</template>
          </el-menu-item>
        </RouterLink>
        <RouterLink to="/log">
          <el-menu-item index="2">
            <el-icon><Setting /></el-icon>
            <template #title> Log</template>
          </el-menu-item>
        </RouterLink>
      </el-menu>
    </div>

    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink, RouterView } from "vue-router";

import { Menu, Setting } from "@element-plus/icons-vue";
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.container {
  display: flex;
}

.content {
  height: 100vh;
  flex: 1;
}
</style>
