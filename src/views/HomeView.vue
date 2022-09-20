<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios"
export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  created() {
    this.getV1()
    this.getApi()
  },
  methods: {
    getApi(){
      axios({
      url:process.env.VUE_APP_BASE_API,
      methed:"GET"
    }).then(response=> {
      console.log("api",response)
    }).catch(error=> {
      console.log("api",error)
    })
    },
    getV1(){
      axios({
      url:process.env.VUE_APP_BASE_V1,
      methed:"GET"
    }).then(response=> {
      console.log("v1",response)
    }).catch(error=> {
      console.log("v1",error)
    })
    }
  },
}
</script>
