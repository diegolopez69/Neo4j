<template>
  <section>
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Login</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Usuario">
            <b-input
              type="text"
              :value="text"
              placeholder="Introduce tu usuario"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Contraseña">
            <b-input
              type="password"
              :value="password"
              password-reveal
              placeholder="Introduce tu contraseña"
              required
            >
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button label="Login" type="is-primary" />
        </footer>
      </div>
    </form>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      jugadores: null,
      nombre: "",
      borrar: "",
    };
  },
  beforeMount() {
    this.getJugador();
  },
  methods: {
    async getJugador() {
      const { data } = await axios.get("http://localhost:3000/jugador/get");
      this.jugadores = data.jugadores;
    },
    async addJugador() {
      const { data } = await axios.post("http://localhost:3000/jugador/add", {
        nombre: this.nombre,
      });
      this.jugadores = data.jugadores;
    },
    async deleteJugador() {
      const { data } = await axios.post(
        "http://localhost:3000/jugador/delete",
        { nombre: this.borrar }
      );
      this.jugadores = data.jugadores;
    },
  },
};
</script>