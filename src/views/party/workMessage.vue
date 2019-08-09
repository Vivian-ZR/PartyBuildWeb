<template>
  <div>
    <!-- top信息栏 -->
    <user-nav 
      :nvaTitleOut="true" 
      :nvaTitleOneOut="'工作管理'" 
      :nvaTitleTwoOutOne="'会议列表'" 
      :nvaTitleTwoOutTwo="'会议管理'"  
      :nvaTitleTwoOutStyle="'navTitleOne'"
      :navTitleTwoRouter="'/meetingMessage'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="workMessage" :partyOut="true"></user-aside>
    
    <div class="user-message-body">
      <div class="body-query">
        <news-search :selectChoise='selectChoise'></news-search>
      </div>
      <div class="body-user-list">
        <work-table :header='header' :list='newsTable'></work-table>

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
    <meeting-deatils :meetingDetailsID="meetingID" v-if="meetingDetails"></meeting-deatils>
  </div>    
</template>

<script>
import partyNave from './../common/partyNav'
import partyAside from './../common/partyAside'
import search from './../common/search'
import meetingTable from './../common/table/meetingTable'
import meetingDetails from './meetingDetails'
import { getmeetinglist } from './../../api/api'
export default {
 name: 'workMessage',
 data () {
   return {
    selectChoise: ['会议名', '主题', '地点'],
    header: ['会议名', '主题', '地点', '时间', '打卡', '详情'],
    meetingDetails: false,
    newsTable: [],
    meetingID: '',

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
    "news-search": search,
    "work-table": meetingTable,
    "meeting-deatils": meetingDetails
  },
  mounted() {
    let user = this.$store.state.user;
    if (typeof(user) == "string") {
      user = JSON.parse(user);
    }
    getmeetinglist({
      pageSize: 10,
      userId: user.id
    }).then(res => {
      window.console.log(res);
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
        this.$store.commit('logout');
        this.$router.push({name: "Index"});
      } 
    })
  },
  methods: {
    updateTable (KeywordType=this.pageKeywordType, Keyword=this.pageKeyword, _currentPage=this.currentPage) {
      getmeetinglist({        
        pageSize: 10,
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
      if(KeywordType === "会议名") {
        this.pageKeywordType = 1;
      } else if (KeywordType === "主题") {
        this.pageKeywordType = 3;
      } else if (KeywordType === "地点") {
        this.pageKeywordType = 2;
      }
      this.updateTable(this.pageKeywordType, Keyword, _currentPage)
    },

    openDetails: function (meetingID) {
      this.meetingID = meetingID;
      this.meetingDetails = true;
    },
    closeDetails: function() {
      this.meetingDetails = false;
    }
  }
}
</script>

<style>

</style>
