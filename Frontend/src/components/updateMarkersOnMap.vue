<script>
import { ref } from "vue";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const map = ref(null);
let markers = []; // Store the markers to clear them when updating

export function setMap(newMap) {
  map.value = newMap;
}

export function updateMarkersOnMap(cardData) {
  if (!map.value) return;

  // Clear existing markers
  markers.forEach((marker) => marker.setMap(null));
  markers = [];

  // Add new markers from cardData
  cardData.forEach((store) => {
    if (store.latitude && store.longitude) {
      const marker = new google.maps.Marker({
        position: {
          lat: parseFloat(store.latitude),
          lng: parseFloat(store.longitude),
        },
        map: map.value,
        title: store.name,
      });
      markers.push(marker);
    }
  });

  new MarkerClusterer({
    map: map.value,
    markers,
  });
}
</script>
