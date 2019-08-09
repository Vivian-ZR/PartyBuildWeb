<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'思想汇报'"
      :nvaTitleTwoOutOne="'汇报列表'"
      :nvaTitleTwoOutTwo="'我的汇报'"
      :nvaTitleTwoOutThree="'汇报管理'"
      :nvaTitleTwoOutStyle="'navTitleTwo'"
      :navTitleOneRouter="'/reportList'"
      :navTitleThreeRouter="'/reportListMessage'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="thoughtReport" :studyOut="true"></user-aside>

    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
        <router-link to="/myreportList" class="user-message-add-return">返回我的汇报</router-link>
        <div class="news-add-content">
          <div class="news-add-content-title">编写汇报</div>
          <div class="news-add-content-div">
            <span>汇报标题</span>
            <input
              v-model="reportTitle"
              class="news-add-content-article-title"
              type="text"
              placeholder="填写汇报标题"
            />
          </div>
          <div class="news-add-content-div">
            <span>汇报主题</span>
            <input v-model="reportTheme" class="myreport-add-title" type="text" />
            <span>类型</span>
            <select v-model="reportType">
              <option value>请选择类型</option>
              <option value="公开">公开</option>
              <option value="领导可看">领导可看</option>
              <option value="仅自己">仅自己</option>
            </select>
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
          <span class="news-add-content-news-title4">内容编写</span>
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
            <button @click="getDraft" class="user-message-info-button news-add-button-1">保存预览</button>
            <button @click="postDraft" class="user-message-info-button news-add-button-2">发布</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from './../common/partyNav'
import partyAside from './../common/partyAside'
import { quillEditor } from "vue-quill-editor"
import { addReportList } from "../../api/api"
export default {
  name: 'myreportAdd',
  data () {
    return {
      reportTitle: '',           // 汇报标题
      reportTheme: '',           // 汇报主题
      reportType: '',            // 汇报类型

      newsFileName: '添加附件',
      content: null,             // 汇报内容
      editorOption: {}
    }
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "quill-editor": quillEditor
  },
  methods: {
    getFile (e) {
      try {
        const FileName = e.target.files[0].name;
        this.newsFileName = FileName;
      } catch (err) {
        window.console.log(this.newsFileName);
      }
    },
    postDraft () {     
      let title = this.reportTitle;
      let theme = this.reportTheme;
      let type = this.reportType;
      let status = '3';
      let content = this.content;
      if(title === "") {
        alert("请输入汇报标题");
      } else if(theme === "") {
        alert("请输入汇报主题");
      } else if(type === "") {
        alert("请选择汇报类型");
      } else if(content === "") {
        alert("请写入汇报内容");
      } else {
        addReportList({
          theme,
          content,
          status,
          type,
          title
        }).then(res => {
          if (res.code == 200) {
            let id = res.data;
            this.$router.push({
              path: "/reportAritcle",
              query: {
                id: id,
                url: "/myreportList",
                navTitleStyle: "navTitleTwo"
              }
            })
          } else if (res.code == 401) {
            alert("请登录！");
            this.$store.commit('logout');
            this.$router.push({name: "Index"});
          }
        })
      }      
    },
    getDraft() {   
      let title = this.reportTitle;
      let theme = this.reportTheme;
      let type = this.reportType;
      let status = '2';
      let content = this.content;
      if(title === "") {
        alert("请输入汇报标题");
      } else if(theme === "") {
        alert("请输入汇报主题");
      } else if(type === "") {
        alert("请选择汇报类型");
      } else if(content === "") {
        alert("请写入汇报内容");
      } else {
        addReportList({
          theme,
          content,
          status,
          type,
          title
        }).then(res => {
          if (res.code == 200) {
            let id = res.data;
            this.$router.push({
              path: "/reportAritcle",
              query: {
                id: id,
                url: "/myreportList",
                navTitleStyle: "navTitleTwo"
              }
            })
          } else if (res.code == 401) {
            alert("请登录！");
            this.$store.commit('logout');
            this.$router.push({name: "Index"});
          }
        })
      }
    },
    onEditorBlur() { // 失去焦点事件

    },
    onEditorFocus() { // 获得焦点事件

    },
    onEditorChange() { // 内容改变

    },
  }
}
</script>

<style>
.myreport-add-title {
  height: 26px;
  width: 170px;
  border: 1px solid rgba(170, 170, 170, 1);
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding-left: 10px;
}
</style>
