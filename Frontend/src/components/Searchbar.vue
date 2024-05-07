<script setup>
import { ref } from "vue";
const filterText = ref("");
import { DownOutlined } from "@ant-design/icons-vue";

const checked = false;
// export { filterText };
// const search=ref("");
// watch(search,()=>{
//   console.log()
// })
</script>

<template>
  <main>
    <div class="searchbar">
      <div class="search-icon">
        <div class="search-text">
          <h2>Enter Location here</h2>
        </div>
        <a-input-search
          v-model.trim="filterText"
          placeholder="Enter Your Location"
          enter-button
          @search="locatorbuttonPressed"
        />
      </div>
      <div class="right-side">
        <div class="search-text">
          <h2>Search by Name</h2>
        </div>
        <a-space direction="vertical">
          <a-input v-model="value" placeholder="Search by Name" />
        </a-space>

        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            search category
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;"> Cafes</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;"> stationary store</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">clothing</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <v-col md="4">
          <a-switch v-model:checked="checked" placeholder="open" />
        </v-col>
      </div>
    </div>
  </main>
</template>

<style scoped>
.searchbar {
  display: flex;
  align-items: center;
  font-family: "Open Sans", sans-serif;
  font-optical-sizing: auto;
  padding: 10px;
  margin-left: 10px;
}

.searchbar h1 {
  margin-right: 10px;
  font-family: "Open Sans", sans-serif;
  font-optical-sizing: auto;
}
.search-icon {
  width: 35%;
}
.right-side {
  float: right;
  margin-right: 8px;
  margin-left: 100px;

  justify-content: space-between;
  padding: 10px;
  margin-left: 3%;
  margin: space-between;

  clear: both;
}
.search-text {
  margin-right: 30px;
}
.right-side a-space {
  margin-bottom: 10px;
}
@media (max-width: 768px) {
  .searchbar h2 {
    font-size: 16px; /* Reduce font size on smaller screens */
  }
  .searchbar {
    flex-direction: column; /* Stack items vertically on smaller screens */
  }

  .search-icon {
    width: 100%;
  }

  .right-side {
    width: 100%;
    margin-left: 0; /* Remove left margin on smaller screens */
  }
}
.search-text {
}
</style>
