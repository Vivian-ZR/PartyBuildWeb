<template>
  <table>
    <tr class="table-th">
      <th v-for="item in header" :key="item.id">{{ item }}</th>
    </tr>
    <tr class="table-tr-mouseover" v-for="item in list" :key="item.id">
      <td>{{ item.title }}</td>
      <td>{{ item.category }}</td>
      <td>{{ item.theme }}</td>
      <td>{{ item.status | formatStatus }}</td>
      <td>{{ item.create_time | formatDate }}</td>
      <td class="table-details" :value="item.id">
        <span class="report-edit" @click="goArchives(item.user_id,item.content,item.id)">详情</span>
        <span class="report-edit" @click="goReportEdit(item.status, item.id)">编辑</span>
        <span class="report-edit" @click="DeletedNew(item.id, item.title)">删除</span>
      </td>
    </tr>
  </table>
</template>

<script>
import { formatDate } from "../../common/js/date";
import { deleteNews } from "../../../api/api";
export default {
  name: "newsTable",
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
      if (status === "1" || status === "2") {
        return "草稿";
      } else return "已发布";
    }
  },
  methods: {
    goReportEdit(status, id) {
      if(status === "3" || status === null) {
        alert("汇报已提交，不可编辑！");
      } else {
        this.$router.push({
          path: '/editNews',
          query: {id: id}
        })
      }
    },    
    DeletedNew(id, title) {
      let r = confirm("确定要删除该新闻么？");
      if (r == true) {
        deleteNews({
          ids: id
        }).then(res => {
          if (res.code == 200) {
            window.console.log(res);
            alert(title + "新闻已删除");
            this.$parent.updateTable();
          } else if (res.code == 401) {
            alert("请登录！");
            this.$store.commit("logout");
            this.$router.push({ name: "Index" });
          }
        });
      }
    },
    goArchives(user_id, content, id) {
      let url = content;
      if (user_id === null) {
        window.console.log(url);
        let tempwindow = window.open("_blank");
        tempwindow.location = url;
      } else {
        this.$router.push({
          path: "/newsAritcle",
          query: { id: id }
        });
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
</style>
