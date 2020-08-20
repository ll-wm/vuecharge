<template>
  <div class="main">
    <!-- <Button>按钮</Button> -->
    <Menu></Menu>
  </div>
</template>

<script>
import {Button} from 'ant-design-vue'
// import {request} from '../network/request';
import Menu from './menu'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  components: {
   Button,
   Menu
  },
  data() {
    return {
     
    } 
  },
  props: {
   
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  height: 705px;
  width: 100%;
  
}
</style>




