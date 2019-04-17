<template>
  <v-container grid-list-xs>
    <v-layout flat wrap>
      <v-flex xs12>
        <v-card color="blue darken-2">
          <v-card-title>
            <v-btn icon @click="$router.go(-1)">
              <v-icon color="white">arrow_back</v-icon>
            </v-btn>
            {{ mode == 'create' ? '创建公告':'编辑公告'}}
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card color="blue darken-2" class="white--text">
          <v-card-text>
            <v-layout flat wrap>
              <v-flex xs12>
                <v-spacer/>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  style="text-align:center;font-size:2rem;padding:1em"
                  v-model="announce.title"
                  label="公告标题"
                  fill-height
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-spacer/>
                <v-checkbox style="float:right" v-model="announce.show" label="公告可见"/>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card color="white darken-2" class="black--text">
          <v-card-text>
            <quill-editor :options="options" v-model="announce.content"></quill-editor>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card color="white darken-2" class="black--text">
          <v-card-actions>
            <v-spacer/>
            <v-btn color="blue darken-2" large @click="commit">提交</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
/**
 * 公告编辑
 */
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  inject: ["showMessageDialog", "showConfirmDialog"],
  props: ["id", "create"],
  data() {
    return {
      ///mode
      mode: "create",
      ////
      options: {},
      //////////////////
      announce: {
        id: 11,
        user: "superadmin",
        time: "2019-03-16 12:34:56",
        title: "",
        content: "",
        show: true
      }
    };
  },
  methods: {
    commit() {
      this.showConfirmDialog(
        "确定要" + this.mode == "create" ? "创建公告" : "编辑公告" + "吗？",
        "提示",
        () => {
          //修改公告
          //TODO 提交给服务器
          this.announce.show = this.announce.show? 1: 0;//修改先
          this.$store
            .dispatch("commitAnnounce", {
              id: this.announce.id,
              body: this.announce,
              mode: this.mode
            })
            .then(() => {
              this.showMessageDialog("提交成功！");
              setTimeout(() => {
                this.$router.push("/admin/announcelist");
              }, 1000);
            });
        }
      );
    }
  },
  beforeMount() {
    //判断新建还是编辑

    if (typeof this.id == "string" && !isNaN(parseInt(this.id))) {
      //编辑
      //TODO 获取store中的信息
      this.$store
        .dispatch("fetchAnnouncementById", { id: parseInt(this.id) })
        .then(result => {
          result.show = result.show == 1;
          this.announce = result;
          this.mode = "edit";
        })
        .catch(() => {
          alert("请求不合法！");
          this.$router.push("/admin/announcelist");
        });
    }
  },
  components: {
    quillEditor
  }
};
</script>
<style lang="less">
.ql-editor {
  min-height: 30em !important;
}
</style>
