<script setup>
import { ref, computed, onMounted } from "vue";
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

const props = defineProps({
  cards: Array,
});
const filteredCards = computed(() => {
  return props.cards.filter((card) =>
    card.location.toLowerCase().includes(filterText.value.toLowerCase())
  );
});

const handleCallButtonClick = () => {
  window.open(`tel:${card.phone}`, "_self");
};

const handleEmailClick = () => {
  window.open(`mailto:${card.email}`, "_self");
};

const cardData = ref([
  {
    id: 1,
    name: "African Black Cafe",
    address: "Civic Center Park, 101 14th Ave Denver, CO, 80204",
    phone: "333-3333-333",
    email: "support@agilelogix.com",
    image:
      "https://b3156083.smushcdn.com/3156083/wp-content/uploads/2023/07/AfricaBlack-146.jpg?lossy=2&strip=1&webp=1",
  },

  {
    id: 2,
    name: "African Black Cafe",
    address: "Civic Center Park, 101 14th Ave Denver, CO, 80204",
    phone: "333-3333-333",
    email: "support@agilelogix.com",
    image:
      "https://b3156083.smushcdn.com/3156083/wp-content/uploads/2023/07/AfricaBlack-146.jpg?lossy=2&strip=1&webp=1",
  },
  {
    id: 3,
    name: "African Black Cafe",
    address: "Civic Center Park, 101 14th Ave Denver, CO, 80204",
    phone: "333-3333-333",
    email: "support@agilelogix.com",
    image:
      "https://b3156083.smushcdn.com/3156083/wp-content/uploads/2023/07/AfricaBlack-146.jpg?lossy=2&strip=1&webp=1",
  },
  {
    id: 4,
    name: "African Black Cafe",
    address: "Civic Center Park, 101 14th Ave Denver, CO, 80204",
    phone: "333-3333-333",
    email: "support@agilelogix.com",
    image:
      "https://b3156083.smushcdn.com/3156083/wp-content/uploads/2023/07/AfricaBlack-146.jpg?lossy=2&strip=1&webp=1",
  },
  {
    id: 5,
    name: "African Black Cafe",
    address: "Civic Center Park, 101 14th Ave Denver, CO, 80204",
    phone: "333-3333-333",
    email: "support@agilelogix.com",
    image:
      "https://b3156083.smushcdn.com/3156083/wp-content/uploads/2023/07/AfricaBlack-146.jpg?lossy=2&strip=1&webp=1",
  },
]);
const GOOGLE_MAPS_API_KEY = "AIzaSyDBBipgwyczwFN2wAv5Q04WMifIwL80DYw";

const { coords } = useGeolocation();
const currPos = computed(() => ({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
}));

const otherPos = ref(null);

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  libraries: ["places"],
  version: "weekly",
});

// const Places = await loader.importLibrary("places");
// const center = { lat: 34.082298, lng: -82.284777 };

// const defaultBounds = {
//   north: center.lat + 0.1,
//   south: center.lat - 0.1,
//   east: center.lng + 0.1,
//   west: center.lng - 0.1,
// };
// const input = document.getElementById("place"); //binds to our input element

// console.log("input", input);
// const options = {
//   bounds: defaultBounds, //optional
//   types: ["establishment"], //optioanl
//   componentRestrictions: { country: "us" }, //limiter for the places api search
//   fields: ["address_components", "geometry", "icon", "name"], //allows the api to accept these inputs and return similar ones
//   strictBounds: false, //optional
// };

// const autocomplete = new Places.Autocomplete(input, options);

// console.log("autocomplete", autocomplete); //optional log but will show you the available methods and properties of the new instance of Places.

// //add the place_changed listener to display results when inputs change
// autocomplete.addListener("place_changed", () => {
//   const place = autocomplete.getPlace(); //this callback is inherent you will see it if you logged autocomplete
//   console.log("place", place);
// });

const mapDiv = ref(null);
let map = ref(null);
let clickListener = null;
// let isGoogleApiLoaded = ref(false);

onMounted(async () => {
  await loader.load();
  // isGoogleApiLoaded.value = true;
  map.value = new google.maps.Map(mapDiv.value, {
    center: currPos.value,
    zoom: 7,
  });
  clickListener = map.value.addListener(
    "click",
    ({ latLng: { lat, lng } }) => (otherPos.value = { lat: lat(), lng: lng() })
  );
});

onMounted(async () => {
  if (clickListener) clickListener.remove();
});

// onBeforeUnmount(() => {
//   if (clickListener) clickListener.remove();
// });

// onMounted(){
//   const originAutocomplete=new google.maps.places.Autocomplete(
//     this.$refs["origin"],
//     {
//       bounds
//     }z
//   );

// }

const locatorButtonPressed = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.getAddressFrom(position.coords.latitude, position.coords.latitude);

        // console.log(latitude.value, longitude.value);
      },
      (error) => {
        errorMessage.value = error.message;
        console.log(errorMessage.value);
      }
    );
  } else {
    console.log("Your browser does not support geolocation.");
  }
};

const getAddressFrom = (lat, long) => {
  axios
    .get(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        lat +
        "," +
        long +
        "&key=AIzaSyDBBipgwyczwFN2wAv5Q04WMifIwL80DYw"
    )
    .then((response) => {
      if (response.data.error_message) {
        console.log(response.data.error_message);
      } else {
        console.log(response.results[0].formatted_address);
      }
    })
    .catch((error) => {
      console.log("error.message");
    });
};
</script>

<template>
  <div class="container">
    <!-- Left Section -->
    <div class="left-section">
      <template>
        <a-page-header
          style="border: 2px solid rgb(235, 237, 240)"
          title="Title"
          sub-title="This is a subtitle"
          @back="() => null"
      /></template>

      <div class="header-container">
        <a-card
          style="width: 300px; display: flex; justify-content: space-between"
        >
          <!-- <h3 class="left-header">Find a store</h3>
          <h3 class="right-header" @click="locatorButtonPressed">
            Use Current location
          </h3> -->
          <input type="text" placeholder="current address" />
          <i class="dot clicrcle click" @click="locatorButtonPressed()"></i>

          <!-- <a-space direction="vertical">
            <a-input-search
              class="search"
              ref="origin"
              v-model:value="value"
              placeholder="Enter Location Here"
              style="width: 250px"
              @search="onSearch"
            />
          </a-space> -->
          <!-- 
          <vue-google-autocomplete
            id="map"
            classname="form-control"
            placeholder="Start typing"
            v-on:placechanged="getAddressData"
          >
          </vue-google-autocomplete> -->

          <input id="place" type="text" placeholder="Enter a location" />

          <br />
          <div class="dropdown-left">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>Filter Stores by</a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">Stationary</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;"> General Stores</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;"> Medical</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;"> Cake Shop</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>

          <div class="dropdown-right">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>State</a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;"> Maharahtra</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">Telengana</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">Punjab</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">Gujrat</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">M.P</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">U.P</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </a-card>
      </div>

      <div v-for="card in cardData" :key="card.id" class="card">
        <a-card style="width: 300px">
          <h2>{{ card.name }}</h2>
          <HomeFilled class="icon-large" />

          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>Stores Opens at:</a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">Monday: 9am-10pm</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;"> Tuesday: 9am-10pm</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">wednesday: 9am-8pm</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;"> Thursday: 11am-7pm</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;"> Friday: 11am-7pm</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;"> saturday: 11am-7pm</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>

          <p>{{ card.address }}</p>
          <p @click="handleCallButtonClick">
            <PhoneOutlined /> {{ card.phone }}
          </p>
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

      <!-- example -->
    </div>

    <!-- Right Section (Map Image) -->
    <div class="right-section">
      <!-- <img
        class="map-image"
        src="https://user-images.githubusercontent.com/3392975/135143029-20abd824-0f3e-4e28-bad3-327acf7aec04.png"
      /> -->
      <h4>Your Position</h4>
      Latitude: {{ currPos.lat.toFixed(2) }}, Longitude:
      {{ currPos.lng.toFixed(2) }}

      <div class="m-auto">
        <h4>Clicked position</h4>
        <span v-if="otherPos">
          Latitude:{{ otherPos.lat.toFixed(2) }},Longitude:{{
            otherPos.lng.toFixed(2)
          }}
        </span>
        <span v-else>click map to select a position</span>
      </div>

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
  border-radius: 0; /* Remove border-radius */
}

.right-section {
  /* Maximize right section size */
  padding-left: 30px;
  display: flex;
  flex-direction: column; /* Align items vertically */
  width: 75%;
  margin-top: -10px;
  align-items: flex-start; /* Align items to the top */
}
.icon-large {
  font-size: 24px; /* Adjust the size as needed */
  float: right; /* Align the icon to the right */
  margin-top: -28px; /* Optional: Adjust top margin for spacing */
}
.search {
  align-items: start;
  align-content: flex-start;
}
.map-image {
  width: 97%;
  align-items: center;
  margin-top: 20px;
  /* Adjust image width as needed */
}
.black-button {
  background-color: #000; /* Black background color */
  color: #fff; /* White text color */
  border-radius: 0; /* No border radius (sharp corners) */
  border: none; /* No border */
}

/* Hover style (optional) */
.black-button:hover {
  background-color: #333; /* Darker shade of black on hover */
}
.header-container {
  display: flex;
  justify-content: space-between;
}

.left-header {
  margin-right: 160px; /* Pushes the left header to the left */
}

.right-header {
  margin-top: -25px;
  margin-left: 100px; /* Pushes the right header to the right */
}
.dropdown-left {
  margin-right: -45px;
}
.dropdown-right {
  margin-top: -25px;
  margin-right: 230px;
}

@media (min-width: 768px) {
  .card {
    width: calc(50% - 20px); /* Two cards per row with some margin */
  }
}
</style>
