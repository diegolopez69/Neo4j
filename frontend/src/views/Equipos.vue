<template>
  <section>
    <h3 class="title is-3">Agregar equipo</h3>
    <b-field label="Nombre del equipo">
      <b-input v-model="nombre"></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>

    <b-field label="Mensaje">
      <b-input maxlength="200" type="textarea"></b-input>
    </b-field>
    <b-button label="Agregar" type="is-primary" icon-right="check" @click="addEquipo()"/>

    <hr />
    <h3 class="title is-3">Eliminar equipo</h3>
    <b-field label="Nombre del equipo">
      <b-input v-model="borrar"></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>
    <b-button label="Eliminar equipo" type="is-primary" @click="deleteEquipo();"/>
    <hr />

    <div
      class="card"
      v-for="equipo in equipos"
      :key="equipo.id"
    >
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <!-- <b-table :data="data" :columns="columns"></b-table> -->
            <p class="title is-4">{{ equipo.nombre }}</p>
            <p class="subtitle is-6">{{ equipo.id }}</p>
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
      equipos: null,
      nombre:"",
      borrar:"",
    };
  },
  beforeMount() {
    this.getEquipo();
  },
  methods: {
    async getEquipo() {
      const { data } = await axios.get("http://localhost:3000/equipo/get");
      this.equipos = data.equipos;
    },
    async addEquipo() {
      const { data } = await axios.post("http://localhost:3000/equipo/add",{nombre: this.nombre});
      await this.getEquipo();
    },
    async deleteEquipo() {
      const { data } = await axios.post("http://localhost:3000/equipo/delete", {nombre: this.borrar});
      await this.getEquipo();
    }
  },
};
</script>