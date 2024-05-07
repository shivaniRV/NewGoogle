import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import App from "../App.vue"
// import loginView from "../views/loginView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    }
    // },
    // {
    //   path: '/loginview',
    //   name: 'login',
    //   component:loginView
    // }
    // {
    //   path: '/admlogin',
    //   name: 'AdminLogin',
    //   component: () => import('./views/AdminLogin.vue'),
    // }
  ]
})

export default router;
