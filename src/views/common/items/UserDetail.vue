<template>
  <v-container grid-list-xs>
    <v-layout wrap>
      <v-flex xs12>
        <v-card flat>
          <v-img :src="require('../../../assets/back1.jpg')" height="150">
            <v-container fill-height>
              <v-layout fill-height wrap>
                <v-flex xs12>
                  <v-btn icon @click="$router.go(-1)">
                    <v-icon>arrow_back</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs12 v-once>
                  <div style="padding-left:4em">
                    <span style class="headline">{{user.nick}}</span>
                    <br>
                    <span style="color:#ccc;display:inline-block;">{{user.main_role}}</span>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-fade-transition>
          <template v-if="mode != 'edit'">
            <v-card color="blue darken-2" class="white--text">
              <v-card-text>
                <h4>用户信息</h4>
                <v-container style="font-size:1.5em; font-weight:300">
                  <v-layout wrap>
                    <v-flex xs4>用户id</v-flex>
                    <v-flex xs8>
                      <span>{{user.id}}</span>
                    </v-flex>
                    <v-divider/>
                    <v-flex xs4>用户名</v-flex>
                    <v-flex xs8>{{user.username}}</v-flex>
                    <v-flex xs4>昵称</v-flex>
                    <v-flex xs8>{{user.nick}}</v-flex>
                    <v-flex xs4>注册时间</v-flex>
                    <v-flex xs8>{{user.register_time}}</v-flex>
                    <v-flex xs4>最近登录时间</v-flex>
                    <v-flex xs8>{{user.last_login_time}}</v-flex>
                    <v-flex xs4>锁定状态</v-flex>
                    <v-flex xs8>{{user.locked == true ? '已锁定':'未锁定'}}</v-flex>
                    <v-flex xs4>角色</v-flex>
                    <v-flex xs8>{{user.main_role}}</v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </template>
          <template v-else>
            <v-card color="blue darken-2" class="gray--text">
              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="user.nick"
                      :counter="15"
                      :rules="[v=>!!v || '需要填写昵称',v => (v.length > 3 || v.length <= 15 ) || '昵称长度不合法']"
                      label="昵称"
                      required
                    ></v-text-field>
                    <v-checkbox label="用户锁定" v-model="user.locked"/>
                    <v-text-field
                      count="16"
                      type="password"
                      v-model="user.password"
                      label="新密码(为空则不修改)"
                    />
                    <v-text-field
                      count="16"
                      type="password"
                      label="确认新密码"
                      :rules="[v => (!!v || !v & user.password.length ==0) || '请输入确认密码',v => (v == user.password || !v) || '两次密码输入不匹配！']"
                    />

                    <!-- 
                    <v-select
                      v-model="select"
                      :items="items"
                      :rules="[v => !!v || 'Item is required']"
                      label="Item"
                      required
                    ></v-select>

                    <v-checkbox
                      v-model="checkbox"
                      :rules="[v => !!v || 'You must agree to continue!']"
                      label="Do you agree?"
                      required
                    ></v-checkbox>

                    <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>

                    <v-btn color="error" @click="reset">Reset Form</v-btn>

                    <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>-->
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="commit">确认修改</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-fade-transition>
      </v-flex>
      <!-- <v-flex xs12>
        <v-card>
          <v-card-actions>
            <v-btn @click="mode = 'edit'">asd</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ["type", "id"],
  inject: ["showMessageDialog", "showConfirmDialog"],
  data() {
    return {
      mode: "view",
      user: {
        id: 1000,
        username: "倪伏琴",
        nick: "nick",
        main_role: "superadmin",
        register_time: "2019-03-16 12:34:56",
        last_login_time: "2019-03-18 12:34:56",
        locked: false,
        password: ""
      }
    };
  },
  beforeMount() {
    if (typeof this.type == "string" && this.type == "edit") {
      this.mode = "edit";
      this.$store
        .dispatch("fetchUserById", { id: parseInt(this.id) })
        .then(res => {
            this.user = res;
        });
    } else if (typeof this.type == "string" && this.type == "create") {
      this.mode = "create";
    } else {
      this.mode = "view";
      this.$store
        .dispatch("fetchUserById", { id: parseInt(this.id) })
        .then(res => {
            this.user = res;
        });
    }
  },
  methods: {
    commit() {
      if (this.mode != "edit") {
        this.showMessageDialog("非法提交!");
      }
      //check
      if (!this.$refs.form.validate()) {
        return;
      }

      //判断password 修改
      if (this.user.password.length == 0) {
        //没填充
      }

      this.$store.dispatch('commitUser',{id:this.user.id,body:this.user,mode:'edit'})
      .then(res => {
          if(res){
              this.showMessageDialog("修改成功！");
          }else{
              this.showMessageDialog("修改失败！");
          }
      }).catch(()=>{
        this.showMessageDialog("修改失败！");  
      });

    }
  }
};
</script>
<style lang="less" scoped>
</style>
