<template>
  <v-container grid-list-xs>
    <v-layout wrap>
      <v-flex xs12>
        <v-card color="#424242">
          <v-card-text>用户管理</v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" @click="showMessageDialog('不支持用户的批量更改')">
              <v-icon>create</v-icon>&nbsp;&nbsp;
              用户修改
            </v-btn>
            <v-btn color="green" @click="enable">
              <v-icon>report</v-icon>&nbsp;&nbsp;
              解锁
            </v-btn>
            <v-btn color="warning" @click="disable">
              <v-icon>remove_circle</v-icon>&nbsp;&nbsp;
              加锁
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
              <td class="text-xs-center">{{props.item.id}}</td>
              <td class="text-xs-center">{{props.item.username}}</td>
              <td class="text-xs-center">{{props.item.main_role}}</td>
              <td class="text-xs-center">{{props.item.register_time}}</td>
              <td class="text-xs-center">{{props.item.last_login_time}}</td>
              <td class="text-xs-center">{{props.item.locked == true ? '是' : '否'}}</td>
              <td>
                <v-btn icon @click.stop="$router.push('/admin/user/edit/'+props.item.id)">
                  <v-icon>create</v-icon>
                </v-btn>
                <v-btn icon @click.stop="$router.push('/admin/user/view/'+props.item.id)">
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
            <v-btn color="primary" @click="showMessageDialog('不支持用户的批量更改')">
              <v-icon>create</v-icon>&nbsp;&nbsp;
              用户修改
            </v-btn>
            <v-btn color="green" @click="enable">
              <v-icon>report</v-icon>&nbsp;&nbsp;
              解锁
            </v-btn>
            <v-btn color="warning" @click="disable">
              <v-icon>lock</v-icon>&nbsp;&nbsp;
              加锁
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
export default {
  inject: ["showMessageDialog", "showConfirmDialog"],
  data() {
    return {
      headers: [
        {
          text: "用户ID",
          value: "id"
        },
        {
          text: "用户名",
          value: "username"
        },
        {
          text: "角色",
          value: "main_role"
        },
        {
          text: "注册时间",
          value: "register_time"
        },
        {
          text: "上次登录时间",
          value: "last_login_time"
        },
        {
          text: "是否被锁定",
          value: "locked"
        }
      ],
      items: [],
      pagination: {
        rowsPerPage: 10
      },
      selected: []
    };
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
      for (let i of this.selected) {
        //eslint-disable-next-line
        console.log(i);
        i.locked = false;
      }
      this.showMessageDialog(
        "您成功地将" + this.selected.length + "个用户解锁"
      );
    },
    disable() {
      if (!this.checkSelected()) return;
      for (let i of this.selected) {
        //eslint-disable-next-line
        console.log(i);
        i.locked = true;
      }
      this.showMessageDialog(
        "您成功地将" + this.selected.length + "个用户加锁"
      );
    },
    remove() {
      if (!this.checkSelected()) return;
      this.showConfirmDialog("您确定要删除吗？删除后无法恢复！", "提示", () => {
        this.items = this.items.filter(e => {
          for (let j of this.selected) {
            if (j.id == e.id) return 0;
          }
          return 1;
        });
        //收集删除的id
        //TODO 更新
        this.$store.state.users = this.items;

        //回显
        this.showMessageDialog("删除成功！");
      });
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.items.slice();
    }
  },
  beforeMount() {
    this.items = this.$store.state.users;
    //eslint-disable-next-line
    console.log(this.items);
  }
};
</script>
<style>
</style>
