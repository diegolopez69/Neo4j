<template>
    <section>
        <h3 class="title is-3">Relacionar competición-equipo</h3>
        <b-field label="Nombre de la competición">
            <b-input></b-input>
            <!-- <b-input v-model="name"></b-input> -->
        </b-field>
        <b-field label="Nombre del equipo">
            <b-input></b-input>
            <!-- <b-input v-model="name"></b-input> -->
        </b-field>
        <b-button
                label="Agregar"
                type="is-primary"
                icon-right="check"
                 />         
    </section>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return {
                competiciones: null
            }
        },
        beforeMount() {
            this.agarrarCompeticiones();
        },
        methods: {
            async agarrarCompeticiones() {
                const {
                    data
                } = await axios.get("http://localhost:3000/competicion/equipo/add");
                this.competiciones = data.competiciones;
            }
        }
    }
</script>