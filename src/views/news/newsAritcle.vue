<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'新闻管理'"
      :nvaTitleTwoOutOne="'新闻详情'"
      :nvaTitleTwoOutStyle="'navTitleOne'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="newsMessage" :newsOut="true"></user-aside>

    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
        <router-link to="/newsmessage" class="user-message-add-return">返回新闻管理</router-link>
        <h1 class="news-aritcle-title">{{ title }}</h1>
        <div class="aritcle-info">
          <span>发布时间：</span>
          <span>{{ createTime | formatDate}}</span>
          <span>作者：</span>
          <span>{{ user }}</span>
          <!-- <span>{{ user.organization_name }}-{{ user.postion_name }}</span> -->
        </div>

        <div class="news-aritcle-content">
          <div class="ql-container ql-snow" style="border:0">
            <div class="ql-editor">
              <div v-html="newsAritcleContent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import { getNewsDetailed } from "./../../api/api";
import { formatDate } from "./../common/js/date";
export default {
  name: "newsAritcle",
  data() {
    return {
      index: this.$route.query.id,
      title: "",
      createTime: "",
      user: "",
      newsAritcleContent: ""
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  mounted() {
    let _index = this.index;
    getNewsDetailed({
      id: _index
    }).then(res => {
      window.console.log(res);
      if (res.code == 200) {
        window.console.log(res);
        this.title = res.data.title;
        this.createTime = res.data.create_time;
        this.user = res.data.user_name;
        this.newsAritcleContent = res.data.content;
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
.news-aritcle-title {
  position: relative;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: rgba(68, 68, 68, 1);
  margin-top: 40px;
}
.news-aritcle-content {
  position: relative;
  height: 880px;
  width: calc(100% - 40px);
  /* background-color: aquamarine; */
  margin: 20px 20px;
}
</style>
