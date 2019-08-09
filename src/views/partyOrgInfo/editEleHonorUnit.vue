<template>
  <div class="add-honor">
    <div class="add-honor-title">修改荣誉</div>

    <div class="edite-ele-honor">
      <div class="edite-ele-honor-one">
        <span>荣誉：</span>
        <input v-model="honorName" placeholder="请输入荣誉名称" type="text" />
      </div>
      <div class="edite-ele-honor-two">
        <span>荣誉详情：</span>
        <textarea v-model="describe" placeholder="荣誉详情"></textarea>
      </div>
    </div>

    <button @click="closeChapter" class="add-honor-return">取消</button>
    <button @click="updateAddHonor" class="add-chapter-add">保存修改</button>
  </div>
</template>

<script>
import {
  getOrganizationHonorID,
  postUpdateOrganizationHonor
} from "./../../api/api";
export default {
  name: "editEleHonorUnit",
  data() {
    return {
      honorName: "",
      describe: ""
    };
  },
  props: {
    eleID: {
      required: true
    },
    honorId: {
      required: true
    }
  },
  mounted() {
    getOrganizationHonorID({
      id: this.honorId
    }).then(res => {
      window.console.log(res);
      if (res.code == 200) {
        this.honorName = res.data.honorName;
        this.describe = res.data.describe;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  },
  methods: {
    closeChapter: function() {
      this.$parent.closeEditEleHonorUnit();
    },
    updateAddHonor: function() {
      if (this.honorName === "") {
        alert("请输入荣誉名称！");
      } else if (this.describe === "") {
        alert("请输入荣誉描述！");
      } else {
        postUpdateOrganizationHonor({
          id: this.honorId,
          organizationId: this.eleID,
          honorName: this.honorName,
          describe: this.describe
        }).then(res => {
          if (res.code == 200) {
            alert("修改荣誉成功！");
            this.$parent.updateHonor();
            this.$parent.closeEditEleHonorUnit();
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
.add-honor {
  position: fixed;
  width: 800px;
  height: 330px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 8px 1px rgba(86, 86, 86, 0.1);
  border-radius: 4px;
  left: calc(50% - 400px);
  top: 30%;
  z-index: 10;
}
.add-honor-title {
  /* width: calc(100% - 60px); */
  margin-bottom: 20px;
  height: 50px;
  text-align: center;
  font-size: 24px;
  line-height: 50px;
  font-weight: 400;
  border-radius: 4px 4px 0 0;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(197, 1, 5, 1);
}

.add-honor-return {
  width: 150px;
  height: 35px;
  background: rgba(100, 163, 241, 1);
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  margin: 10px 175px;
}
</style>
