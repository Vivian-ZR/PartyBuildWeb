<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'电子档案'"
      :nvaTitleTwoOutOne="'组织档案'"
      :nvaTitleTwoOutTwo="'人员档案'"
      :nvaTitleTwoOutStyle="'navTitleTwo'"
      :navTitleOneRouter="'/eleArchives'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="elecFiles" :partyInfoOut="true"></user-aside>

    <div class="user-message-body">
      <div class="body-query">
        <news-search :selectChoise="selectChoise"></news-search>
        <router-link to="/addPartyUser" class="user-message-add">添加党员</router-link>
      </div>
      <div class="body-user-list">
        <eleArchives-table :header="header" :list="newsTable"></eleArchives-table>

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
import eleUserTable from "./../common/table/eleUserTable";
import { getOrgUserList } from "./../../api/api";
export default {
  name: "eleUser",
  data() {
    return {
      selectChoise: ["姓名", "组织", "职位"],
      header: ["姓名", "性别", "年龄", "组织", "职位", "联系方式", "详情"],
      newsTable: [],

      pageNumber: false,
      fristPage: false,
      endPage: false,
      pageKeywordType: 1,
      pageKeyword: '',
      sumPage: 1,
      currentPage: 1,
      pageJump: 1      
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "news-search": search,
    "eleArchives-table": eleUserTable
  },
  mounted() {
    getOrgUserList({
      isFlow: 0,
      pageSize: 20
    }).then(res => {
      if (res.code == 200) {
        this.newsTable = res.data.list;
        this.sumPage = res.data.pages;
        this.currentPage = res.data.pageNum;        
        if (this.sumPage > 1) {
          this.pageNumber = true
        }
        if (this.currentPage > 1) {
          this.fristPage = true
        }
        if (this.currentPage < this.sumPage) {
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
    updateTable (KeywordType=this.pageKeywordType, Keyword=this.pageKeyword, _currentPage=this.currentPage) {
      getOrgUserList({    
        isFlow: 0,    
        pageSize: 20,
        keywordType: KeywordType,
        keyword: Keyword,
        currentPage: _currentPage,        
      }).then(res => {      
        window.console.log(res);
        this.fristPage = false;
        this.endPage = false;
        if (res.code == 200) {        
          this.newsTable = res.data.list;
          this.sumPage = res.data.pages;
          this.currentPage = res.data.pageNum;  
          if (this.sumPage > 1) {
            this.pageNumber = true
          }
          if (this.currentPage > 1) {
            this.fristPage = true
          }
          if (this.currentPage < this.sumPage) {
            this.endPage = true
          }
        } else if (res.code == 401) {
          alert("请登录！");
          this.$store.commit('logout');
          this.$router.push({name: "Index"});
        }  
      })
    },
    FirstPage () {
      this.updateTable(this.pageKeywordType, this.pageKeyword, 1);
    },
    PreviousPage () {
      let CurrentPage = this.currentPage - 1;
      this.updateTable(this.pageKeywordType, this.pageKeyword, CurrentPage);
    },
    LatterPage() {
      let CurrentPage = this.currentPage + 1;
      this.updateTable(this.pageKeywordType, this.pageKeyword, CurrentPage);
    },
    EndPage () {
      let CurrentPage = this.sumPage;
      this.updateTable(this.pageKeywordType, this.pageKeyword, CurrentPage);
    },
    ButtongPage () {
      let CurrentPage = this.pageJump;
      this.updateTable(this.pageKeywordType, this.pageKeyword, CurrentPage);
    },
    QueryPage (KeywordType, Keyword, _currentPage) {
      this.pageKeyword = Keyword;
      if(KeywordType === "姓名") {
        this.pageKeywordType = 1;
      } else if (KeywordType === "组织") {
        this.pageKeywordType = 2;
      } else if (KeywordType === "职位") {
        this.pageKeywordType = 3;
      }
      this.updateTable(this.pageKeywordType, Keyword, _currentPage)
    },
  }  
};
</script>

<style>
</style>
