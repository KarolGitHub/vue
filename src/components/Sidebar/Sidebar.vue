<template>
  <nav
    class="md:left-0 dark:bg-black md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button" @click="toggleCollapseShow('bg-white m-2 py-3 px-6')">
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <router-link
        class="md:block dark:text-white text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
        to="/">
        Vue Dashboard
      </router-link>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <notification-dropdown />
        </li>
        <li class="inline-block relative">
          <user-dropdown />
        </li>
      </ul>
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        :class="collapseShow">
        <hr class="my-4 md:min-w-full" />
        <ul class="flex-col md:flex-row list-none items-center hidden md:flex mr-2">
          <select-theme-dropdown></select-theme-dropdown>
        </ul>
        <!-- Collapse header -->
        <div class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                to="/">
                Vue Dashboard
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                @click="toggleCollapseShow('hidden')">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <input type="text" placeholder="Search"
              class="px-3 py-2 h-12 border border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal" />
          </div>
        </form>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
          Admin Layout Pages
        </h6>
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="inline-flex">
            <router-link v-slot="{ href, navigate, isActive }" to="/admin/dashboard">
              <a :href="href" class="text-xs uppercase py-3 font-bold block" :class="[
                isActive
                  ? 'text-emerald-500 hover:text-emerald-600'
                  : 'text-blueGray-700 dark:text-white hover:text-blueGray-500',
              ]" @click="navigate">
                <i class="fas fa-tv mr-2 text-sm" :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"></i>
                Dashboard
              </a>
            </router-link>
          </li>

          <li class="inline-flex">
            <router-link v-slot="{ href, navigate, isActive }" to="/admin/stock">
              <a :href="href" class="text-xs uppercase py-3 font-bold block" :class="[
                isActive
                  ? 'text-emerald-500 hover:text-emerald-600'
                  : 'text-blueGray-700 dark:text-white hover:text-blueGray-500',
              ]" @click="navigate">
                <i class="fas fa-chart-line mr-2 text-sm" :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"></i>
                Stock
              </a>
            </router-link>
          </li>

          <li class="inline-flex">
            <router-link v-slot="{ href, navigate, isActive }" to="/admin/tables">
              <a :href="href" class="text-xs uppercase py-3 font-bold block" :class="[
                isActive
                  ? 'text-emerald-500 hover:text-emerald-600'
                  : 'text-blueGray-700 dark:text-white hover:text-blueGray-500',
              ]" @click="navigate">
                <i class="fas fa-table mr-2 text-sm" :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"></i>
                Tables
              </a>
            </router-link>
          </li>

          <li class="inline-flex">
            <router-link v-slot="{ href, navigate, isActive }" to="/admin/maps">
              <a :href="href" class="text-xs uppercase py-3 font-bold block" :class="[
                isActive
                  ? 'text-emerald-500 hover:text-emerald-600'
                  : 'text-blueGray-700 dark:text-white hover:text-blueGray-500',
              ]" @click="navigate">
                <i class="fas fa-map-marked mr-2 text-sm" :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"></i>
                Maps
              </a>
            </router-link>
          </li>

          <li class="inline-flex">
            <router-link v-slot="{ href, navigate, isActive }" to="/admin/pos">
              <a :href="href" class="text-xs uppercase py-3 font-bold block" :class="[
                isActive
                  ? 'text-emerald-500 hover:text-emerald-600'
                  : 'text-blueGray-700 dark:text-white hover:text-blueGray-500',
              ]" @click="navigate">
                <i class="fas fa-calculator mr-2 text-sm" :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"></i>
                POS
              </a>
            </router-link>
          </li>

          <li class="inline-flex">
            <router-link v-slot="{ href, navigate, isActive }" to="/admin/sliders">
              <a :href="href" class="text-xs uppercase py-3 font-bold block" :class="[
                isActive
                  ? 'text-emerald-500 hover:text-emerald-600'
                  : 'text-blueGray-700 dark:text-white hover:text-blueGray-500',
              ]" @click="navigate">
                <i class="fas fa-sliders-h mr-2 text-sm" :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"></i>
                Sliders
              </a>
            </router-link>
          </li>

          <li class="inline-flex">
            <router-link v-slot="{ href, navigate, isActive }" to="/admin/settings">
              <a :href="href" class="text-xs uppercase py-3 font-bold block" :class="[
                isActive
                  ? 'text-emerald-500 hover:text-emerald-600'
                  : 'text-blueGray-700 dark:text-white hover:text-blueGray-500',
              ]" @click="navigate">
                <i class="fas fa-tools mr-2 text-sm" :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"></i>
                Settings
              </a>
            </router-link>
          </li>
        </ul>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
          Auth Layout Pages
        </h6>
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          <li class="inline-flex">
            <router-link
              class="text-blueGray-700 dark:text-white hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
              to="/auth/login">
              <i class="fas fa-fingerprint text-blueGray-300 mr-2 text-sm"></i>
              Login
            </router-link>
          </li>

          <li class="inline-flex">
            <router-link
              class="text-blueGray-700 dark:text-white hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
              to="/auth/register">
              <i class="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
              Register
            </router-link>
          </li>
        </ul>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
          No Layout Pages
        </h6>
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          <li class="inline-flex">
            <router-link
              class="text-blueGray-700 dark:text-white hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
              to="/about">
              <i class="fas fa-newspaper text-blueGray-300 mr-2 text-sm"></i>
              About Page
            </router-link>
          </li>

          <li class="inline-flex">
            <router-link
              class="text-blueGray-700 dark:text-white hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
              to="/profile">
              <i class="fas fa-user-circle text-blueGray-300 mr-2 text-sm"></i>
              Profile Page
            </router-link>
          </li>
        </ul>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
      </div>
    </div>
  </nav>
</template>
); }

<script>
import NotificationDropdown from '@/components/Dropdowns/NotificationDropdown/NotificationDropdown.vue';
import UserDropdown from '@/components/Dropdowns/UserDropdown/UserDropdown.vue';
import SelectThemeDropdown from "@/components/Dropdowns/SelectThemeDropdown/SelectThemeDropdown.vue";

export default {
  components: {
    NotificationDropdown,
    UserDropdown,
    SelectThemeDropdown,
  },
  data() {
    return {
      collapseShow: 'hidden',
    };
  },
  methods: {
    toggleCollapseShow(classes) {
      this.collapseShow = classes;
    },
  },
};
</script>

