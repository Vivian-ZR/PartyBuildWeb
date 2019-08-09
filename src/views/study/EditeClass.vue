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
    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
        <router-link to="/studyClassMessage" class="user-message-add-return">返回课程管理</router-link>
        <div class="user-message-add-user">
          <div>
            <div class="user-message-add-icon"></div>
            <span class="user-message-add-user-title">编辑课程</span>
          </div>
          <div class="user-message-add-user-input">
            <span>课程名：</span>
            <input v-model="className" type="text" />
          </div>
          <div class="user-message-add-user-input">
            <span>课程主题：</span>
            <input v-model="classTheme" type="text" />
          </div>
          <div class="user-message-add-user-input">
            <span>讲课人：</span>
            <input v-model="classTeacher" type="text" />
          </div>
          <div class="add-class-brief-introduction">
            <span>课程简介：</span>
            <textarea v-model="classTextarea" name id cols="30" rows="10"></textarea>
          </div>
          <div class="add-class-img">
            <span>课程封面：</span>
            <img class="add-class-bg-img" :src="ImageUrl" />
            <div class="add-class-img-info">
              <p>可上传JPG、GIF、PNG格式图片，图片建议尺寸最少未400*256px，图片不超过2M。</p>
              <button class="add-class-select-img">选择图片</button>
              <input @change="getFile" ref="avatarInput" class="add-class-select-file" type="file" />
            </div>
          </div>
          <button @click="createClass" class="add-class-add-class">保存课程</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import { postUpdateCourse, getClassDetails } from "./../../api/api";
export default {
  name: "EditeClass",
  data() {
    return {
      ClassID: this.$route.query.id,
      ImageUrl: require("../../assets/images/icons/imgBG.png"),
      className: "", // 课程名
      classTheme: "", // 课程主题
      classTeacher: "", // 讲课人
      classTextarea: "", // 课程简介
      newsFileName: "", // 文件在服务器的文件名

      
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside
  },
  mounted() {
    getClassDetails({
      id: this.ClassID
    }).then(res => {
      if (res.code == 200) {
        this.className = res.data.courseName;
        this.classTheme = res.data.courseCategory;
        this.classTeacher = res.data.courseTeacher;
        this.classTextarea = res.data.courseIntroduction;
        this.ImageUrl =  'http://47.101.221.57:10086/resource/partyBuild/uploads/' + res.data.courseImg;
        this.newsFileName = res.data.courseImg;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    })
  },
  methods: {
    getFile(e) {
      try {
        const File = e.target.files[0];
        if (File.type.indexOf("image") == 0) {
          // web页面预览
          let _this = this;
          let reader = new FileReader();
          reader.readAsDataURL(File);
          reader.onload = function() {
            _this.ImageUrl = this.result;
          };
          // 后台上传
          let ImageData = new FormData();
          ImageData.append("file", File, File.name);
          this.axios
            .post("/file/uploadPicture", ImageData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(res => {
              if (res.data.code === 200) {
                this.newsFileName = res.data.data.path;
              } else if (res.data.code === 401) {
                alert("请登录！");
                this.$store.commit("logout");
                this.$router.push({ name: "Index" });
              }
            });
        }
      } catch (err) {
        window.console.log(this.newsFileName);
      }
    },
    createClass: function() {
      if (this.className == "") {
        alert("课堂名为空，请添加课程名！");
      } else if (this.classTheme == "") {
        alert("课程主题名为空，请添加课程主题名！");
      } else if (this.classTeacher == "") {
        alert("讲课人为空，请添加讲课人!");
      } else if (this.classTextarea == "") {
        alert("课程简介为空，请输入课程简介！");
      } else if (this.newsFileName == "") {
        alert("请上传课程封面!");
      } else {
        postUpdateCourse({
          id: this.ClassID,
          courseName: this.className,
          courseCategory: this.classTheme,
          courseTeacher: this.classTeacher,
          courseIntroduction: this.classTextarea,
          courseImg: this.newsFileName
        }).then(res => {
          window.console.log(res);
          if (res.code == 200) {
            alert("课程修改成功！");
            this.$router.push({ path: '/studyClassMessage' });
          } else if (res.code == 401) {
            alert("请登录！");
            this.$store.commit("logout");
            this.$router.push({ name: "Index" });
          }
        });
      }
    }
  }
};
</script>

<style>

</style>
