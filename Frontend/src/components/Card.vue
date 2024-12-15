<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  reactive,
} from "vue";
import {
  HomeFilled,
  PhoneOutlined,
  ChromeOutlined,
  MailOutlined,
  FilterOutlined,
} from "@ant-design/icons-vue";
import { RouterView } from "vue-router";
import { useGeolocation } from "../userGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
import VueGoogleAutocomplete from "vue-google-autocomplete";

import axios from "axios";
//import updateMarkersOnMap from "./updateMarkersOnMap.vue";
import api, {
  sendLocation,
  enterLocation,
  filterStates as filterStatesApi,
} from "../apiservice";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const props = defineProps({
  cards: Array,
});

const handleCallButtonClick = () => {
  window.open(`tel:${card.phone}`, "_self");
};

const handleEmailClick = () => {
  window.open(`mailto:${card.email}`, "_self");
};

//search functionality

const search = ref("");

// watch(search, () => {
//   card.value = card.filter((card) =>
//     card.name.toLowerCase().includes(search.value.toLowerCase())
//   );
// });
//apis
//1.lat,long:
const message = ref("");
let latitude = ref("");
let longitude = ref("");
const locationInput = ref("");

// const submitLocation = async () => {
//   try {
//     const response = await axios.post(
//       "http://localhost:8080/api/current-location",
//       {
//         latitude,
//         longitude,
//       }
//     );
//     console.log("Location entered successfully:", response.data.message);
//   } catch (error) {
//     console.error(
//       "Error entering location:",
//       error.response?.data?.error || error.message
//     );
//   }
// };
const submitLocation = async () => {
  try {
    if (!latitude || !longitude) {
      console.error("Latitude and Longitude are required");
      return;
    }
    const response = await sendLocation(latitude, longitude);
    console.log("Location entered successfully:", response.data.message);
  } catch (error) {
    console.error(
      "Error entering location:",
      error.response?.data?.error || error.message
    );
  }
};

// const EnterLocation = async () => {
//   try {
//     const response = await axios.get(
//       `/api/enter-location?location=${location}`
//     );
//     console.log("Location entered successfully:", response.data.message);
//     console.log("locationInput:", locationInput, "Type:", typeof locationInput);
//   } catch (error) {
//     console.error(
//       "Error entering location:",
//       error.response?.data?.error || error.message
//     );
//   }
// };
const EnterLocation = async () => {
  try {
    const location = locationInput.value; // Access the actual value from the ref
    const response = await axios.get(
      `/api/enter-location?location=${location}`
    );
    console.log("Location entered successfully:", response.data.message);
    console.log(
      "locationInput:",
      locationInput.value,
      "Type:",
      typeof locationInput.value
    );
  } catch (error) {
    console.error(
      "Error entering location:",
      error.response?.data?.error || error.message
    );
  }
};

// const EnterLocation = async () => {
//   try {
//     const response = await enterLocation(locationInput.value);
//     console.log("Location entered successfully:", response.data.message);
//   } catch (error) {
//     console.error(
//       "Error entering location:",
//       error.response?.data?.error || error.message
//     );
//   }
// };
const page = ref();
const states = ref([
  { id: 1, name: "Maharashtra" },
  { id: 2, name: "Telangana" },
  { id: 3, name: "Punjab" },
  { id: 4, name: "Gujarat" },
  { id: 5, name: "Madhya Pradesh" },
  { id: 6, name: "Uttar Pradesh" },
]);

const filterStates = async (selectedState) => {
  try {
    console.log("Selected state:", selectedState);
    const response = await axios.post(
      "http://localhost:8080/api/filter-states",
      { states: [selectedState.name] }
    );
    console.log("Filtered states response:", response.data);
  } catch (error) {
    console.error(
      "Error filtering states:",
      error.response?.data?.error || error.message
    );
  }
};

const selectedState = ref(null);
const selectedCategory = ref(null);

const handleStateSelection = (e) => {
  selectedState.value = states.value.find((state) => state.id === e);
  fetchStores();
};

const filterCards = () => {
  fetchStores();
};

// const filterStoresByCategory = (stores) => {
//   return axios.post("http://localhost:8080/api/filter_category", { stores });
// };

//api for filtercategory
const category = ref([
  { id: 1, name: "Stationary" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Electronics" },
  { id: 4, name: "Grocery" },
  { id: 5, name: "Furniture" },
]);

const filterStoresByCategory = async (selectedStore) => {
  try {
    console.log("Selected store:", selectedStore);
    const response = await axios.post(
      "http://localhost:8080/api/filter_category",
      { stores: [{ category: selectedStore.name }] }
    );
    console.log("Filtered stores response:", response.data);
  } catch (error) {
    console.error(
      "Error filtering stores:",
      error.response?.data?.error || error.message
    );
  }
};

const handleStoreSelection = (e) => {
  selectedCategory.value = category.value.find((store) => store.id === e);
  fetchStores();
};

// const cardData = ref([]);
// const currentPage = ref(1);
// const totalPages = ref(0);
// const limit = 10; // Set limit to 10 cards per page

// const fetchStores = async (page = 1) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:8080/api/stores?page=${page}&limit=${limit}`
//     );
//     cardData.value = response.data.stores;
//     totalPages.value = response.data.totalPages;
//     currentPage.value = response.data.currentPage;
//   } catch (error) {
//     console.error("Error fetching stores:", error.message);
//   }
// };

// // Call fetchStores when the component is mounted
// onMounted(() => fetchStores(currentPage.value));

// // Function to handle pagination
// const goToPage = (page) => {
//   if (page > 0 && page <= totalPages.value) {
//     fetchStores(page);
//   }
// };
const cardData = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const limit = 10;
// const fetchStores = async (page = 1) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:8080/api/stores?page=${page}&limit=${limit}`
//     );
//     cardData.value = response.data.stores;
//     totalPages.value = response.data.totalPages;
//     currentPage.value = response.data.currentPage;

//     updateMarkersOnMap();
//   } catch (error) {
//     console.error("Error fetching stores:", error.message);
//   }
// };

//fetchstore code old one
const filterInputs = reactive({
  search: "",
  category: null,
  state: null,
});

// Function to handle search
const handleSearch = () => {
  fetchStores({ page: 1, ...filterInputs });
};

// Function to handle filter changes

const fetchStores = async ({ page = 1, search, category, state, lat, lng }) => {
  try {
    const params = {
      page: 1,
      limit,
      latitude: typeof lat === "number" && !isNaN(lat) ? lat : null,
      longitude: typeof lng === "number" && !isNaN(lng) ? lng : null,
      state: state ? state.name : "",
      category: category ? category.name : "",
      // search,
      state: selectedState.value ? selectedState.value.name : "",
      category: selectedCategory.value ? selectedCategory.value.name : "",
      search: search.value,
    };
    console.log(params);

    const response = await axios.get("http://localhost:8080/api/stores", {
      params,
    });
    cardData.value = response.data.stores;
    totalPages.value = response.data.totalPages;
    currentPage.value = response.data.currentPage;
    updateMarkersOnMap();
  } catch (error) {
    console.error("Error fetching stores:", error.message);
  }
};

const handleFiltersChange = () => {
  fetchStores({ page: 1, ...filterInputs });
};

watch(filterInputs, handleFiltersChange, { deep: true });

const handleSearchClick = () => {
  handleSearch();
};
onMounted(() => fetchStores({ page: currentPage.value, ...filterInputs }));

// Collect filter inputs

// Function to handle pagination
const goToPage = async (page) => {
  if (page > 0 && page <= totalPages.value) {
    await fetchStoreData(page);
    updateMarkersOnMap();
  }
};

const GOOGLE_MAPS_API_KEY = "AIzaSyDBBipgwyczwFN2wAv5Q04WMifIwL80DYw";

const autocompleteOptions = {
  bounds: {
    north: 50.064192 + 0.1,
    south: 50.064192 - 0.1,
    east: -130.605469 + 0.1,
    west: -130.605469 - 0.1,
  },
  componentRestrictions: { country: "IN" },
  fields: ["address_components", "geometry", "icon", "name"],
  strictBounds: false,
};

const { coords } = useGeolocation();
const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
}));

const otherPos = ref(null);

const storeInfo = ref([]);
const mapDiv = ref(null);
const map = ref(null);
let markerCluster = null;

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  libraries: ["places"],
  version: "weekly",
});

const fetchStoreData = async (page = 1) => {
  try {
    console.log("Fetching store data...", page);
    const response = await axios.get(
      `http://localhost:8080/api/stores?page=${page}&limit=${limit}`
    );

    console.log("Store data fetched:", response.data);

    if (response.data && Array.isArray(response.data.stores)) {
      storeInfo.value = response.data.stores;
      totalPages.value = response.data.totalPages;
      currentPage.value = response.data.currentPage;

      updateMarkersOnMap();
    } else {
      console.error("Fetched data is not an array:", response.data);
      storeInfo.value = [];
    }

    // storeInfo.value = response.data;
    // updateMarkersOnMap();
  } catch (error) {
    console.error("Error fetching store data:", error.message);
  }
};
// const handleSearch = () => {
//   fetchStores(1);
// };

onMounted(async () => {
  console.log("Component mounted, loading Google Maps...");

  await loader.load();
  console.log("Google Maps loaded");

  map.value = new google.maps.Map(mapDiv.value, {
    center: { lat: 20, lng: 80 }, // Default center if no stores are available
    zoom: 7,
  });
  console.log("Google Map initialized");

  fetchStoreData();
});

const updateMarkersOnMap = () => {
  if (!map || !storeInfo.value.length === 0) {
    console.log("Map not initialized or no store data available");

    return;
  }

  if (markerCluster) {
    console.log("Clearing existing markers...");

    markerCluster.clearMarkers();
  }
  // console.log("Updating markers on map...");

  console.log("Creating new markers...");

  const markers = storeInfo.value.map((card) => {
    const location = card.location;
    let lat,
      lng = 0;
    if (location) {
      const coords = location.coordinates;
      if (coords) {
        lat = coords[1];
        lng = coords[0];

        // rest of the markers code goes below
      }
    }
    const marker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: map.value,
      title: card.name,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<h3>${card.name}</h3><p>${card.address}</p> <p>${card.email}</p>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map.value, marker);
    });

    return marker;
  });

  markerCluster = new MarkerClusterer({
    map: map.value,
    markers,
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
  console.log("Markers updated and clustered");
};

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    await fetchStoreData(currentPage.value + 1);
    updateMarkersOnMap();
  }
};

const prevPage = async () => {
  if (currentPage.value > 1) {
    await fetchStoreData(currentPage.value - 1);
    updateMarkersOnMap();
  }
};

onBeforeUnmount(() => {
  console.log("Component is about to unmount, clearing markers...");

  if (markerCluster) {
    markerCluster.clearMarkers();
  }
});
// const getAddressData = (addressData, placeResultData) => {
//   latitude.value = placeResultData.geometry.location.lat();
//   longitude.value = placeResultData.geometry.location.lng();
//   fetchStores(1); // Fetch stores based on the updated latitude and longitude
// };

// const getAddressData = (addressData, placeResultData) => {
//   const { lat, lng } = placeResultData.geometry.location; // Extract lat and lng from placeResultData
//   if (typeof lat === "number" && !isNaN(lat)) {
//     latitude.value = lat.toFixed(6);
//   } else {
//     console.error("Invalid latitude value:", lat);
//   }

//   if (typeof lng === "number" && !isNaN(lng)) {
//     longitude.value = lng.toFixed(6);
//   } else {
//     console.error("Invalid longitude value:", lng);
//   }
//   console.log("Address data: ", addressData);

//   fetchStores(1);

//   console.log("Address data: ", addressData);
//   if (addressData && addressData.geometry) {
//     const location = addressData.geometry.location;
//     latitude = location.lat();
//     longitude = location.lng();
//     submitLocation(); // Calling the submitLocation function here
//   }
// };

const getAddressData = (addressData, placeResultData) => {
  // const lat = placeResultData.geometry.location.lat();
  const { lat, lng } = placeResultData.geometry.location;
  if (typeof lat === "number" && !isNaN(lat) && lat > 0) {
    addressData.latitude.value = lat.toFixed(6);
  } else {
    console.error("Invalid latitude value:", lat);
  }

  if (typeof lng === "number" && !isNaN(lng) && lng > 0) {
    addressData.longitude.value = lng.toFixed(6);
  } else {
    console.error("Invalid longitude value:", lng);
  }

  fetchStores(1, lat, lng);

  console.log("Address data: ", addressData);

  setTimeout(() => {
    if (
      addressData &&
      typeof addressData.latitude === "number" &&
      typeof addressData.longitude === "number"
    ) {
      console.log(
        "Address latitude:",
        addressData.latitude,
        "Address longitue:",
        addressData.longitude
      );
    } else {
      console.error(
        "Address latitude & longitude is invalid or not available."
      );
    }
  }, 1000);

  if (addressData && addressData.geometry) {
    const location = addressData.geometry.location;
    latitude = location.lat();
    longitude = location.lng();
    submitLocation();
  }
};
onMounted(() => {
  const numericLat = Number(latitude.value);
  const numericLng = Number(longitude.value);
  fetchStores(currentPage.value, numericLat, numericLng);
});

/////////////////////////////////////

onMounted(async () => {
  const loader = new Loader({
    apiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });
  console.log("loader", loader);
  const Places = await loader.importLibrary("places");

  const center = { lat: 34.082298, lng: -82.284777 };

  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };

  const input = document.getElementById("place"); //binds to our input element

  console.log("input", input);
  const options = {
    bounds: defaultBounds,
    types: ["establishment"],
    componentRestrictions: { country: "IN" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
  };

  const autocomplete = new Places.Autocomplete(input, options);

  console.log("autocomplete", autocomplete);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    console.log("place", place);
  });
});
</script>

<template>
  <div class="container">
    <!-- Left Section -->
    <div class="left-section">
      <div class="header-container">
        <a-card
          style="width: 300px; display: flex; justify-content: space-between"
        >
          <div class="heading" style="align-content: flex-start">
            <h2>Search Stores Here:</h2>
          </div>

          <!-- Input for entering location -->

          <vue-google-autocomplete
            id="map"
            classname="form-control"
            placeholder="Enter Destination"
            :api-key="GOOGLE_MAPS_API_KEY"
            :options="autocompleteOptions"
            @placechanged="getAddressData"
          ></vue-google-autocomplete>
          <!-- <a-input-search
            type="text"
            v-model.trim="search"
            placeholder="Enter Desired location"
            enter-button
            @click="filterCards()"
            size="large"
          /> -->
          <!-- <button @click="filterCards()">Submit</button> -->
          <!-- <p>{{ message }}</p> -->

          <!-- Inputs for latitude and longitude -->
          <!-- <p>Your current location:</p>
          <div>
            <label for="latitude">Latitude:</label>
            <input
              type="text"
              id="latitude"
              v-model="latitude"
              placeholder="Enter latitude"
            />

            <label for="longitude">Longitude:</label>
            <input
              type="text"
              id="longitude"
              v-model="longitude"
              placeholder="Enter longitude"
            />

            <button @click="submitLocation">Submit Location</button>
          </div>
          <br /> -->

          <!-- Dropdown for filtering stores -->
          <div class="dropdown-left">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>Filter Stores by</a>
              <template #overlay>
                <a-menu>
                  <a-menu-item
                    @click="handleStoreSelection(store.id)"
                    v-for="store in category"
                    :key="store.id"
                  >
                    <a href="javascript:;">{{ store.name }}</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <br />
          </div>
          <button @click="handleSearchClick">submit</button>
          <!-- <button @click="handleSearch()">Search</button> -->
          <br />
          <br />

          <!-- <div class="submit">
            <a-button @click="filterCards()">Submit</a-button>
          </div> -->

          <!-- Dropdown for selecting a state -->
          <div class="dropdown-right">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>State</a>
              <template #overlay>
                <a-menu>
                  <a-menu-item
                    @click="handleStateSelection(state.id)"
                    v-for="state in states"
                    :key="state.id"
                  >
                    <a href="javascript:;">{{ state.name }}</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </a-card>
      </div>

      <!-- Example cards for stores -->

      <div class="container">
        <!-- Render store cards dynamically -->
      </div>

      <!-- old code -->

      <div v-for="card in cardData" :key="card.id" class="card">
        <a-card style="width: 300px">
          <h2>{{ card.name }}</h2>
          <p>{{ card.email }}</p>
          <p>Address:{{ card.address }}</p>
          <p>contact.no:{{ card.mobile }}</p>
          <!-- <p>{{ card.latitude }}</p>
          <p>{{ card.longitude }}</p> -->

          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>Stores Opens at:</a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">Monday: 9am-10pm</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">Tuesday: 9am-10pm</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">Wednesday: 9am-8pm</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">Thursday: 11am-7pm</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">Friday: 11am-7pm</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">Saturday: 11am-7pm</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>

          <div class="buttons">
            <a-button
              type="primary"
              class="black-button"
              style="width: 48%; margin-right: 4%"
              >Directions</a-button
            >
            <a-button type="primary" class="black-button" style="width: 48%"
              >Store Info</a-button
            >
          </div>
          <br />
        </a-card>
      </div>
      <div>
        <a-button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage <= 1"
        >
          Previous
        </a-button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <a-button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage >= totalPages"
        >
          Next
        </a-button>
        <!-- <button
          @click="nextPage"
          :disabled="currentPage.value === totalPages.value"
        >
          Next
        </button> -->
      </div>
    </div>
    <!-- </div> -->

    <!-- Right Section (Map Image) -->
    <div class="right-section">
      <!-- <h4>Your Position</h4>
      Latitude: {{ currPos.lat.toFixed(2) }}, Longitude:
      {{ currPos.lng.toFixed(2) }}

      <div class="m-auto">
        <h4>Clicked position</h4>
        <span v-if="otherPos">
          Latitude: {{ otherPos.lat.toFixed(2) }}, Longitude:
          {{ otherPos.lng.toFixed(2) }}
        </span>
        <span v-else>Click map to select a position</span>
      </div> -->

      <div ref="mapDiv" style="width: 100%; height: 80vh" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  background-color: #d3d3d3;
}

.left-section {
  flex: 1;
  padding-right: 10px;
  padding-left: 30px;
  height: calc(100vh - 150px);
  width: 90%;
  overflow-y: auto;
  top: 0;
}
.card-container .ant-card {
  border-radius: 0;
}

.right-section {
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-top: -10px;
  align-items: flex-start;
}
.icon-large {
  font-size: 24px;
  float: right;
  margin-top: -28px;
}
.search {
  align-items: start;
  align-content: flex-start;
}
.map-image {
  width: 97%;
  align-items: center;
  margin-top: 20px;
}
.black-button {
  background-color: #000;
  color: #fff;
  border-radius: 0;
  border: none;
}
.submit {
  margin-bottom: 10px;
}
/* Hover style (optional) */
.black-button:hover {
  background-color: #333;
}
.header-container {
  display: flex;
  justify-content: space-between;
}

.left-header {
  margin-right: 160px;
}

.right-header {
  margin-top: -25px;
  margin-left: 100px;
}
.dropdown-left {
  margin-right: -55px;
  margin-left: 50px;
}
.dropdown-right {
  margin-top: -55px;
  margin-right: 230px;
}

@media (min-width: 768px) {
  .card {
    width: calc(50% - 20px);
  }
}
.heading {
  align-items: start;
  align-content: flex-start;
}
</style>
