<script setup>
/* eslint-disable no-undef */
import { ref, computed, onMounted } from "vue";
import Nav from "./components/Nav.vue";
import Searchbar from "./components/Searchbar.vue";
import Card from "./components/Card.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <main>
    <Nav />
    <br />

    <Card :cards="cards" />
    <split />

    <Footer />
  </main>
</template>

<style scoped>
.container {
  background-color: #ececec;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.h1 {
  margin: 40px;
  padding: 20px;
}

.admin-signup button {
  background-color: #7695c5;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px;
}
</style>
