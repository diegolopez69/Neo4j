<template>
  <div>
    <v-container fill-height>
      <v-row justify="center" align="center" :class="'center-card'">
        <v-col>
          <v-card max-width="344" @click="routeToPassWords()">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>

            <v-card-title>
              Group Delta
            </v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card max-width="344" @click="routeToPassWords()">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>


            <v-card-title>
              Group Echoe
            </v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card max-width="344" @click="routeToPassWords()">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>

            <v-card-title>
              Group Foxtrot
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    routeToPassWords() {
      this.$router.push({ name: "Passwords" });
    }
  }
};
</script>
