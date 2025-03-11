import type { LngLat, YMap } from '@yandex/ymaps3-types'

export const useShift = () => {
    // Сдвинуть центр карты так, чтобы маркер coords оказался offsetPx пикселей от центра (по вертикали).
    const centerMapWithPopup = (markerCoords: LngLat, offsetPx = 0, map: YMap | null = null) => {
        if (!map) return

        const [lon, lat] = markerCoords
        const zoom = map.zoom
        if (zoom == null) return

        const newLat = shiftLatByPixels(lat, zoom, offsetPx)

        map.setLocation({
            center: [lon, newLat],
            zoom,
            duration: 500
        })
    }

    const rollback = (coordinates: LngLat, startZoom: number, map: YMap | null) => {
        if (!map || !coordinates || !startZoom) return
        map.setLocation({
            center: coordinates,
            zoom: startZoom,
            duration: 500
        })
    }

    /** Шаги 1-3 — вычисления, куда сдвинуть эту несчастную карту от бедного инди разработчика: */
    const latToPixelY = (latDeg: number, zoom: number): number => {
        const latRad = (latDeg * Math.PI) / 180
        const mercY = Math.log(Math.tan(latRad / 2 + Math.PI / 4))
        const mapSize = 256 * Math.pow(2, zoom)
        const pixelsPerRad = mapSize / (2 * Math.PI)
        return mapSize / 2 - mercY * pixelsPerRad
    }

    const pixelYToLat = (pixelY: number, zoom: number): number => {
        const mapSize = 256 * Math.pow(2, zoom)
        const pixelsPerRad = mapSize / (2 * Math.PI)
        const mercY = (mapSize / 2 - pixelY) / pixelsPerRad
        const latRad = 2 * Math.atan(Math.exp(mercY)) - Math.PI / 2
        return (latRad * 180) / Math.PI
    }

    const shiftLatByPixels = (latDeg: number, zoom: number, offsetPx: number): number => {
        const y = latToPixelY(latDeg, zoom)
        const newY = y + offsetPx
        return pixelYToLat(newY, zoom)
    }

    return { centerMapWithPopup, rollback }
}
