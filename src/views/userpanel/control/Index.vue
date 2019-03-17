<template>
   <v-app>
      <v-layout flat>
          <v-flex xs2 >
            <drawer/>
          </v-flex>
          <v-flex xs9 class="right-panel">
              <home/>
          </v-flex>
      </v-layout>

   </v-app>
</template>
<script>

import Drawer from '../../../components/user/LeftPanel';
import Home from './items/Home.vue';


export default {
    components:{
        Drawer,Home
    }
}
</script>
<style lang="less" scoped>
    .right-panel{
        padding: 2rem 2rem;
    }
    @media screen and (max-width: 1366px) {
        .right-panel{
            padding: 0rem 0;
            width: 100;

        }
    }

</style>

