<template>
  <table>
    <tr class="table-th">    
      <th v-for="item in header" :key="item.id">{{ item }}</th>
    </tr>
    <tr class="table-tr-mouseover" v-for="item in list" :key="item.id">
      <td>{{ item.title }}</td>
      <td>{{ item.user_name }}</td>
      <td>{{ item.organization_name }}</td>
      <td>{{ item.postion_name }}</td>
      <td>{{ item.type }}</td>
      <td>{{ item.create_time | formatDate }}</td>
      <td :value="item.id">
        <router-link 
          :to="{path:'/reportAritcle', query:{id:item.id, url:'/reportListMessage', navTitleStyle:'navTitleThree'}}" 
          class="table-details"
        >详情</router-link>
        <span @click="goDelete(item.title, item.id)" class="report-edit">删除</span>
      </td>
    </tr>
  </table>
</template>

<script>
import { formatDate } from '../js/date';
import { deleteReport } from '../../../api/api'
export default {
  name: 'reportTable',
  props: {
    header: {
      type: Array,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    goDelete(title, id) {
      let r = confirm("确定要删除该汇报？");
      if (r == true) {
        deleteReport({
          ids: id
        }).then(res => {
          if (res.code == 200) {
            alert(title + "汇报已经删除");
            this.$parent.updateTable();
          } else if (res.code == 401) {
            alert("请登录！");
            this.$store.commit("logout");
            this.$router.push({ name: "Index" });
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
