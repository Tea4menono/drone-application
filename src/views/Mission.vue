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
      <el-button type="primary" @click="submitForm(formRef)"
        >Preview Mission Route</el-button
      >
      <el-button @click="addPosition">New domain</el-button>
      <el-button @click="resetForm(formRef)">Reset</el-button>
    </el-form-item>
  </el-form>
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

const current: PositionItem = reactive({
  key: 0,
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

const addPosition = () => {
  form.positions.push({
    key: Date.now(),
    latitude: "",
    longitude: "",
    altitude: "",
  });
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
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

const updatePosition = async () => {
  let res = await axios.get("http://localhost:8080/get-current-position");

  current.latitude = res.data[0].latitude;
  current.longitude = res.data[0].longitude;
  current.altitude = res.data[0].altitude;
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
