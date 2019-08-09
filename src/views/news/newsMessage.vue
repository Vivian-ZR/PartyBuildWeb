<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'新闻管理'"
      :nvaTitleTwoOutOne="'新闻列表'"
      :nvaTitleTwoOutStyle="'navTitleOne'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="newsMessage" :newsOut="true"></user-aside>

    <div class="user-message-body">
      <div class="body-query">
        <news-search :selectChoise="selectChoise"></news-search>
        <router-link to="/newsAdd" class="user-message-add">添加新闻</router-link>
      </div>
      <div class="body-user-list">
        <nwes-table :header="header" :list="newsTable"></nwes-table>

        <!-- 页脚 -->
        <div v-if="pageNumber" class="body-list-page-number">
          <span @click="FirstPage()" v-if="fristPage">首页</span>
          <span @click="PreviousPage()" v-if="fristPage">上一页</span>
          <span>{{currentPage }}</span>
          <span @click="LatterPage()" v-if="endPage">下一页</span>
          <span @click="EndPage()" v-if="endPage">尾页</span>
          <span>
            跳转至
            <input v-model="pageJump" type="text" />页
          </span>
          <button @click="ButtongPage()">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import search from "./../common/search";
import newsTable from "./../common/table/newsMessageTable";
import { getNewslist } from "./../../api/api";
export default {
  name: "newList",
  data() {
    return {
      selectChoise: ["新闻标题", "类别", "主题"],
      header: ["新闻标题", "类别", "主题", "状态", "上传时间", "备注"],
      newsTable: [],

      pageNumber: false,   // 是否展示页脚
      fristPage: false,    // 是否展示首页和上一页
      endPage: false,      // 是否展示尾页和下一页
      pageKeywordType: 1,  // 查询类型
      pageKeyword: '',     // 具体查询字段
      sumPage: 1,          // 总页码
      currentPage: 1,      // 当前页面
      pageJump: 1          // 跳转页码
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "news-search": search,
    "nwes-table": newsTable
  },
  mounted() {
    // 获取新闻列表
    getNewslist({
      pageSize: 20
    }).then(res => {
      if (res.code == 200) {
        window.console.log(res.data.list);
        this.newsTable = res.data.list;
        this.sumPage = res.data.pages;
        this.currentPage = res.data.pageNum;
        if (this.sumPage > 1) {
          this.pageNumber = true;
        }
        if (this.currentPage > 1) {
          this.fristPage = true;
        }
        if (this.currentPage < this.sumPage) {
          this.endPage = true;
        }
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  },
  methods: {
    updateTable(KeywordType=this.pageKeywordType, Keyword=this.pageKeyword, _currentPage=this.currentPage) {
      window.console.log(KeywordType,Keyword,_currentPage);
      getNewslist({
        pageSize: 20,
        keywordType: KeywordType,
        keyword: Keyword,
        currentPage: _currentPage
      }).then(res => {
        window.console.log(res);
        this.fristPage = false;
        this.endPage = false;
        if (res.code == 200) {
          this.newsTable = res.data.list;
          this.sumPage = res.data.pages;
          this.currentPage = res.data.pageNum;
          if (this.sumPage > 1) {
            this.pageNumber = true;
          }
          if (this.currentPage > 1) {
            this.fristPage = true;
          }
          if (this.currentPage < this.sumPage) {
            this.endPage = true;
          }
        } else if (res.code == 401) {
          alert("请登录！");
          this.$store.commit("logout");
          this.$router.push({ name: "Index" });
        }
      });
    },
    /**
     * 首页
     */
    FirstPage() {
      this.updateTable(this.pageKeywordType, this.pageKeyword, 1);
    },
    /**
     * 后一页
     */
    PreviousPage() {
      let CurrentPage = this.currentPage - 1;
      this.updateTable(this.pageKeywordType, this.pageKeyword, CurrentPage);
    },
    /**
     * 前一页
     */
    LatterPage() {
      let CurrentPage = this.currentPage + 1;
      this.updateTable(this.pageKeywordType, this.pageKeyword, CurrentPage);
    },
    /**
     * 尾页
     */
    EndPage() {
      let CurrentPage = this.sumPage;
      this.updateTable(this.pageKeywordType, this.pageKeyword, CurrentPage);
    },
    /**
     * 跳转页面
     */
    ButtongPage() {
      let CurrentPage = this.pageJump;
      this.updateTable(this.pageKeywordType, this.pageKeyword, CurrentPage);
    },
    /**
     * 查询
     */
    QueryPage (KeywordType, Keyword, _currentPage) {
      this.pageKeyword = Keyword;
      if(KeywordType === "主题") {
        this.pageKeywordType = 2;
      } else if (KeywordType === "主类别题") {
        this.pageKeywordType = 1;
      } 
      this.updateTable(this.pageKeywordType, Keyword, _currentPage)
    }
  }
};
</script>

<style>
.body-list-page-number {
  display: inline-block;
  margin-left: 33%;
  margin-top: 50px;
}
.body-list-page-number span {
  margin-right: 10px;
  cursor: pointer;
  color: rgba(68, 68, 68, 1);
}
.body-list-page-number span:hover {
  color: red;
}
.body-list-page-number input {
  width: 22px;
  height: 16px;
  background: rgba(242, 242, 242, 1);
  border: 1px solid rgba(140, 140, 140, 1);
  margin: 0 6px;
}
.body-list-page-number button {
  width: 50px;
  height: 20px;
  background: rgba(242, 242, 242, 1);
  border: 1px solid rgba(140, 140, 140, 1);
  border-radius: 2px;
  line-height: 18px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
