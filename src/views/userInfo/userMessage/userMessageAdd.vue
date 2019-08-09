<template>
  <div>
    <!-- top信息栏 -->
    <user-nav :nvaTitleOut="true" :nvaTitleOneOut="'用户管理'"></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="userMessage" :userInfoOut="true"></user-aside>
    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
        <router-link to="/userMessage" class="user-message-add-return">返回用户列表</router-link>
        <div class="user-message-add-user">
          <div>
            <div class="user-message-add-icon"></div>
            <span class="user-message-add-user-title">用户创建</span>
          </div>
          <div class="user-message-add-user-input">
            <span>姓名：</span>
            <input  v-model="userName" type="text" />
          </div>
          <div class="user-message-add-user-input">
            <span>联系号码：</span>
            <input  v-model="userPhone" type="tel" />
          </div>
          <div class="user-message-add-user-input">
            <span>身份证号：</span>
            <input v-model="userID" type="text" />
          </div>
          <div class="user-message-add-user-input">
            <span>邮箱</span>
            <input v-model="userEmail" type="email" />
          </div>
          <div class="user-message-add-user-input">
            <span>密码：</span>
            <input v-model="userPassword" type="password" />
          </div>
          <div class="user-message-add-user-input">
            <span>组织：</span>
            <select v-model="organizationId" @change="getPositionlist(organizationId)">
              <option value selected>无组织</option>
              <option
                v-for="item in orglist"
                :key="item.id"
                :value="item.id"
              >{{ item.organization_name }}</option>
            </select>
          </div>
          <div class="user-message-add-user-input">
            <span>确认密码：</span>
            <input v-model="userPassword2" type="password" />
          </div>
          <div class="user-message-add-user-input">
            <span>职位：</span>
            <select v-model="positionId">
              <option value selected>无职位</option>
              <option
                v-for="item in positionlist"
                :key="item.id"
                :value="item.id"
              >{{ item.postion_name }}</option>
            </select>
          </div>
          <div class="user-message-add-user-button-div">
            <button v-if="buttonSub" @click="userInfoReg" class="user-message-add-user-button">创建</button>
          </div>
        </div>
        <hr class="user-message-add-hr" />
        <div v-if="userMessagePower" class="user-message-add-power">
          <div>
            <div class="user-message-add-icon"></div>
            <span class="user-message-add-user-title">权限配置</span>
            <div class="user-message-add-power-div">
              <div class="user-message-add-power-div-content user-message-border">
                <span>学习园地</span>
                <div>
                  课程管理：
                  <input name="classMessage" type="radio" checked="checked" /> 否
                  <input name="classMessage" type="radio" />是
                </div>
                <div>
                  汇报检阅：
                  <input name="reportMessage" type="radio" checked="checked" /> 否
                  <input name="reportMessage" type="radio" />是
                </div>
              </div>
              <div class="user-message-add-power-div-content user-message-border">
                <span>党务管理</span>
                <div>
                  党费管理：
                  <input name="moneyMessage" type="radio" checked="checked" /> 否
                  <input name="moneytMessage" type="radio" />是
                </div>
                <div>
                  党费查看：
                  <input name="moneySee" type="radio" checked="checked" /> 否
                  <input name="moneySee" type="radio" />是
                </div>
                <div>
                  会议管理：
                  <input name="mettingMessage" type="radio" checked="checked" /> 否
                  <input name="mettingMessage" type="radio" />是
                </div>
              </div>
              <div class="user-message-add-power-div-content">
                <span>组织发展</span>
                <div>
                  评议管理：
                  <input name="commentMessage" type="radio" checked="checked" /> 否
                  <input name="commentMessage" type="radio" />是
                </div>
                <div>
                  计划管理：
                  <input name="planMessage" type="radio" checked="checked" /> 否
                  <input name="planMessage" type="radio" />是
                </div>
              </div>
              <hr class="user-message-add-div-hr" />
              <div class="user-message-add-power-div-content user-message-border">
                <span>电子信息库</span>
                <div>
                  档案管理：
                  <input name="archivesMessage" type="radio" checked="checked" /> 否
                  <input name="archivesMessage" type="radio" />是
                </div>
                <div>
                  档案查看：
                  <input name="archivesSee" type="radio" checked="checked" /> 否
                  <input name="archivesSee" type="radio" />是
                </div>
                <div>
                  流动党员管理：
                  <input name="MobliePartyMessage" type="radio" checked="checked" /> 否
                  <input name="MobliePartyMessage" type="radio" />是
                </div>
                <div>
                  通讯录管理：
                  <input name="mailListMessage" type="radio" checked="checked" /> 否
                  <input name="mailListMessage" type="radio" />是
                </div>
                <div>
                  资料柜管理：
                  <input name="dataCabinetMessage" type="radio" checked="checked" /> 否
                  <input name="dataCabinetMessage" type="radio" />是
                </div>
              </div>
              <div class="user-message-add-power-div-content user-message-border">
                <span>新闻</span>
                <div>
                  新闻管理：
                  <input name="newsMessage" type="radio" checked="checked" /> 否
                  <input name="newstMessage" type="radio" />是
                </div>
              </div>
              <div class="user-message-add-power-div-content">
                <span>用户中心</span>
                <div>
                  用户管理：
                  <input name="userMessage" type="radio" checked="checked" /> 否
                  <input name="userMessage" type="radio" />是
                </div>
              </div>
            </div>
            <button class="user-message-add-user-button">创建</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../../common/partyNav";
import partyAside from "./../../common/partyAside";
import { getOrglist, getOrgPosition, postUserAdd } from "../../../api/api";
export default {
  name: "UserMessageAdd",
  data() {
    return {
      buttonSub: true,   // 创建用户提交按钮提交

      orglist: [], // 组织列表
      positionlist: null, // 职位列表
      userMessagePower: false, // 权限显示
      organizationId: "", // 组织id
      positionId: "", // 职位id,

      userName: "",
      userPhone: "",
      userID: "",
      userEmail: "",
      userPassword: "",
      userPassword2: "",

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
        window.console.log(this.orglist);
      } else if (res.code === 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  },
  methods: {
    getPositionlist: function(id) {
      let organizationId = id;
      if ( organizationId == "" ) {
        this.positionlist = null;
      } else {        
        getOrgPosition({
          organizationId: organizationId
        }).then(res => {
          window.console.log(res);
          if (res.code === 200) {           
            this.positionlist = res.data.list;
          } else if (res.code === 401) {
            alert("请登录！");
            this.$store.commit("logout");
            this.$router.push({ name: "Index" });
          }
        });
      }
    },
    userInfoReg: function() {
      let regUserName = /^[\u4E00-\u9FA5]{2,10}$/;  // 中文名
      let regID = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;  // 身份证
      let regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;  // 邮箱验证
      let regPhone = /^1[3456789]\d{9}$/;   // 手机号验证
      if(!regUserName.test(this.userName)){
        alert("请输入中文姓名");
      }else if(!regID.test(this.userID)) {
        alert("请输入正确的身份证号");
      }else if(!regPhone.test(this.userPhone)) {
        alert("请输入正确的手机号");
      }else if(!regEmail.test(this.userEmail)) {
        alert("请输入正确的邮箱");
      }else if(this.userPassword.length < 8 ) {
        alert("请输入不少于8个字符串的密码");
      }else if(this.userPassword2 !== this.userPassword) {
        alert("两次密码输入不一致！");
      }else {
        window.console.log(this.organizationId, this.positionId);
        postUserAdd({
          userName: this.userName,
          accountNumber: this.userEmail,
          mailbox: this.userPhone,
          password: this.userPassword,
          identityCard: this.userID,
          organizationId: this.organizationId,
          positionId: this.positionId
        }).then(res => {
          window.console.log(res);
          if(res.code == 200) {
            // this.buttonSub = false;
            // this.userMessagePower = true;
            alert("用户已经创建成功！<br>"+'请去该用户去邮箱激活，或者管理员激活');
            this.$router.push({
              path: '/userMessage'
            })
          }else if (res.code == 400) {
            alert(res.msg);
          }
        })
      }
    }
  }
};
</script>

<style>
.user-message-add-body {
  float: left;
  background: url("../../../assets/images/icons/background.png");
  width: calc(100% - 200px);
  height: 1020px;
}
.user-message-add-from {
  height: 1020px;
  width: 70%;
  background-color: rgba(255, 255, 255, 1);
  margin: auto;
}
.user-message-add-return-icon {
  font-size: 26px !important;
  position: relative;
  top: 21px;
  left: 40px;
}
.user-message-add-return {
  position: relative;
  top: 18px;
  left: 44px;
  font-size: 16px;
  color: rgba(68, 68, 68, 1);
}
.user-message-add-return:hover {
  color: red;
}
.user-message-add-user {
  position: relative;
  height: 410px;
  width: 100%;
  margin-top: 58px;
}
.user-message-add-icon {
  position: relative;
  left: 76px;
  width: 4px;
  height: 25px;
  background: rgba(197, 12, 17, 1);
}
.user-message-add-user-title {
  position: relative;
  display: inline-block;
  top: -23px;
  left: 91px;
  font-size: 24px;
}
.user-message-add-user-input {
  display: inline-block;
  width: calc(50% - 20%);
  margin-top: 29px;
  margin-left: 16%;
  font-size: 16px;
}
.user-message-add-user-input span {
  display: inline-block;
  width: 90px;
}
.user-message-add-user-input input,
.user-message-add-user-input select {
  width: 150px;
  height: 26px;
  font-size: 12px;
  border: 1px solid rgba(170, 170, 170, 1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding-left: 2px;
}
.user-message-add-user-button-div {
  width: 100%;
  height: 35px;
  margin-top: 35px;
}
.user-message-add-user-button {
  display: block;
  width: 360px;
  height: 35px;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  cursor: pointer;
}
.user-message-add-user-button:hover {
  background: rgba(170, 170, 170, 1);
}
.user-message-add-hr {
  width: 90%;
  margin: auto;
}
.user-message-add-power {
  position: relative;
  height: 440px;
  width: 100%;
  margin-top: 20px;
}
.user-message-add-power-div {
  width: 80%;
  height: 400px;
  margin: auto;
}
.user-message-add-power-div-content {
  width: calc(33.33% - 15px);
  height: 150px;
  float: left;
  padding-left: 15px;
  margin-bottom: 20px;
}
.user-message-add-power-div-content span {
  display: block;
  font-size: 18px;
  font-weight: 400;
  color: rgba(68, 68, 68, 1);
  margin-bottom: 20px;
}
.user-message-add-power-div-content div {
  width: 100%;
  margin-left: 20px;
  margin-top: 10px;
}
.user-message-add-power-div-content input {
  cursor: pointer;
}
.user-message-border {
  width: calc(33.33% - 16px);
  border-right: 1px solid rgba(209, 209, 209, 1);
}
.user-message-add-div-hr {
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
}
</style>