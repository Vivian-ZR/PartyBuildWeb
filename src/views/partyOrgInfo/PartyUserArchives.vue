<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'电子档案'"
      :nvaTitleTwoOutOne="'组织档案'"
      :nvaTitleTwoOutTwo="'人员档案'"
      :nvaTitleTwoOutStyle="'navTitleTwo'"
      :navTitleOneRouter="'/eleArchives'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="elecFiles" :partyInfoOut="true"></user-aside>

    <div class="user-message-body">
      <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
      <router-link to="/eleUser" class="user-message-add-return">返回党员列表</router-link>
      <div class="user-message-add-user">
        <div>
          <div class="user-message-add-icon"></div>
          <span class="user-message-add-user-title">档案详情</span>
        </div>
        <div class="add-patry-user-title">党员信息详情</div>
        <div class="add-patry-user-icon"></div>
        <div class="add-party-user-info">
          <div class="add-party-user-span">
            <span>用户照片：</span>
            <img :src="userImage" class="add-party-user-image" />
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>姓名：</span>
              <input class="add-party-user-name" type="text" readonly v-model="userName" />
            </div>
            <div class="add-party-user-span-div">
              <span>参加工作日期：</span>
              <input type="text" class="add-party-user-ID" readonly>
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>性别：</span>
              <select v-model="gender"  class="add-party-user-select-sex" disabled="disabled">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
            <div class="add-party-user-span-div">
              <span>党支部名称：</span>
              <select
                v-model="organizationId"
                @change="getPositionlist(organizationId)"
                class="add-party-user-select"
                disabled="disabled"
              >
                <option
                  v-for="item in orglist"
                  :key="item.id"
                  :value="item.id"
                >{{ item.organization_name }}</option>
              </select>
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>民族：</span>
              <input
                v-model="nationality"
                class="add-party-user-nation"
                type="text"
                readonly
              />
            </div>
            <div class="add-party-user-span-div">
              <span>现工作职务：</span>
              <input
                class="add-party-user-ID"
                v-model="currentJob"
                type="text"
                readonly
              />
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>出生日期：</span>
              <input type="text" v-model="birthDate" class="add-party-user-ID" readonly>
            </div>
            <div class="add-party-user-span-div">
              <span>入党日期：</span>
              <input type="text" v-model="partyDate" class="add-party-user-ID" readonly>
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>籍贯：</span>
              <input
                class="add-party-user-ID"
                type="text"
                v-model="birthplace"
                readonly
              />
            </div>
            <div class="add-party-user-span-div">
              <span>岗位层级：</span>
              <input
                class="add-party-user-ID"
                type="text"
                v-model="postLevel"
                readonly
              />
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>居民身份证：</span>
              <input
                class="add-party-user-ID"
                type="text"
                v-model="identityCard"
                readonly
              />
            </div>
            <div class="add-party-user-span-div">
              <span>用工形式：</span>
              <input
                class="add-party-user-ID"
                type="text"
                v-model="employmentForm"
                readonly
              />
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>联系电话：</span>
              <input class="add-party-user-ID" type="text" v-model="phone" readonly />
            </div>
            <div class="add-party-user-span-div">
              <span>党内职务：</span>
              <select v-model="positionId" class="add-party-user-select" disabled="disabled">
                <option
                  v-for="item in positionlist"
                  :key="item.id"
                  :value="item.id"
                >{{ item.postion_name }}</option>
              </select>
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>毕业学校：</span>
              <input class="add-party-user-ID" type="text" v-model="school" readonly />
            </div>
            <div class="add-party-user-span-div">
              <span>现工作区域：</span>
              <input
                class="add-party-user-ID"
                v-model="currentWorkArea"
                type="text"
                readonly
              />
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>所学专业：</span>
              <input class="add-party-user-ID" type="text" v-model="Major"  readonly />
            </div>

            <div class="add-party-user-span-div">
              <span>组织关系所在地：</span>
              <input
                class="add-party-user-ID"
                type="text"
                v-model="organizationLocation"
                readonly
              />
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>邮箱：</span>
              <input class="add-party-user-ID" type="text" v-model="mailbox"  readonly />
            </div>
            <div class="add-party-user-span-div">
              <span>最高学历：</span>
              <input
                class="add-party-user-ID"
                type="text"
                v-model="highestEducation"
                readonly
              />
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
import {
  getOrglist,
  getPartyMember
} from "../../api/api";
export default {
  name: "partyUserArchives",
  data() {
    return {
      partyUserId: this.$route.query.id,
      userImage: require("../../assets/images/icons/usericon.png"),
      orglist: [], // 组织列表
      positionlist: [], // 职位列表

      userImagePath: "", // 党员头像的地址
      userName: "", // 用户名
      joinDate: "", // 用户参加工作日期
      gender: "", // 性别
      organizationId: "", // 组织ID
      organizationName: "", // 组织名
      nationality: "", // 民族
      currentJob: "", // 现工作职务
      birthDate: "", // 用户出生日期
      partyDate: "", // 用户入党日期
      birthplace: "", // 籍贯
      postLevel: "", // 岗位层级
      identityCard: "", // 身份证号
      employmentForm: "", // 用工形式
      phone: "", // 联系电话
      positionId: "", // 职位id
      partyPosition: "", // 党内职务
      school: "", // 毕业学校
      currentWorkArea: "", // 现工作区域
      Major: "", // 所学专业
      organizationLocation: "", // 组织关系所在地
      highestEducation: "", // 最高学历
      mailbox: "" // 用户邮箱
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside
  },
  mounted() {
    getOrglist({
      currentPage: 1,
      pageSize: 1000
    }).then(res => {
      if (res.code === 200) {
        this.orglist = res.data.list;
      } else if (res.code === 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
    getPartyMember({
      id: this.partyUserId
    }).then(res => {
      if (res.code === 200) {
        if(res.data.img !== null){
          this.userImage = 'http://47.101.221.57:10086/resource/partyBuild/uploads/' + res.data.img;
        }        
        this.userName = res.data.partyMemberName;
        this.joinDate = res.data.jobDate;
        this.gender = res.data.gender;
        this.organizationId = res.data.organizationId;
        this.nationality = res.data.nationality;
        this.currentJob = res.data.currentJob;
        this.birthDate = res.data.birthDate;
        this.partyDate = res.data.joinPartyTime;
        this.birthplace = res.data.birthplace;
        this.postLevel = res.data.postLevel;
        this.identityCard = res.data.identityCard;
        this.employmentForm = res.data.employmentForm;
        this.phone = res.data.phone;
        this.positionId = res.data.positionId;
        if(res.data.schoolAndMajor !== null) {
          this.school = res.data.schoolAndMajor.split('-')[0];
          this.Major = res.data.schoolAndMajor.split('-')[1];
        }        
        this.currentWorkArea = res.data.currentWorkArea;        
        this.organizationLocation = res.data.organizationLocation;
        this.mailbox = res.data.mailbox;
        this.highestEducation = res.datahighestEducation;
      } else if (res.code === 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  }
};
</script>

<style>
.add-patry-user-title {
  font-size: 20px;
  font-weight: 500;
  color: rgba(68, 68, 68, 1);
  margin-left: 90px;
}
.add-patry-user-icon {
  position: relative;
  top: -20px;
  left: 220px;
  display: inline-block;
  width: 80%;
  height: 1px;
  background: rgba(209, 209, 209, 1);
}
.add-party-user-info span {
  display: inline-block;
  width: 130px;
}
.add-party-user-name {
  width: 100px;
  height: 24px;
  padding-left: 5px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(156, 157, 152, 1);
}
.add-party-user-span {
  margin-left: 300px;
  font-size: 16px;
}
.add-party-user-span input {
  padding-left: 5px;
}
.add-party-user-span-div {
  margin-top: 30px;
  display: inline-block;
}
.mx-input {
  height: 30px;
}
.add-party-user-select-sex {
  width: 100px;
  height: 24px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(156, 157, 152, 1);
  border-radius: 3px;
}
.add-party-user-select {
  width: 210px;
  height: 24px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(156, 157, 152, 1);
  border-radius: 3px;
}
.add-party-user-nation {
  width: 100px;
  height: 24px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(156, 157, 152, 1);
  border-radius: 3px;
}
.add-party-user-native {
  width: 150px;
  height: 24px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(156, 157, 152, 1);
  border-radius: 3px;
}
.add-party-user-ID {
  width: 200px;
  height: 24px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(156, 157, 152, 1);
  border-radius: 3px;
}
.add-party-user-span-div1 {
  width: 400px;
}
.add-party-user-image {
  width: 120px;
  height: 165px;
}
.add-party-user-image-icon {
  position: relative;
  left: -120px;
  width: 120px;
  height: 165px;
  opacity: 0;
  cursor: pointer;
}
.add-party-user-button1 {
  position: relative;
  top: 20px;
  background: rgba(170, 170, 170, 1);
}
.add-party-user-button1:hover {
  background: rgba(92, 151, 224, 1);
}
.add-party-user-button2 {
  position: relative;
  top: 20px;
  background: rgba(240, 70, 74, 1);
}
.add-party-user-button2:hover {
  background: rgba(220, 58, 62, 1);
}
</style>
