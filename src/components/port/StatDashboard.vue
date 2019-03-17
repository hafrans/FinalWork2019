<template>
  <div class="stat-dashboard">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">提示</v-card-title>
          <v-card-text>此功能暂时无法使用，因为没有正确连接真实设备，请在连接真设备后再试。</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialog = false">我知道了</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-data-table
      dark
      class="dtt"
      :items="abnormalInfos"
      :headers="headers"
      :loading="true"
      rows-per-page-text="每页行数"
      :rows-per-page-items="[3,5,7,10]"
    >
      <v-progress-linear #progress color="#424242" indeterminate></v-progress-linear>
      <template #no-data>暂无危险警示信息</template>
      <template #items="props">
        <td>{{ props.item.serialId }}</td>
        <td class="text-xs-left">{{ props.item.device }}</td>
        <td class="text-xs-left">{{ props.item.user }}</td>
        <!-- <td class="text-xs-left">{{ props.item.lng }}</td>
        <td class="text-xs-left">{{ props.item.lat }}</td>-->
        <td class="text-xs-center">
          <v-btn
            small
            color="warning"
            @click="highlight2(props.item.index)"
          >显示轨迹</v-btn>
          <v-btn small color="error" @click="dialog = true">通知</v-btn>
        </td>
      </template>
      <template
        #pageText="props"
      >第 {{ props.pageStart }} - {{ props.pageStop }} 条，共 {{ props.itemsLength }}条</template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  inject:['highlight'],
  data() {
    return {
      dialog:false,
      headers: [
        {
          text: "序号",
          align: "left",
          sortable: true,
          value: "serialId"
        },
        {
          text: "设备类型",
          align: "left",
          sortable: true,
          value: "device"
        },
        {
          text: "用户",
          align: "left",
          sortable: true,
          value: "user"
        },
        // {
        //   text: "经度",
        //   align: "left",
        //   sortable: true,
        //   value: "lng"
        // },
        // {
        //   text: "纬度",
        //   align: "left",
        //   sortable: true,
        //   value: "lat"
        // },
        {
          text: "操作",
          align: "center",
          sortable: true,
          value: "asd"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["abnormalInfos"])
  },
  created() {},
  methods: {
    highlight2(payload) {
     this.highlight(payload);
    }
  }
};
</script>
<style lang="less">
.stat-dashboard {
  background: rgba(30, 30, 30, 0.9);
  position: fixed;
  left: 0;
  z-index: 2024;
  bottom: 2.85em;
  width: 38%;
  max-height: auto;
  overflow: auto;
}
</style>

