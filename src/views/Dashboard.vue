<template>
  <div id="map"></div>
  <el-descriptions
    class="margin-top"
    title="Current UAV Position"
    :column="3"
    size="small"
    border
  >
    <template #extra>
      <el-button type="primary" @click="startMission">Start</el-button>
      <el-button type="primary" @click="endMission">End</el-button>
      <el-button type="primary" @click="previewMission">Preview</el-button>
      <el-button type="primary" @click="uploadMission">Upload</el-button>
    </template>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">Latitude</div>
      </template>
      {{ home.lat }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">Longitude</div>
      </template>
      {{ home.lng }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">Altitude</div>
      </template>
      {{ home.alt }}
    </el-descriptions-item>
  </el-descriptions>

  <el-descriptions
    class="margin-top"
    :title="'Position ' + (index + 1)"
    :column="3"
    size="small"
    border
    v-for="(x, index) in positionsList"
    :key="index"
  >
    <template #extra>
      <el-button type="primary" @click="removePosition(index)"
        >Remove</el-button
      >
    </template>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">Latitude</div>
      </template>
      {{ x.lat }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">Longitude</div>
      </template>
      {{ x.lng }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">Altitude</div>
      </template>
      {{ x.alt }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
  version: "weekly",
});
const editingStatus = ref(false);
const positionsList: Position[] = reactive([]);
interface Position {
  lat: number;
  lng: number;
  alt: number;
}
let map;

const home = reactive({ lat: 0, lng: 0, alt: 0 });
loader.load().then(async () => {
  const { Map } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;
  let res = await axios.get("http://3.139.94.118:8080/get-current-position");
  home.lat = Number(res.data.lat);
  home.lng = Number(res.data.lon);
  home.alt = Number(res.data.alt);
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: home,
    zoom: 16,
  });
  map.addListener("click", (e) => {
    getLocation(e.latLng, map);
  });

  new google.maps.Marker({
    position: home,
    map: map,
  });
  map.panTo(home);
});

const startMission = () => {
  ElMessage("Click the map to set positions.");
  editingStatus.value = true;
};

const removePosition = (index: number) => {
  positionsList.splice(index, 1);
};

const previewMission = () => {
  const lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  };
  const line = new google.maps.Polyline({
    path: [home].concat(positionsList).concat([home]),
    icons: [
      {
        icon: lineSymbol,
        offset: "100%",
      },
    ],
    strokeColor: "#FF0000",

    map: map,
  });
};

const endMission = () => {};

const uploadMission = () => {};

const getLocation = (latLng, map) => {
  if (editingStatus.value) {
    positionsList.push({
      lat: latLng.lat(),
      lng: latLng.lng(),
      alt: 20,
    });
  }
};
</script>

<style>
#map {
  height: 600px;
  width: 100%;
}
</style>
