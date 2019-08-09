<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'电子档案'"
      :nvaTitleTwoOutOne="'组织档案'"
      :nvaTitleTwoOutTwo="'人员档案'"
      :nvaTitleTwoOutStyle="'navTitleOne'"
      :navTitleTwoRouter="'/eleUser'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="elecFiles" :partyInfoOut="true"></user-aside>

    <div class="user-message-body">
      <div class="body-query">
        <news-search :selectChoise="selectChoise"></news-search>
        <span
          @mouseenter="editSelect=true"
          @mouseleave="editSelect=false"
          class="user-message-edit"
        >编辑</span>
        <router-link to="/addEle" class="user-message-adds">添加组织</router-link>
      </div>
      <div
        @mouseenter="editSelect=true"
        @mouseleave="editSelect=false"
        v-if="editSelect"
        class="ele-archives-select-edit"
      >
        <span @click="editeJump(1)" class="ele-archives-select-edit-div">编辑简介</span>
        <span @click="editeJump(2)" class="ele-archives-select-edit-div">编辑荣誉</span>
        <span @click="editeJump(3)" class="ele-archives-select-edit-div">编辑架构</span>
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
import eleArchivesTable from "./../common/table/eleArchivesTable";
import { getOrglist } from "./../../api/api";
export default {
  name: "eleArchives",
  data() {
    return {
      selectChoise: ["组织名", "负责人"],
      header: [
        "组织名",
        "组织负责人",
        "组织人数",
        "组织荣誉数",
        "上传时间",
        "详情"
      ],
      newsTable: [],
      editSelect: false, // 编辑选项
      editSelectEleId: "",

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
    "eleArchives-table": eleArchivesTable
  },
  mounted() {
    getOrglist({
      pageSize: 20
    }).then(res => {
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
  methods: {
    updateTable(
      KeywordType = this.pageKeywordType,
      Keyword = this.pageKeyword,
      _currentPage = this.currentPage
    ) {
      getOrglist({
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
      if (KeywordType === "姓名") {
        this.pageKeywordType = 1;
      } else if (KeywordType === "组织") {
        this.pageKeywordType = 2;
      } else if (KeywordType === "职位") {
        this.pageKeywordType = 3;
      }
      this.updateTable(this.pageKeywordType, Keyword, _currentPage);
    },
    editeJump(type) {
      if (this.editSelectEleId !== "") {
        if (type == 1) {
          this.$router.push({
            path: "/editEle",
            query: {
              id: this.editSelectEleId
            }
          });
        } else if(type == 2) {
          this.$router.push({
            path: "/editeEleHonor",
            query: {
              id: this.editSelectEleId
            }
          })          
        } else if(type == 3) {
          this.$router.push({
            path: "/eleFramework",
            query: {
              id: this.editSelectEleId
            }
          })
        }
      } else {
        alert("请选择组织！");
      }
    },
    passEditSelectEleId: function(id) {
      this.editSelectEleId = id;
    }
  }
};
</script>

<style>
.user-message-edit {
  position: relative;
  left: 85%;
  bottom: 34px;
  display: inline-block;
  width: 100px;
  height: 35px;
  background: rgba(238, 172, 95, 1);
  border-radius: 5px;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-weight: 400;
  line-height: 35px;
  cursor: pointer;
  text-align: center;
}
.user-message-adds {
  position: relative;
  left: 86%;
  bottom: 34px;
  display: inline-block;
  width: 100px;
  height: 35px;
  background: rgba(100, 163, 241, 1);
  border-radius: 5px;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-weight: 400;
  line-height: 35px;
  text-align: center;
}
.user-message-adds:hover {
  background: rgba(92, 151, 224, 1);
}
.ele-archives-select-edit {
  position: absolute;
  left: calc(85% + 30px);
  top: 136px;
  width: 100px;
  height: 105px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 172, 95, 1);
  border-radius: 5px;
  font-size: 16px;
  line-height: 35px;
  cursor: pointer;
}
.ele-archives-select-edit-div {
  display: inline-block;
  width: 100%;
  text-align: center;
  color: rgba(68, 68, 68, 1);
}
.ele-archives-select-edit-div:hover {
  display: inline-block;
  background: rgba(238, 172, 95, 1);
  color: rgba(255, 255, 255, 1);
}
</style>
