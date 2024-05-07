<script setup>
import SearchBar from "./Searchbar.vue";
// import AuthModal from "./AuthModal.vue";
import { useUserStore } from "../stores/Users";
import { UserOutlined } from "@ant-design/icons-vue";
import { RouterLink, useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const goToProfile = () => {
  router.push("/profile"); // Assuming you have a /profile route for the user's profile
};

const handleLogout = () => {
  // Handle logout logic here
};

const goToUsersProfile = () => {
  // Redirect to user's profile page
};

const user = null;
</script>

<template>
  <ALayoutHeader theme="dark">
    <div class="nav-container">
      <div class="right-content">
        <h1>StoreLocator</h1>
      </div>

      <div class="left-content" v-if="!user" style="margin-right: 20px">
        <!-- <ul>
          <li><router-link to="/profile">Profile</router-link></li>

          <li><router-link to="/loginview">Simple Page</router-link></li>
        </ul> -->

        <img
          style="width: 40px"
          src="D:\storelocator\Frontend\src\assets\man_11311998.png"
          alt="Profile"
          @click="goToProfile"
        />
        <AuthModal ref="authModalRef" :isLogin="true" class="auth-button" />
      </div>

      <div class="left-content" v-else>
        <a-button type="primary" @click="goToUsersProfile">Profile</a-button>
        <a-button type="primary" @click="handleLogout">Logout</a-button>
      </div>

      <!-- <HomeOutlined /> -->
    </div>
  </ALayoutHeader>
</template>

<style scoped>
.nav-container {
  background-color: #eae0e0;
  border: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.right-content {
  display: flex;
  align-items: center;
}

.right-content h1 {
  font-weight: bolder;
  color: #000;
}

.left-content {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.auth-button {
  margin-left: 10px;
}
</style>
