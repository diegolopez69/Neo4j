<template>
  <section>
    <h3 class="title is-3">Relacionar equipo-jugador</h3>
    <b-field label="Nombre del equipo">
      <b-input v-model="nombreEquipo"></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>
    <b-field label="Nombre del jugador">
      <b-input v-model="nombreJugador"></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>
    <b-button label="Agregar" type="is-primary" icon-right="check" @click="getEquiposJugador()"/>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      competiciones: null,
      nombreEquipo: "",
      nombreJugador: "",
    };
  },
  beforeMount() {
    this.getEquiposJugador();
  },
  methods: {
    async getEquiposJugador() {
      const { data } = await axios.post(
        "http://localhost:3000/jugador/equipo/add", {
          nombreEquipo: this.nombreEquipo,
          nombreJugador: this.nombreJugador,
        }
      );
      this.competiciones = data.competiciones;
    },
  },
};
</script>
