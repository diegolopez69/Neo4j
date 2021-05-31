<template>
  <section>
    <h3 class="title is-3">Agregar competición</h3>
    <b-field label="Nombre de la competición">
      <b-input v-model="nombre"></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>

    <b-button
      label="Agregar"
      type="is-primary"
      icon-right="check"
      @click="addCompeticiones()"
    />

    <hr />
    <h3 class="title is-3">Eliminar competición</h3>
    <b-field label="Nombre de la competición">
      <b-input v-model="borrar"></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>
    <b-button
      label="Eliminar competición"
      type="is-primary"
      @click="deleteCompeticiones()"
    />
    <hr />

    <div
      class="card"
      v-for="competicion in competiciones"
      :key="competicion.id"
    >
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <!-- <b-table :data="data" :columns="columns"></b-table> -->
            <p class="title is-4">{{ competicion.nombre }}</p>
            <p class="subtitle is-6">{{ competicion.id }}</p>
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
      competiciones: null,
      nombre: "",
      borrar: "",
    };
  },
  beforeMount() {
    this.getCompeticiones();
  },
  methods: {
    async getCompeticiones() {
      const { data } = await axios.get("http://localhost:3000/competicion/get");
      this.competiciones = data.competiciones;
    },
    async addCompeticiones() {
      const { data } = await axios.post(
        "http://localhost:3000/competicion/add",
        { nombre: this.nombre }
      );
      await this.getCompeticiones();
    },
    async deleteCompeticiones() {
      const {
        data,
      } = await axios.post("http://localhost:3000/competicion/delete", {
        nombre: this.borrar,
      });
      await this.getCompeticiones();
    },
  },
};
</script>
