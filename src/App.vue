<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {request} from './network/request';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted(){
    // request({
    // url:'blist/all/1/2'
    // }).then(res => {
    //   console.log("mei");
    //   console.log(res);
    //   datalist = res;
    // }).catch(err => {
    //   // console.log(err);
      
    // })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* background-color: red; */
  /* display: flex;
  justify-content: center; */
}
</style>
