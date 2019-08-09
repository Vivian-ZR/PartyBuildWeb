<template>
  <div>
     <!-- top信息栏 -->
    <user-nav 
      :nvaTitleOut="true" 
      :nvaTitleOneOut="'课程'" 
      :nvaTitleTwoOutOne="'课程列表'" 
      :nvaTitleTwoOutTwo="'我的课程'" 
      :nvaTitleTwoOutThree="'课程管理'" 
      :nvaTitleTwoOutStyle="'navTitleThree'"
      :navTitleTwoRouter="'/mystudyClass'"
      :navTitleOneRouter="'/studyClass'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="studyClass" :studyOut="true"></user-aside>

    <div class="user-message-body">
      <div class="body-query">
        <news-search :selectChoise='selectChoise'></news-search>
        <router-link to='/addClass' class="user-message-add">添加课程</router-link>
      </div>
      <div class="study-class-eyebrow"></div>
      <div class="study-class-article">
        <div v-for="item in classList" :key="item.id" class="study-class-curriculum">
          <img :src="'http://47.101.221.57:10086/resource/partyBuild/uploads/' + item.course_img" class="study-class-curriculum-img">
          <span class="study-class-curriculum-title">{{ item.course_name }}</span>
          <div class="study-class-curriculum-info">
            <span>讲课老师：</span><span>{{ item.course_teacher }}</span>
          </div>
          <button @mouseenter="classImg=item.id" @mouseleave="classImg = -1" class="study-class-curriculum-button">编辑
            <i class="iconfont">&#xe8ec;</i>
          </button>
          <div v-if="classImg == item.id" @mouseenter="classImg=item.id" @mouseleave="classImg = -1" class="class-message-select">
            <router-link class="class-message-select-div" :to="{path: '/EditeClass', query:{id: item.id}}">编辑课程</router-link>
            <router-link class="class-message-select-div" :to="{path: '/EditeClassChapter', query:{id: item.id}}">编辑章节</router-link>
            <router-link class="class-message-select-div" :to="{path: '/editHour', query:{id: item.id}}">编辑课时</router-link>
          </div>
        </div>

      </div>
    </div>
  </div>  
</template>

<script>
import partyNave from './../common/partyNav'
import partyAside from './../common/partyAside'
import search from './../common/search'
import { getClass } from './../../api/api'
export default {
  name: 'studyClassMessage',
  data() {
    return {
      selectChoise: ['题名','主题'],
      classList: [],
      classImg: -1
    }
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "news-search": search,
  },
  mounted() {
    getClass().then(res => {
      if(res.code === 200) {
        this.classList = res.data.list
        window.console.log(this.classList);        
      }else if(res.code === 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });       
      }
    })
  }
}
</script>

<style>
.study-class-eyebrow {
  width: 100%;
  height: 35px;
  background-color: rgba(224,11,24,1);
}
.study-class-article {
  width: 100%;
  height: 873px;
}
.study-class-curriculum {
  float: left;
  width: calc(12% - 20px);
  height: 14vw;
  background-color: rgba(255, 255, 255, 1);
  padding: 10px;
  margin: 20px;
  border:1px solid rgba(229,229,229,1);
  box-shadow:5px 5px 5px 1px rgba(86,86,86,0.08);
}
.study-class-curriculum-img {
  width: 99%;
  height: 6vw;
  margin: 0.5%;
}
.study-class-curriculum-title {
  display: inline-block;
  width: 100%;
  font-size:16px;
  font-weight:400;
  color:rgba(68,68,68,1);
  line-height: 3vw;;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.study-class-curriculum-info {
  color:rgba(160,160,160,1);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.study-class-curriculum-button {
  display: block;
  width: 65%;
  height: 1.8vw;
  color: rgba(255, 255, 255, 1);
  margin: 15px auto;
  cursor: pointer;
  border-radius:4px;
  background:rgba(100,163,241,1);
  font-weight:800;
}
.study-class-curriculum-button:hover {
  background:rgba(92,151,224,1);
}
.study-class-curriculum-button i {
  position: relative;
  left: 13%;
}
.study-class-curriculum-icon {
  float: right;
  font-size: 30px !important;
  margin-top: -46px;
  cursor: pointer;
  color: #999999;
}
.study-class-curriculum-icon:hover {
  color: #f4d02a;
}
.class-message-select {
  position: relative;
  cursor: pointer;
  width: 65%;
  height: 75px;
  margin: 0 auto;
  margin-top: -10px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(100,163,241,1);
  border-radius:4px;
  Z-index: 100;
}
.class-message-select-div {
  display: inline-block;
  width: 100%;
  font-size: 14px;
  height: 25px;  
  line-height: 25px;
  text-align: center;
  color: rgba(68, 68, 68, 1);
}
.class-message-select-div:hover {
  background:rgba(100,163,241,1);
  color: rgba(255, 255, 255, 1);
}
</style>

