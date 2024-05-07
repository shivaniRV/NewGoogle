<script setup>
import { ref, defineProps, reactive } from "vue";
import { useUserStore } from "../stores/Users";
import { storeToRefs } from "pinia";
import { UserOutlined } from "@ant-design/icons-vue";

const open = ref(false);

const useStore = useUserStore();
const { errorMessage, loading, user } = storeToRefs(useStore);

const props = defineProps(["isLogin"]);
const userCredentials = reactive({
  email: "",
  password: "",
  username: "",
});

const showModal = () => {
  open.value = true;
  useStore.getUser();
};
const clearUserCredentialsInput = () => {
  userCredentials.username = "";
  userCredentials.email = "";
  userCredentials.password = "";
  useStore.clearErrorMessage();
};

const handleOk = async (e) => {
  if (props.isLogin) {
    await useStore.handleLogin({
      password: userCredentials.password,
      email: userCredentials.email,
    });
  } else {
    await useStore.handleSignup(userCredentials);
  }

  if (user.value) {
    clearUserCredentialsInput();
  }
};

const handleCancel = () => {
  clearUserCredentialsInput();
  open.value = false;
};
const title = props.isLogin ? "Admin Login" : "Admin Signup";
</script>

<template>
  <div>
    <a-avatar :size="64" @click="showModal">
      <template #icon></template>
    </a-avatar>

    <a-modal v-model:visible="open" :title="title" @ok="handleOk">
      <template #icon
        ><UserOutlined />
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button
          :disabled="loading"
          :key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
        >
          Submit
        </a-button>
      </template>
      <!-- Your input fields and error message display -->
      <a-form
        :model="formState"
        name="horizontal_login"
        layout="inline"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit"
            >Log in</a-button
          >
        </a-form-item>
      </a-form>

      <template>
        <a-space direction="vertical">
          <a-input v-model:value="value" placeholder="Basic usage" />
        </a-space>
      </template>
    </a-modal>
  </div>
</template>

<style scoped>
.btn {
  margin-left: 10px;
}
.input {
  margin-top: 5px;
}
.input-container {
  height: 120px;
}
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
</style>
