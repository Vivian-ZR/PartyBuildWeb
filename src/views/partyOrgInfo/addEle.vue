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
        <router-link to="/eleArchives" class="user-message-add-return">返回组织档案</router-link>
        <div class="ele-archives-title">添加组织</div>
        <div class="add-ele-archives add-ele-archives-one">
          <span>组织名：</span>
          <input
            type="text"
            class="add-ele-archives-input"
            v-model="organizationName"
            placeholder="请输入组织名"
          />
        </div>
        <div class="add-ele-archives">
          <span>组织管理员：</span>
          <select v-model="positionId" class="add-ele-archives-input">
            <option value>请选择组织管理员</option>
            <option
              v-for="item in adminList"
              :key="item.id"
              :value="item.id"
            >{{ item.organization_name }} {{ item.user_name }}</option>
          </select>
        </div>
        <div class="add-ele-archives">
          <span>办公地点：</span>
          <textarea v-model="workAddres" class="add-ele-archives-textarea-one"></textarea>
        </div>
        <div class="add-ele-archives">
          <span>组织简介：</span>
          <textarea v-model="organizationSynopsis" class="add-ele-archives-textarea-two"></textarea>
        </div>
        <button @click="clickReturn" class="user-message-info-button add-party-user-button1">取消</button>
        <button @click="saveEle" class="user-message-info-button add-party-user-button2">创建</button>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import { getUserlist, postAddOrg } from "../../api/api";
export default {
  name: "addEle",
  data() {
    return {
      adminList: [],
      organizationName: '', // 组织名
      adminName: "", // 管理员姓名
      positionId: "", // 管理员Id
      workAddres: "", // 办公地点
      organizationSynopsis: "" // 组织简介
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside
  },
  mounted() {
    getUserlist({
      pageSize: 1000
    }).then(res => {
      if (res.code == 200) {
        window.console.log(res.data.list);
        this.adminList = res.data.list;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  },
  methods: {
    clickReturn: function() {
      this.$router.push({
        path: "/eleArchives"
      });
    },
    saveEle: function() {
      if(this.organizationName === "") {
        alert("请输入组织名！");
      } else if(this.positionId === "") {
        alert("请选择组织管理员！");
      } else if(this.workAddres === "") {
        alert("请输入办公地点！");
      } else if(this.organizationSynopsis === "") {
        alert("请输入组织简介！");
      }else {
        for(var i=0; i< this.adminList.length; i++) {
          if(this.positionId === this.adminList[i].id) {
            this.adminName = this.adminList[i].user_name;
          }
        }
        postAddOrg({
          organizationName: this.organizationName,
          organizationAdmin: this.adminName,
          organizationSynopsis: this.organizationSynopsis,
          officeLocation: this.officeLocation
        }).then(res => {
          window.console.log(res);
          if (res.code == 200) {
            alert("组织添加成功！");
            this.$router.push({ path: '/eleArchives' });
          } else if (res.code == 401) {
            alert("请登录！");
            this.$store.commit("logout");
            this.$router.push({ name: "Index" });
          }          
        })
      }
    }
  }
};
</script>

<style>
.ele-archives-title {
  position: relative;
  top: 30px;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: rgba(68, 68, 68, 1);
}
.add-ele-archives {
  width: 70%;
  margin: 0 auto;
}
.add-ele-archives span {
  display: inline-block;
  width: 100px;
  margin: 20px 0;
}
.add-ele-archives-one {
  margin-top: 50px;
}
.add-ele-archives-input {
  width: 200px;
  height: 26px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  padding-left: 5px;
  cursor: pointer;
}
.add-ele-archives-textarea-one {
  width: 70%;
  margin-top: 10px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  padding-left: 5px;
}
.add-ele-archives-textarea-two {
  width: 70%;
  height: 70px;
  margin-top: 30px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  padding-left: 5px;
}
.add-ele-admin-user {
  position: absolute;
  width: 205px;
  max-height: 400px;
  overflow-y: auto;
  margin-left: 100px;
  margin-top: -8px;
  border: 1px solid rgba(170, 170, 170, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
.add-ele-query-icon {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 30px !important;
  color: rgba(170, 170, 170, 1);
}
.add-ele-select-query-user {
  cursor: pointer;
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  border-bottom: rgba(170, 170, 170, 1);
}
.add-ele-select-query-user:hover {
  background: rgba(170, 170, 170, 1);
}
</style>