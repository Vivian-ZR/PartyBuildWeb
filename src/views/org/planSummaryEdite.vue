<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'计划总结'"
      :nvaTitleTwoOutOne="'计划列表'"
      :nvaTitleTwoOutTwo="'计划管理'"
      :nvaTitleTwoOutStyle="'navTitleTwo'"
      :navTitleOneRouter="'/planSummary'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="planSummary" :orgOut="true"></user-aside>

    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
        <router-link to="/planSummaryMessage" class="user-message-add-return">返回计划管理</router-link>
        <div class="news-add-content">
          <div class="news-add-content-title">编辑计划总结</div>
          <div class="news-add-content-div">
            <span>总结标题</span>
            <input
              v-model="summaryTitle"
              class="news-add-content-article-title"
              type="text"
              placeholder="填写标题"
            />
          </div>
          <div class="news-add-content-div">
            <span>计划类别</span>
            <!-- <select name="" id="">
              <option value="">选择类别</option>              
            </select>-->
            <input v-model="summaryType" class="plan-summary-add-content-span" type="text" />
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
          <span class="news-add-content-news-title4">总结内容</span>
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
            <button @click="postDrafts" class="user-message-info-button news-add-button-1">文本预览</button>
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
import { quillEditor } from "vue-quill-editor";
import { postPlanSummary, getPlanSummaryDetails } from "../../api/api"
export default {
  name: "planSummaryEdite",
  data() {
    return {
      report: this.$route.query.id,
      newsFileName: "添加附件",
      content: null, // 计划内容
      editorOption: {},

      dateValue: "",

      summaryTitle: "", // 标题
      summaryType: "" // 计划类别
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "quill-editor": quillEditor
  },
  mounted() {
    getPlanSummaryDetails({
      id: this.report
    }).then(res => {
      window.console.log(res);
      if (res.code == 200) {
        this.summaryTitle = res.data[0].title;
        this.content = res.data[0].content;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      } 
    })
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
      if (this.summaryTitle == "") {
        alert("请输入标题");
      } else if (this.summaryType == "") {
        alert("请输入计划类别");
      } else if (this.content == "") {
        alert("请编写公告信息！");
      } else {
        let content = this.content;
        postPlanSummary({
          title: this.summaryTitle,         // 缺失类别
          status: "2",
          content: content
        }).then(res => {
          if (res.code == 200) {
            let id = res.data;
            this.$router.push({
              path: "/planSummaryArchives",
              query: {
                id: id,
                url: "/planSummaryMessage",
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
    postRelease: function() {
      if (this.summaryTitle == "") {
        alert("请输入标题");
      } else if (this.summaryType == "") {
        alert("请输入计划类别");
      } else if (this.content == "") {
        alert("请编写公告信息！");
      } else {
        let content = this.content;
        postPlanSummary({
          title: this.summaryTitle,
          status: "3",
          content: content
        }).then(res => {
          if (res.code == 200) {
            let id = res.data;
            this.$router.push({
              path: "/planSummaryArchives",
              query: {
                id: id,
                url: "/planSummaryMessage",
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
  }
};
</script>

<style>
.plan-summary-add-content-span {
  height: 26px;
  width: 170px;
  padding-left: 10px;
  border: 1px solid rgba(170, 170, 170, 1);
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
</style>
