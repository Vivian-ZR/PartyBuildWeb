<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'电子档案'"
      :nvaTitleTwoOutOne="'组织档案'"
      :nvaTitleTwoOutTwo="'人员档案'"
      :nvaTitleTwoOutStyle="'navTitleOne'"
      :navTitleTwoRouter="'/eleUser'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="elecFiles" :partyInfoOut="true"></user-aside>

    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
        <router-link to="/eleArchives" class="user-message-add-return">返回组织管理</router-link>
        <div class="user-message-add-user">
          <div>
            <div class="user-message-add-icon"></div>
            <span class="user-message-add-user-title">编辑组织荣誉</span>
          </div>

          <div v-for="(item, index) in honorList" :key="index" class="edite-ele-honor">
            <div class="edite-ele-honor-one">
              <span>荣誉{{ index+1 | SectionToChinese }}：</span>
              <input v-model="item.honorName" readonly type="text" />
              <i @click="deleteHonor(item.id)" class="edite-class-icon iconfont">&#xe7fc;</i>
              <i @click="honorId=item.id, editHonor=true" class="edite-class-icon iconfont">&#xe600;</i>
            </div>
            <div class="edite-ele-honor-two">
              <span>荣誉详情：</span>
              <textarea v-model="item.describe" readonly></textarea>
            </div>
          </div>

          <div class="edite-ele-honor">
            <div @click="AddHonor=true" class="edite-ele-honor-addIcon">+ 添加组织荣誉</div>
          </div>
        </div>
      </div>
      <add-honor :eleID="id" v-if="AddHonor"></add-honor>
      <edit-honor :eleID="id" :honorId="honorId"  v-if="editHonor"></edit-honor>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import addEleHonorUnit from "./addEleHonorUnit";
import editEleHonorUnit from "./editEleHonorUnit";
import { getOrganizationHonor, deleteOrganizationHonor } from "../../api/api";
import { SectionToChinese } from "./../common/js/sectionToChinese";
export default {
  name: "editeEleHonor",
  data() {
    return {
      id: this.$route.query.id,
      honorId: '',
      honorList: [],
      AddHonor: false, // 添加荣誉
      editHonor: false // 编辑荣誉
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "add-honor": addEleHonorUnit,
    "edit-honor": editEleHonorUnit
  },
  filters: {
    SectionToChinese(number) {
      return SectionToChinese(number);
    }
  },
  mounted() {
    window.console.log(this.id);
    getOrganizationHonor({
      organizationId: this.id
    }).then(res => {
      if (res.code == 200) {
        this.honorList = res.data.list;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  },
  methods: {
    closeAddEleHonorUnit: function() {
      this.AddHonor = false;
    },
    closeEditEleHonorUnit: function() {
      this.editHonor = false;
    },
    updateHonor: function() {
      getOrganizationHonor({
        organizationId: this.id
      }).then(res => {
        if (res.code == 200) {
          this.honorList = res.data.list;
        } else if (res.code == 401) {
          alert("请登录！");
          this.$store.commit("logout");
          this.$router.push({ name: "Index" });
        }
      });
    },
    deleteHonor: function(id) {
      let r = confirm("确定要删除该荣誉么？");
      let honorId = id;
      if (r === true) {
        deleteOrganizationHonor({
          ids: honorId
        }).then(res => {
          if (res.code == 200) {
            alert("该荣誉已删除成功");
            this.updateHonor();
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
.edite-ele-honor {
  height: 170px;
  width: 70%;
  margin: 0 auto;
}
.edite-ele-honor-one {
  height: 26px;
  font-size: 16px;
  margin-bottom: 20px;
}
.edite-ele-honor-one span {
  display: inline-block;
  width: 80px;
}
.edite-ele-honor-one input {
  width: 65%;
  height: 26px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  padding-left: 5px;
}
.edite-ele-honor-two {
  height: 100px;
}
.edite-ele-honor-two span {
  display: inline-block;
  position: relative;
  top: -40px;
  width: 80px;
  font-size: 16px;
}
.edite-ele-honor-two textarea {
  width: 65%;
  height: 100px;
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  padding-left: 5px;
}
.edite-ele-honor-addIcon {
  width: calc(65% + 5px);
  height: 35px;
  background: rgba(255, 255, 255, 1);
  border: 1px dashed rgba(170, 170, 170, 1);
  border-radius: 4px;
  cursor: pointer;
  margin-left: 80px;
  text-align: center;
  line-height: 35px;
  color: rgba(153, 153, 153, 1);
}
.edite-ele-honor-addIcon:hover {
  background-color: rgba(86, 86, 86, 0.08);
}
</style>
