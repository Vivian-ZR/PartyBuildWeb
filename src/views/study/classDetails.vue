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
      :navTitleOneRouter="'/studyClass'"
      :navTitleTwoRouter="'/mystudyClass'"
      :navTitleThreeRouter="'/studyClassMessage'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="studyClass" :studyOut="true"></user-aside>

    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <div class="class-details-info">
          <img class="class-details-info-1" :src="classURL">
          <div class="class-details-info-2">
            <h1>{{ courseName }}</h1>
            <span>课程老师：</span><span>{{ courseTeacher }}</span>            
              <p><b>课程详情：</b>{{ courseIntroduction }}</p>            
          </div>          
        </div>
        <div class="class-details-chapter">
          <div class="class-details-chapter-title">
            <span>章节一：</span><span>一抓到底正风纪</span><span class="class-details-chapter-date">视频时长</span>
          </div>
          <div class="class-details-chapter-class"><span>课时一：</span>一抓到底正风纪<span></span><span class="float-left">44:00</span><span class="float-left">时长:</span></div>
          <!-- <div class="class-details-chapter-class"><span>课时二：</span>XXXX<span></span><span class="float-left">1:30:00</span><span class="float-left">时长:</span></div>
          <div class="class-details-chapter-class"><span>课时三：</span>XXXX<span></span><span class="float-left">1:30:00</span><span class="float-left">时长:</span></div>
          <div class="class-details-chapter-class"><span>课时四：</span>XXXX<span></span><span class="float-left">1:30:00</span><span class="float-left">时长:</span></div>
          <div class="class-details-chapter-class"><span>课时五：</span>XXXX<span></span><span class="float-left">1:30:00</span><span class="float-left">时长:</span></div> -->
        </div>       
        <!-- <div class="class-details-chapter">
          <div class="class-details-chapter-title">
            <span>章节一：</span><span>XXXXXXXXXX</span><span class="class-details-chapter-date">视频时长</span>
          </div>
          <div class="class-details-chapter-class"><span>课时一：</span>XXXX<span></span><span class="float-left">1:30:00</span><span class="float-left">时长:</span></div>
          <div class="class-details-chapter-class"><span>课时二：</span>XXXX<span></span><span class="float-left">1:30:00</span><span class="float-left">时长:</span></div>
          <div class="class-details-chapter-class"><span>课时三：</span>XXXX<span></span><span class="float-left">1:30:00</span><span class="float-left">时长:</span></div>
          <div class="class-details-chapter-class"><span>课时四：</span>XXXX<span></span><span class="float-left">1:30:00</span><span class="float-left">时长:</span></div>
          <div class="class-details-chapter-class"><span>课时五：</span>XXXX<span></span><span class="float-left">1:30:00</span><span class="float-left">时长:</span></div>
        </div> -->
          
        <button @click="JumpVideo" class="class-details-button">开始学习</button>
      </div>      
    </div>
  </div>  
</template>

<script>
import partyNave from './../common/partyNav'
import partyAside from './../common/partyAside'
import { getClassDetails, getChapter } from '../../api/api'
export default {
  name: 'classDetails',
  data() {
    return {
      classID: this.$route.query.id,
      selectChoise: ['题名','主题'],
      classURL: '',              // 课程图片
      courseName: '',
      courseTeacher: '',
      courseIntroduction: '',
    }
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
  },
  mounted() {    
    getClassDetails({
      id: this.classID
    }).then(res => {
      window.console.log(res);
      if( res.code === 200 ) {
        this.classURL = "http://47.101.221.57:10086/resource/partyBuild/uploads/" + res.data.courseImg;
        this.courseName = res.data.courseName;
        this.courseTeacher = res.data.courseTeacher;
        this.courseIntroduction = res.data.courseIntroduction;
      }
    });
    getChapter({
      courseId: this.classID
    }).then(res => {
      window.console.log(res);
    })
  },
  methods: {
    JumpVideo: function() {
      this.$router.push({
        path: '/classvideo'
      })
    }
  }
}
</script>

<style>
.class-details-info {
  width: 75%;
  height: 300px;
  margin: 0 auto;
  padding-top: 20px;
}
.class-details-info-1 {
  float: left;
  width: 50%;
}
.class-details-info-2 {
  float: left;
  width: calc(50% - 20px);
  height: 200px;
  margin-left: 20px;
  padding-top: 20px;
}
.class-details-info-2 h1 {
  font-size:24px;
  color:rgba(68,68,68,1);
}
.class-details-info-2 span {
  display: inline-block;
  font-size:16px;
  margin-top: 20px;
}
.class-details-info-2 b {
  font-size:16px;
}
.class-details-info-2 p {
  display: inline-block;
  margin-top: 20px;
  line-height: 20px;
}
.class-details-chapter {
  width: 75%;
  margin: 40px auto;
}
.class-details-chapter-title {
  font-size:18px;
  margin: 20px 0;
  color:rgba(68,68,68,1);
}
.class-details-chapter-date {
  float: right;
  margin-right: 40px;
  color:rgba(153,153,153,1);
}
.class-details-chapter-class {
  margin: 10px 0;
  padding-left: 20px;
  padding-right: 40px;
  cursor: pointer;
  font-size:16px;
  color:rgba(68,68,68,1);
}
.float-left {
  float: right;
}
.class-details-button {
  width: 60%;
  height: 35px;
  color: rgba(255, 255, 255, 1);
  background:rgba(100,163,241,1);
  border-radius:4px;
  margin-left: 20%;
  cursor: pointer;
}
.class-details-button:hover {
  background:rgba(92,151,224,1);
}
</style>

