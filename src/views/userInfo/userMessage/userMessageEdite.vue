<template>
  <div>
    <!-- top信息栏 -->
    <user-nav :nvaTitleOut="true" :nvaTitleOneOut="'用户管理'"></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="userMessage" :userInfoOut="true"></user-aside>
    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
        <router-link to="/userMessage/info" class="user-message-add-return">返回用户详情</router-link>
        <div class="user-message-add-user">
          <div>
            <div class="user-message-add-icon"></div>
            <span class="user-message-add-user-title">用户编辑</span>
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
            <button v-if="buttonSub" @click="userInfoReg" class="user-message-add-user-button">保存</button>
          </div>
        </div>
        <!-- <hr class="user-message-add-hr" />
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../../common/partyNav";
import partyAside from "./../../common/partyAside";
import { getOrglist, getOrgPosition, postUserInfo, getUserDetailed, getUserPower } from "../../../api/api";
export default {
  name: "UserMessageEdite",
  data() {
    return {
      uid: this.$route.query.id,

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

    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside
  },
  mounted() {
    getOrglist({
      currentPage: 1,
      pageSize: 10
    }).then(res => {
      if (res.code === 200) {
        this.orglist = res.data.list;
      } else if (res.code === 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
    let id = this.uid;
    window.console.log(id);
    getUserDetailed({
      id: id
    }).then(res => {
      if (res.code == 200) {
       window.console.log(res);
       this.userName = res.data.user_name;
       this.userPhone = res.data.mailbox;
       this.userEmail = res.data.account_number;
       this.userID = res.data.identity_card;
       this.organizationId = res.data.organization_id;
       this.positionId = res.data.postion_id;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      } 
    });
    getUserPower({
      
    })
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
      }else {
        window.console.log(this.uid);
        window.console.log(this.uid,this.userName,this.userEmail,this.userPhone,this.userID,this.organizationId,this.positionId);
        postUserInfo({
          id: this.uid,
          userName: this.userName,
          accountNumber: this.userEmail,
          mailbox: this.userPhone,
          identityCard: this.userID,
          organizationId: this.organizationId,
          positionId: this.positionId
        }).then(res => {
          window.console.log(res);
          if(res.code == 200) {
            // this.buttonSub = false;
            // this.userMessagePower = true;
            alert("用户已经修改成功");
            this.$router.push({
              path: '/userMessage'
            })
          } else if(res.code == 500) {
            alert("用户修改失败，请稍后重试!");
          }
        })
      }
    }
  }
};
</script>

<style>

</style>