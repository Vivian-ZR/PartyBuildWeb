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
      <td>{{ item.user_name }}</td>
      <td :value="item.id">
        <span @click="getDetails(item.id)" class="table-details">详情</span>
        <span @click="getEdite(item.id)" class="table-details">编辑</span>
        <span @click="goDelete(item.meeting_name, item.id)" class="table-details">删除</span>
      </td>
    </tr>
  </table>
</template>

<script>
import { formatDate } from '../js/date'
import { deletemeeting } from '../../../api/api'
export default {
  name: 'meetingTableMeeting',
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
    getDetails: function(meetingID) {
      this.$parent.openDetails(meetingID.toString());
    },
    getEdite: function(meetingID) {
      this.$parent.openEdite(meetingID.toString());
    },
    goDelete: function(name, id) {
      let uid = id;
      let r = confirm("确定要删除" + name  + "会议么？");
      if (r == true) {
        deletemeeting({
          ids: uid
        }).then(res => {
          window.console.log(res);
          if (res.code == 200) {
            alert(name + "该会议已删除");
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
  margin: 0 10px;
  color: rgba(65, 165, 93, 1);
}
.table-details:hover {
  color: red;
}
</style>
