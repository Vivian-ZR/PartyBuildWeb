<template>
  <div>
    <!-- top信息栏 -->
    <user-nav :nvaTitleOut="true" :nvaTitleOneOut="'新闻管理'"></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="newsMessage" :newsOut="true"></user-aside>

    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
        <router-link to="/newsmessage" class="user-message-add-return">返回新闻管理</router-link>
        <div class="news-add-content">
          <div class="news-add-content-title">新增新闻</div>
          <div class="news-add-content-div">
            <span>新闻标题</span>
            <input
              v-model="newsTitle"
              class="news-add-content-article-title"
              type="text"
              placeholder="填写标题"
            />
          </div>
          <div class="news-add-content-div">
            <span>新闻主题</span>
            <input
              v-model="newsTheme"
              class="news-add-content-article-file"
              placeholder="填写新闻主题"
              type="text"
            />
            <span>类别</span>
            <input
              v-model="newsType"
              class="news-add-content-article-file"
              placeholder="填写类别"
              type="text"
            />
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
            <button @click="postDraft" class="user-message-info-button news-add-button-1">保存预览</button>
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
import { postAddNews } from "../../api/api";
export default {
  name: "newsAdd",
  data() {
    return {
      newsFileName: "添加附件",
      content: null,
      editorOption: {},

      newsTitle: "", // 新闻标题
      newsTheme: "", // 新闻主题
      newsType: "" // 新闻类别
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "quill-editor": quillEditor
  },
  methods: {
    getFile(e) {
      try {
        const FileName = e.target.files[0].name;
        this.newsFileName = FileName;
      } catch (err) {
        window.console.log(this.newsFileName);
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
    postDraft() {
      if (this.newsTitle === "") {
        alert("请输入新闻标题");
      } else if (this.newsTheme === "") {
        alert("请输入新闻主题");
      } else if (this.newsType === "") {
        alert("请输入新闻类别");
      } else if (this.content === null) {
        alert("请输入新闻内容");
      } else {
        window.console.log(this.content);
        postAddNews({
          title: this.newsTitle,
          theme: this.newsTheme,
          content: this.content,
          status: "2",
          category: this.newsType
        }).then(res => {
          let id = res.data;
          this.$router.push({
            path: "/newsAritcle",
            query: {
              id: id
            }
          });
        });
      }
    },
    postRelease() {
      if (this.newsTitle === "") {
        alert("请输入新闻标题");
      } else if (this.newsTheme === "") {
        alert("请输入新闻主题");
      } else if (this.newsType === "") {
        alert("请输入新闻类别");
      } else if (this.content === null) {
        alert("请输入新闻内容");
      } else {
        window.console.log(this.content);
        postAddNews({
          title: this.newsTitle,
          theme: this.newsTheme,
          content: this.content,
          status: "3",
          category: this.newsType
        }).then(res => {
          let id = res.data;
          this.$router.push({
            path: "/newsAritcle",
            query: {
              id: id
            }
          });
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
.news-add-content select {
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
