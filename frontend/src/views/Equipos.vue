<template>
  <section>
    <h3 class="title is-3">Agregar</h3>
    <b-field label="Nombre del equipo">
      <b-input></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>

    <b-field label="Mensaje">
      <b-input maxlength="200" type="textarea"></b-input>
    </b-field>
    <b-button label="Agregar" type="is-primary" icon-right="check" />

    <hr />
    <h3 class="title is-3">Eliminar</h3>
    <b-field label="Nombre del equipo">
      <b-input></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>
    <b-button label="Eliminar equipo" type="is-primary"/>
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
    };
  },
  beforeMount() {
    this.agarrarCompeticiones();
  },
  methods: {
    async agarrarCompeticiones() {
      const { data } = await axios.get("http://localhost:3000/equipo/buscar");
      this.competiciones = data.competiciones;
    },
  },
};
</script>