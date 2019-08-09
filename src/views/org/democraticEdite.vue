<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'公告信息'"
      :nvaTitleTwoOutOne="'公告列表'"
      :nvaTitleTwoOutTwo="'公告管理'"
      :nvaTitleTwoOutStyle="'navTitleTwo'"
      :navTitleOneRouter="'/democratic'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="democraticComment" :orgOut="true"></user-aside>

    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
        <router-link to="/democraticMessage" class="user-message-add-return">返回公告管理</router-link>
        <div class="news-add-content">
          <div class="news-add-content-title">新增公告信息</div>
          <div class="news-add-content-div">
            <span>公告标题</span>
            <input
              v-model="democraticTitle"
              class="news-add-content-article-title"
              type="text"
              placeholder="填写标题"
            />
          </div>
          <div class="news-add-content-div">
            <span>公告周期</span>
            <!-- <select name="" id="">
              <option value="">选择主题</option>
            </select>-->
            <democratic-date v-model="dateValue" range appendToBody></democratic-date>

            <!-- <span>类别</span> -->
            <!-- <select name="" id="">
              <option value="">选择类别</option>              
            </select>-->
            <!-- <input class="news-add-content-select" v-model="democraticType"  type="text" placeholder="请输入类别"> -->
          </div>
          <div class="news-add-content-file-div">
            <span>添加附件</span>
            <input
              type="text"
              v-model="newsFileName"
              disabled="true"
              class="news-add-content-article-file"
            />
            <input type="file" @change="getFile" ref="newsfile" class="news-add-content-file" />
            <span class="news-add-content-file-label">选择</span>
          </div>
          <span class="news-add-content-news-title4">新闻内容</span>
          <div class="news-add-content-quil">
            <quill-editor
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
              class="news-add-quill"
            ></quill-editor>
            <button @click="postDrafts" class="user-message-info-button news-add-button-1">保存预览</button>
            <button @click="postRelease" class="user-message-info-button news-add-button-2">发布</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import myDatepicker from "vue2-datepicker";
import { quillEditor } from "vue-quill-editor";
import { postDemocratic, getDemocraticDetails } from "../../api/api";
export default {
  name: "democraticEdite",
  data() {
    return {
      uid: this.$route.query.id,
      democraticTitle: "",
      // democraticType: '',

      newsFileName: "添加附件",
      content: null,
      editorOption: {},

      dateValue: ""
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "quill-editor": quillEditor,
    "democratic-date": myDatepicker
  },
  mounted() {
    getDemocraticDetails({
      id: this.uid
    }).then(res => {
      window.console.log(res);
      if (res.code == 200) {
        this.democraticTitle = res.data[0].title;
        this.content = res.data[0].content;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  },
  methods: {
    getFile(e) {
      try {
        const FileName = e.target.files[0].name;
        this.newsFileName = FileName;
      } catch (err) {
        window.console.log(this.newsFileName);
      }
      window.console.log(this.dateValue);
    },
    postRelease: function() {
      if (this.democraticTitle == "") {
        alert("请输入标题");
      } else if (this.dateValue == "") {
        alert("请选择公布周期");
      } else if (this.content == "") {
        alert("请编写公告信息！");
      } else {
        let content = this.content;
        postDemocratic({
          title: this.democraticTitle,
          publicityCycle:
            this.dateValue[0].valueOf() + "-" + this.dateValue[1].valueOf(),
          status: "3",
          content: content
        }).then(res => {
          if (res.code == 200) {
            let id = res.data;
            this.$router.push({
              path: "/democraticArchives",
              query: {
                id: id,
                url: "/democraticMessage",
                navTitleStyle: "navTitleTwo"
              }
            });
          } else if (res.code == 401) {
            alert("请登录！");
            this.$store.commit("logout");
            this.$router.push({ name: "Index" });
          }
        });
      }
    },
    onEditorBlur() {
      // 失去焦点事件
    },
    onEditorFocus() {
      // 获得焦点事件
    },
    onEditorChange() {
      // 内容改变
    },
    postDrafts: function() {
      if (this.democraticTitle == "") {
        alert("请输入标题");
      } else if (this.dateValue == "") {
        alert("请选择公布周期");
      } else if (this.content == "") {
        alert("请编写公告信息！");
      } else {
        let content = this.content;
        postDemocratic({
          title: this.democraticTitle,
          publicityCycle:
            this.dateValue[0].valueOf() + "-" + this.dateValue[1].valueOf(),
          status: "2",
          content: content
        }).then(res => {
          if (res.code == 200) {
            let id = res.data;
            this.$router.push({
              path: "/democraticArchives",
              query: {
                id: id,
                url: "/democraticMessage",
                navTitleStyle: "navTitleTwo"
              }
            });
          } else if (res.code == 401) {
            alert("请登录！");
            this.$store.commit("logout");
            this.$router.push({ name: "Index" });
          }
        });
      }
    }
  }
};
</script>

<style>
.news-add-content {
  width: 90%;
  height: 940px;
  margin: auto;
  margin-top: 50px;
  /* background-color: aqua; */
}
.news-add-content-title {
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: rgba(68, 68, 68, 1);
}
.news-add-content span {
  font-size: 16px;
  font-weight: 400;
  color: rgba(68, 68, 68, 1);
  margin: 0 10px;
}
.news-add-content-div {
  margin: 10px 0;
  padding-top: 10px;
  /* background-color: bisque; */
}
.news-add-content-select {
  height: 26px;
  width: 180px;
  border: 1px solid rgba(170, 170, 170, 1);
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
.news-add-content-article-title {
  height: 26px;
  width: 70%;
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  padding-left: 10px;
}
.news-add-content-file-div {
  width: 100%;
}
.news-add-content-file {
  position: relative;
  width: 100px;
  height: 26px;
  margin-left: 10px;
  opacity: 0;
  z-index: 10;
  cursor: pointer;
}
.news-add-content-article-file {
  width: 175px;
  height: 26px;
  padding-left: 5px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
}
.news-add-content-file-label {
  display: inline-block;
  position: relative;
  top: 2px;
  left: -111px;
  height: 26px;
  width: 100px;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  cursor: pointer;
}
.news-add-content-news-title4 {
  display: inline-block;
  margin-top: 10px !important;
}
.news-add-content-quil {
  width: calc(100% - 20px);
  height: 740px;
  /* background-color: blue; */
  margin: 10px;
}
.news-add-quill {
  width: 100%;
  height: 600px;
}
.news-add-button-1 {
  margin-top: 80px;
  font-size: 16px;
  font-weight: 900;
  background: rgba(170, 170, 170, 1);
}
.news-add-button-1:hover {
  background: rgba(159, 157, 157, 1);
}
.news-add-button-2 {
  margin-top: 80px;
  font-size: 16px;
  font-weight: 900;
  background: rgba(100, 163, 241, 1);
}
.news-add-button-2:hover {
  background: rgba(92, 151, 224, 1);
}
</style>
