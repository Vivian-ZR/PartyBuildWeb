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
          :to="{path:'/reportAritcle', query:{id:item.id, url:'/reportList', navTitleStyle:'navTitleOne'}}" 
          class="table-details"
        >详情</router-link>
        
      </td>
    </tr>
  </table>
</template>

<script>
import { formatDate } from '../js/date'
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
  }  
}
</script>

<style>

</style>
