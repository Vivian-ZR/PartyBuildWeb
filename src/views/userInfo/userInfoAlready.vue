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
            <router-link to='' class="userinfo-info-title">会议</router-link>
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
            <router-link to='/userMyIntegral' target="_blank" class="userinfo-info-title">我的积分</router-link>
            <div class="userinfo-info-number">
              <span class="userinfo-info-number-size">0</span>
              <div class="serinfo-info-number-update">
                <img src="../../assets/images/icons/update.png" alt />
                <span>0</span>
              </div>
            </div>
          </div>
          <div class="userinfo-info-nav">
            <span class="userinfo-info-nav-span userinfo-info-nav-bottom">我的课程</span>
            <!-- <span>我的考试</span> -->
            <router-link class="userinfo-info-nav-span" to="/userNewsList">消息记录</router-link>
          </div>
        </div>
      </div>

      <div class="userinfo-myclass">
        <div class="userinfo-myclass-nav">
          <router-link class="userinfo-myclass-nav-span userinfo-myclass-left" to="/userInfo">已学</router-link>
          <router-link class="userinfo-myclass-nav-span userinfo-myclass-right" to="#">进行中</router-link>
          <router-link class="userinfo-class" to='/mystudyClass'>更多请跳转&lt;我的课程&gt;</router-link>
        </div>
        <div class="userinfo-myclass-complete">
          <div v-for="(item,index) of storeList" :key=index class="study-class-curriculum">
            <img :src="'http://47.101.221.57:10086/resource/partyBuild/uploads/' + item.course_img" class="study-class-curriculum-img" />
            <span class="study-class-curriculum-title">{{ item.course_name }}</span>
            <div class="study-class-curriculum-info">
              <span>讲课老师：</span>
              <span>{{ item.course_teacher }}</span>
            </div>
            <button @click="JumpDetails(item.id)" class="study-class-curriculum-button">开始学习</button>
            <i class="iconfont study-myclass-curriculum-icon">&#xe86a;</i>
          </div>
          <!-- <div class="study-class-curriculum">
            <img :src="classUrl" class="study-class-curriculum-img" />
            <span class="study-class-curriculum-title">学党史、知党情、强党性</span>
            <div class="study-class-curriculum-info">
              <span>讲课老师：</span>
              <span>张三</span>
            </div>
            <button class="study-class-curriculum-button">开始学习</button>
            <i class="iconfont study-myclass-curriculum-icon">&#xe86a;</i>
          </div>
          <div class="study-class-curriculum">
            <img :src="classUrl" class="study-class-curriculum-img" />
            <span class="study-class-curriculum-title">学党史、知党情、强党性</span>
            <div class="study-class-curriculum-info">
              <span>讲课老师：</span>
              <span>张三</span>
            </div>
            <button class="study-class-curriculum-button">开始学习</button>
            <i class="iconfont study-myclass-curriculum-icon">&#xe86a;</i>
          </div>
          <div class="study-class-curriculum">
            <img :src="classUrl" class="study-class-curriculum-img" />
            <span class="study-class-curriculum-title">学党史、知党情、强党性</span>
            <div class="study-class-curriculum-info">
              <span>讲课老师：</span>
              <span>张三</span>
            </div>
            <button class="study-class-curriculum-button">开始学习</button>
            <i class="iconfont study-myclass-curriculum-icon">&#xe86a;</i>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import { getUserClass,storeList } from '../../api/api'
if(localStorage.getItem("user")){
  var userId = JSON.parse(localStorage.getItem("user")).id;
}
export default {
  name: "userInfoAlready",
  data() {
    return {
      userIcon: require("../../assets/images/userAvatar/userhead.png"),
      // classUrl: require("../../assets/images/icons/class2.png"),
      storeList: [],
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside
  },
  mounted() {
    storeList({
      currentPage:1,
      pageSize:10,
      userId:userId
    }).then(res => {
      this.storeList = res.data.list
    })
    let user = this.$store.state.user;
    if (typeof user == "string") {
      user = JSON.parse(user);
    }
    let id = user.id;
    getUserClass({
      userId: user.id
    }).then(res => {
      window.console.log(res);
      if (res.code === 200) {
        this.classList = res.data.list
        window.console.log(this.classList);
      }else if(res.code === 401) {
        alert("请登录！");
        this.$store.commit('logout');
        this.$router.push({name: "Index"});
      }
    })
  },
  methods: {
    JumpDetails: function(id) {
      let ID = id;
      this.$router.push({
        path: '/classDetails',
        query: {id: ID}
      })
    }
  }
};
</script>

<style>
.userinfo-myclass-left {
  border-right: 1px solid rgba(208, 23, 31, 1);
}

.userinfo-myclass-right {
  color: rgba(208, 23, 31, 1);
}
.userinfo-class {
  color:rgba(240,70,74,1);
  float: right;
  margin-right: 50px;
}
.userinfo-class:hover {
  color: rgba(220,58,62,1);
}
</style>
