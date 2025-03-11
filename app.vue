<template>
  <YandexMap
      v-model="yaMap"
      :settings="{ location: { center: initialCoords, zoom: initialZoom }}"
      width="100%"
      height="950px"
  >
    <yandex-map-controls :settings="{ position: 'right' }">
      <yandex-map-control-button :settings="{ onClick: handleRollback  }">
        <icons-v-rollback class="icon" />
      </yandex-map-control-button>

    </yandex-map-controls>
    <YandexMapDefaultSchemeLayer />
    <YandexMapDefaultFeaturesLayer />
  </YandexMap>
</template>

<script setup lang="ts">
import type { LngLat, YMap } from "@yandex/ymaps3-types";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer, YandexMapControlButton, YandexMapControls
} from 'vue-yandex-maps'

const { rollback } = useShift()
const yaMap = shallowRef<null | YMap>(null)
const initialCoords = [37.621453, 55.754040] as LngLat
const initialZoom = 15

const handleRollback = () => {
  rollback( initialCoords, initialZoom, yaMap.value )
}
</script>

<style scoped>
.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
