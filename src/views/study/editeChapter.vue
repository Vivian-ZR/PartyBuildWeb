<template>
  <div class="add-chapter">
    <div class="add-chapter-title">编辑章节</div>
    <div class="add-chapter-div">
      <span>章节{{chaptersNumber | SectionToChinese}}</span>
      <input v-model="name"  class="add-chapter-input-centent" type="text" />
    </div>
    <button @click="closeChapter" class="add-chapter-return">取消</button>
    <button @click="updateAddChapter" class="add-chapter-add">修改</button>
  </div>
</template>

<script>
import { SectionToChinese } from "./../common/js/sectionToChinese";
export default {
  name: "editeChapter",
  data() {
    return {
      name: this.chapterName
    };
  },
  props: {
    chaptersNumber: {
      required: true
    },
    index: {
      required: true
    },
    chapterName: {
      required: true
    }
  },
  filters: {
    SectionToChinese(number) {
      return SectionToChinese(number);
    }
  },
  methods: {
    closeChapter: function() {
      this.$parent.closeEditeChapter();
    },
    updateAddChapter: function() {
      if (this.name === "") {
        alert("请输入章节名称！");
      } else {
        this.$parent.editChapter(this.index, this.name);
        this.$parent.closeEditeChapter();
      }
    }
  }
};
</script>

<style>
.add-chapter {
  position: fixed;
  width: 500px;
  height: 220px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 8px 1px rgba(86, 86, 86, 0.1);
  border-radius: 4px;
  left: calc(50% - 250px);
  top: 30%;
  z-index: 10;
}
.add-chapter-title {
  width: calc(100% - 60px);
  height: 50px;
  text-align: center;
  font-size: 24px;
  line-height: 50px;
  font-weight: 400;
  border-radius: 4px 4px 0 0;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(197, 1, 5, 1);
}
.add-chapter-input-centent {
  width: 254px;
  height: 26px;
  padding-left: 10px;
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  margin-left: 20px;
}
.add-chapter-div {
  width: 80%;
  margin: 30px auto;
}
.add-chapter-return {
  width: 150px;
  height: 35px;
  background: rgba(100, 163, 241, 1);
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  margin: 10px 50px;
}
.add-chapter-add {
  width: 150px;
  height: 35px;
  background: rgba(240, 70, 74, 1);
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.add-chapter-return:hover {
  background: rgba(92, 151, 224, 1);
}
.add-chapter-add:hover {
  background: rgba(220, 58, 62, 1);
}
</style>
