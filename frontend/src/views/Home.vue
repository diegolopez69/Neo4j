<template>
  <div class="home">
    <h3 class="title is-3">Grafo de nodos</h3>
    <d3-network ref='net' :net-nodes="nodes" :net-links="links" :options="options" />
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'
export default {
  name: "Home",
  components: {
    D3Network
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
      links: [
        { sid: 1, tid: 2 },
        { sid: 2, tid: 8 },
        { sid: 3, tid: 4,  _svgAttrs:{'stroke-width':8,opacity:1},name:'custom link' },
        { sid: 4, tid: 5 },
        { sid: 5, tid: 6 },
        { sid: 7, tid: 8 },
        { sid: 5, tid: 8 },
        { sid: 3, tid: 8 },
        { sid: 7, tid: 9 }
      ],
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
