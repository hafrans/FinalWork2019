<template>
  <div>
    <navi/>
    <router-view>
      <v-alert color="warning">There is no components In Function.</v-alert>
    </router-view>
    <status-bar/>
  </div>
</template>
<script>
import Navi from "../../../components/Navigator";
import StatusBar from "../../../components/StatusBar";
export default {
    components:{
        StatusBar,
        Navi
    }
};
</script>
<style lang="less" scoped>
</style>


