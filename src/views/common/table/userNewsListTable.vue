<template>
  <table>
    <tr class="table-th">    
      <th v-for="item in header" :key="item.id">{{ item }}</th>
    </tr>
    <tr class="table-tr-mouseover" v-for="item in list" :key="item.id">
      <td>{{ item.title }}</td>
      <td>{{ item.category }}</td>
      <td>{{ item.theme }}</td>
      <td>{{ item.create_time | formatDate }}</td>
      <td :value="item.id"><router-link :to="{path:'/newsAritcle', query:{id: item.id}}" class="table-details">详情</router-link></td>
      <!-- <td :value="item.id"><router-link :to="item.content" class="table-details">详情</router-link></td> -->
    </tr>
  </table>
</template>

<script>
import { formatDate } from '../../common/js/date'

export default {
  name: 'userNewsListTable',
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
