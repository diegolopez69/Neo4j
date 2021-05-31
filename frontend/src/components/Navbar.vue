<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/competiciones' }">
        Competiciones
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/equipos' }">
        Equipos
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/jugadores' }">
        Jugadores
      </b-navbar-item>
      <b-navbar-dropdown label="Relacionar">
        <b-navbar-item tag="router-link" :to="{ path: '/competicionEquipo' }">
          Competiciones - Equipos
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/equipoJugador' }">
          Equipos - Jugadores
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item tag="router-link" :to="{ path: '/usuarios' }">
        Usuarios
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-light">
            Log in
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  //@click="$router.push('/')"
};
</script>
