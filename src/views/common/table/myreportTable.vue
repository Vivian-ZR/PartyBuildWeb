<template>
  <table>
    <tr class="table-th">
      <th v-for="item in header" :key="item.id">{{ item }}</th>
    </tr>
    <tr class="table-tr-mouseover" v-for="item in list" :key="item.id">
      <td>{{ item.title }}</td>
      <td>{{ item.create_time | formatDate }}</td>
      <td>{{ item.status | formatStatus}}</td>
      <td>{{ item.type }}</td>
      <td :value="item.id">
        <router-link :to="{path:'/reportAritcle', query:{id: item.id, url: '/myreportList', navTitleStyle:'navTitleTwo'}}" class="table-details">详情</router-link>
        <span @click="goReportEdit(item.status, item.id)" class="report-edit">编辑</span>
        <span @click="goDelete(item.title, item.id)" class="report-edit">删除</span>
      </td>
    </tr>
  </table>
</template>

<script>
import { formatDate } from '../js/date';
import { deleteReport } from '../../../api/api'
export default {
  name: "myreportTable",
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
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatStatus(status) {
      if(status === "1" || status === "2") {
        return "草稿"
      } else if(status === "3")
        return "已提交"
    }
  },
  methods: {
    goReportEdit(status, id) {
      if(status === "3") {
        alert("汇报已提交，不可编辑！");
      } else {
        this.$router.push({
          path: '/editReport',
          query: {id: id}
        })
      }
    },
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
};
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
  color: rgba(68, 68, 68, 1);
}
.table-tr-mouseover {
  border-bottom: 1px solid rgba(186, 186, 186, 1);
}
.table-tr-mouseover:hover {
  background-color: rgba(215, 215, 215, 1);
}
.table-details {
  color: rgba(65, 165, 93, 1);
}
.table-details:hover {
  color: red;
}
.report-edit {
  margin: 0 10px;
  color: rgba(65, 165, 93, 1);
}
.report-edit:hover {
  color: red;
}
</style>
