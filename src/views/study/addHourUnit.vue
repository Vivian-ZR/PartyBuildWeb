<template>
  <div>
    <div class="add-hour">
      <div class="add-chapter-title">添加课时</div>
      <div class="add-chapter-div">
        <span>课时：</span>
        <input v-model="hourName" class="add-chapter-input-centent" type="text" />
      </div>
      <div class="add-chapter-div">
        <span>文件：</span>
        <input :value="FileName" type="text" class="add-hour-file-name" />
        <input  @change="getFile" type="file" class="add-hour-file" />
      </div>
      <button @click="closeHour" class="add-chapter-return">取消</button>
      <button @click="updateMap" class="add-chapter-add">添加</button>
    </div>
    <div></div>
  </div>
</template>

<script>
import { SectionToChinese } from "./../common/js/sectionToChinese";
export default {
  name: "addHourUnit",
  data() {
    return {
      hourName: "",
      FilePath: "",
      FileName: "",
      File: Object,
      progerss: ""
    };
  },
  props: {},
  filters: {
    SectionToChinese(number) {
      return SectionToChinese(number);
    }
  },
  methods: {
    getFile(e) {
      try {
        const File = e.target.files[0];
        if (File.type.indexOf("video") == 0) {
          this.File = File;
          this.FileName = File.name;
          window.console.log(this.Filename);
        } else {
          alert("请选择视频！");
        }
      } catch (err) {
        window.console.log(err);
      }
    },
    closeHour: function() {
      this.$parent.closeAddHour();
    },
    updateMap: function() {
      let File = this.File;
      let FileData = new FormData();
      FileData.append("file", File, File.name);
      var config = {
        onUploadProgress: progressEvent => {
          var complete =
            (((progressEvent.loaded / progressEvent.total) * 100) | 0) + "%";
          this.progerss = complete;
          window.console.log(this.progerss);
        }
      };
      this.axios
        .post("/file/uploadFile", FileData, config, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          window.console.log(res);
          if (res.data.code === 200) {
            this.FilePath = res.data.data.path;
            this.FileName = File.name;
          } else if (res.data.code === 401) {
            alert("请登录！");
            this.$store.commit("logout");
            this.$router.push({ name: "Index" });
          }
        });
    }
  }
};
</script>

<style>
.add-hour {
  position: fixed;
  width: 500px;
  height: 270px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 8px 1px rgba(86, 86, 86, 0.1);
  border-radius: 4px;
  left: calc(50% - 250px);
  top: 30%;
  z-index: 10;
}
.add-hour-file-name {
  width: 254px;
  height: 26px;
  padding-left: 10px;
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  margin-left: 20px;
}
.add-hour-file {
  position: relative;
  float: left;
  margin-top: -28px;
  width: 264px;
  opacity: 0;
  height: 26px;
  margin-left: 62px;
  cursor: pointer;
}
</style>
