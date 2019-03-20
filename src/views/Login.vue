<template>
  <v-app>
    <v-container>
      <v-layout row class="login-page">
        <v-flex lg6>
          <v-layout align-center justify-center>
            <v-flex xs3>
              <img width="150" :src="require('../assets/logo.svg')" alt="logo">
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex lg3 class="login-form">
          <v-layout column align-left justify-center>
            <v-flex class="top-head">
              <h1>用户登陆</h1>
            </v-flex>
            <v-form :valid="valid" ref="form">
              <v-layout column>
                <v-flex xs3>
                  <v-text-field
                    v-model="username"
                    :counter="16"
                    :rules="username_rules"
                    label="用户名"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    v-model="password"
                    :counter="16"
                    :rules="password_rules"
                    label="密码"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs3 style="align-self:flex-end">
                  <v-btn color="primary" @click="login">登陆</v-btn>
                  <v-btn color="warning" @click="$refs.form.reset()">重置</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-footer fixed>
        <v-spacer></v-spacer>
        <div>hafrans &copy; {{ new Date().getFullYear() }}</div>
      </v-footer>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      username: "",
      password: "",
      username_rules: [
        val => !!val || "需要填写用户名",
        val => val.length < 16 || "用户名过长"
      ],
      password_rules: [
        val => !!val || "需要填写密码",
        val => val.length < 16 || "密码过长"
      ]
    };
  },
  methods: {
    login() {
      if(this.$refs.form.validate()){
        this.$router.push('/admin');
      }
    }
  }
};
</script>

<style lang="less" scoped>
h1 {
  font-weight: 300;
  font-size: 2.5em;
  color: #333;
  text-align: center;
}
body{
    overflow: hidden;
}
html{
    overflow: auto;
}
.top-head {
  padding-bottom: 2em;
  //   border-bottom: 1px #666 solid;
}
.login-page {
  height: 20em;
  position: relative;
  top: 30%;
}
.login-form {
  position: relative;
  top: -2.25em;
}
</style>
