<template>
  <section>
    <h3 class="title is-3">Agregar jugador</h3>
    <b-field label="Nombre del jugador">
      <b-input v-model="nombre"></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>

    <b-field label="Mensaje">
      <b-input maxlength="200" type="textarea"></b-input>
    </b-field>
    <b-button label="Agregar" type="is-primary" icon-right="check" @click="addJugador()"/>

    <hr />
    <h3 class="title is-3">Eliminar jugador</h3>
    <b-field label="Nombre del jugador">
      <b-input v-model="borrar"></b-input>
      <!-- <b-input v-model="name"></b-input> -->
    </b-field>
    <b-button label="Eliminar jugador" type="is-primary" @click="deleteJugador();"/>
    <hr />

    <div
      class="card"
      v-for="jugador in jugadores"
      :key="jugador.id"
    >
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <!-- <b-table :data="data" :columns="columns"></b-table> -->
            <p class="title is-4">{{ jugador.nombre }}</p>
            <p class="subtitle is-6">{{ jugador.id }}</p>
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
                jugadores: null,
                nombre: "",
                borrar:"",
            }
        },
        beforeMount() {
            this.getJugador();
        },
        methods: {
            async getJugador() {
                const {data} = await axios.get("http://localhost:3000/jugador/get");
                console.log(data);
                this.jugadores = data.jugadores;
            },
            async addJugador() {
                const {data} = await axios.post("http://localhost:3000/jugador/add", {nombre: this.nombre});
                this.jugadores = data.jugadores;
            },
            async deleteJugador() {
                const {data} = await axios.post("http://localhost:3000/jugador/delete", {nombre: this.borrar});
                this.jugadores = data.jugadores;
            },
        }
    }
</script>