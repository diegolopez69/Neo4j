<template>
  <section>
    <h3 class="title is-3">Crear un nuevo usuario</h3>
    <b-field label="Usuario">
      <b-input v-model="nombre"></b-input>
    </b-field>
    <b-field label="Contraseña">
      <b-input v-model="contraseña"></b-input>
    </b-field>
    <b-button
      label="Agregar"
      type="is-primary"
      icon-right="check"
      @click="addUsuario()"
    />

    <hr />
    <h3 class="title is-3">Eliminar un usuario</h3>
    <b-field label="Nombre del usuario">
      <b-input v-model="borrar"></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>
    <b-button
      label="Eliminar usuario"
      type="is-primary"
      @click="deleteUsuario()"
    />
    <hr />

    <div class="card" v-for="usuario in usuarios" :key="usuario.id">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <!-- <b-table :data="data" :columns="columns"></b-table> -->
            <p class="title is-4">{{ usuario.nombre }}</p>
            <p class="subtitle is-6">{{ usuario.id }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      usuarios: null,
      nombre: "",
      contraseña: "",
      borrar: "",
    };
  },
  beforeMount() {
    this.getUsuarios();
  },
  methods: {
    async getUsuarios() {
      const { data } = await axios.get("http://localhost:3000/usuario/get");
      this.usuarios = data.usuarios;
    },
    async addUsuario() {
      const { data } = await axios.post("http://localhost:3000/usuario/add", {
        nombre: this.nombre,
      });
      await this.getUsuarios();
    },
    async deleteUsuario() {
      const { data } = await axios.post("http://localhost:3000/usuario/delete", {
        nombre: this.borrar,
      });
      await this.getUsuarios();
    },
  },
};
</script>
