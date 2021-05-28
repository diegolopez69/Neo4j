<template>
  <section>
    <h3 class="title is-3">Relacionar competición-equipo</h3>
    <b-field label="Nombre de la competición">
      <b-input v-model="nombreCompeticion"></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>
    <b-field label="Nombre del equipo">
      <b-input v-model="nombreEquipo"></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>
    <b-button
      label="Agregar"
      type="is-primary"
      icon-right="check"
      @click="postCompeticionEquipo()"
    />
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      competiciones: null,
      nombreCompeticion: "",
      nombreEquipo: "",
    };
  },
  beforeMount() {
  },
  methods: {
    async postCompeticionEquipo() {
      const {
        data,
      } = await axios.post("http://localhost:3000/competicion/equipo/add", {
        nombre: this.nombreCompeticion,
        nombre: this.nombreEquipo,
      });
      this.competiciones = data.competiciones;
    },
  },
};
</script>
