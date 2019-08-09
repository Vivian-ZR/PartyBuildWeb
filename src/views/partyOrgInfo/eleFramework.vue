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

    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
        <router-link to="/eleArchives" class="user-message-add-return">返回组织管理</router-link>
        <div class="user-message-add-user">
          <div>
            <div class="user-message-add-icon"></div>
            <span class="user-message-add-user-title">编辑组织结构</span>
          </div>

          <div v-for="item in ChapterList" :key="item.id" class="edite-class-chapter">
            <span>职位名称</span>
            <input readonly="readonly" :value="item.postion_name" type="text" />
            <i @click="deleteChapter(item.id)" class="edite-class-icon iconfont">&#xe7fc;</i>
            <i
              @click="EditeChapters=true, positionId=item.id"
              class="edite-class-icon iconfont"
            >&#xe600;</i>
          </div>
          <div @click="AddPosition=true" class="edite-class-addIcon">+ 添加职位</div>
        </div>
      </div>
      <add-opsition :ClassID="eleID" v-if="AddPosition"></add-opsition>
      <edite-opsition :ClassID="eleID" :ID="positionId" v-if="EditeChapters"></edite-opsition>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import addEleOpsition from "./addEleOpsition";
import editEleOpsition from "./editEleOpsition";
import { getOrgPosition, deleteOrgOpsition } from "./../../api/api";
export default {
  name: "eleFramework",
  data() {
    return {
      eleID: this.$route.query.id,
      positionId: "",
      ChapterList: [],
      AddPosition: false,
      EditeChapters: false,
      chaptersNumber: 1
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "add-opsition": addEleOpsition,
    "edite-opsition": editEleOpsition
  },
  mounted() {
    window.console.log(this.eleID);
    getOrgPosition({
      organizationId: this.eleID
    }).then(res => {
      window.console.log(res);
      if (res.code == 200) {
        window.console.log(res);
        this.ChapterList = res.data.list;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  },
  methods: {
    closeAddChapter: function() {
      this.AddPosition = false;
    },
    closeEditeChapter: function() {
      this.EditeChapters = false;
    },
    updateChapter: function() {
      window.console.log(666);
      getOrgPosition({
        organizationId: this.eleID
      }).then(res => {
        if (res.code == 200) {
          window.console.log(res);
          this.ChapterList = res.data.list;
        } else if (res.code == 401) {
          alert("请登录！");
          this.$store.commit("logout");
          this.$router.push({ name: "Index" });
        }
      });
    },
    deleteChapter: function(id) {
      let positionId = id;
      let f = confirm("确定要删除该职位么？");
      if (f === true) {
        deleteOrgOpsition({
          ids: positionId
        }).then(res => {
          if (res.code == 200) {
            alert("该职位已删除成功");
            this.updateChapter();
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
.edite-class-chapter {
  width: 70%;
  height: 40px;
  margin: 0 auto;
}
.edite-class-chapter span {
  display: inline-block;
  width: 70px;
  font-size: 16px;
}
.edite-class-chapter input {
  width: 254px;
  height: 26px;
  padding-left: 10px;
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
}
.edite-class-addIcon {
  width: 264px;
  height: 35px;
  background: rgba(255, 255, 255, 1);
  border: 1px dashed rgba(170, 170, 170, 1);
  border-radius: 4px;
  cursor: pointer;
  margin-left: calc(15% + 70px);
  text-align: center;
  line-height: 35px;
  color: rgba(153, 153, 153, 1);
}
.edite-class-addIcon:hover {
  background-color: rgba(86, 86, 86, 0.08);
}
.edite-class-icon {
  font-weight: 1000;
  margin-left: 15px;
  color: rgba(153, 153, 153, 1);
  cursor: pointer;
}
.edite-class-icon:hover {
  color: red;
}
</style>
