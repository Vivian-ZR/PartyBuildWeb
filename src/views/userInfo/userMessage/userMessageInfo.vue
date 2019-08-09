<template>
  <div>
    <!-- top信息栏 -->
    <user-nav :nvaTitleOut="true" :nvaTitleOneOut="'用户管理'"></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="userMessage" :userInfoOut="true"></user-aside>
    <!-- 用户详细信息 -->
    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
        <router-link to="/userMessage" class="user-message-add-return">返回用户列表</router-link>
        <div class="user-message-info-user">
          <div>
            <div class="user-message-add-icon"></div>
            <span class="user-message-add-user-title">用户详情</span>
          </div>          
          <div class="user-message-add-user-input">
            <span>姓名：</span> <span>{{ user_name }}</span>
          </div>   
          <div class="user-message-add-user-input">
            <span>联系号码：</span> <span>{{ user_phone }}</span>
          </div>
          <div class="user-message-add-user-input">
            <span>邮箱：</span> <span>{{ user_email }}</span> 
          </div>
          <div class="user-message-add-user-input">
            <span>身份证号：</span> <span>{{ user_ID }}</span>
          </div>          
          <div class="user-message-add-user-input">
            <span>组织：</span> <span>{{ user_org }}</span>  
          </div>
          <div class="user-message-add-user-input">
            <span>职位：</span> <span>{{ user_position }}</span>
          </div>          
        </div>
        <router-link :to="{path: '/UserMessageEdite', query:{id: this.uid}}"> <button class="user-message-info-button info-edit">编辑</button></router-link>
        <hr class="user-message-add-div-hr">
        <div class="user-message-add-power">
          <div>
            <div class="user-message-add-icon"></div>
            <span class="user-message-add-user-title">权限配置</span>
            <div class="user-message-add-power-div">
              <div class="user-message-add-power-div-content user-message-border">
                <span>学习园地</span>
                <div class="user-message-info-span">
                  <span>课程管理：</span> <span>否</span>                                  
                </div>
                <div class="user-message-info-span">
                  <span>汇报检阅：</span> <span>否</span> 
                </div>
              </div>
              <div class="user-message-add-power-div-content user-message-border">
                <span>党务管理</span>
                <div class="user-message-info-span">
                  <span> 党费管理：</span> <span>否</span>
                </div>
                <div class="user-message-info-span">
                  <span> 党费查看：</span> <span>否</span>
                </div>
                <div class="user-message-info-span">
                  <span> 会议管理：</span> <span>否</span>
                </div>
              </div>
              <div class="user-message-add-power-div-content">
                <span>组织发展</span>
                <div class="user-message-info-span">
                  <span> 评议管理：</span> <span>否</span>
                </div>
                <div class="user-message-info-span">
                  <span> 计划管理：</span> <span>否</span>
                </div>
              </div>
              <hr class="user-message-add-div-hr">
              <div class="user-message-add-power-div-content user-message-border">
                <span>电子信息库</span>
                <div class="user-message-info-span">
                  <span> 档案管理：</span> <span>否</span>
                </div>
                <div class="user-message-info-span">
                  <span> 档案查看：</span> <span>否</span>
                </div>
                <div class="user-message-info-span">
                  <span> 流动党员管理：</span> <span>否</span>
                </div>
                <div class="user-message-info-span">
                  <span> 通讯录管理：</span> <span>否</span>
                </div>
                <div class="user-message-info-span">
                  <span> 资料柜管理：</span> <span>否</span>
                </div>
              </div>
              <div class="user-message-add-power-div-content user-message-border">
                <span>新闻</span>
                <div class="user-message-info-span">
                  <span> 新闻管理：</span> <span>否</span>
                </div>                
              </div>
              <div class="user-message-add-power-div-content">
                <span>用户中心</span>
                <div class="user-message-info-span">
                  <span> 用户管理：</span> <span>否</span>
                </div>                
              </div>
            </div>
          </div>
        </div>
        <router-link :to="{path: '/UserMessageEdite', query:{id: this.uid}}"> <button class="user-message-info-button info-edit">编辑</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from './../../common/partyNav'
import partyAside from './../../common/partyAside'
import { getUserDetailed } from '../../../api/api'
export default {
  nmae: 'userMessageInfo',
  data() {
    return {
      uid: this.$route.query.id,
      user_name: '',
      user_phone: '',
      user_email: '',
      user_ID: '',
      user_org: '',
      user_position: ''
    }
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside
  },
  mounted() {
    let id = this.uid;
    getUserDetailed({
      id: id
    }).then(res => {
      if (res.code == 200) {
       window.console.log(res);
       this.user_name = res.data.user_name;
       this.user_phone = res.data.mailbox;
       this.user_email = res.data.account_number;
       this.user_ID = res.data.identity_card;
       this.user_org = res.data.organization_name;
       this.user_position = res.data.postion_name;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      } 
    })
  }
}
</script>

<style>
.user-message-info-user {
  position: relative;
  height: 240px;
  width: 100%;
  margin-top: 58px;
}
.user-message-info-span span {
  display: inline-block;
  font-size: 14px;
  margin-bottom: 0;
}
.user-message-info-button {
  height: 35px;
  width: 30%;
  margin: 20px 10%;
  border-radius: 4px;
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
}
.info-edit {
  margin-left: 35%;
  background:rgba(100,163,241,1);
}
.info-edit:hover {
  background:rgba(92,151,224,1);
}
.info-delete {
  background:rgba(240,70,74,1);
}
.info-delete:hover {
  background:rgba(220,58,62,1);
}
</style>
