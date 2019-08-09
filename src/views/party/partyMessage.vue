<template>
  <div>
    <!-- top信息栏 -->
    <user-nav 
    :nvaTitleOut="true" 
    :nvaTitleOneOut="'党费管理'" 
    :nvaTitleTwoOutOne="'党费列表'" 
    :nvaTitleTwoOutTwo="'党费概况'" 
    :nvaTitleTwoOutThree="'党费缴纳'" 
    :nvaTitleTwoOutStyle="'navTitleOne'"
    :navTitleTwoRouter="'/partySurvey'"
    :navTitleThreeRouter="'/partyPat'"></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="partyMessage" :partyOut="true"></user-aside>
    
    <div class="user-message-body">
      <div class="body-query">
        <news-search :selectChoise='selectChoise'></news-search>
      </div>
      <div class="body-user-list">
        <party-table :header='header' :list='newsTable'></party-table>
      </div>
    </div>
  </div>    
</template>

<script>
import partyNave from './../common/partyNav'
import partyAside from './../common/partyAside'
import search from './../common/search'
import partyTable from './../common/partyTable'
import { getpartylist } from './../../api/api'
export default {
 name: 'partyMessage',
 data () {
   return {
     selectChoise: ['姓名', '组织', '职位', '金额'],
     header: ['姓名', '组织', '职位', '金额', '时间', '详情'],
     newsTable: []
   }
 },
 components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "news-search": search,
    "party-table": partyTable
  },
  mounted() {
    getpartylist().then(res => {
      if (res.code == 200) {
        this.newsTable = res.data.list
        window.console.log(this.newsTable);
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit('logout');
        this.$router.push({name: "Index"});
      } 
    })
  }
}
</script>

<style>

</style>
