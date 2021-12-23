<template>
  <router-view/>
</template>

<script>
//import axios from "axios";

export default {
  mounted() {
    this.authentication()
  },
  methods: {
    async authentication() {

    }
  }
}
</script>

<style lang="scss">
@import "assets/styles/index.scss";

body {
  padding: 0;
  margin: 0;
}

/*#nav {*/
/*  padding: 30px;*/
/*}*/

/*#nav a {*/
/*  font-weight: bold;*/
/*  color: #2c3e50;*/
/*}*/

/*#nav a.router-link-exact-active {*/
/*  color: #42b983;*/
/*}*/
</style>
