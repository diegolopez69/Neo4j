<template>
  <section>
    <h3 class="title is-3">Relacionar equipo-jugador</h3>
    <b-field label="Nombre del equipo">
      <b-input></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>
    <b-field label="Nombre del jugador">
      <b-input></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>
    <b-button label="Agregar" type="is-primary" icon-right="check" />
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
    this.getEquiposJugador();
  },
  methods: {
    async getEquiposJugador() {
      const { data } = await axios.post(
        "http://localhost:3000/jugador/equipo/add"
      );
      this.competiciones = data.competiciones;
    },
  },
};
</script>
