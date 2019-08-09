<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'思想汇报'"
      :nvaTitleTwoOutOne="'汇报列表'"
      :nvaTitleTwoOutTwo="'我的汇报'"
      :nvaTitleTwoOutThree="'汇报管理'"
      :nvaTitleTwoOutStyle="navTitleStyle"
      :navTitleOneRouter="'/reportList'"
      :navTitleThreeRouter="'/reportListMessage'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="thoughtReport" :studyOut="true"></user-aside>

    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
        <router-link :to="url" class="user-message-add-return">返回汇报列表</router-link>
        <h1 class="news-aritcle-title">{{ title }}</h1>
        <div class="aritcle-info">
          <span>{{ createTime | formatDate }}</span>
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
import { formatDate } from './../common/js/date';
import { getReportDetails } from "./../../api/api";
export default {
  name: "reportAritcle",
  data() {
    return {
      report: this.$route.query.id,
      url: this.$route.query.url,
      navTitleStyle: this.$route.query.navTitleStyle,
      user: '',
      newsAritcleContent: '',
      title: '',
      time: '',
      createTime: ''
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  mounted() {
    getReportDetails({
      id: this.report
    }).then(res => {
      window.console.log(res);
      if (res.code == 200) {
        this.title = res.data.title;
        this.newsAritcleContent = res.data.content;
        this.createTime = res.data.create_time;
        this.user = res.data.user_name;
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
.aritcle-info {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
.aritcle-info span {
  margin: 0 10px;
  color: #666;
}
</style>
