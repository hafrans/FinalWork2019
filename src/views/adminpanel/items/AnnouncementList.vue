<template>
  <v-container grid-list-xs>
    <v-layout wrap>
      <v-flex xs12>
        <v-card color="#424242">
          <v-card-text>公告管理</v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" @click="showMessageDialog('不支持文章的批量更改')">
              <v-icon>create</v-icon>&nbsp;&nbsp;
              公告修改
            </v-btn>
            <v-btn color="warning" @click="enable">
              <v-icon>report</v-icon>&nbsp;&nbsp;
              内容可见
            </v-btn>
            <v-btn color="warning" @click="disable">
              <v-icon>remove_circle</v-icon>&nbsp;&nbsp;
              内容不可见
            </v-btn>
            <v-btn color="error" @click="remove">
              <v-icon>remove_circle</v-icon>&nbsp;&nbsp;
              删除
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="items"
          :pagination.sync="pagination"
          rows-per-page-text="每页"
        >
          <template #headers="props">
            <tr>
              <th>
                <v-checkbox
                  :input-value="props.all"
                  :indeterminate="props.indeterminate"
                  primary
                  hide-details
                  @click.stop="toggleAll"
                ></v-checkbox>
              </th>
              <th
                v-for="header in props.headers"
                :key="header.text"
                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                @click="changeSort(header.value)"
              >
                <v-icon small>arrow_upward</v-icon>
                {{ header.text }}
              </th>
              <th>操作</th>
            </tr>
          </template>
          <template v-slot:items="props">
            <tr :active="props.selected" @click="props.selected = !props.selected">
              <td>
                <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
              </td>
              <td>{{props.item.id}}</td>
              <td>{{props.item.title}}</td>
              <td>{{props.item.user}}</td>
              <td>{{props.item.time}}</td>
              <td>{{props.item.show == true ? '是' : '否'}}</td>
              <td>
                <v-btn icon @click.stop="$router.push('announceEdit/'+props.item.id)">
                  <v-icon>create</v-icon>
                </v-btn>
                <v-btn icon @click.stop="$router.push('announce/'+props.item.id)">
                  <v-icon>event_note</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
      <!-- 底部 -->
      <v-flex xs12>
        <v-card color="#424242">
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" @click="showMessageDialog('不支持文章的批量更改')">
              <v-icon>create</v-icon>&nbsp;&nbsp;
              公告修改
            </v-btn>
            <v-btn color="warning" @click="enable">
              <v-icon>report</v-icon>&nbsp;&nbsp;
              内容可见
            </v-btn>
            <v-btn color="warning" @click="disable">
              <v-icon>remove_circle</v-icon>&nbsp;&nbsp;
              内容不可见
            </v-btn>
            <v-btn color="error" @click="remove">
              <v-icon>remove_circle</v-icon>&nbsp;&nbsp;
              删除
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// import _ from 'lodash'

export default {
  inject: ["showMessageDialog", "showConfirmDialog"],
  data() {
    return {
      headers: [
        {
          text: "公告ID",
          value: "id"
        },
        {
          text: "公告标题",
          value: "title"
        },
        {
          text: "作者",
          value: "user"
        },
        {
          text: "发布时间",
          value: "time"
        },
        {
          text: "可见状态",
          value: "show"
        }
      ],
      selected: [],
      items: [],
      pagination: {
        sortBy: "time",
        rowsPerPage: 10
      }
    };
  },
  beforeMount() {
    this.items = this.$store.state.annoucements;
    //eslint-disable-next-line
    console.log(this.items);
  },
  methods: {
    test() {},
    checkSelected() {
      if (this.selected.length == 0) {
        this.showMessageDialog("您没有成功选择一条数据！");
        return false;
      }
      return true;
    },
    enable() {
      if (!this.checkSelected()) return;

      this.$store
        .dispatch("disableAnnounce", {
          id: this.selected
        })
        .then(() => {
          this.showMessageDialog(
            "您成功地将" + this.selected.length + "条数据置为可见状态"
          );
          for (let i of this.selected) {
            //eslint-disable-next-line
            console.log(i);
            i.show = true;
          }
        })
        .catch(e => {
          this.showMessageDialog(e.message);
        });
    },
    disable() {
      if (!this.checkSelected()) return;
      this.$store
        .dispatch("disableAnnounce", {
          id: this.selected
        })
        .then(() => {
          this.showMessageDialog(
            "您成功地将" + this.selected.length + "条数据置为不可见状态"
          );
          for (let i of this.selected) {
            //eslint-disable-next-line
            console.log(i);
            i.show = false;
          }
        })
        .catch(e => {
          this.showMessageDialog(e.message);
        });
    },
    remove() {
      if (!this.checkSelected()) return;
      this.showConfirmDialog("您确定要删除吗？删除后无法恢复！", "提示", () => {

        // this.items = this.items.filter(e => {
        //   for (let j of this.selected) {
        //     if (j.id == e.id) return 0;
        //   }
        //   return 1;
        // });
        this.$store.dispatch('removeAnnounce',{
          id: this.selected
        })
        .then(() => {
         
          //回显
          this.showMessageDialog("删除成功！");
        })
        .then(this.$store.dispatch('syncAnnounce'))
        .then(()=>{
          this.items = this.$store.state.annoucements;
        })
        .catch(e => {
          this.showMessageDialog(e.message);
        });
        

        
      });
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.items.slice();
    }
  }
};
</script>

