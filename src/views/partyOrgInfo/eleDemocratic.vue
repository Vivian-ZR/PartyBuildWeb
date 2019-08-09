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
          <div class="ele-desc-title">{{ organization_name}}档案详情</div>
          <div class="ele-desc-content">
            <span>组织名：</span>
            <span>{{ organization_name }}</span>
          </div>
          <div class="ele-desc-content">
            <span>组织管理员：</span>
            <span>{{ organization_admin }}</span>&emsp;&emsp;&emsp;
            <span>组织办公地点：</span>
            <span>{{ office_location }}</span>
          </div>
          <div class="ele-desc-content">
            <span>组织简介：</span>
            <p>{{ organization_synopsis }}</p>
          </div>
          <div class="ele-desc-content">
            <span>组织荣誉：</span>
            <div v-for="item in honorList" :key="item.id" class="ele-desc-content-honor">
              <div>
                <span>荣誉一：&emsp;</span>
                <span>{{ item.honor_name }}</span>
              </div>
              <div>
                <span class="ele-desc-content-honor-title">荣誉详情：</span>
                <span
                  class="ele-desc-content-honor-desc"
                >{{ item.describe }}</span>
              </div>
            </div>
          </div>
          <div class="ele-desc-content">
            <span>组织架构：</span>
            <div v-for="item in positionList" :key="item.id" class="ele-desc-content-opsition">
              <span>职位名称：</span>
              <span>{{ item.postion_name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import { getOrgDetailed } from "../../api/api"
export default {
  name: "eleDemocratic",
  data() {
    return {
      id: this.$route.query.id,
      organization_name: '',  // 组织名称
      organization_admin: '',  // 组织管理员
      office_location: '',       // 组织地点
      organization_synopsis: '',  // 组织简介
      honorList: [], // 组织荣誉列表     
      positionList: [], // 职位列表        
    }
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside
  },
  mounted() {
    window.console.log(this.id);
    getOrgDetailed({
      id: this.id
    }).then(res => {
      window.console.log(res);
      if (res.code == 200) {
        this.organization_name = res.data.organization_name;
        this.organization_admin = res.data.organization_admin;
        this.organization_synopsis = res.data.organization_synopsis;
        this.honorList = res.data.honorList;
        this.positionList = res.data.positionList;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    })
  }
};
</script>

<style>
.ele-desc-title {
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: rgba(68, 68, 68, 1);
}
.ele-desc-content {
  margin-left: 100px;
  margin-top: 40px;
  font-size: 16px;
  font-weight: 400;
  width: 80%;
  color: rgba(68, 68, 68, 1);
}
.ele-desc-content p {
  margin-left: 50px;
  margin-top: 20px;
  line-height: 20px;
}
.ele-desc-content-honor {
  margin-left: 50px;
  margin-top: 20px;
}
.ele-desc-content-honor div {
  margin-top: 10px;
}
.ele-desc-content-honor-title {
  float: left;
  top: -30px;
}
.ele-desc-content-honor-desc {
  display: inline-block;
  width: 80%;
}
.ele-desc-content-opsition {
  margin-left: 50px;
  margin-top: 10px;
}
</style>
