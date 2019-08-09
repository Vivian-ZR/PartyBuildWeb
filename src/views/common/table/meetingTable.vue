<template>
  <table>
    <tr class="table-th">    
      <th v-for="item in header" :key="item.id">{{ item }}</th>
    </tr>
    <tr class="table-tr-mouseover" v-for="item in list" :key="item.id">
      <td>{{ item.meeting_name }}</td>
      <td>{{ item.meeting_theme }}</td>
      <td>{{ item.meeting_location }}</td>
      <td>{{ item.meeting_start_time | formatDate }} - {{ item.meeting_end_time | formatDate }}</td>
      <td>{{ item.is_delete ? "已打卡": "未打卡" }}</td>
      <td :value="item.id"><span @click="getDetails(item.id)" class="table-details">详情</span></td>
    </tr>
  </table>
</template>

<script>
import { formatDate } from '../js/date'
export default {
  name: 'meetingTable',
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
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    getDetails: function(meetingID) {
      this.$parent.openDetails(meetingID.toString());
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
