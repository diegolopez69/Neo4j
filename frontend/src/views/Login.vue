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
              
              placeholder="Introduce tu usuario"
              required
              v-model="nombre"
            >
            </b-input>
          </b-field>

          <b-field label="Contraseña">
            <b-input
              type="password"
              
              password-reveal
              placeholder="Introduce tu contraseña"
              required
              v-model="contra"
            >
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button label="Login" type="is-primary" @click="entrar()"/>
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
      contra: "",
    };
  },
  beforeMount() {
    
  },
  methods: {
    async entrar() {
      const { data } = await axios.get("http://localhost:3000/login/entrar");
      if(data.login){
        console.log('lets see if is defined',this.$router);
        this.$router.push('/');
      }else{
        console.log('usuario o contraseña incorrectos');
      }
    }
  },
};
</script>