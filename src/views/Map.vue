<template>
  <div>
    <GMapMap :center="location" :zoom="18" style="width: 100vw; height: 100vh">
      <GMapMarker :position="location" :clickable="true" />
      <GMapPolygon :editable="true" :paths="paths" />
    </GMapMap>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import axios from "axios";
const location = reactive({ lat: 0, lng: 0 });

const paths = reactive([
  { lat: 51.0866776, lng: -114.0595247 },
  { lat: 51.0876776, lng: -114.0595247 },
  { lat: 51.0876776, lng: -114.0585247 },
  { lat: 51.0866776, lng: -114.0585247 },
]);

onMounted(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      location.lat = position.coords.latitude;
      location.lng = position.coords.longitude;
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});
</script>
