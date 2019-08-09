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
              <span class="userinfo-info-number-size">{{ newsNumber }}</span>
            </div>
          </div>
          <div class="userinfo-info-integral">
            <router-link to="/userMyIntegral" target="_blank" class="userinfo-info-title">我的积分</router-link>
            <div class="userinfo-info-number">
              <span class="userinfo-info-number-size">{{ integral }}</span>
              <div class="serinfo-info-number-update">
                <img src="../../assets/images/icons/update.png" alt />
                <span>0</span>
              </div>
            </div>
          </div>
          <div class="userinfo-info-nav">
            <router-link to class="userinfo-info-nav-span userinfo-info-nav-bottom">我的课程</router-link>
            <!-- <span>我的考试</span> -->
            <router-link class="userinfo-info-nav-span" to="/userNewsList">消息记录</router-link>
          </div>
        </div>
      </div>

      <div class="userinfo-myclass">
        <div class="userinfo-myclass-nav">
          <router-link class="userinfo-myclass-nav-span userinfo-myclass-boder-right" to="#">已学</router-link>
          <router-link class="userinfo-myclass-nav-span" to="/userInfoAlready">进行中</router-link>
          <router-link class="userinfo-class" to="/mystudyClass">更多请跳转&lt;我的课程&gt;</router-link>
        </div>
        <div class="userinfo-myclass-complete">
          <div class="study-class-curriculum" v-for="(item,index) of storeList" :key=index>
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
import { getUserDetailed, postUserNews } from "./../../api/api";
import { getUserClass,storeList } from "../../api/api"
if(localStorage.getItem("user")){
  var userId = JSON.parse(localStorage.getItem("user")).id;
}
export default {
  name: "userInfo",
  data() {
    return {
      userIcon: require("../../assets/images/userAvatar/userhead.png"),
      // classUrl: require("../../assets/images/icons/class2.png"),
      integral: 0, // 总积分
      newsNumber: 0,
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
      // console.log(res.data.list);
      this.storeList = res.data.list;
    })
    let user = this.$store.state.user;
    if (typeof user == "string") {
      user = JSON.parse(user);
    }
    let id = user.id;
    getUserDetailed({
      id
    }).then(res => {
      if (res.code == 200) {
        window.console.log(res.data);
        if (res.data.integral == null) {
          this.integral = 0
        } else {
          this.integral = res.data.integral;
        }
        
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    }),
    postUserNews().then(res => {
      window.console.log(res);
      if (res.code == 200) {
        window.console.log(res);
        if (res.data !== null) {
          this.newsNumber = res.data;
        }
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
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
  },methods: {
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
.userinfo-background {
  width: 100%;
  height: 280px;
}
.userinfo-body {
  overflow: hidden;
  height: 280px;
  width: 100%;
}
.userinfo-info {
  position: relative;
  top: -280px;
  height: 280px;
  width: 100%;
}
.userinfo-icon {
  position: relative;
  left: 60px;
  top: 60px;
}
.userinfo-info-integral,
.userinfo-info-meeting,
.userinfo-info-news {
  float: right;
  width: 250px;
  height: 80px;
  margin-top: 100px;
}
.userinfo-info-news {
  border-left: 1px solid rgba(255, 255, 255, 1);
  border-right: 1px solid rgba(255, 255, 255, 1);
}
.userinfo-info-title {
  display: block;
  font-size: 22px;
  font-weight: 400;
  color: #ececec;
  text-align: center;
}
.userinfo-info-title:hover {
  color: rgba(255, 255, 255, 1);
}
.userinfo-info-number {
  color: rgba(255, 255, 255, 1);
  margin-top: 18px;
  text-align: center;
}
.userinfo-info-number-size {
  font-size: 48px;
  font-weight: 400;
}
.serinfo-info-number-update {
  display: inline-block;
  position: relative;
  top: -25px;
}
.userinfo-info-nav {
  position: relative;
  top: 106px;
  font-size: 18px;
  color: rgba(255, 255, 255, 1);
  width: 470px;
  height: 30px;
}
.userinfo-info-nav-span {
  font-size: 18px;
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  height: 26px;
  margin-left: 80px;
  cursor: pointer;
}
.userinfo-info-nav-span:hover {
  border-bottom: 4px solid rgba(255, 255, 255, 1);
}
.userinfo-info-nav-bottom {
  border-bottom: 4px solid rgba(255, 255, 255, 1);
}
.userinfo-myclass {
  width: 100%;
  height: 710px;
}
.userinfo-myclass-nav {
  margin-top: 50px;
  margin-top: 30px;
  height: 30px;
  margin-left: 60px;
  font-size: 16px;
}
.userinfo-myclass-nav-span {
  color: rgba(153, 153, 153, 1);
  font-size: 16px;
  font-weight: 400;
  padding: 0 10px;
}
.userinfo-myclass-boder-right {
  border-right: 1px solid rgba(208, 23, 31, 1);
  color: rgba(208, 23, 31, 1);
}
.userinfo-myclass-nav-span:hover {
  color: rgba(208, 23, 31, 1);
}
.userinfo-myclass-complete {
  width: calc(100% - 20px);
  height: 680px;
  padding-left: 20px;
}
</style>
