<template>
  <div>
    <!-- top信息栏 -->
    <user-nav 
      :nvaTitleOut="true" 
      :nvaTitleOneOut="'电子档案'" 
      :nvaTitleTwoOutOne="'通讯录'" 
      :nvaTitleTwoOutStyle="'navTitleOne'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside 
      page="mailList" 
      :partyInfoOut="true"
    ></user-aside>

    <div class="user-message-body">
      <div class="body-query">
        <news-search :selectChoise='selectChoise'></news-search>
      </div>
      <div class="body-user-list">
        <eleArchives-table :header='header' :list='newsTable'></eleArchives-table>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from './../common/partyNav'
import partyAside from './../common/partyAside'
import search from './../common/search'
import mailListTable from './../common/mailListTable'
import { getOrgUserList } from './../../api/api'
export default {
  name: 'mailList',
  data () {
    return {
      selectChoise: ['组织', '姓名', '性别', '职位'],
      header: ['组织', '姓名', '性别', '年龄', '职位', '联系方式'],
      newsTable: []
    }
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "news-search": search,
    "eleArchives-table": mailListTable
  },
  mounted () {
    getOrgUserList().then(res => {
      window.console.log(res);
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
