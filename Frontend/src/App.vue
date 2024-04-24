<script setup>
//import SearchBar from './components/Searchbar.vue';
import Nav from './components/Nav.vue'

</script>

<template>
  <main>
    <Nav/>
    <SearchBar />
  </main>
</template>

<style scoped>
.container {
  background-color: blanchedalmond;
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
