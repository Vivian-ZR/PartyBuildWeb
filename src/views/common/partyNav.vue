<template>
  <div class="nav">
    <div class="logo">智慧党建平台</div>
    <div v-if="nvaTitle || nvaTitleOut" class="navTitleBox">
      <div class="navTitle">
        <div class="navTitleOne">{{ nvaTitleOneOut }}</div>
      </div>
      <div class="navTitleTwo">
        <router-link class="navTitleTwoDiv" :to='navTitleOneRouter' :class=" nvaTitleTwoOutStyle == 'navTitleOne' ? 'navTitleTwoBottom' : '' ">{{ nvaTitleTwoOutOne }}</router-link>
        <router-link class="navTitleTwoDiv" :to='navTitleTwoRouter' :class=" nvaTitleTwoOutStyle == 'navTitleTwo' ? 'navTitleTwoBottom' : '' ">{{ nvaTitleTwoOutTwo }}</router-link>
        <router-link class="navTitleTwoDiv" :to="navTitleThreeRouter" :class=" nvaTitleTwoOutStyle == 'navTitleThree' ? 'navTitleTwoBottom' : '' ">{{ nvaTitleTwoOutThree }}</router-link>
      </div>
    </div>
    <div class="user">
      <div class="date">
        <time class="month"> {{ mouth }} </time>
        <time class="hour"> {{ hour }} </time>
      </div>    
      <img src="../../assets/images/icons/news.png" alt="userNews" class="userNews" @mouseenter="userInforNews = true" @mouseleave="userInforNews = false">
      <div @mouseenter="userInfo = true" @mouseleave="userInfo = false" class="userInfo" >
        <div class="userName"> {{ user.user_name }} </div>
        <div class="userJob"> {{ user.postion_name }} </div>
      </div>
      <img :src="imgUrl" alt="userAvatar" class="userAvatar">        
    </div>
    <transition name="fade">
      <div v-if="userInfo" class="userInfoConfig" @mouseenter="userInfo = true" @mouseleave="userInfo = false">
        <i class="partyNavTriange iconfont">&#xe8ed;</i>
        <div class="partyNavConfig userInfoConfigDetails">用户信息</div>
        <div class="partyNavConfig">设置中心</div>
        <div class="partyNavConfig">积分</div>
        <div class="partyNavConfig" @click="userLogout">退出</div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="userInforNews" class="userInfoNews" @mouseenter="userInforNews = true" @mouseleave="userInforNews = false">
        <i class="partyNavTriange iconfont">&#xe8ed;</i>
        <div class="partyNavConfig userInfoConfigDetails">待办项</div>
        <div class="partyNavConfig">民主评议</div>
        <div class="partyNavConfig">计划总结</div>
        <div class="partyNavConfig">其它</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers'
import { logout } from '../../api/api'
export default {
  name: "partyNav",
  data() {
    return {
      imgUrl: require("../../assets/images/userAvatar/userhead.png"),  
      mouth: new Date().getMonth() + 1 + '/' + new Date().getDate(),
      hour: new Date().getHours() + ':' + new Date().getMinutes(),
      userInfo: false,
      userInforNews: false,
      nvaTitle: false
    }
  },
  props: {
    nvaTitleOut: {
      type: Boolean,      
      required: false
    },
    nvaTitleOneOut: {
      type: String,
      required: false
    },
    nvaTitleTwoOutOne: {
      type: String,
      required: false
    },
    nvaTitleTwoOutTwo: {
      type: String,
      required: false
    },
    nvaTitleTwoOutThree: {
      type: String,
      required: false
    },
    nvaTitleTwoOutStyle: {
      type: String,
      required: false
    },
    navTitleOneRouter: {
      type: String,
      default: '',
      required: false
    },
    navTitleTwoRouter: {
      type: String,
      default: '',
      required: false
    },
    navTitleThreeRouter: {
      type: String,
      default: '',
      required: false
    }
  },
  mounted() {
    let _this = this;
    this.timer = setInterval(() => {
      _this.hour = new Date().getHours() + ':' + new Date().getMinutes()
    }, 1000)
  },
  computed: {
    user () {
      let user = this.$store.state.user;
      if (typeof(user) == "string") {
        user = JSON.parse(user);
      }
      return user;
    }
  },
  methods: {
    userLogout: function () {
      logout().then(res => {
        if (res.code === 200) {
          this.$store.commit('logout');
          this.$router.push({name: "Index"});
        }
      })
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style>
.nav {
  height: 60px;
  width: 100%;
  box-shadow:3px 4px 4px 0px rgba(86,86,86,0.1);
}
.logo {
  float: left;
  height: 40px;
  width: 200px;
  background-color: rgba(197, 12, 17, 1);
  padding-top: 20px;
  font-family: "STXingKai";
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  text-align: center;
  font-size: 24px;
}
.userAvatar {
  width: 40px;
  height: 40px;
  float: right;
  padding-top: 8px;
  padding-right: 18px;
  cursor: pointer;
}
.userInfo {
  float: right;
  margin-top: 14px;
  margin-right: 10px;
  cursor: pointer;
  text-align: center;
  height: 28px;
  
}
.userNews {
  width: 30px;
  height: 30px;
  float: right;
  margin-top: 10px;
  margin-right: 20px;
  padding-top: 8px;
  padding-right: 20px;
  padding-left: 20px;
  cursor: pointer;
  border-right: 1px solid rgba(224, 224, 224, 1);
  border-left: 1px solid rgba(224, 224, 224, 1);
}
.date {
  padding-top: 15px;
  padding-right: 30px;
  float: right;
}
time {
  display: block;
}
.userInfoConfig {
  position: absolute;
  width: 75px;
  height: 108px;
  background: rgba(255, 255, 255, 1);
  top: 60px;
  right: 158px;
  cursor: pointer;
  z-index: 10;
  box-shadow:3px 4px 4px 0px rgba(86,86,86,0.1);
}
.partyNavTriange {
  position: relative;
  top: -13px;
  left: 5px;;
  color: rgba(216,216,216,1);
  font-size: 20px !important;
}
.partyNavConfig {
  position: relative;
  height: 27px;
  text-align: center;
  top: -20px;
  line-height: 27px;
}
.partyNavConfig:hover {
  background-color: rgba(216,216,216,1);
}
.userInfoConfigDetails {
  background-color: rgba(216,216,216,1);
}
.userInfoNews {
  position: absolute;
  width: 75px;
  height: 108px;
  background: rgba(255, 255, 255, 1);
  top: 60px;
  right: 81px;
  cursor: pointer;
  z-index: 10;
  box-shadow:3px 4px 4px 0px rgba(86,86,86,0.1);
}
.navTitleBox {
  float: left;
  height: 0;
  width: 158px;
  border-top: 60px solid rgba(0, 0, 0, 0.1);
  border-right: 40px solid transparent;
  cursor: pointer;
}

.navTitle {
  position: absolute;
  float: left;
  top: 0;
  height: 0;
  width: 154px;
  border-top: 58px solid rgba(255, 255, 255, 1);
  border-right: 39px solid transparent;
}
.navTitleOne {
  position: absolute;
  top: -40px;
  left: 39px;;
  color: rgba(68, 68, 68, 1);
  font-size: 20px;
  font-family:SourceHanSansSC-Bold;
  font-weight:bold;
}
.navTitleTwo {
  height: 60px;
  width: 300px;
  display:inline-block;
  position: relative;
  top: -60px;
  left: 200px;
}
.navTitleTwoDiv {
  float: left;
  width: 70px;
  margin: 0 10px;
  height: 60px;
  text-align: center;
  line-height: 80px;
  font-size:16px;
  font-weight:400;
  color:rgba(68,68,68,1);
}
.navTitleTwoBottom {
  border-bottom: 2px solid rgba(197,1,5,1);
}
/* vue动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
