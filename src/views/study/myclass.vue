<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'课程'"
      :nvaTitleTwoOutOne="'课程列表'"
      :nvaTitleTwoOutTwo="'我的课程'"
      :nvaTitleTwoOutThree="'课程管理'"
      :nvaTitleTwoOutStyle="'navTitleTwo'"
      :navTitleOneRouter="'/studyClass'"
      :navTitleThreeRouter="'/studyClassMessage'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="studyClass" :studyOut="true"></user-aside>

    <div class="user-message-body">
      <div class="body-query">
        <news-search :selectChoise='selectChoise'></news-search>
      </div>
      <div class="study-class-eyebrow"></div>
      <div class="study-class-article">
        <div class="study-class-curriculum" v-for="(item,index) of storeList" :key=index>
          <img :src="'http://47.101.221.57:10086/resource/partyBuild/uploads/' + item.course_img" class="study-class-curriculum-img">
          <span class="study-class-curriculum-title">{{ item.course_name }}</span>
          <div class="study-class-curriculum-info">
            <span>讲课老师：</span>
            <span>{{ item.course_teacher }}</span>
          </div>
          <button @click="JumpDetails(item.id)" class="study-class-curriculum-button">开始学习</button>
          <i res="classCollect" @click="deleteCollect(item.id,item.collection_id,index)" class="iconfont study-myclass-curriculum-icon">&#xe86a;</i>
        </div>
        <!-- <div class="study-class-curriculum">
          <img :src="classURL" class="study-class-curriculum-img">
          <span class="study-class-curriculum-title">学党史、知党情、强党性</span>
          <div class="study-class-curriculum-info">
            <span>讲课老师：</span><span>张三</span>
          </div>
          <button class="study-class-curriculum-button">开始学习</button>
          <i class="iconfont study-myclass-curriculum-icon">&#xe86a;</i>
        </div>
        <div class="study-class-curriculum">
          <img :src="classURL" class="study-class-curriculum-img">
          <span class="study-class-curriculum-title">学党史、知党情、强党性</span>
          <div class="study-class-curriculum-info">
            <span>讲课老师：</span><span>张三</span>
          </div>
          <button class="study-class-curriculum-button">开始学习</button>
          <i class="iconfont study-myclass-curriculum-icon">&#xe86a;</i>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import search from "./../common/search";
import { storeList,deleteCourse,collectCourse  } from "../../api/api";
if(localStorage.getItem("user")){
  var userId = JSON.parse(localStorage.getItem("user")).id;
}
export default {
  name: "mystudyClass",
  data() {
    return {
      selectChoise: ["题名", "主题"],
      active:-1,
      collection_id:null,
      // classURL: require("../../assets/images/icons/class.png"),
      storeList: [
         {
          index: 0,
          value: ''
        }
      ],
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "news-search": search
  },
  mounted() {
    storeList({
      currentPage:1,
      pageSize:10,
      userId:userId
    }).then(res => {
      window.console.log(res);
      if (res.code == 200) {
        window.console.log(res);
        this.storeList = res.data.list;
      }else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index"});
      }
    })
  },
  methods: {
    JumpDetails: function(id){
      let ID = id;
      this.$router.push({
        path: '/classDetails',
        query: { id: ID }
      })
    },
    deleteCollect(id,collection_id,index) {
      deleteCourse({courseId:id}).then(res => {
          this.storeList.splice(index, 1)
          for (let index in this.storeList) {
              this.storeList[index].index = index
          }
      })
       collectCourse({courseId:id}).then(res => {
        this.active = index;
      })
    }
  }
};
</script>

<style>
.study-myclass-curriculum-icon {
  float: right;
  font-size: 30px !important;
  margin-top: -46px;
  cursor: pointer;
  color: #f4d02a;
}
.study-myclass-curriculum-icon:hover {
  color: #999999;
}
</style>

