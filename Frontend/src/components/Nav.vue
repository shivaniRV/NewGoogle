<script setup>
import SearchBar from './Searchbar.vue';
</script>
<template>
    <div class="container">
      <h1>Store Locator</h1>
      <div class="admin-signup">
      
        <AButton type="primary" @click="primary">Admin Signup</AButton>
        <AButton type="primary">Log in </AButton>
      </div>
      <SearchBar/>
    </div>
    
</template>