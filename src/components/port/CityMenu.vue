<template>
    <div class="slide-menu">
        <ul>
            <li class="active">
                <a @click="disableEdit">城市热度</a>
            </li>
            <li>
                <a @click="enableEdit">移动数据聚类</a>
            </li>

        </ul>
        <div class="slide-bar"></div>

    </div>
</template>
<script>
export default {
    methods: {
        enableEdit(){
            this.$router.push("/user/dashboard/port/edit")
        },
        disableEdit(){
            
            this.$router.push("/user/dashboard/port/index")
        }
    },
}
</script>
<style lang="less" scoped>
    
    @slide-width:20rem;
    @slide-height:5em;
    
    .slide-menu:hover{
        left: 0;
    }
    .slide-menu{
      
        z-index: 3024;
        position: fixed;
        width: @slide-width;
        height: @slide-height;
        top: (70% - @slide-height) / 2;
        left: -1 * @slide-width * 0.95;
        transition: left 0.5s;
        background: #282c34;

        font-size: 2.25rem;
        a{
            text-decoration: none;
            text-align: left;
            color:#EEEEEF;
            transition: color 0.3s; 
        }
        a:hover{
            color:darkgoldenrod;
            cursor: pointer;
        }
        ul{
            text-align: left;
            list-style: none;
            padding-left: 2rem;

            li {
                margin: 0.5em 0;
            }

            li:not(:first-child){
                border-top:1px dotted #dc4e41;
                padding-top: 0.5em;
            }
        }

        .slide-bar{
            position: absolute;
            height:100%;
            width:20px;
            z-index: 10;
            right: 0;
            top: 0;
            background: #dc4e41;
        }
        

    }
</style>


