<!-- 用户管理列表页面 -->
<template>
  <div>
    <!-- top信息栏 -->
    <user-nav :nvaTitleOut="true" :nvaTitleOneOut="'用户管理'"></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="userMessage" :userInfoOut="true"></user-aside>
    <div class="user-message-body">
      <div class="body-query">
        <!-- 搜索框 -->
        <user-search :selectChoise='selectChoise'></user-search>
        <router-link to='userMessage/Add' class="user-message-add">添加用户</router-link>
      </div>
      <div class="body-user-list">
        <user-table :header="tableHeader" :list="tableList"></user-table>

        <!-- 页脚 -->
        <div v-if="pageNumber" class="body-list-page-number">
          <span @click="FirstPage()" v-if="fristPage">首页</span>
          <span @click="PreviousPage()" v-if="fristPage">上一页</span>
          <span>{{ currentPage }}</span>
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
import partyNave from './../../common/partyNav'
import partyAside from './../../common/partyAside'
import search from './../../common/search'
import UserTable from './../../common/table/userTable'
import { getUserlist } from '../../../api/api'
export default {
  name: 'UserMessage',
  data () {
    return {
      tableHeader: ['姓名', '身份证号', '组织', '职位', '邮箱', '是否激活', '创建时间', '详情'],
      tableList: [],
      selectChoise: ['姓名','邮箱', '身份证号', '组织', '职位'],

      pageNumber: false,
      fristPage: false,
      endPage: false,
      pageKeywordType: 1,
      pageKeyword: '',
      sumPage: 1,
      currentPage: 1,
      pageJump: 1
    }
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "user-search": search,
    "user-table": UserTable
  },
  mounted() {
    // 获取用户列表
    getUserlist({
      pageSize: 20
    }).then(res => {
      if (res.code == 200) {
        window.console.log(res.data.list);
        this.tableList = res.data.list;
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
  methods: {
    updateTable (KeywordType=this.pageKeywordType, Keyword=this.pageKeyword, _currentPage=this.currentPage) {
      getUserlist({        
        pageSize: 20,
        keywordType: KeywordType,
        keyword: Keyword,
        currentPage: _currentPage,        
      }).then(res => {      
        this.fristPage = false;
        this.endPage = false;
        if (res.code == 200) {        
          this.tableList = res.data.list;
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
      } else if (KeywordType === "身份证号") {
        this.pageKeywordType = 4;
      } else if (KeywordType === "组织") {
        this.pageKeywordType = 2;
      } else if (KeywordType === "职位") {
        this.pageKeywordType = 3
      } else if (KeywordType === "邮箱") {
        this.pageKeywordType =5
      }
      this.updateTable(this.pageKeywordType, Keyword, _currentPage)
    }
  }
}
</script> 

<style>
.user-message-body {
  float: left;
  width: calc(100% - 200px);
  height: 1020px;
}
.body-query {
  width: 100%;
  height: 74px;
  padding-top: 38px;
}
.user-message-add {
  position: relative;
  left: 90%;
  bottom: 34px;
  display: inline-block;
  width:100px;
  height:35px;
  background:rgba(240,70,74,1);
  border-radius:5px;
  color: rgba(255,255,255,1);
  font-size:16px;
  font-weight:400;
  line-height: 35px;
  text-align: center;
}
.user-message-add:hover {
  background-color: rgba(220, 58, 62, 1);
}
.body-user-list {
  width: 100%;
  height: 908px;
}
</style>

