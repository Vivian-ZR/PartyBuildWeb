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
            <span class="user-message-add-user-title">编辑章节</span>
          </div>

          <div v-for="(item,index) in ChapterList" :key="index" class="edite-class-chapter">
            <span>章节{{ index + 1 | SectionToChinese }}</span>
            <input readonly="readonly" :value="item.chapterName" type="text" />
            <i @click="deleteChapter(index)" class="edite-class-icon iconfont">&#xe7fc;</i>
            <i
              @click="EditeChapters=true, ChapterIndex=index"
              class="edite-class-icon iconfont"
            >&#xe600;</i>
          </div>
          <div @click="AddChapters=true" class="edite-class-addIcon">+ 添加章节</div>
          <button @click="updateChapter" class="edit-chapter-add">确认修改</button>
        </div>
      </div>
      <add-chapter :ClassID="ClassID" :chaptersNumber="chaptersNumber" v-if="AddChapters"></add-chapter>
      <edite-chapter
        :ClassID="ClassID"
        :index="ChapterIndex"
        :chaptersNumber="ChapterIndex+1"
        :chapterName="ChapterList[ChapterIndex].chapterName"
        v-if="EditeChapters"
      ></edite-chapter>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import addChapter from "./addChapter";
import editeChapter from "./editeChapter";
import { getChapter } from "./../../api/api";
import { SectionToChinese } from "./../common/js/sectionToChinese";
export default {
  name: "EditeClassChapter",
  data() {
    return {
      ClassID: this.$route.query.id,
      ChapterList: [],
      ChapterIndex: 0,
      AddChapters: false,
      EditeChapters: false,
      chaptersNumber: 1,
      ChapterID: 0
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "add-chapter": addChapter,
    "edite-chapter": editeChapter
  },
  filters: {
    SectionToChinese(number) {
      return SectionToChinese(number);
    }
  },
  mounted() {
    getChapter({
      courseId: this.ClassID
    }).then(res => {
      if (res.code == 200) {
        window.console.log(res);
        this.ChapterList = res.data.list;
        this.chaptersNumber = res.data.list.length + 1;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  },
  methods: {
    closeAddChapter: function() {
      this.AddChapters = false;
    },
    closeEditeChapter: function() {
      this.EditeChapters = false;
    },
    updateChapter: function() {
      let names = [];
      // window.console.log(this.ChapterList);
      for (var c of this.ChapterList) {
        names.push({
          id: c.id,
          chapterName: c.chapterName,
          courseId: this.ClassID
        });
      }
      window.console.log(names);
      this.axios
        .post(
          "/chapter/batchupdateChapter?course_id=" + this.ClassID,
          JSON.stringify(names),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          if (response.status === 200) {
            if (response.data.code === 200) {
              alert("章节修改完成！");
              this.$router.push({
                path: '/studyClassMessage'
              })
            } else if (response.data.code == 401) {
              alert("请登录！");
              this.$store.commit("logout");
              this.$router.push({ name: "Index" });
            }
          }
        });
    },
    addChapterList: function(data) {
      this.ChapterList.push(data);
      this.chaptersNumber = this.ChapterList.length + 1;
      window.console.log(this.ChapterList);
    },
    deleteChapter: function(index) {
      this.ChapterList.splice(index, 1);
      this.chaptersNumber = this.chaptersNumber - 1;
    },
    editChapter: function(index, name) {
      this.ChapterList[index].chapterName = name;
    }
  }
};
</script>

<style>
.edite-class-chapter {
  width: 70%;
  height: 40px;
  margin: 0 auto;
}
.edite-class-chapter span {
  display: inline-block;
  width: 70px;
  font-size: 16px;
}
.edite-class-chapter input {
  width: 254px;
  height: 26px;
  padding-left: 10px;
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
}
.edite-class-addIcon {
  width: 264px;
  height: 35px;
  background: rgba(255, 255, 255, 1);
  border: 1px dashed rgba(170, 170, 170, 1);
  border-radius: 4px;
  cursor: pointer;
  margin-left: calc(15% + 70px);
  text-align: center;
  line-height: 35px;
  color: rgba(153, 153, 153, 1);
}
.edite-class-addIcon:hover {
  background-color: rgba(86, 86, 86, 0.08);
}
.edite-class-icon {
  font-weight: 1000;
  margin-left: 15px;
  color: rgba(153, 153, 153, 1);
  cursor: pointer;
}
.edite-class-icon:hover {
  color: red;
}
.edit-chapter-add {
  margin-left: calc(50% - 150px);
  margin-top: 50px;
  width: 300px;
  height: 35px;
  background: rgba(240, 70, 74, 1);
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.edit-chapter-add:hover {
  background: rgba(220, 58, 62, 1);
}
</style>
