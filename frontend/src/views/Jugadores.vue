<template>
    <section>
        <div class="card" v-for="competicion in competiciones" :key="competicion.id">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img :src="competicion.img" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">{{ competicion.id }}</p>
                        <p class="subtitle is-6">{{ competicion.nombre }}</p>
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
                competiciones: null
            }
        },
        beforeMount() {
            this.agarrarCompeticiones();
        },
        methods: {
            async agarrarCompeticiones() {
                const {data} = await axios.get("http://localhost:3000/jugadores/buscar");
                this.competiciones = data.competiciones;
            }
        }
    }
</script>