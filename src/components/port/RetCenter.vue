<template>
     <v-btn
              fixed
              dark
              fab
              bottom
              right
              color="primary"
              style="bottom:10em;right:3em;"
              @click="retCenter"
            >
            <v-icon>center_focus_strong</v-icon>
            </v-btn>


</template>
<script>
export default {
    props:{
        entity:{
            type:Object,
            required:true
        }
    },
    methods:{
        retCenter(){
            let point = new this.entity.BMap.Point(this.$store.state.port.defaultCenter.lng,this.$store.state.port.defaultCenter.lat);
            let zoom = this.$store.state.port.defaultZoom;
            //eslint-disable-next-line
            //console.log(point,zoom)
            this.entity.map.centerAndZoom(point,zoom);
        }
    }
}
</script>
