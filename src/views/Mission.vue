<template>
  <el-row>
    <el-col :span="6">
      <el-statistic title="Current Latitude" :value="current.latitude" />
    </el-col>

    <el-col :span="6">
      <el-statistic title="Current Longitude" :value="current.longitude" />
    </el-col>

    <el-col :span="6">
      <el-statistic title="Current Altitude" :value="current.altitude" />
    </el-col>

    <el-col :span="6">
      <el-statistic title="Last Update" :value="timestamp" />
    </el-col>
  </el-row>

  <el-form
    ref="formRef"
    :model="form"
    label-width="120px"
    class="demo-dynamic"
    label-position="top"
  >
    <template v-for="(position, index) in form.positions" :key="position.key">
      <el-form-item
        style="width: 300px"
        :label="'Position' + (index + 1) + ' latitude'"
        :prop="'positions.' + index + '.latitude'"
        :rules="{
          required: true,
          message: 'latitude can not be null',
          trigger: 'blur',
        }"
      >
        <el-input v-model="position.latitude"> </el-input>
      </el-form-item>

      <el-form-item
        style="width: 300px"
        :label="'Position' + (index + 1) + ' longitude'"
        :prop="'positions.' + index + '.longitude'"
        :rules="{
          required: true,
          message: 'longitude can not be null',
          trigger: 'blur',
        }"
      >
        <el-input v-model="position.longitude"> </el-input>
      </el-form-item>

      <el-form-item
        style="width: 300px"
        :label="'Position' + (index + 1) + ' altitude'"
        :prop="'positions.' + index + '.altitude'"
        :rules="{
          required: true,
          message: 'altitude can not be null',
          trigger: 'blur',
        }"
      >
        <el-input v-model="position.altitude"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="index > 0"
          class="mt-2"
          @click.prevent="removePosition(position)"
          >Delete Position {{ index + 1 }}</el-button
        >
      </el-form-item>
    </template>

    <el-form-item>
      <el-button type="primary" @click="preview(formRef)"
        >Preview Mission Route</el-button
      >
      <el-button @click="addPosition">New Position</el-button>
      <el-button @click="resetForm(formRef)">Reset</el-button>
    </el-form-item>
  </el-form>

  <el-dialog
    v-model="centerDialogVisible"
    style="height: 80vh"
    width="80%"
    align-center
  >
    <GMapMap :center="location" :zoom="18" style="width: 100%; height: 500px">
      <GMapMarker :position="location" :clickable="true"> </GMapMarker>
      <GMapPolygon :paths="paths" />
    </GMapMap>
    <el-button @click="uploadMission" type="primary"
      >Upload This Flight Mission to UAV</el-button
    >
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { onMounted } from "vue";
import axios from "axios";

const formRef = ref<FormInstance>();
const form = reactive<{
  positions: PositionItem[];
}>({
  positions: [
    {
      key: 1,
      latitude: "",
      longitude: "",
      altitude: "",
    },
  ],
});

const current = reactive({
  latitude: "",
  longitude: "",
  altitude: "",
});

const timestamp = ref("");

interface PositionItem {
  key: number;
  latitude: string;
  longitude: string;
  altitude: string;
}

const removePosition = (item: PositionItem) => {
  const index = form.positions.indexOf(item);
  if (index !== -1) {
    form.positions.splice(index, 1);
  }
};

const centerDialogVisible = ref(false);
const addPosition = () => {
  form.positions.push({
    key: Date.now(),
    latitude: current.latitude,
    longitude: current.longitude,
    altitude: current.altitude,
  });
};

const preview = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      paths.value = [location];
      for (let i of form.positions) {
        paths.value.push({
          lat: Number(i.latitude),
          lng: Number(i.longitude),
        });
      }

      centerDialogVisible.value = true;
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const location = reactive({
  lat: 1,
  lng: 1,
});
const paths = ref([
  {
    lat: 1,
    lng: 1,
  },
]);

const uploadMission = async () => {
  let command = [];

  for (let i of form.positions) {
    command.push({
      lat: Number(i.latitude),
      lng: Number(i.longitude),
      alt: Number(i.altitude),
    });
  }
  let res = await axios.post("http://3.139.94.118:8080/send-command", {
    command,
  });
};
const updatePosition = async () => {
  let res = await axios.get("http://3.139.94.118:8080/get-current-position");

  current.latitude = res.data[0].latitude;
  current.longitude = res.data[0].longitude;
  current.altitude = res.data[0].altitude;

  form.positions[0].latitude = res.data[0].latitude;
  form.positions[0].longitude = res.data[0].longitude;
  form.positions[0].altitude = res.data[0].altitude;

  location.lat = Number(res.data[0].latitude);
  location.lng = Number(res.data[0].longitude);
  timestamp.value = res.data[0].timestamp;
};
onMounted(() => {
  updatePosition();
  // setInterval(updatePosition, 1000);
});
</script>

<style scoped>
.el-col {
  text-align: center;
}
</style>
