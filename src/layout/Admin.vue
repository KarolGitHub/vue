<template>
  <div class="h-full">
    <SpinnerLoading></SpinnerLoading>
    <Toast></Toast>
    <sidebar />
    <div class="h-full relative md:ml-64 bg-blueGray-100">
      <admin-navbar />
      <header-stats />
      <div class="px-4 dark:bg-black md:px-10 mx-auto w-full -m-24">
        <router-view />
        <footer-admin />
      </div>
    </div>
  </div>
</template>
<script>
import AdminNavbar from '@/components/Navbars/AdminNavbar.vue';
import Sidebar from '@/components/Sidebar/Sidebar.vue';
import HeaderStats from '@/components/Headers/HeaderStats/HeaderStats.vue';
import FooterAdmin from '@/components/Footers/FooterAdmin/FooterAdmin.vue';

export default {
  name: 'admin-layout',
  components: {
    AdminNavbar,
    Sidebar,
    HeaderStats,
    FooterAdmin,
  },
};
</script>
