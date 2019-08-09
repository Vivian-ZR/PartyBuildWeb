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
            <span class="user-message-add-user-title">编辑课时</span>
          </div>

          <div class="edite-class-hour">
            <span>章节{{ ChapterNumber | SectionToChinese }}：</span>
            <select v-model="ChapterId" @change="getChapterNumber(ChapterId)">
              <option value>请选择章节</option>
              <option
                v-for="(item, index) in ChapterList"
                :key="index"
                :value="item.id"
              >{{ item.chapterName }}</option>
            </select>
          </div>

          <div v-for="(item, index) in HourList" :key="index" class="edite-class-chapter">
            <span>课程一：</span>
            <input :value="item.className" type="text" readonly="readonly" />
            <i  class="edite-class-icon iconfont">&#xe7fc;</i>
            <i  class="edite-class-icon iconfont">&#xe600;</i>
          </div>

          <div @click="addHourWindow" class="edite-class-addIcon">+ 添加课时</div>
          <button class="edit-chapter-add">确认课时</button>
        </div>
        <add-hour v-if="hourSelect"></add-hour>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import addHourUnit from "./addHourUnit"
import { getChapter, getClassHour } from "./../../api/api";
import { SectionToChinese } from "./../common/js/sectionToChinese";
export default {
  name: "editHour",
  data() {
    return {
      id: this.$route.query.id,
      ChapterList: [], // 章节列表
      HourList: [], // 课时列表
      ChapterId: "", // 章节id
      ChapterNumber: 0, // 章节序号

      hourSelect: false,        // 添加课程开关
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "add-hour": addHourUnit
  },
  filters: {
    SectionToChinese(number) {
      return SectionToChinese(number);
    }    
  },
  mounted() {
    getChapter({
      courseId: this.id
    }).then(res => {
      if (res.code == 200) {
        window.console.log(res);
        this.ChapterList = res.data.list;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  },
  methods: {
    getChapterNumber: function(id) {
      window.console.log(id);
      let chapterId = id;
      for(let chapter of this.ChapterList) {
        if(chapter.id == chapterId) {
          this.ChapterNumber = chapter.sort
        }
      }
      if (id !== "") {
        getClassHour({
          chapterId
        }).then(res => {
          if (res.code == 200) {
            window.console.log(res);
            this.HourList = res.data.list;
          } else if (res.code == 401) {
            alert("请登录！");
            this.$store.commit("logout");
            this.$router.push({ name: "Index" });
          }
        });
      } else {
        alert("请添加章节！");
      }
    },
    closeAddHour: function() {
      this.hourSelect = false;
    },
    addHourWindow: function() {
      window.console.log(this.ChapterId);
      if (this.ChapterId === '') {
        alert("请选择章节！");
      } else {
        this.hourSelect = true; 
      }           
    }
  }
};
</script>

<style>
.edite-class-hour {
  width: 80%;
  height: 40px;
  margin: 0 auto;
  font-size: 20px;
  font-weight: 400;
}
.edite-class-hour select {
  width: 254px;
  height: 26px;
  font-weight: 500;
  padding-left: 10px;
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
}
</style>
