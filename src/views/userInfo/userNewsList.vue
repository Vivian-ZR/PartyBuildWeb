<template>
  <div>
    <!-- top信息栏 -->
    <user-nav :nvaTitleOut="true" :nvaTitleOneOut="'用户信息'"></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="userInfo" :userInfoOut="true"></user-aside>
    <div class="user-message-body">
      <div class="userinfo-body">
        <img class="userinfo-background" src="../../assets/images/icons/user_background.png" alt />
        <div class="userinfo-info">
          <img class="userinfo-icon" :src="userIcon" />
          <div class="userinfo-info-meeting">
            <div class="userinfo-info-title">会议</div>
            <div class="userinfo-info-number">
              <span class="userinfo-info-number-size">2</span>
            </div>
          </div>
          <div class="userinfo-info-news">
            <router-link to="/userNewsList" class="userinfo-info-title">我的消息</router-link>
            <div class="userinfo-info-number">
              <span class="userinfo-info-number-size">0</span>
            </div>
          </div>
          <div class="userinfo-info-integral">
            <router-link to="/userMyIntegral" target="_blank" class="userinfo-info-title">我的积分</router-link>
            <div class="userinfo-info-number">
              <span class="userinfo-info-number-size">0</span>
              <div class="serinfo-info-number-update">
                <img src="../../assets/images/icons/update.png" alt />
                <span>0</span>
              </div>
            </div>
          </div>
          <div class="userinfo-info-nav">
            <router-link to="/userinfo" class="userinfo-info-nav-span">我的课程</router-link>
            <!-- <span>我的考试</span> -->
            <router-link
              class="userinfo-info-nav-span userinfo-info-nav-bottom"
              to="/userNewsList"
            >消息记录</router-link>
          </div>
        </div>
      </div>
      <div class="user-news-list-body">
        <div class="user-news-list-query">
          <news-search :selectChoise="selectChoise"></news-search>
          <div class="user-news-list-body-nav">            
            <span id="user-news-list-body-nav-nav">未读消息</span>
            <span class="user-news-list-body-nav-span">已读消息</span>
            <span>所有消息</span>
          </div>
        </div>
        <nwes-table :header="header" :list="newsTable"></nwes-table>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import search from "./../common/search";
import userNewsListTable from './../common/table/userNewsListTable';
import { getUserNews } from './../../api/api';
export default {
  name: "userNewsList",
  data() {
    return {
      userIcon: require("../../assets/images/userAvatar/userhead.png"),
      classUrl: require("../../assets/images/icons/class2.png"),
      selectChoise: ["标题"],
      header: ["状态", "标题", "发送人", "类型", '时间', "详情"],
      newsTable: [],
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "news-search": search,
    "nwes-table": userNewsListTable
  },
  mounted() {
    let user = this.$store.state.user;
    if (typeof(user) == "string") {
      user = JSON.parse(user);
    }
    // 获取所有消息
    getUserNews({
      uid: user.id
    }).then(res => {
      window.console.log(res);
      // if(res.code == 200) {

      // }
    })
  }
};
</script>

<style>
.user-news-list-body {
  width: 100%;
  height: 740px;
}
.user-news-list-query {
  height: 72px;
  width: 100%;
  padding-top: 35px;
}
.user-news-list-body-nav {
  width: 250px;
  height: 18px;
  margin-left: 40px;
  margin-top: 10px;
  font-size: 16px;
}
.user-news-list-body-nav span {
  color: rgba(153, 153, 153, 1);
  padding: 0 10px;
  cursor: pointer;
}
.user-news-list-body-nav span:hover {
  color: rgba(226, 0, 15, 1);
}
.user-news-list-body-nav-span {
  border-left: 1px solid rgba(208, 23, 31, 1);
  border-right: 1px solid rgba(208, 23, 31, 1);
}
#user-news-list-body-nav-nav {
  color: rgba(226, 0, 15, 1);
}
</style>
