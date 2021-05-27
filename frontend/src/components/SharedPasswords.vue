<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="passwords"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Equipos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "SharedPasswords",
  data: () => ({
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Usuario", value: "user" },
      { text: "Contraseña", value: "password" },
      { text: "IP", value: "ip" },
      { text: "Puerto", value: "port" },
    ],
    passwords: [],
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.passwords = [
        {
          name: "Frozen Yogurt",
          user: "user1",
          password: "hrhdgsg",
          ip: "172.44.55.90",
          port: 4000
        },
        {
          name: "Ice cream sandwich",
          user: "user2",
          password: "hrhdgsggggg",
          ip: "172.44.55.90",
          port: 6000
        },
        {
          name: "Eclair",
          user: "user3",
          password: "hrhdgsg",
          ip: "172.44.55.90",
          port: 4000
        },
        {
          name: "Cupcake",
          user: "user1",
          password: "hrhdgsg",
          ip: "172.44.55.90",
          port: 4000
        },
        {
          name: "Gingerbread",
          user: "user1",
          password: "hrhdgsg",
          ip: "172.44.55.90",
          port: 4000
        },
        {
          name: "Jelly bean",
          user: "user1",
          password: "hrhdgsg",
          ip: "172.44.55.90",
          port: 4000
        },
        {
          name: "Lollipop",
          user: "user1",
          password: "hrhdgsg",
          ip: "172.44.55.90",
          port: 4000
        },
        {
          name: "Honeycomb",
          user: "user1",
          password: "hrhdgsg",
          ip: "172.44.55.90",
          port: 4000
        },
        {
          name: "Donut",
          user: "user1",
          password: "hrhdgsg",
          ip: "172.44.55.90",
          port: 4000
        },
        {
          name: "KitKat",
          user: "user1",
          password: "hrhdgsg",
          ip: "172.44.55.90",
          port: 4000
        }
      ];
    },
  }
};
</script>
