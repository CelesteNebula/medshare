import { createRouter, createWebHistory } from 'vue-router';
import DoctorLogin from '../views/DoctorLogin.vue';
import DoctorRegister from '../views/DoctorRegister.vue';
import DoctorDashboard from '../views/DoctorDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'DoctorLogin',
    component: DoctorLogin,
  },
  {
    path: '/doctor-register',
    name: 'DoctorRegister',
    component: DoctorRegister,
  },
  {
    path: '/doctor-dashboard',
    name: 'DoctorDashboard',
    component: DoctorDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
