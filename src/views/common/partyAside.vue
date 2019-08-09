<template>
  <div>
    <ul class="partyAsideUl">
      <img src="../../assets/images/icons/logo.png" alt="logo" class="partyAsudelogo">
      <router-link to="/Home" :style = "{'background' : page === 'home' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">智慧管理
        <img src="../../assets/images/icons/lower.png" style="opacity:0" class="partyAsudeicon">
      </router-link>
      <div class="OneIndex" @click= "news = !news">新闻天地
        <img src="../../assets/images/icons/lower.png" class="partyAsudeicon">
      </div>  
      <div v-if = "news || newsOut">
        <router-link to="/newslist" :style = "{'background' : page === 'newsWorld' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">新闻总汇</router-link>
        <router-link to="/newsMessage" :style = "{'background' : page === 'newsMessage' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">新闻管理</router-link>
      </div>
      <div class="OneIndex" @click = "study = !study">学习园地
        <img src="../../assets/images/icons/lower.png" class="partyAsudeicon">
      </div>
      <div  v-if = "study || studyOut">
        <router-link to="/studyClass" :style = "{'background' : page === 'studyClass' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex" >课堂</router-link>
        <router-link to='/reportList' :style = "{'background' : page === 'thoughtReport' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">思想汇报</router-link>
      </div>
      <div class="OneIndex" @click = "party = !party">党务管理
        <img src="../../assets/images/icons/lower.png" class="partyAsudeicon">
      </div>
      <div  v-if = "party || partyOut">
        <router-link to="/partymessage" :style = "{'background' : page === 'partyMessage' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">党费管理</router-link>
        <router-link to="/workmessage" :style = "{'background' : page === 'workMessage' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">工作管理</router-link>
      </div>
      <div class="OneIndex" @click = "org = !org">组织发展
        <img src="../../assets/images/icons/lower.png" class="partyAsudeicon">
      </div>
      <div  v-if = "org || orgOut">
        <router-link to="/democratic" :style = "{'background' : page === 'democraticComment' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">公告信息</router-link>
        <router-link to="/planSummary" :style = "{'background' : page === 'planSummary' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">计划总结</router-link>
      </div>
      <div class="OneIndex" @click = "partyInfo = !partyInfo">党组织信息库
        <img src="../../assets/images/icons/lower.png" class="partyAsudeicon">
      </div>    
      <div  v-if = "partyInfo || partyInfoOut">
        <router-link to="/eleArchives" :style = "{'background' : page === 'elecFiles' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">电子档案管理</router-link>
        <router-link to="/documentCabinet" :style = "{'background' : page === 'filesCabinet' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">文件资料柜</router-link>
        <router-link to="/mobilePartyMembers" :style = "{'background' : page === 'floatParty' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">流动党员</router-link>
        <router-link to="/mailList" :style = "{'background' : page === 'mailList' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">通讯录</router-link>
      </div>
      <div @click="Jump" :style = "{'background' : page === 'partyHelp' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">党员互助
        <img src="../../assets/images/icons/lower.png" style="opacity:0" class="partyAsudeicon">
      </div>
      <div class="OneIndex" @click = "userInfo = !userInfo">用户中心
        <img src="../../assets/images/icons/lower.png" class="partyAsudeicon">
      </div>
      <div v-if= "userInfo || userInfoOut">
        <router-link to="/userinfo" :style = "{'background' : page === 'userInfo' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">用户信息</router-link>
        <router-link to="/userMessage" :style = "{'background' : page === 'userMessage' ? 'rgba(85, 0, 2, 0.3)': ''}" class="OneIndex">用户管理</router-link>
      </div>
      <div class="index">站内导航</div>
    </ul>
    
  </div>
</template>

<script>
export default {
  name: 'partyAside',
  data() {
    return { 
      news: false,
      study: false,
      party: false,
      org: false,
      partyInfo: false,
      userInfo: false
    }
  },
  props: {
    page: {
      type: String,
      required: true
    },
    newsOut: {
      type: Boolean,
      required: false
    },
    studyOut: {
      type: Boolean,
      required: false
    },
    partyOut: {
      type: Boolean,
      required: false
    },
    orgOut: {
      type: Boolean,
      required: false
    },
    partyInfoOut: {
      type: Boolean,
      required: false
    },
    userInfoOut: {
      type: Boolean,
      required: false
    },
  },
  methods: {
    Jump: function() {
      alert("权限不够，功能暂未开放！");
    }
  }
}
</script>

<style>
.partyAsideUl {
  float: left;
  background: url("../../assets/images/icons/PartyFlag.png");
  height: 1020px;
  width: 200px;
}
.partyAsudelogo {
  margin-left: 28px;
  margin-bottom: 10px;
}
.OneIndex {
  width: 200px;
  height: 30px;
  text-align: center;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
  padding-top: 14px;
  cursor: pointer;
  display: block;
}
.OneIndex:hover {
  background: rgba(85, 0, 2, 0.3);
}
.partyAsudeicon {
  float: right;
  margin-right: 14px;
  margin-top: 5px;
}
.index {
  width: 160px;
  height: 22px;
  font-size: 16px;
  margin-top: 20px;
  margin-left: 20px;
  padding-top: 8px;
  border: 1px solid rgba(255,255,255,1);
  border-radius: 4px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.index:hover {
  background: rgba(85, 0, 2, 0.3);
}
</style>
