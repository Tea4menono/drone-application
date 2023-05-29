<template>
  <div class="about">
    <el-form label-width="100px" :model="position1" style="max-width: 460px">
      <el-form-item label="latitude">
        <el-input v-model="position1.latitude" />
      </el-form-item>
      <el-form-item label="longitude">
        <el-input v-model="position1.longitude" />
      </el-form-item>
      <el-form-item label="altitude">
        <el-input v-model="position1.altitude" />
      </el-form-item>
    </el-form>

    <el-form label-width="100px" :model="position2" style="max-width: 460px">
      <el-form-item label="latitude">
        <el-input v-model="position2.latitude" />
      </el-form-item>
      <el-form-item label="longitude">
        <el-input v-model="position2.longitude" />
      </el-form-item>
      <el-form-item label="altitude ">
        <el-input v-model="position2.altitude" />
      </el-form-item>
    </el-form>

    <el-button @click="test">Upload Mission</el-button>
  </div>
</template>
<script setup>
import { reactive } from "vue";

import axios from "axios";

const position1 = reactive({
  latitude: 51.0866776,
  longitude: -114.0595247,
  altitude: 30,
});

const position2 = reactive({
  latitude: 51.0876776,
  longitude: -114.0595247,
  altitude: 30,
});

const test = async () => {
  const response = await axios.post("http://3.139.94.118:8080/send-command", {
    command: [
      {
        lat: 51.0866776,
        lon: -114.0595247,
        alt: 10,
      },
      {
        lat: 51.0876776,
        lon: -114.0595247,
        alt: 10,
      },
    ],
  });
  console.log(response.data);
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
