<template>
  <div class="home">
    <h3 class="title is-3">Grafo de nodos</h3>
    <d3-network ref='net' :net-nodes="nodes" :net-links="links" :options="options" />
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'
import axios from 'axios';
export default {
  name: "Home",
  components: {
    D3Network
  },
  beforeMount() {
    this.getNodos();
  },
  methods: {
    async getNodos() {
      const {data} = await axios.get("http://localhost:3000/grafo");
      console.log('result in frontend',data.nodos);
      this.nodes = data.nodos;
    }
  },
  data () {
    return {
      nodes: [
        { id: 1, name: 'my awesome node 1'},
        { id: 2, name: 'my node 2'},
        { id: 3, name:'orange node', _color: 'orange' },
        { id: 4, _color: '#4466ff'},
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 }
      ],
      links: [],
      nodeSize:20,
      canvas:true
    }
  },
  computed:{
    options(){
      return{
        force: 3000,
        size:{ w:600, h:600},
        nodeSize: this.nodeSize,
        nodeLabels: true,
        linkLabels:true,
        canvas: this.canvas
      }
    }
  }
};
</script>
