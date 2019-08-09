<template>
  <div>
     <!-- top信息栏 -->
    <user-nav 
      :nvaTitleOut="true" 
      :nvaTitleOneOut="'课程'" 
      :nvaTitleTwoOutOne="'课程列表'" 
      :nvaTitleTwoOutTwo="'我的课程'" 
      :nvaTitleTwoOutThree="'课程管理'" 
      :nvaTitleTwoOutStyle="'navTitleOne'"
      :navTitleTwoRouter="'/mystudyClass'"
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
        <div v-for="(item,index) in classList" :key="index" class="study-class-curriculum">
          <img :src="'http://47.101.221.57:10086/resource/partyBuild/uploads/' + item.course_img" class="study-class-curriculum-img">
          <span class="study-class-curriculum-title">{{ item.course_name }}</span>
          <div class="study-class-curriculum-info">
            <span>讲课老师：</span><span>{{ item.course_teacher }}</span>
          </div>
          <button @click="JumpDetails(item.id)"  class="study-class-curriculum-button">开始学习</button>
          <!-- <i res="classCollect" :style="[actived]" :class="item.collection_id == null ? 'iconfont study-class-curriculum-icon' : 'iconfont study-class-curriculum-icon addclass'"  @click="collect(item.id,item.collection_id,index)">&#xe86a;</i> -->
          <i res="classCollect" :class="item.collection_id == null && checkActive(index)  ? 'iconfont study-class-curriculum-icon' : 'iconfont study-class-curriculum-icon addclass'"  @click="toogle(item.id,item.collection_id,index)">&#xe86a;</i>
          <!-- <i id="classCollect" :class = "active == index ? 'iconfont study-class-curriculum-icon addclass' : 'iconfont study-class-curriculum-icon'" @click="collect(item.id,index)">&#xe86a;</i> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from './../common/partyNav'
import partyAside from './../common/partyAside'
import search from './../common/search'
import { getClass,collectCourse } from '../../api/api'
import _ from 'lodash'
export default {
  name: 'studyClass',
  data() {
    return {
      nowIndex:[],
      selectChoise: ['题名','主题'],
      classList: [],
      active:-1,
    }
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "news-search": search,
  },
  inject: ['reload'],
  mounted() {
    let user =this.$store.state.user;
    if (typeof user == "string") {
      user = JSON.parse(user);
    }
    getClass().then(res => {
      window.console.log(res);
      if (res.code === 200) {
        this.classList = res.data.list
        window.console.log(this.classList);
        for(let i='collection_id';i<res.data.list.length;i++){
          if(res.data.list[i]['collection_id'] == null){
            return
          }else{
            if(this.nowIndex.indexOf(i)=== -1){
              this.nowIndex.push(i)
            }
            else{
              this.nowIndex.splice(i)
            }
            window.console.log(this.nowIndex)
          }
        }
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
    },
    // collect(id,collection_id,index){ 
    //   this.reload()
    //   this.actived.color=this.actived.color==="#f4d02a"?'':"#f4d02a"
    //   collectCourse({courseId:id}).then(res => {
    //     this.reload()
    //     this.active = index;
    //   })
    // },
    checkActive(index){
      // window.console.log(this.nowIndex)
      window.console.log(this.nowIndex.indexOf(index),index)
      return this.nowIndex.indexOf(index) == -1
    },
    toogle(id,collection_id,index){
      if(this.nowIndex.indexOf(index) === -1){
        this.nowIndex.push(index)
        collectCourse({courseId:id}).then(res => {
        this.active = index;
      })
      }else{
        this.nowIndex = _.remove(this.nowIndex,(idx) => {
          window.console.log(this.nowIndex,456)
          this.nowIndex.splice(index)
          return idx !== index
        } )
      }
    },
  },
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
  height: 12vw;
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
  line-height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.study-class-curriculum-info {
  color:rgba(160,160,160,1);
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
.study-class-curriculum-icon {
  float: right;
  font-size: 30px !important;
  margin-top: -46px;
  cursor: pointer;
  color: #999999;
}
/* .study-class-curriculum-icon:hover {
  color: #f4d02a;
} */
.addclass{
  color: #f4d02a!important;
}
</style>

