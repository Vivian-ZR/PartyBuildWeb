<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'文件资料柜'"
      :nvaTitleTwoOutOne="'资料柜'"
      :nvaTitleTwoOutStyle="'navTitleOne'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="filesCabinet" :partyInfoOut="true"></user-aside>

    <div class="user-message-body">
      <div class="body-query">
        <news-search :selectChoise="selectChoise"></news-search>
      </div>
      <div class="study-class-eyebrow"></div>
      <div class="document-cabinet">
        <div class="document-cabinet-file-div">
          <div class="iconfont document-cabinet-file">&#xe85e;</div>
          <div class="document-cabinet-file-title">党课PPT</div>
        </div>
        <div class="document-cabinet-file-div">
          <div class="iconfont document-cabinet-file">&#xe85e;</div>
          <div class="document-cabinet-file-title">学习文档</div>
        </div>
        <div class="document-cabinet-file-div">
          <div class="iconfont document-cabinet-file">&#xe85e;</div>
          <div class="document-cabinet-file-title">党内文档</div>
        </div>
        <div class="document-cabinet-file-div">
          <div class="iconfont document-cabinet-file">&#xe85e;</div>
          <div class="document-cabinet-file-title">党内通讯录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import search from "./../common/search";
import { getDocumentCabinet } from "./../../api/api";
export default {
  name: "documentCabinet",
  data() {
    return {
      selectChoise: ["文件名"]
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "news-search": search
  },
  mounted() {
    let user = this.$store.state.user;
    if (typeof user == "string") {
      user = JSON.parse(user);
    }
    getDocumentCabinet({
      uid: user.id
    }).then(res => {
      window.console.log(res);
      if (res.code == 200) {
        window.console.log(res);
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  }
};
</script>

<style>
.document-cabinet {
  width: 100%;
  height: 873px;
}
.document-cabinet-file {
  font-size: 80px !important;
  box-shadow: 1px 2px 4px 0px #f3f3f3;
  color: #f4d466;
  cursor: pointer;
}
.document-cabinet-file-div {
  display: inline-block;
  margin: 25px;
}
.document-cabinet-file-title {
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
  font-weight: 400;
  color: rgba(68, 68, 68, 1);
}
.document-cabinet-file:hover {
  box-shadow: 1px 2px 4px 0px rgba(86, 86, 86, 0.2);
}
</style>
