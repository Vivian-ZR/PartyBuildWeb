<template>
  <table>
    <tr class="table-th">    
      <th v-for="item in header" :key="item.id">{{ item }}</th>
    </tr>
    <tr class="table-tr-mouseover" v-for="item in list" :key="item.id">
      <td>{{ item.title }}</td>
      <td>{{ item.organization_name }}</td>
      <td>{{ item.pStartTime | formatDate }}-{{ item.pEndTime | formatDate }}</td>
      <td>{{ item.user_name }}</td>      
      <td>{{ item.create_time | formatDate }}</td>      
      <td :value="item.id"><router-link :to="{path: '/democraticArchives', query:{id: item.id, url:'/democratic', navTitleStyle:'navTitleOne'}}" class="table-details">详情</router-link></td>
    </tr>
  </table>
</template>

<script>
import { formatDate } from '../js/date'
export default {
  name: 'democraticTable',
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
      if(typeof(time) === "string") {
        time = parseInt(time);
      }
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  }  
}
</script>

<style>
table {
  width: 100%;  
}
table tr {
  height: 35px;
  text-align: center;
  cursor: pointer;
}
.table-th {
  background-color: red;
  color: aliceblue;
}
tr td {
  color:rgba(68,68,68,1);
}
.table-tr-mouseover {
  border-bottom: 1px solid rgba(186,186,186,1);
}
.table-tr-mouseover:hover {
  background-color: rgba(215,215,215,1);
}
.table-details {
  color: rgba(65, 165, 93, 1);
}
.table-details:hover {
  color: red;
}
</style>
