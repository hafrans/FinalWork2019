<template>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data () {
    return {
      //
    }
  },
  methods:{
    async checkStatus(resp){
      if(typeof resp.data.status != 'undefined'){
          if(resp.data.status == 3){
            this.$router.push("/login");
          }
      }
      return resp;
    }
  },
  beforeMount(){
    this.$store.dispatch('syncAnnounce')
    .then(e => {
      //eslint-disable-next-line
      console.log(e)
    })
    .catch(e => {
       //eslint-disable-next-line
        console.log(e)
    })
  }
}
</script>
