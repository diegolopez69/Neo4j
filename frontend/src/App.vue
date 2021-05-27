<template>
  <div id="app">
    <Navbar v-if="route.name !== 'Login'"/>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
export default {
  name: "App",
  computed: {
        route() {
            return this.$route;
        }
    },
  methods: {
    
  },
  components: {
    Navbar
  }
};
</script>