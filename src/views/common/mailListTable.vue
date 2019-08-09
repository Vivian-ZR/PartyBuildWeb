<template>
  <table>
    <tr class="table-th">    
      <th v-for="item in header" :key="item.id">{{ item }}</th>
    </tr>
    <tr class="table-tr-mouseover" v-for="item in list" :key="item.id">
      <td>{{ item.party_branch_name }}</td>
      <td>{{ item.party_member_name }}</td>
      <td>{{ item.gender }}</td>
      <td>{{ item.age }}</td>
      <td>{{ item.current_job }}</td>   
      <td>{{ item.phone }}</td>   
    </tr>
  </table>
</template>

<script>
import { formatDate } from '../common/js/date'
export default {
  name: 'mailListTable',
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
