<template>
  <div>
    <!-- top信息栏 -->
    <user-nav 
      :nvaTitleOut="true" 
      :nvaTitleOneOut="'流动党员'" 
      :nvaTitleTwoOutOne="'党员列表'" 
      :nvaTitleTwoOutStyle="'navTitleOne'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside 
      page="floatParty" 
      :partyInfoOut="true"
    ></user-aside>

    <div class="user-message-body">
      <div class="body-query">
        <news-search :selectChoise='selectChoise'></news-search>
        <router-link to="/newsAdd" class="user-message-add">添加党员</router-link>
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
import eleUserTable from './../common/table/eleUserTable'
import { getOrgUserList } from './../../api/api'
export default {
  name: 'mobilePartyMembers',
  data () {
    return {
      selectChoise: ['姓名', '组织', '职位'],
      header: ['姓名', '性别', '年龄', '组织', '职位', '联系方式', '详情'],
      newsTable: []
    }
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "news-search": search,
    "eleArchives-table": eleUserTable
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
