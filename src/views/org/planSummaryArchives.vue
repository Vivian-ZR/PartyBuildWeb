<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'计划总结'"
      :nvaTitleTwoOutOne="'计划列表'"
      :nvaTitleTwoOutTwo="'计划管理'"
      :nvaTitleTwoOutStyle="'navTitleOne'"
      :navTitleTwoRouter="'/planSummaryMessage'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="planSummary" :orgOut="true"></user-aside>

    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
        <router-link :to="url" class="user-message-add-return">返回计划列表</router-link>
        <h1 class="news-aritcle-title">{{ title }}</h1>
        <div class="aritcle-info">
          <span>{{ createTime | formatDate }}</span>
          <span>作者：</span>
          <span>{{ username }}</span>
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
import { formatDate } from './../common/js/date'
import { getPlanSummaryDetails } from "./../../api/api";
export default {
  name: "planSummaryArchives",
  data() {
    return {
      report: this.$route.query.id,
      url: this.$route.query.url,
      navTitleStyle: this.$route.query.navTitleStyle,
      user: Object,
      newsAritcleContent: '',
      title: '',
      time: '',
      createTime: '',
      username: ''
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  mounted() {
    getPlanSummaryDetails({
      id: this.report
    }).then(res => {
      window.console.log(res);
      if (res.code == 200) {
        this.title = res.data[0].title;
        this.newsAritcleContent = res.data[0].content;
        this.createTime = res.data[0].create_time;
        this.username = res.data[0].user_name;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      } 
    })
  }
};
</script>

<style>

</style>
