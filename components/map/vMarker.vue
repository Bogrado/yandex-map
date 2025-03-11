<template>
  <yandex-map-marker
      :key="marker.id"
      position="top left-center"
      :settings="{ coordinates: marker.coordinates, zIndex: isOpen ? 1 : 0, hideOutsideViewport: true }"
  >
    <div class="marker-container">
      <icons-v-rollback
          class="icon"
          @click="handleToggle"
          @close="handleClose"
      />
      <map-v-balloon v-if="isOpen" class="map-balloon" />
    </div>

  </yandex-map-marker>
</template>

<script setup lang="ts">
import { YandexMapMarker } from "vue-yandex-maps";
import type { LngLat, YMap } from "@yandex/ymaps3-types";

const { marker, map } = defineProps({
  marker: {
    type: Object as PropType <{ id: number; coordinates: LngLat }>,
    required: true
  },
  map: {
    type: Object as PropType<YMap | null>,
    default: null
  }
})

const { centerMapWithPopup } = useShift()
const { closeDropdown, toggleDropdown, isOpen } = useDropdown()

const handleToggle = () => {
  toggleDropdown()
  if (isOpen.value && map) {
    centerMapWithPopup(marker.coordinates, -150, map)
    return
  }
  if (!isOpen.value && map) {
    centerMapWithPopup(marker.coordinates, 0, map)
  }
}

const handleClose = (coord: LngLat | null = null) => {
  closeDropdown()
  if (map && coord) {
    centerMapWithPopup(marker.coordinates, 0, map)
  }
}
</script>

<style scoped>
.marker-container {
  position: relative;
}

.icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: red;
}
.map-balloon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100%;
}
</style>
