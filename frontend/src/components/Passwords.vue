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
          <v-toolbar-title>Contraseñas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.user"
                        label="Usuario"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Contraseña"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.ip"
                        label="IP"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.port"
                        label="Puerto"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >¿Seguro que quiere eliminar está contraseña?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogShare" max-width="500px">
            <v-card>
              <v-card-title class="headline">Compartir contraseña</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nombre"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.user"
                        label="Usuario"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Contraseña"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.ip"
                        label="IP"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.port"
                        label="Puerto"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeShare"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="shareItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <v-icon small @click="shareItem(item)">
          mdi-share
        </v-icon>
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
  name: "Passwords",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogShare: false,
    email: "",
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Usuario", value: "user" },
      { text: "Contraseña", value: "password", type: "password" },
      { text: "IP", value: "ip" },
      { text: "Puerto", value: "port" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    passwords: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      user: "",
      password: "",
      ip: "",
      port: 0
    },
    defaultItem: {
      name: "",
      user: "",
      password: "",
      ip: "",
      port: 0
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Agregar contraseña"
        : "Editar contraseña";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogShare(val) {
      val || this.closeShare();
    }
  },

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

    editItem(item) {
      this.editedIndex = this.passwords.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    shareItem(item) {
      this.editedIndex = this.passwords.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogShare = true;
    },

    deleteItem(item) {
      this.editedIndex = this.passwords.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.passwords.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    shareItemConfirm() {
      // this.passwords.splice(this.editedIndex, 1);
      this.closeShare();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeShare() {
      this.dialogShare = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.passwords[this.editedIndex], this.editedItem);
      } else {
        this.passwords.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
