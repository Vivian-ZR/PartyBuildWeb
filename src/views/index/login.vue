<template>
  <div class="PDlogin">
    <div class="login-title">
      用户登录
      <div class="login-title-right" @click='mylogin = false'><i class="login-return iconfont">&#xe7fc;</i></div> 
    </div>
    <!-- <form action=""> -->
      <input type="text" placeholder="输入账号/手机号/邮箱" class="form-username" v-model="loginUserNmae">
      <img class="login-usernameicon" src="../../assets/images/icons/usernameicon.png" alt="usernameicon">
      <input type="password" placeholder="输入密码" class="form-userpasswd" v-model="loginUserPasswd">
      <img class="login-userpasswdicon" src="../../assets/images/icons/password.png" alt="userpasswdicon">
      <input type="text" placeholder="输入验证码" class="form-captcha" v-model="loginCheckCode">
      <img class="login-captchaicon" src="../../assets/images/icons/code.png" alt="userpasswdicon">
      <img @click="changeImgCode" class="captchaiconImg" :src="captchaiconImg" alt="验证码">
      <button class="login-button" @click="userLogin">登录</button>
    <!-- </form> -->
  </div>
</template>

<script>
import { login } from '../../api/api'

export default {
  name: 'PDlogin',
  props: {
    login: {
      type: Boolean,
      required: true
    },
    Uuid: {
      type: String,
      required: false,
      default: Math.ceil(Math.random() * 1000000).toString()
    }    
  },
  data () {
    return {
      loginUserNmae: '',  
      loginUserPasswd: '',
      loginCheckCode: '',
      mylogin: this.login,
      uuid: this.Uuid,
      captchaiconImg: "/PartBuilding/user/getCheckCode?uuid=" + this.Uuid
    }    
  },  
  watch: {
    login: function (val) {
      this.mylogin = val;
    },
    mylogin: function (val) {
      this.$emit("return-login", val);
    }
  },
  methods: {
    // 更新验证码
    changeImgCode () {
      // 防止缓存
      this.uuid  = Math.ceil(Math.random() * 1000000).toString();  
      this.captchaiconImg = "/PartBuilding/user/getCheckCode?uuid=" + this.uuid;
    },
    userLogin: function() {       
      if(this.loginUserNmae === "" || this.loginUserPasswd === "") {
        alert("用户/密码不能为空!");
      } else {
        login({
          accountNumber: this.loginUserNmae,
          password: this.loginUserPasswd,
          checkCode: this.loginCheckCode,
          uuid: this.uuid
        }).then(res => {   
          window.console.log(res);
          if (res.code === 400) {
            alert("验证码有误！");
            // 更新验证码
            this.uuid  = Math.ceil(Math.random() * 1000000).toString();
            this.captchaiconImg = "/PartBuilding/user/getCheckCode?uuid=" + this.uuid;
          } else if(res.code === 500) {
            alert("请确认账号或密码是否错误！");
            // 更新验证码
            this.uuid  = Math.ceil(Math.random() * 1000000).toString();  
            this.captchaiconImg = "/PartBuilding/user/getCheckCode?uuid=" + this.uuid;            
          } else if(res.code === 200){
            this.$store.commit('login', [true, res.data]);  // 在store中传如用户信息
            
            this.$router.push({
              name: "Home"
            })
          }
        })
      }
    }
  }
}
</script>

<style>
.PDlogin {
  position: fixed;
  width: 500px;
  height: 380px;
  background: rgba(255, 255, 255, 1);
  box-shadow:3px 3px 8px 1px rgba(86,86,86,0.1);
  border-radius:4px;
  left: calc(50% - 250px);
  top: 30%;
  z-index: 10;
}
.login-title {
  width: calc(100% - 60px);
  height: 50px;
  background:rgba(197,1,5,1);
  text-align: center;
  font-size:24px;
  font-family:SourceHanSansSC-Normal;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height: 50px;
  border-radius:4px 4px 0 0;
  padding-left: 60px;
}
.login-title-right {
  height: 50px;
  width: 50px;
  float: right;
}
.login-title-right:hover {
  background-color: rgba(160,2,9,1);
  cursor: pointer;
}
.login-return {
  font-size: 22px !important;
  top: -2px;
  cursor: pointer;
  color: aliceblue;
}
.form-username {
  width: 326px;
  height: 35px;
  border: 1px solid rgba(170,170,170,1);
  border-radius:4px;
  margin-left: 70px; 
  margin-top: 43px;
  padding-left: 34px;
}
.login-usernameicon {
  position: relative;
  top: 21px;
  left: -350px;
}
.form-userpasswd {
  width: 326px;
  height: 35px;
  border: 1px solid rgba(170,170,170,1);
  border-radius:4px;
  margin-left: 70px; 
  margin-top: 30px;
  padding-left: 34px;
}
.login-userpasswdicon {
  position: relative;
  top: 15px;
  left: -350px;
}
.form-captcha {
  width: 200px;
  height: 35px;
  border: 1px solid rgba(170,170,170,1);
  border-radius:4px;
  margin-left: 70px; 
  margin-top: 30px;
  padding-left: 34px;
}
.login-captchaicon {
  position: relative;
  top: 15px;
  left: -222px;
}
.captchaiconImg {
  position: relative;
  top: 16px;
  cursor: pointer;
}
.login-button {
  position: relative;
  top: 30px;
  left: 70px;
  width: 360px;
  height: 35px;
  border-radius: 4px;
  background:rgba(240,70,74,1);
  font-size: 16px;
  font-family:SourceHanSansSC-Normal;
  font-weight:400;
  color:rgba(255,255,255,1);
  cursor: pointer;
}
.login-button:hover {
  background:rgba(220,58,62,1);
}
</style>