<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="Drone" name="first">
      <div v-html="droneLog"></div>
    </el-tab-pane>
    <el-tab-pane label="Server" name="second">
      <div v-html="AWSLog"></div
    ></el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
const activeName = ref("first");
const droneLog = ref("");
const AWSLog = ref("");

const getAWSLog = async () => {
  let res = await axios.get("http://3.139.94.118:8080/get-aws-log");

  AWSLog.value = res.data.replace(/\n/g, "<br/>");
};
const getDroneLog = async () => {
  let res = await axios.get("http://3.139.94.118:8080/get-drone-log");

  droneLog.value = res.data.replace(/\n/g, "<br/>");
};
onMounted(() => {
  getDroneLog();
  getAWSLog();
});
</script>
<style></style>
