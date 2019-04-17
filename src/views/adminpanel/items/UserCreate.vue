<template>
  <v-container grid-list-xs>
    <v-layout wrap>
      <v-flex>
        <v-card color="blue darken-2" class="gray--text">
          <v-card-text>
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="userBody.username"
                  :counter="15"
                  :rules="[v=>!!v || '需要填写用户名',v => (v.length > 3 || v.length <= 15 ) || '昵称长度不合法']"
                  label="用户名"
                  required
                ></v-text-field>
                <v-select v-model="userBody.role" label="角色" :items="roles" item-text="description" item-value="id"></v-select>
                <v-checkbox label="用户锁定" v-model="userBody.locked"/>
                <v-text-field
                  count="16"
                  type="password"
                  v-model="userBody.password"
                  label="新密码"
                />
                <v-text-field
                  count="16"
                  type="password"
                  label="确认新密码"
                  :rules="[v => (v == userBody.password || !v) || '两次密码输入不匹配！']"
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
            <v-btn flat color="white" @click="commit">新建用户</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    roles: [],
    userBody: {
      username: "",
      password: "",
      role: "",
      locked:false
    }
  }),
  inject: ["showMessageDialog", "showConfirmDialog"],
  beforeMount() {
    this.$axios
      .get("/role/list")
      .then(resp => {
        if (resp.data.status == 0) {
          //ok
          this.roles = resp.data.data;
        } else {
          this.showMessageDialog(resp.data.message);
        }
      })
      .catch(() => {
        this.showMessageDialog("服务异常！");
      });
  },
  methods: {
    commit() {
      //check
      if (!this.$refs.form.validate()) {
        return;
      }
      this.$axios.post("/user/commit",{
          username:this.userBody.username,
          password:this.userBody.password,
          role:parseInt(this.userBody.role),
          locked:this.userBody.locked == true?1:0
      })
      .then(resp=>{
          if(resp.data.code == 1){
             this.showMessageDialog("添加成功");
             this.$store.dispatch('syncUsers');
             setTimeout(()=>{
                 this.$router.push("userlist");
             },1000); 
          }else{
              this.showMessageDialog(resp.data.data);
          }
      })
      .catch(()=>{
          this.showMessageDialog("服务错误！");
      })
    }
  }
};
</script>

<style>
</style>
