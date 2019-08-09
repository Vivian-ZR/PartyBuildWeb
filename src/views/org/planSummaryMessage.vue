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

    <div class="user-message-body">
      <div class="body-query">
        <news-search :selectChoise="selectChoise"></news-search>
        <router-link to="/planSummaryAdd" class="user-message-add">添加计划</router-link>
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
import planSummaryTable from "./../common/table/planSummaryTableMessage";
import { getPlanSummaryMessage } from "./../../api/api";
export default {
  name: "planSummaryMessage",
  data() {
    return {
      selectChoise: ["标题", "组织", "发布人"],
      header: ["标题", "组织", "发布人", "状态", "发布时间", "详情"],
      newsTable: [],

      pageNumber: false,
      fristPage: false,
      endPage: false,
      pageKeywordType: 1,
      pageKeyword: "",
      sumPage: 1,
      currentPage: 1,
      pageJump: 1
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "news-search": search,
    "nwes-table": planSummaryTable
  },
  mounted() {
    getPlanSummaryMessage({
      pageSize: 20
    }).then(res => {
      if (res.code == 200) {
        this.newsTable = res.data.list;

        this.sumPage = res.data.pages;
        this.currentPage = res.data.pageNum;  
        if(this.sumPage > 1) {
          this.pageNumber = true
        }
        if(this.currentPage > 1) {
          this.fristPage = true
        }
        if(this.currentPage < this.sumPage) {
          this.endPage = true
        }        
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  },
  methods: {
    updateTable(
      KeywordType = this.pageKeywordType,
      Keyword = this.pageKeyword,
      _currentPage = this.currentPage
    ) {
      getPlanSummaryMessage({
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
    FirstPage() {
      this.updateTable(this.pageKeywordType, this.pageKeyword, 1);
    },
    PreviousPage() {
      let CurrentPage = this.currentPage - 1;
      this.updateTable(this.pageKeywordType, this.pageKeyword, CurrentPage);
    },
    LatterPage() {
      let CurrentPage = this.currentPage + 1;
      this.updateTable(this.pageKeywordType, this.pageKeyword, CurrentPage);
    },
    EndPage() {
      let CurrentPage = this.sumPage;
      this.updateTable(this.pageKeywordType, this.pageKeyword, CurrentPage);
    },
    ButtongPage() {
      let CurrentPage = this.pageJump;
      this.updateTable(this.pageKeywordType, this.pageKeyword, CurrentPage);
    },
    QueryPage(KeywordType, Keyword, _currentPage) {
      this.pageKeyword = Keyword;
      if (KeywordType === "标题") {
        this.pageKeywordType = 1;
      } else if (KeywordType === "组织") {
        this.pageKeywordType = 3;
      } else if (KeywordType === "发布人") {
        this.pageKeywordType = 2;
      }
      this.updateTable(this.pageKeywordType, Keyword, _currentPage);
    }
  }  
};
</script>

<style>
</style>
