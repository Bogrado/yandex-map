<template>
  <div class="container">
    <YandexMap
        class="map"
        v-model="yaMap"
        :settings="{ location: { center: initialCoords, zoom: initialZoom }}"
        width="100%"
    >
      <yandex-map-controls :settings="{ position: 'right' }">
        <yandex-map-control-button :settings="{ onClick: handleRollback  }">
          <icons-v-rollback class="icon" />
        </yandex-map-control-button>
      </yandex-map-controls>

      <v-marker :marker="marker" :map="yaMap" />
      <YandexMapDefaultSchemeLayer />
      <YandexMapDefaultFeaturesLayer />
    </YandexMap>
  </div>
</template>

<script setup lang="ts">
import type { LngLat, YMap } from "@yandex/ymaps3-types";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer, YandexMapControlButton, YandexMapControls
} from 'vue-yandex-maps'
import VMarker from "~/components/map/vMarker.vue";

const { rollback } = useShift()
const yaMap = shallowRef<null | YMap>(null)
const initialCoords = [37.621453, 55.754040] as LngLat
const initialZoom = 15

const handleRollback = () => {
  rollback( initialCoords, initialZoom, yaMap.value )
}

const marker = {
  id: 1,
  coordinates: [37.635000, 55.751500] as LngLat
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
.container {
  width: 100%;
  height: 100vh;
}
.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
}
</style>
