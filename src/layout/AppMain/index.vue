<template>
  <div>
    <app-link v-if="controllLink"></app-link>
    <router-view></router-view>
  </div>
</template>
<script>
import AppLink from "./link.vue"
export default {
    components:{
        AppLink
    },
    computed:{
        controllLink(){
            return (this.$route.path !== "/index")
        }
    }
}
</script>
