<template>
  <div>
    <v-container fill-height>
      <v-row justify="center" align="center" :class="'center-card'">
        <v-col md="4" lg="5">
          <v-card elevetation="1" :class="'general-border'">
            <v-card-text>
              <!-- Begins Login image -->
              <v-row justify="center" align="center">
                <v-col md="6" align="center">
                  <v-img
                    :aspect-ratio="10 / 9"
                    :class="'image-login image-login--rounded'"
                    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                  ></v-img>
                </v-col>
              </v-row>
              <!-- Ends Login image -->
              <!-- Begin body -->
              <v-row justify="center" style="margin-top: 1em;">
                <v-col md="8" justify="center">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <div class="input-label">
                      <label>Usuario:</label>
                    </div>
                    <v-text-field
                      v-model="name"
                      solo
                      background-color="#c4c4c420"
                      :rules="nameRules"
                      label="Nombre"
                      required
                      :class="'general-border'"
                    ></v-text-field>
                    <div class="input-label">
                      <label>Contraseña</label>
                    </div>
                    <v-text-field
                      v-model="password"
                      solo
                      background-color="#c4c4c420"
                      :rules="passwordRules"
                      label="Contraseña"
                      type="password"
                      required
                      :class="'general-border'"
                    ></v-text-field>
                  </v-form>
                </v-col>
              </v-row>
              <!-- Ends body -->
              <v-row justify="center">
                <v-col md="6">
                  <v-btn
                    color="primary"
                    class="mr-4 general-border"
                    @click="validate"
                    block
                    elevation="2"
                  >
                    Ingresar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  
};
</script>
